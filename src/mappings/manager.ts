import { BigInt } from "@graphprotocol/graph-ts";
import {
  Pool,
  Position,
  Allocate as AllocateEntity,
  Remove as RemoveEntity,
} from "../types/schema";
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

  pool.initialUnderlying = pool.totalUnderlyingTokens;
  pool.initialQuote = pool.totalQuoteTokens;
  pool.initialLiquidity = event.params.delLiquidity;
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
  position.withdrawnQuoteToken = BigInt.fromI32(0);
  position.withdrawnUnderlyingToken = BigInt.fromI32(0);

  position.save();
  pool.save();
}

export function handleAllocate(event: Allocate): void {
  let allocate = new AllocateEntity(
    event.transaction.hash.toHexString() +
      "#" +
      event.params.poolId.toHexString()
  );
  if (allocate) {
    allocate.underlyingTokenAmount = event.params.delRisky;
    allocate.quoteTokenAmount = event.params.delStable;
    allocate.liquidityAmount = event.params.delLiquidity;
    allocate.pool = event.params.poolId.toHexString();
    allocate.timestamp = event.block.timestamp.toI32();
    allocate.sender = event.transaction.from.toHexString();
    allocate.transactionHash = event.transaction.hash.toHexString();

    allocate.save();
  }

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
  pool.totalQuoteTokens = reserves.value1;
  pool.liquidity = pool.liquidity.plus(event.params.delLiquidity);
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
    position.initialLiquidity = event.params.delLiquidity;
    position.initialUnderlying = event.params.delRisky;
    position.initialQuote = event.params.delStable;
    position.initialTau =
      pool.tau === 0 ? pool.maturity - event.block.timestamp.toI32() : pool.tau;
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
  position.depositedQuoteToken = position.depositedQuoteToken.plus(
    event.params.delStable
  );

  position.save();
  pool.save();
}

export function handleRemove(event: Remove): void {
  let remove = new RemoveEntity(
    event.transaction.hash.toHexString() +
      "#" +
      event.params.poolId.toHexString()
  );
  if (remove) {
    remove.underlyingTokenAmount = event.params.delRisky;
    remove.quoteTokenAmount = event.params.delStable;
    remove.liquidityAmount = event.params.delLiquidity;
    remove.pool = event.params.poolId.toHexString();
    remove.timestamp = event.block.timestamp.toI32();
    remove.sender = event.transaction.from.toHexString();
    remove.transactionHash = event.transaction.hash.toHexString();

    remove.save();
  }
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
  pool.liquidity = pool.liquidity.minus(event.params.delLiquidity);
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
  position.withdrawnUnderlyingToken = position.withdrawnUnderlyingToken.plus(
    event.params.delRisky
  );
  if (!invariant.reverted) {
    pool.invariant = invariant.value.div(BigInt.fromI32(2).pow(64));
  }

  position.save();
  pool.save();
}
