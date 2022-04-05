import { log, BigInt, Address } from "@graphprotocol/graph-ts";
import { Engine, Token, Pool, Position } from "../types/schema";
import { PrimitiveEngine as EngineABI } from "../types/PrimitiveEngine/PrimitiveEngine";
import { ERC20 as TokenABI } from "../types/PrimitiveEngine/ERC20";
import {
  Allocate,
  Remove,
  Create,
} from "../types/PrimitiveManager/PrimitiveManager";
import {
  fetchTokenDecimals,
  fetchTokenName,
  fetchTokenSymbol,
  fetchTokenTotalSupply,
} from "../token";

// TODO: Move the engine mappings to core.ts

export function handleCreate(event: Create): void {
  let engineContract = EngineABI.bind(event.params.engine);

  let underlyingId = engineContract.risky();
  let quoteId = engineContract.stable();

  let underlyingContract = TokenABI.bind(underlyingId);
  let quoteContract = TokenABI.bind(quoteId);

  let underlyingDecimals = underlyingContract.decimals();
  let quoteDecimals = quoteContract.decimals();

  let pool = new Pool(event.params.poolId.toHexString());

  pool.createdAtTimestamp = event.block.timestamp.toI32();
  pool.createdAtBlockNumber = event.block.number.toI32();
  pool.quoteToken = quoteId.toHexString();
  pool.underlyingToken = underlyingId.toHexString();
  pool.liquidity = event.params.delLiquidity;
  pool.liquidityInt = pool.liquidity
    .div(BigInt.fromI32(10).pow(18))
    .toI32() as i32;
  pool.txCount = 1;
  pool.strike = event.params.strike;
  pool.strikeInt = pool.strike
    .div(BigInt.fromI32(10).pow(quoteDecimals as u8))
    .toI32() as i32;
  pool.gamma = event.params.gamma.div(BigInt.fromI32(10).pow(4)).toString();
  pool.sigma = event.params.sigma;
  pool.sigmaInt = pool.sigma.div(BigInt.fromI32(10).pow(4)).toI32() as i32;
  pool.maturity = event.params.maturity.toI32();

  let reserves = engineContract.reserves(event.params.poolId);
  pool.totalUnderlyingTokens = reserves.value0;
  pool.totalQuoteTokens = reserves.value1;

  let position = new Position(event.params.payer.toHexString() + pool.id);
  position.owner = event.params.payer;
  position.pool = pool.id;
  position.underlyingToken = underlyingId.toHexString();
  position.quoteToken = quoteId.toHexString();
  // let minLiquidity = engineContract.MIN_LIQUIDITY()
  position.liquidity = event.params.delLiquidity; // maybe minus minLiquidity, but that becomes hard because of how we get the reserves
  position.depositedUnderlyingToken = reserves.value0;
  position.depositedQuoteToken = reserves.value1;
  position.depositedUnderlyingStr = position.depositedUnderlyingToken
    .div(BigInt.fromI32(10).pow(underlyingDecimals as u8))
    .toString();
  position.depositedQuoteInt = position.depositedQuoteToken
    .div(BigInt.fromI32(10).pow(quoteDecimals as u8))
    .toI32();
  position.withdrawnQuoteToken = BigInt.fromI32(0);
  position.withdrawnUnderlyingToken = BigInt.fromI32(0);

  position.save();
  pool.save();
}

