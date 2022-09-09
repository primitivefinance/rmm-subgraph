import { BigInt } from "@graphprotocol/graph-ts";
import {
  Engine,
  Pool,
  Swap as SwapEntity,
  Allocate as AllocateEntity,
  Remove as RemoveEntity,
} from "../types/schema";
import { ERC20 as TokenABI } from "../types/PrimitiveEngine/ERC20";
import { PrimitiveEngine as EngineABI } from "../types/PrimitiveEngine/PrimitiveEngine";
import {
  Allocate,
  Swap,
  Remove,
} from "../types/PrimitiveEngine/PrimitiveEngine";
import { toDecimal } from "../utils/decimals";
import { updatePoolDayData, updatePoolHourData } from "./dayUpdates";

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
  let engine = Engine.load(event.address.toHexString());
  let engineContract = EngineABI.bind(event.address);

  let quoteId = engineContract.stable();
  let underlyingId = engineContract.risky();

  if (engine === null) {
    engine = new Engine(event.address.toHexString());
    engine.txCount = 0;
    engine.quoteToken = quoteId.toHexString();
    engine.underlyingToken = underlyingId.toHexString();
  }

  engine.txCount = engine.txCount + 1;

  const pool = Pool.load(event.params.poolId.toHexString());
  if (pool) {
    let poolDayData = updatePoolDayData(event, pool);
    if (poolDayData) poolDayData.save();
  }

  engine.save();
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

  let engine = Engine.load(event.address.toHexString());
  let engineContract = EngineABI.bind(event.address);

  let quoteId = engineContract.stable();
  let underlyingId = engineContract.risky();

  if (engine === null) {
    engine = new Engine(event.address.toHexString());
    engine.txCount = 0;
    engine.quoteToken = quoteId.toHexString();
    engine.underlyingToken = underlyingId.toHexString();
  }

  engine.txCount = engine.txCount + 1;

  const pool = Pool.load(event.params.poolId.toHexString());
  if (pool) {
    const poolDayData = updatePoolDayData(event, pool);
    if (poolDayData) poolDayData.save();
    const poolHourData = updatePoolHourData(event, pool);
    if (poolHourData) poolHourData.save();
  }

  engine.save();
}

export function handleSwap(event: Swap): void {
  let engine = Engine.load(event.address.toHexString());
  let engineContract = EngineABI.bind(event.address);

  let quoteId = engineContract.stable();
  let underlyingId = engineContract.risky();

  let underlyingContract = TokenABI.bind(underlyingId);
  let quoteContract = TokenABI.bind(quoteId);

  let underlyingDecimals = underlyingContract.decimals();
  let quoteDecimals = quoteContract.decimals();

  let reserves = engineContract.reserves(event.params.poolId);

  if (engine === null) {
    engine = new Engine(event.address.toHexString());
    engine.txCount = 0;
    engine.quoteToken = quoteId.toHexString();
    engine.underlyingToken = underlyingId.toHexString();
  }

  let pool = Pool.load(event.params.poolId.toHexString());
  if (pool === null) {
    pool = new Pool(event.params.poolId.toHexString());
    pool.feesCollectedUnderlying = BigInt.fromI32(0);
    pool.feesCollectedQuote = BigInt.fromI32(0);
    pool.txCount = 0;
  }

  engine.txCount = engine.txCount + 1;
  pool.txCount = pool.txCount + 1;
  pool.tau = pool.maturity - event.block.timestamp.toI32();

  if (event.params.riskyForStable) {
    pool.feesCollectedUnderlying = pool.feesCollectedUnderlying.plus(
      event.params.deltaIn.minus(
        event.params.deltaIn.times(pool.gamma).div(BigInt.fromI32(10).pow(4))
      )
    );
  } else {
    pool.feesCollectedQuote = pool.feesCollectedQuote.plus(
      event.params.deltaIn.minus(
        event.params.deltaIn.times(pool.gamma).div(BigInt.fromI32(10).pow(4))
      )
    );
  }

  let swap = new SwapEntity(
    event.transaction.hash.toHexString() +
      "#" +
      event.params.poolId.toHexString()
  );
  swap.transactionHash = event.transaction.hash.toHexString();
  if (swap === null) {
    swap = new SwapEntity(
      event.transaction.hash.toHexString() +
        "#" +
        event.params.poolId.toHexString()
    );
    swap.transactionHash = event.transaction.hash.toHexString();
  }
  swap.sender = event.params.from.toHexString();
  swap.pool = event.params.poolId.toHexString();
  swap.riskyForStable = event.params.riskyForStable;
  swap.deltaIn = event.params.deltaIn;
  swap.deltaOut = event.params.deltaOut;
  swap.totalUnderlying = reserves.value0;
  swap.totalQuote = reserves.value1;
  swap.totalLiquidity = pool.liquidity;
  swap.tau = pool.tau;

  let invariant = engineContract.try_invariantOf(event.params.poolId);

  if (!invariant.reverted) {
    pool.invariant = invariant.value.div(BigInt.fromI32(2).pow(64));
  }

  pool.save();
  engine.save();
  swap.save();

  // update day entities
  const poolDayData = updatePoolDayData(event, pool);
  if (poolDayData) {
    // swap specific updating for pair
    poolDayData.dailyVolumeUnderlying = poolDayData.dailyVolumeUnderlying.plus(
      event.params.riskyForStable
        ? event.params.deltaIn.toBigDecimal()
        : BigInt.fromI32(0).toBigDecimal()
    );
    poolDayData.dailyVolumeQuote = poolDayData.dailyVolumeQuote.plus(
      event.params.riskyForStable
        ? BigInt.fromI32(0).toBigDecimal()
        : event.params.deltaIn.toBigDecimal()
    );
    // TODO: Add USD priced volume back
    // poolDayData.dailyVolumeUSD = poolDayData.dailyVolumeUSD.plus(
    //   trackedAmountUSD
    // );
    poolDayData.save();
  }

  const poolHourData = updatePoolHourData(event, pool);
  if (poolHourData) {
    poolHourData.hourlyVolumeUnderlying = poolHourData.hourlyVolumeUnderlying.plus(
      event.params.riskyForStable
        ? event.params.deltaIn.toBigDecimal()
        : BigInt.fromI32(0).toBigDecimal()
    );
    poolHourData.hourlyVolumeQuote = poolHourData.hourlyVolumeQuote.plus(
      event.params.riskyForStable
        ? BigInt.fromI32(0).toBigDecimal()
        : event.params.deltaIn.toBigDecimal()
    );
    poolHourData.save();
  }
}
