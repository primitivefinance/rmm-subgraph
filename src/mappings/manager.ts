import { BigInt } from "@graphprotocol/graph-ts";
import { Pool, Position } from "../types/schema";
import { PrimitiveEngine as EngineABI } from "../types/PrimitiveEngine/PrimitiveEngine";
import { ERC20 as TokenABI } from "../types/PrimitiveEngine/ERC20";
import { toDecimal } from "../utils/decimals";
import {
  Allocate,
  Remove,
  Create,
} from "../types/PrimitiveManager/PrimitiveManager";

// TODO: Move the engine mappings to core.ts

export function handleCreate(event: Create): void {
  let engineContract = EngineABI.bind(event.params.engine);

  let underlyingId = engineContract.risky();
  let quoteId = engineContract.stable();

  let underlyingContract = TokenABI.bind(underlyingId);
  let quoteContract = TokenABI.bind(quoteId);

  let underlyingDecimals = underlyingContract.decimals();
  let quoteDecimals = quoteContract.decimals();

  let invariant = engineContract.try_invariantOf(event.params.poolId);

  let pool = new Pool(event.params.poolId.toHexString());

  pool.createdAtTimestamp = event.block.timestamp.toI32();
  if (!invariant.reverted) {
    pool.invariantStart = invariant.value.div(BigInt.fromI32(2).pow(64));
  }
  pool.createdAtBlockNumber = event.block.number.toI32();
  pool.quoteToken = quoteId.toHexString();
  pool.underlyingToken = underlyingId.toHexString();
  pool.liquidity = event.params.delLiquidity;
  pool.liquidityDecimal = toDecimal(pool.liquidity, 18).truncate(6);
  pool.txCount = 1;
  pool.strike = event.params.strike;
  pool.strikeDecimal = toDecimal(event.params.strike, quoteDecimals);
  pool.gamma = event.params.gamma;
  pool.sigma = event.params.sigma;
  pool.sigmaDecimal = toDecimal(event.params.sigma, 4).truncate(6);
  pool.maturity = event.params.maturity.toI32();
  pool.engine = event.params.engine.toHexString();
  pool.tau = pool.maturity - event.block.timestamp.toI32();

  let reserves = engineContract.reserves(event.params.poolId);
  pool.totalUnderlyingTokens = reserves.value0;
  pool.totalQuoteTokens = reserves.value1;

  pool.initialUnderlyingDecimal = toDecimal(
    pool.totalUnderlyingTokens,
    underlyingDecimals
  ).truncate(6);
  pool.initialQuoteDecimal = toDecimal(
    pool.totalQuoteTokens,
    quoteDecimals
  ).truncate(6);
  pool.initialLiquidityDecimal = toDecimal(
    event.params.delLiquidity,
    18
  ).truncate(6);
  pool.initialTau = pool.tau;

  let position = new Position(event.params.payer.toHexString() + pool.id);
  position.owner = event.params.payer;
  position.pool = pool.id;
  position.underlyingToken = underlyingId.toHexString();
  position.quoteToken = quoteId.toHexString();
  // let minLiquidity = engineContract.MIN_LIQUIDITY()
  position.liquidity = event.params.delLiquidity; // maybe minus minLiquidity, but that becomes hard because of how we get the reserves
  position.depositedUnderlyingToken = reserves.value0;
  position.depositedQuoteToken = reserves.value1;
  position.depositedUnderlyingDecimal = toDecimal(
    position.depositedUnderlyingToken,
    underlyingDecimals
  ).truncate(6);
  position.depositedQuoteDecimal = toDecimal(
    position.depositedQuoteToken,
    quoteDecimals
  ).truncate(6);
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

  let invariant = engineContract.try_invariantOf(event.params.poolId);

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
    pool.engine = event.params.engine.toHexString();
  }

  let reserves = engineContract.reserves(event.params.poolId);
  pool.totalUnderlyingTokens = reserves.value0;
  pool.totalUnderlyingDecimal = toDecimal(
    pool.totalUnderlyingTokens,
    underlyingDecimals
  ).truncate(6);
  pool.totalQuoteTokens = reserves.value1;
  pool.totalQuoteDecimal = toDecimal(
    pool.totalQuoteTokens,
    quoteDecimals
  ).truncate(6);

  pool.liquidity = pool.liquidity.plus(event.params.delLiquidity);
  pool.liquidityDecimal = toDecimal(pool.liquidity, 18).truncate(6);
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
    position.initialLiquidityDecimal = toDecimal(
      event.params.delLiquidity,
      18
    ).truncate(6);
    position.initialUnderlyingDecimal = toDecimal(
      event.params.delRisky,
      underlyingDecimals
    ).truncate(6);
    position.initialQuoteDecimal = toDecimal(
      event.params.delStable,
      quoteDecimals
    ).truncate(6);

    position.initialTau =
      pool.tau === 0 ? pool.maturity - event.block.timestamp.toI32() : pool.tau;
    position.liquidityDecimal = toDecimal(position.liquidity, 18).truncate(6);
    if (!invariant.reverted) {
      position.invariantAtCreation = invariant.value.div(
        BigInt.fromI32(2).pow(64)
      );
      position.invariantAtLastAllocate = invariant.value.div(
        BigInt.fromI32(2).pow(64)
      );
      pool.invariant = invariant.value.div(BigInt.fromI32(2).pow(64));
    }
  }

  position.liquidity = position.liquidity.plus(event.params.delLiquidity);
  position.depositedUnderlyingToken = position.depositedUnderlyingToken.plus(
    event.params.delRisky
  );
  position.depositedUnderlyingDecimal = toDecimal(
    position.depositedUnderlyingToken,
    underlyingDecimals
  ).truncate(6);
  position.depositedQuoteToken = position.depositedQuoteToken.plus(
    event.params.delStable
  );
  position.depositedQuoteDecimal = toDecimal(
    position.depositedQuoteToken,
    quoteDecimals
  ).truncate(6);

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

  let invariant = engineContract.try_invariantOf(event.params.poolId);

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
    pool.engine = event.params.engine.toHexString();
  }

  let reserves = engineContract.reserves(event.params.poolId);
  pool.totalUnderlyingTokens = reserves.value0;
  pool.totalQuoteTokens = reserves.value1;

  pool.totalUnderlyingDecimal = toDecimal(
    pool.totalUnderlyingTokens,
    underlyingDecimals
  );
  pool.totalQuoteDecimal = toDecimal(pool.totalQuoteTokens, quoteDecimals);

  pool.liquidity = pool.liquidity.minus(event.params.delLiquidity);
  pool.liquidityDecimal = toDecimal(pool.liquidity, 18).truncate(6);
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
  position.withdrawnQuoteDecimal = toDecimal(
    position.withdrawnQuoteToken,
    quoteDecimals
  ).truncate(6);
  position.withdrawnUnderlyingToken = position.withdrawnUnderlyingToken.plus(
    event.params.delRisky
  );
  position.withdrawnUnderlyingDecimal = toDecimal(
    position.withdrawnUnderlyingToken,
    underlyingDecimals
  ).truncate(6);
  if (!invariant.reverted) {
    pool.invariant = invariant.value.div(BigInt.fromI32(2).pow(64));
  }

  position.save();
  pool.save();
}