export function handleAllocate(event: Allocate): void {
  let pool = Pool.load(event.params.poolId.toHexString());
  let engineContract = EngineABI.bind(event.params.engine);

  let quoteId = engineContract.stable();
  let underlyingId = engineContract.risky();

  let underlyingContract = TokenABI.bind(underlyingId);
  let quoteContract = TokenABI.bind(quoteId);

  let underlyingDecimals = underlyingContract.decimals();
  let quoteDecimals = quoteContract.decimals();

  let calibration = engineContract.calibrations(event.params.poolId);

  let strike = calibration.value0;
  let sigma = calibration.value1;
  let maturity = calibration.value2;

  if (pool === null) {
    pool = new Pool(event.params.poolId.toHexString());
    pool.createdAtTimestamp = event.block.timestamp.toI32();
    pool.createdAtBlockNumber = event.block.number.toI32();
    pool.quoteToken = quoteId.toHexString();
    pool.underlyingToken = underlyingId.toHexString();
    pool.liquidity = event.params.delLiquidity;
    pool.txCount = 1;
    pool.strike = strike;
    pool.sigma = sigma;
    pool.maturity = maturity.toI32();
  }

  let reserves = engineContract.reserves(event.params.poolId);
  pool.totalUnderlyingTokens = reserves.value0;
  pool.totalUnderlyingInt = pool.totalUnderlyingTokens
    .div(BigInt.fromI32(10).pow(underlyingDecimals as u8))
    .toI32() as i32;
  pool.totalQuoteTokens = reserves.value1;
  pool.totalQuoteInt = pool.totalQuoteTokens
    .div(BigInt.fromI32(10).pow(quoteDecimals as u8))
    .toI32() as i32;

  pool.liquidity = pool.liquidity.plus(event.params.delLiquidity);
  pool.liquidityInt = pool.liquidity
    .div(BigInt.fromI32(10).pow(18))
    .toI32() as i32;
  pool.txCount = pool.txCount + 1;

  let position = Position.load(
    event.params.payer.toHexString() + event.params.poolId.toHexString()
  );

  if (position === null) {
    position = new Position(
      event.params.payer.toHexString() + event.params.poolId.toHexString()
    );
    position.owner = event.params.payer;
    position.pool = pool.id;
    position.underlyingToken = underlyingId.toHexString();
    position.quoteToken = quoteId.toHexString();
    // let minLiquidity = engineContract.MIN_LIQUIDITY()
    position.liquidity = event.params.delLiquidity; // maybe minus minLiquidity, but that becomes hard because of how we get the reserves
    position.liquidityInt = position.liquidity
      .div(BigInt.fromI32(10).pow(18))
      .toI32() as i32;
  }

  position.liquidity = position.liquidity.plus(event.params.delLiquidity);
  position.depositedUnderlyingToken = position.depositedUnderlyingToken.plus(
    event.params.delRisky
  );
  position.depositedUnderlyingStr = position.depositedUnderlyingToken
    .div(BigInt.fromI32(10).pow(underlyingDecimals as u8))
    .toString();
  position.depositedQuoteToken = position.depositedQuoteToken.plus(
    event.params.delStable
  );
  position.depositedQuoteInt = position.depositedQuoteToken
    .div(BigInt.fromI32(10).pow(quoteDecimals as u8))
    .toI32() as i32;

  position.save();
  pool.save();
}

export function handleRemove(event: Remove): void {
  let pool = Pool.load(event.params.poolId.toHexString());
  let engineContract = EngineABI.bind(event.params.engine);

  let quoteId = engineContract.stable();
  let underlyingId = engineContract.risky();

  let underlyingContract = TokenABI.bind(underlyingId);
  let quoteContract = TokenABI.bind(quoteId);

  let underlyingDecimals = underlyingContract.decimals();
  let quoteDecimals = quoteContract.decimals();

  let calibration = engineContract.calibrations(event.params.poolId);

  let strike = calibration.value0;
  let sigma = calibration.value1;
  let maturity = calibration.value2;

  if (pool === null) {
    pool = new Pool(event.params.poolId.toHexString());
    pool.createdAtTimestamp = event.block.timestamp.toI32();
    pool.createdAtBlockNumber = event.block.number.toI32();
    pool.quoteToken = quoteId.toHexString();
    pool.underlyingToken = underlyingId.toHexString();
    pool.liquidity = event.params.delLiquidity;
    pool.txCount = 1;
    pool.strike = strike;
    pool.sigma = sigma;
    pool.maturity = maturity.toI32();
  }

  let reserves = engineContract.reserves(event.params.poolId);
  pool.totalUnderlyingTokens = reserves.value0;
  pool.totalQuoteTokens = reserves.value1;

  pool.liquidity = pool.liquidity.minus(event.params.delLiquidity);
  pool.liquidityInt = pool.liquidity
    .div(BigInt.fromI32(10).pow(18))
    .toI32() as i32;
  pool.txCount = pool.txCount + 1;

  let position = Position.load(
    event.params.payer.toHexString() + event.params.poolId.toHexString()
  );

  if (position === null) {
    position = new Position(
      event.params.payer.toHexString() + event.params.poolId.toHexString()
    );
    position.owner = event.params.payer;
    position.pool = pool.id;
    position.underlyingToken = underlyingId.toHexString();
    position.quoteToken = quoteId.toHexString();
  }

  position.liquidity = position.liquidity.minus(event.params.delLiquidity);
  position.withdrawnQuoteToken = position.withdrawnQuoteToken.plus(
    event.params.delStable
  );
  position.withdrawnQuoteInt = position.withdrawnQuoteToken
    .div(BigInt.fromI32(10).pow(quoteDecimals as u8))
    .toI32() as i32;
  position.withdrawnUnderlyingToken = position.withdrawnUnderlyingToken.plus(
    event.params.delRisky
  );
  position.withdrawnUnderlyingInt = position.withdrawnUnderlyingToken
    .div(BigInt.fromI32(10).pow(underlyingDecimals as u8))
    .toI32() as i32;

  position.save();
  pool.save();
}
