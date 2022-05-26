// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Factory extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("engineCount", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Factory entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Factory entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Factory", id.toString(), this);
    }
  }

  static load(id: string): Factory | null {
    return changetype<Factory | null>(store.get("Factory", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get engineCount(): BigInt {
    let value = this.get("engineCount");
    return value!.toBigInt();
  }

  set engineCount(value: BigInt) {
    this.set("engineCount", Value.fromBigInt(value));
  }
}

export class Token extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("symbol", Value.fromString(""));
    this.set("name", Value.fromString(""));
    this.set("decimals", Value.fromBigInt(BigInt.zero()));
    this.set("totalSupply", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Token entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Token entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Token", id.toString(), this);
    }
  }

  static load(id: string): Token | null {
    return changetype<Token | null>(store.get("Token", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get symbol(): string {
    let value = this.get("symbol");
    return value!.toString();
  }

  set symbol(value: string) {
    this.set("symbol", Value.fromString(value));
  }

  get name(): string {
    let value = this.get("name");
    return value!.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get decimals(): BigInt {
    let value = this.get("decimals");
    return value!.toBigInt();
  }

  set decimals(value: BigInt) {
    this.set("decimals", Value.fromBigInt(value));
  }

  get totalSupply(): BigInt {
    let value = this.get("totalSupply");
    return value!.toBigInt();
  }

  set totalSupply(value: BigInt) {
    this.set("totalSupply", Value.fromBigInt(value));
  }
}

export class Pool extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("createdAtTimestamp", Value.fromI32(0));
    this.set("createdAtBlockNumber", Value.fromI32(0));
    this.set("underlyingToken", Value.fromString(""));
    this.set("quoteToken", Value.fromString(""));
    this.set("strike", Value.fromBigInt(BigInt.zero()));
    this.set("strikeDecimal", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("sigma", Value.fromBigInt(BigInt.zero()));
    this.set("sigmaDecimal", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("tau", Value.fromI32(0));
    this.set("maturity", Value.fromI32(0));
    this.set("gamma", Value.fromBigInt(BigInt.zero()));
    this.set("liquidity", Value.fromBigInt(BigInt.zero()));
    this.set("txCount", Value.fromI32(0));
    this.set("totalUnderlyingTokens", Value.fromBigInt(BigInt.zero()));
    this.set("totalQuoteTokens", Value.fromBigInt(BigInt.zero()));
    this.set("liquidityProviderCount", Value.fromI32(0));
    this.set("engine", Value.fromString(""));
    this.set("feesCollectedUnderlying", Value.fromBigInt(BigInt.zero()));
    this.set("feesCollectedQuote", Value.fromBigInt(BigInt.zero()));
    this.set("invariant", Value.fromBigInt(BigInt.zero()));
    this.set("invariantStart", Value.fromBigInt(BigInt.zero()));
    this.set("initialUnderlying", Value.fromBigInt(BigInt.zero()));
    this.set("initialQuote", Value.fromBigInt(BigInt.zero()));
    this.set("initialLiquidity", Value.fromBigInt(BigInt.zero()));
    this.set("initialTau", Value.fromI32(0));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Pool entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Pool entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Pool", id.toString(), this);
    }
  }

  static load(id: string): Pool | null {
    return changetype<Pool | null>(store.get("Pool", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get createdAtTimestamp(): i32 {
    let value = this.get("createdAtTimestamp");
    return value!.toI32();
  }

  set createdAtTimestamp(value: i32) {
    this.set("createdAtTimestamp", Value.fromI32(value));
  }

  get createdAtBlockNumber(): i32 {
    let value = this.get("createdAtBlockNumber");
    return value!.toI32();
  }

  set createdAtBlockNumber(value: i32) {
    this.set("createdAtBlockNumber", Value.fromI32(value));
  }

  get underlyingToken(): string {
    let value = this.get("underlyingToken");
    return value!.toString();
  }

  set underlyingToken(value: string) {
    this.set("underlyingToken", Value.fromString(value));
  }

  get quoteToken(): string {
    let value = this.get("quoteToken");
    return value!.toString();
  }

  set quoteToken(value: string) {
    this.set("quoteToken", Value.fromString(value));
  }

  get strike(): BigInt {
    let value = this.get("strike");
    return value!.toBigInt();
  }

  set strike(value: BigInt) {
    this.set("strike", Value.fromBigInt(value));
  }

  get strikeDecimal(): BigDecimal {
    let value = this.get("strikeDecimal");
    return value!.toBigDecimal();
  }

  set strikeDecimal(value: BigDecimal) {
    this.set("strikeDecimal", Value.fromBigDecimal(value));
  }

  get sigma(): BigInt {
    let value = this.get("sigma");
    return value!.toBigInt();
  }

  set sigma(value: BigInt) {
    this.set("sigma", Value.fromBigInt(value));
  }

  get sigmaDecimal(): BigDecimal {
    let value = this.get("sigmaDecimal");
    return value!.toBigDecimal();
  }

  set sigmaDecimal(value: BigDecimal) {
    this.set("sigmaDecimal", Value.fromBigDecimal(value));
  }

  get tau(): i32 {
    let value = this.get("tau");
    return value!.toI32();
  }

  set tau(value: i32) {
    this.set("tau", Value.fromI32(value));
  }

  get maturity(): i32 {
    let value = this.get("maturity");
    return value!.toI32();
  }

  set maturity(value: i32) {
    this.set("maturity", Value.fromI32(value));
  }

  get gamma(): BigInt {
    let value = this.get("gamma");
    return value!.toBigInt();
  }

  set gamma(value: BigInt) {
    this.set("gamma", Value.fromBigInt(value));
  }

  get liquidity(): BigInt {
    let value = this.get("liquidity");
    return value!.toBigInt();
  }

  set liquidity(value: BigInt) {
    this.set("liquidity", Value.fromBigInt(value));
  }

  get txCount(): i32 {
    let value = this.get("txCount");
    return value!.toI32();
  }

  set txCount(value: i32) {
    this.set("txCount", Value.fromI32(value));
  }

  get totalUnderlyingTokens(): BigInt {
    let value = this.get("totalUnderlyingTokens");
    return value!.toBigInt();
  }

  set totalUnderlyingTokens(value: BigInt) {
    this.set("totalUnderlyingTokens", Value.fromBigInt(value));
  }

  get totalQuoteTokens(): BigInt {
    let value = this.get("totalQuoteTokens");
    return value!.toBigInt();
  }

  set totalQuoteTokens(value: BigInt) {
    this.set("totalQuoteTokens", Value.fromBigInt(value));
  }

  get liquidityProviderCount(): i32 {
    let value = this.get("liquidityProviderCount");
    return value!.toI32();
  }

  set liquidityProviderCount(value: i32) {
    this.set("liquidityProviderCount", Value.fromI32(value));
  }

  get engine(): string {
    let value = this.get("engine");
    return value!.toString();
  }

  set engine(value: string) {
    this.set("engine", Value.fromString(value));
  }

  get feesCollectedUnderlying(): BigInt {
    let value = this.get("feesCollectedUnderlying");
    return value!.toBigInt();
  }

  set feesCollectedUnderlying(value: BigInt) {
    this.set("feesCollectedUnderlying", Value.fromBigInt(value));
  }

  get feesCollectedQuote(): BigInt {
    let value = this.get("feesCollectedQuote");
    return value!.toBigInt();
  }

  set feesCollectedQuote(value: BigInt) {
    this.set("feesCollectedQuote", Value.fromBigInt(value));
  }

  get invariant(): BigInt {
    let value = this.get("invariant");
    return value!.toBigInt();
  }

  set invariant(value: BigInt) {
    this.set("invariant", Value.fromBigInt(value));
  }

  get invariantStart(): BigInt {
    let value = this.get("invariantStart");
    return value!.toBigInt();
  }

  set invariantStart(value: BigInt) {
    this.set("invariantStart", Value.fromBigInt(value));
  }

  get initialUnderlying(): BigInt {
    let value = this.get("initialUnderlying");
    return value!.toBigInt();
  }

  set initialUnderlying(value: BigInt) {
    this.set("initialUnderlying", Value.fromBigInt(value));
  }

  get initialQuote(): BigInt {
    let value = this.get("initialQuote");
    return value!.toBigInt();
  }

  set initialQuote(value: BigInt) {
    this.set("initialQuote", Value.fromBigInt(value));
  }

  get initialLiquidity(): BigInt {
    let value = this.get("initialLiquidity");
    return value!.toBigInt();
  }

  set initialLiquidity(value: BigInt) {
    this.set("initialLiquidity", Value.fromBigInt(value));
  }

  get initialTau(): i32 {
    let value = this.get("initialTau");
    return value!.toI32();
  }

  set initialTau(value: i32) {
    this.set("initialTau", Value.fromI32(value));
  }

  get swaps(): Array<string> | null {
    let value = this.get("swaps");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set swaps(value: Array<string> | null) {
    if (!value) {
      this.unset("swaps");
    } else {
      this.set("swaps", Value.fromStringArray(<Array<string>>value));
    }
  }

  get allocates(): Array<string> | null {
    let value = this.get("allocates");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set allocates(value: Array<string> | null) {
    if (!value) {
      this.unset("allocates");
    } else {
      this.set("allocates", Value.fromStringArray(<Array<string>>value));
    }
  }

  get removes(): Array<string> | null {
    let value = this.get("removes");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set removes(value: Array<string> | null) {
    if (!value) {
      this.unset("removes");
    } else {
      this.set("removes", Value.fromStringArray(<Array<string>>value));
    }
  }
}

export class Engine extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("poolCount", Value.fromI32(0));
    this.set("pools", Value.fromStringArray(new Array(0)));
    this.set("underlyingToken", Value.fromString(""));
    this.set("txCount", Value.fromI32(0));
    this.set("quoteToken", Value.fromString(""));
    this.set("createdAtTimestamp", Value.fromBigInt(BigInt.zero()));
    this.set("createdAtBlockNumber", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Engine entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Engine entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Engine", id.toString(), this);
    }
  }

  static load(id: string): Engine | null {
    return changetype<Engine | null>(store.get("Engine", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get poolCount(): i32 {
    let value = this.get("poolCount");
    return value!.toI32();
  }

  set poolCount(value: i32) {
    this.set("poolCount", Value.fromI32(value));
  }

  get pools(): Array<string> {
    let value = this.get("pools");
    return value!.toStringArray();
  }

  set pools(value: Array<string>) {
    this.set("pools", Value.fromStringArray(value));
  }

  get underlyingToken(): string {
    let value = this.get("underlyingToken");
    return value!.toString();
  }

  set underlyingToken(value: string) {
    this.set("underlyingToken", Value.fromString(value));
  }

  get txCount(): i32 {
    let value = this.get("txCount");
    return value!.toI32();
  }

  set txCount(value: i32) {
    this.set("txCount", Value.fromI32(value));
  }

  get quoteToken(): string {
    let value = this.get("quoteToken");
    return value!.toString();
  }

  set quoteToken(value: string) {
    this.set("quoteToken", Value.fromString(value));
  }

  get createdAtTimestamp(): BigInt {
    let value = this.get("createdAtTimestamp");
    return value!.toBigInt();
  }

  set createdAtTimestamp(value: BigInt) {
    this.set("createdAtTimestamp", Value.fromBigInt(value));
  }

  get createdAtBlockNumber(): BigInt {
    let value = this.get("createdAtBlockNumber");
    return value!.toBigInt();
  }

  set createdAtBlockNumber(value: BigInt) {
    this.set("createdAtBlockNumber", Value.fromBigInt(value));
  }
}

export class Position extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("owner", Value.fromBytes(Bytes.empty()));
    this.set("pool", Value.fromString(""));
    this.set("underlyingToken", Value.fromString(""));
    this.set("quoteToken", Value.fromString(""));
    this.set("liquidity", Value.fromBigInt(BigInt.zero()));
    this.set("depositedUnderlyingToken", Value.fromBigInt(BigInt.zero()));
    this.set("depositedQuoteToken", Value.fromBigInt(BigInt.zero()));
    this.set("withdrawnUnderlyingToken", Value.fromBigInt(BigInt.zero()));
    this.set("withdrawnQuoteToken", Value.fromBigInt(BigInt.zero()));
    this.set("invariantAtLastAllocate", Value.fromBigInt(BigInt.zero()));
    this.set("invariantAtCreation", Value.fromBigInt(BigInt.zero()));
    this.set("initialLiquidity", Value.fromBigInt(BigInt.zero()));
    this.set("initialTau", Value.fromI32(0));
    this.set("initialUnderlying", Value.fromBigInt(BigInt.zero()));
    this.set("initialQuote", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Position entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Position entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Position", id.toString(), this);
    }
  }

  static load(id: string): Position | null {
    return changetype<Position | null>(store.get("Position", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get owner(): Bytes {
    let value = this.get("owner");
    return value!.toBytes();
  }

  set owner(value: Bytes) {
    this.set("owner", Value.fromBytes(value));
  }

  get pool(): string {
    let value = this.get("pool");
    return value!.toString();
  }

  set pool(value: string) {
    this.set("pool", Value.fromString(value));
  }

  get underlyingToken(): string {
    let value = this.get("underlyingToken");
    return value!.toString();
  }

  set underlyingToken(value: string) {
    this.set("underlyingToken", Value.fromString(value));
  }

  get quoteToken(): string {
    let value = this.get("quoteToken");
    return value!.toString();
  }

  set quoteToken(value: string) {
    this.set("quoteToken", Value.fromString(value));
  }

  get liquidity(): BigInt {
    let value = this.get("liquidity");
    return value!.toBigInt();
  }

  set liquidity(value: BigInt) {
    this.set("liquidity", Value.fromBigInt(value));
  }

  get depositedUnderlyingToken(): BigInt {
    let value = this.get("depositedUnderlyingToken");
    return value!.toBigInt();
  }

  set depositedUnderlyingToken(value: BigInt) {
    this.set("depositedUnderlyingToken", Value.fromBigInt(value));
  }

  get depositedQuoteToken(): BigInt {
    let value = this.get("depositedQuoteToken");
    return value!.toBigInt();
  }

  set depositedQuoteToken(value: BigInt) {
    this.set("depositedQuoteToken", Value.fromBigInt(value));
  }

  get withdrawnUnderlyingToken(): BigInt {
    let value = this.get("withdrawnUnderlyingToken");
    return value!.toBigInt();
  }

  set withdrawnUnderlyingToken(value: BigInt) {
    this.set("withdrawnUnderlyingToken", Value.fromBigInt(value));
  }

  get withdrawnQuoteToken(): BigInt {
    let value = this.get("withdrawnQuoteToken");
    return value!.toBigInt();
  }

  set withdrawnQuoteToken(value: BigInt) {
    this.set("withdrawnQuoteToken", Value.fromBigInt(value));
  }

  get invariantAtLastAllocate(): BigInt {
    let value = this.get("invariantAtLastAllocate");
    return value!.toBigInt();
  }

  set invariantAtLastAllocate(value: BigInt) {
    this.set("invariantAtLastAllocate", Value.fromBigInt(value));
  }

  get invariantAtCreation(): BigInt {
    let value = this.get("invariantAtCreation");
    return value!.toBigInt();
  }

  set invariantAtCreation(value: BigInt) {
    this.set("invariantAtCreation", Value.fromBigInt(value));
  }

  get initialLiquidity(): BigInt {
    let value = this.get("initialLiquidity");
    return value!.toBigInt();
  }

  set initialLiquidity(value: BigInt) {
    this.set("initialLiquidity", Value.fromBigInt(value));
  }

  get initialTau(): i32 {
    let value = this.get("initialTau");
    return value!.toI32();
  }

  set initialTau(value: i32) {
    this.set("initialTau", Value.fromI32(value));
  }

  get initialUnderlying(): BigInt {
    let value = this.get("initialUnderlying");
    return value!.toBigInt();
  }

  set initialUnderlying(value: BigInt) {
    this.set("initialUnderlying", Value.fromBigInt(value));
  }

  get initialQuote(): BigInt {
    let value = this.get("initialQuote");
    return value!.toBigInt();
  }

  set initialQuote(value: BigInt) {
    this.set("initialQuote", Value.fromBigInt(value));
  }
}

export class Allocate extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("pool", Value.fromString(""));
    this.set("underlyingTokenAmount", Value.fromBigInt(BigInt.zero()));
    this.set("quoteTokenAmount", Value.fromBigInt(BigInt.zero()));
    this.set("liquidityAmount", Value.fromBigInt(BigInt.zero()));
    this.set("timestamp", Value.fromI32(0));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Allocate entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Allocate entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Allocate", id.toString(), this);
    }
  }

  static load(id: string): Allocate | null {
    return changetype<Allocate | null>(store.get("Allocate", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get pool(): string {
    let value = this.get("pool");
    return value!.toString();
  }

  set pool(value: string) {
    this.set("pool", Value.fromString(value));
  }

  get underlyingTokenAmount(): BigInt {
    let value = this.get("underlyingTokenAmount");
    return value!.toBigInt();
  }

  set underlyingTokenAmount(value: BigInt) {
    this.set("underlyingTokenAmount", Value.fromBigInt(value));
  }

  get quoteTokenAmount(): BigInt {
    let value = this.get("quoteTokenAmount");
    return value!.toBigInt();
  }

  set quoteTokenAmount(value: BigInt) {
    this.set("quoteTokenAmount", Value.fromBigInt(value));
  }

  get liquidityAmount(): BigInt {
    let value = this.get("liquidityAmount");
    return value!.toBigInt();
  }

  set liquidityAmount(value: BigInt) {
    this.set("liquidityAmount", Value.fromBigInt(value));
  }

  get timestamp(): i32 {
    let value = this.get("timestamp");
    return value!.toI32();
  }

  set timestamp(value: i32) {
    this.set("timestamp", Value.fromI32(value));
  }
}

export class Remove extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("pool", Value.fromString(""));
    this.set("underlyingTokenAmount", Value.fromBigInt(BigInt.zero()));
    this.set("quoteTokenAmount", Value.fromBigInt(BigInt.zero()));
    this.set("liquidityAmount", Value.fromBigInt(BigInt.zero()));
    this.set("timestamp", Value.fromI32(0));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Remove entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Remove entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Remove", id.toString(), this);
    }
  }

  static load(id: string): Remove | null {
    return changetype<Remove | null>(store.get("Remove", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get pool(): string {
    let value = this.get("pool");
    return value!.toString();
  }

  set pool(value: string) {
    this.set("pool", Value.fromString(value));
  }

  get underlyingTokenAmount(): BigInt {
    let value = this.get("underlyingTokenAmount");
    return value!.toBigInt();
  }

  set underlyingTokenAmount(value: BigInt) {
    this.set("underlyingTokenAmount", Value.fromBigInt(value));
  }

  get quoteTokenAmount(): BigInt {
    let value = this.get("quoteTokenAmount");
    return value!.toBigInt();
  }

  set quoteTokenAmount(value: BigInt) {
    this.set("quoteTokenAmount", Value.fromBigInt(value));
  }

  get liquidityAmount(): BigInt {
    let value = this.get("liquidityAmount");
    return value!.toBigInt();
  }

  set liquidityAmount(value: BigInt) {
    this.set("liquidityAmount", Value.fromBigInt(value));
  }

  get timestamp(): i32 {
    let value = this.get("timestamp");
    return value!.toI32();
  }

  set timestamp(value: i32) {
    this.set("timestamp", Value.fromI32(value));
  }
}

export class Swap extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("pool", Value.fromString(""));
    this.set("sender", Value.fromString(""));
    this.set("riskyForStable", Value.fromBoolean(false));
    this.set("deltaIn", Value.fromBigInt(BigInt.zero()));
    this.set("deltaOut", Value.fromBigInt(BigInt.zero()));
    this.set("amount", Value.fromBigInt(BigInt.zero()));
    this.set("timestamp", Value.fromI32(0));
    this.set("tau", Value.fromI32(0));
    this.set("totalUnderlying", Value.fromBigInt(BigInt.zero()));
    this.set("totalQuote", Value.fromBigInt(BigInt.zero()));
    this.set("totalLiquidity", Value.fromBigInt(BigInt.zero()));
    this.set("transactionHash", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Swap entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Swap entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Swap", id.toString(), this);
    }
  }

  static load(id: string): Swap | null {
    return changetype<Swap | null>(store.get("Swap", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get pool(): string {
    let value = this.get("pool");
    return value!.toString();
  }

  set pool(value: string) {
    this.set("pool", Value.fromString(value));
  }

  get sender(): string {
    let value = this.get("sender");
    return value!.toString();
  }

  set sender(value: string) {
    this.set("sender", Value.fromString(value));
  }

  get riskyForStable(): boolean {
    let value = this.get("riskyForStable");
    return value!.toBoolean();
  }

  set riskyForStable(value: boolean) {
    this.set("riskyForStable", Value.fromBoolean(value));
  }

  get deltaIn(): BigInt {
    let value = this.get("deltaIn");
    return value!.toBigInt();
  }

  set deltaIn(value: BigInt) {
    this.set("deltaIn", Value.fromBigInt(value));
  }

  get deltaOut(): BigInt {
    let value = this.get("deltaOut");
    return value!.toBigInt();
  }

  set deltaOut(value: BigInt) {
    this.set("deltaOut", Value.fromBigInt(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get timestamp(): i32 {
    let value = this.get("timestamp");
    return value!.toI32();
  }

  set timestamp(value: i32) {
    this.set("timestamp", Value.fromI32(value));
  }

  get tau(): i32 {
    let value = this.get("tau");
    return value!.toI32();
  }

  set tau(value: i32) {
    this.set("tau", Value.fromI32(value));
  }

  get totalUnderlying(): BigInt {
    let value = this.get("totalUnderlying");
    return value!.toBigInt();
  }

  set totalUnderlying(value: BigInt) {
    this.set("totalUnderlying", Value.fromBigInt(value));
  }

  get totalQuote(): BigInt {
    let value = this.get("totalQuote");
    return value!.toBigInt();
  }

  set totalQuote(value: BigInt) {
    this.set("totalQuote", Value.fromBigInt(value));
  }

  get totalLiquidity(): BigInt {
    let value = this.get("totalLiquidity");
    return value!.toBigInt();
  }

  set totalLiquidity(value: BigInt) {
    this.set("totalLiquidity", Value.fromBigInt(value));
  }

  get transactionHash(): string {
    let value = this.get("transactionHash");
    return value!.toString();
  }

  set transactionHash(value: string) {
    this.set("transactionHash", Value.fromString(value));
  }
}
