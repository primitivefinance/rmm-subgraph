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
import { updatePoolDayData } from "./dayUpdates";

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
    let poolDayData = updatePoolDayData(event, pool);
    if (poolDayData) poolDayData.save();
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
  let poolDayData = updatePoolDayData(event, pool);
  if (poolDayData) poolDayData.save();

  // let pairHourData = updatePairHourData(event);
  // let token0DayData = updateTokenDayData(token0 as Token, event);
  // let token1DayData = updateTokenDayData(token1 as Token, event);

  // swap specific updating for pair
  // poolDayData.dailyVolumeToken0 = poolDayData.dailyVolumeToken0.plus(
  //   amount0Total
  // );
  // poolDayData.dailyVolumeToken1 = poolDayData.dailyVolumeToken1.plus(
  //   amount1Total
  // );
  // poolDayData.dailyVolumeUSD = poolDayData.dailyVolumeUSD.plus(
  //   trackedAmountUSD
  // );
  // poolDayData.save();

  // // update hourly pair data
  // if (pairHourData) {
  //   pairHourData.hourlyVolumeToken0 = pairHourData.hourlyVolumeToken0.plus(
  //     amount0Total
  //   );
  //   pairHourData.hourlyVolumeToken1 = pairHourData.hourlyVolumeToken1.plus(
  //     amount1Total
  //   );
  //   pairHourData.hourlyVolumeUSD = pairHourData.hourlyVolumeUSD.plus(
  //     trackedAmountUSD
  //   );
  //   pairHourData.save();
  // }

  // // swap specific updating for token0
  // token0DayData.dailyVolumeToken = token0DayData.dailyVolumeToken.plus(
  //   amount0Total
  // );
  // token0DayData.dailyVolumeETH = token0DayData.dailyVolumeETH.plus(
  //   amount0Total.times(token0.derivedETH as BigDecimal)
  // );
  // token0DayData.dailyVolumeUSD = token0DayData.dailyVolumeUSD.plus(
  //   amount0Total.times(token0.derivedETH as BigDecimal).times(bundle.ethPrice)
  // );
  // token0DayData.save();

  // // swap specific updating
  // token1DayData.dailyVolumeToken = token1DayData.dailyVolumeToken.plus(
  //   amount1Total
  // );
  // token1DayData.dailyVolumeETH = token1DayData.dailyVolumeETH.plus(
  //   amount1Total.times(token1.derivedETH as BigDecimal)
  // );
  // token1DayData.dailyVolumeUSD = token1DayData.dailyVolumeUSD.plus(
  //   amount1Total.times(token1.derivedETH as BigDecimal).times(bundle.ethPrice)
  // );
  // token1DayData.save();
}
