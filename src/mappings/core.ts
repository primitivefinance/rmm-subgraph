import {
  BigInt,
} from "@graphprotocol/graph-ts";
import {
  Engine,
  Pool,
  Swap as SwapEntity,
} from "../types/schema";
import { ERC20 as TokenABI } from "../types/PrimitiveEngine/ERC20";
import { PrimitiveEngine as EngineABI } from "../types/PrimitiveEngine/PrimitiveEngine";
import {
  Allocate,
  Swap,
  Remove,
} from "../types/PrimitiveEngine/PrimitiveEngine";
import { toDecimal } from "../utils/decimals";

export function handleAllocate(event: Allocate): void {
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

  engine.save();
}

export function handleRemove(event: Remove): void {
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

  if (event.params.riskyForStable) {
    pool.feesCollectedUnderlying = pool.feesCollectedUnderlying.plus(
      event.params.deltaIn.times(pool.gamma).div(BigInt.fromI32(10).pow(4))
    );
    pool.feesCollectedUnderlyingDecimal = toDecimal(pool.feesCollectedUnderlying, underlyingDecimals).truncate(8)
  } else {
    pool.feesCollectedQuote = pool.feesCollectedQuote.plus(
      event.params.deltaIn.times(pool.gamma).div(BigInt.fromI32(10).pow(4))
    );
    pool.feesCollectedQuoteDecimal = toDecimal(pool.feesCollectedQuote, quoteDecimals).truncate(8)
  }

  let swap = new SwapEntity(event.address.toHexString());
  if (swap === null) {
    swap = new SwapEntity(event.address.toHexString());
  }

  swap.pool = event.params.poolId.toHexString();
  swap.riskyForStable = event.params.riskyForStable;
  swap.deltaIn = event.params.deltaIn;
  swap.deltaOut = event.params.deltaOut;

  let invariant = engineContract.try_invariantOf(event.params.poolId)

  if (!invariant.reverted) {
    pool.invariant = invariant.value.div(BigInt.fromI32(2).pow(64))
  }

  swap.save();
  engine.save();
  pool.save();
}
