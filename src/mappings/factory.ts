import { log, BigInt, Address } from "@graphprotocol/graph-ts";
import { Factory, Engine, Token } from "../types/schema";
import { PrimitiveEngine as EngineTemplate } from "../types/templates";
import { DeployEngine } from "../types/PrimitiveFactory/PrimitiveFactory";
import {
  fetchTokenDecimals,
  fetchTokenName,
  fetchTokenSymbol,
  fetchTokenTotalSupply,
} from "../token";

export function handleDeployEngine(event: DeployEngine): void {
  let factory = Factory.load("0x955225f0c45DE804909C8D87ef969C5D8598fad3"); // Factory address
  if (factory === null) {
    factory = new Factory("0x955225f0c45DE804909C8D87ef969C5D8598fad3"); // Factory address
    factory.engineCount = BigInt.fromI32(0);
  }

  factory.engineCount = factory.engineCount.plus(BigInt.fromI32(1));

  let engine = new Engine(event.params.engine.toHexString()) as Engine;
  let quoteToken = Token.load(event.params.stable.toHexString());
  let underlyingToken = Token.load(event.params.risky.toHexString());

  if (quoteToken === null) {
    quoteToken = new Token(event.params.stable.toHexString());
    quoteToken.symbol = fetchTokenSymbol(event.params.stable);
    quoteToken.name = fetchTokenName(event.params.stable);
    quoteToken.decimals = fetchTokenDecimals(event.params.stable);
    quoteToken.totalSupply = fetchTokenTotalSupply(event.params.stable);
  }

  if (underlyingToken === null) {
    underlyingToken = new Token(event.params.risky.toHexString());
    underlyingToken.symbol = fetchTokenSymbol(event.params.risky);
    underlyingToken.name = fetchTokenName(event.params.risky);
    underlyingToken.decimals = fetchTokenDecimals(event.params.risky);
    underlyingToken.totalSupply = fetchTokenTotalSupply(event.params.risky);
  }

  engine.poolCount = 0;
  engine.pools = [];
  engine.quoteToken = quoteToken.id;
  engine.underlyingToken = underlyingToken.id;
  engine.txCount = 0;
  engine.createdAtTimestamp = event.block.timestamp;
  engine.createdAtBlockNumber = event.block.number;

  factory.engineCount = factory.engineCount.plus(BigInt.fromI32(1));

  factory.save();
  engine.save();
  EngineTemplate.create(event.params.engine)
  quoteToken.save();
  underlyingToken.save();
}
