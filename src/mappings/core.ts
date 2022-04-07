import { log, BigInt, Address } from "@graphprotocol/graph-ts";
import {
  Factory,
  Engine,
  Token,
  Pool,
  Swap as SwapEntity,
} from "../types/schema";
import { PrimitiveEngine as EngineABI } from "../types/PrimitiveEngine/PrimitiveEngine";
import {
  Allocate,
  Swap,
  Remove,
} from "../types/PrimitiveEngine/PrimitiveEngine";

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
}

export function handleSwap(event: Swap): void {
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

  let pool = Pool.load(event.params.poolId.toHexString());
  if (pool === null) {
    pool = new Pool(event.params.poolId.toHexString());
    pool.txCount = 0;
  }

  engine.txCount = engine.txCount + 1;
  pool.txCount = pool.txCount + 1;
  pool.feesCollected = pool.feesCollected + event.params;

  let swap = new SwapEntity(event.address.toHexString());
  if (swap === null) {
    swap = new SwapEntity(event.address.toHexString());
  }

  swap.pool = event.params.poolId.toHexString();
  swap.riskyForStable = event.params.riskyForStable;
  swap.deltaIn = event.params.deltaIn;
  swap.deltaOut = event.params.deltaOut;
}
