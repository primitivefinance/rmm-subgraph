// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Allocate extends ethereum.Event {
  get params(): Allocate__Params {
    return new Allocate__Params(this);
  }
}

export class Allocate__Params {
  _event: Allocate;

  constructor(event: Allocate) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get recipient(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get poolId(): Bytes {
    return this._event.parameters[2].value.toBytes();
  }

  get delRisky(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get delStable(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get delLiquidity(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }
}

export class Create extends ethereum.Event {
  get params(): Create__Params {
    return new Create__Params(this);
  }
}

export class Create__Params {
  _event: Create;

  constructor(event: Create) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get strike(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get sigma(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get maturity(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get gamma(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get delRisky(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }

  get delStable(): BigInt {
    return this._event.parameters[6].value.toBigInt();
  }

  get delLiquidity(): BigInt {
    return this._event.parameters[7].value.toBigInt();
  }
}

export class Deposit extends ethereum.Event {
  get params(): Deposit__Params {
    return new Deposit__Params(this);
  }
}

export class Deposit__Params {
  _event: Deposit;

  constructor(event: Deposit) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get recipient(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get delRisky(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get delStable(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class Remove extends ethereum.Event {
  get params(): Remove__Params {
    return new Remove__Params(this);
  }
}

export class Remove__Params {
  _event: Remove;

  constructor(event: Remove) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get poolId(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }

  get delRisky(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get delStable(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get delLiquidity(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class Swap extends ethereum.Event {
  get params(): Swap__Params {
    return new Swap__Params(this);
  }
}

export class Swap__Params {
  _event: Swap;

  constructor(event: Swap) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get recipient(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get poolId(): Bytes {
    return this._event.parameters[2].value.toBytes();
  }

  get riskyForStable(): boolean {
    return this._event.parameters[3].value.toBoolean();
  }

  get deltaIn(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get deltaOut(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }
}

export class UpdateLastTimestamp extends ethereum.Event {
  get params(): UpdateLastTimestamp__Params {
    return new UpdateLastTimestamp__Params(this);
  }
}

export class UpdateLastTimestamp__Params {
  _event: UpdateLastTimestamp;

  constructor(event: UpdateLastTimestamp) {
    this._event = event;
  }

  get poolId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }
}

export class Withdraw extends ethereum.Event {
  get params(): Withdraw__Params {
    return new Withdraw__Params(this);
  }
}

export class Withdraw__Params {
  _event: Withdraw;

  constructor(event: Withdraw) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get recipient(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get delRisky(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get delStable(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class PrimitiveManager__calibrationsResult {
  value0: BigInt;
  value1: BigInt;
  value2: BigInt;
  value3: BigInt;
  value4: BigInt;

  constructor(
    value0: BigInt,
    value1: BigInt,
    value2: BigInt,
    value3: BigInt,
    value4: BigInt
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    map.set("value4", ethereum.Value.fromUnsignedBigInt(this.value4));
    return map;
  }
}

export class PrimitiveManager__createResult {
  value0: Bytes;
  value1: BigInt;
  value2: BigInt;

  constructor(value0: Bytes, value1: BigInt, value2: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromFixedBytes(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    return map;
  }
}

export class PrimitiveManager__marginsResult {
  value0: BigInt;
  value1: BigInt;

  constructor(value0: BigInt, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    return map;
  }
}

export class PrimitiveManager__removeResult {
  value0: BigInt;
  value1: BigInt;

  constructor(value0: BigInt, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    return map;
  }
}

export class PrimitiveManager__reservesResult {
  value0: BigInt;
  value1: BigInt;
  value2: BigInt;
  value3: BigInt;
  value4: BigInt;
  value5: BigInt;
  value6: BigInt;

  constructor(
    value0: BigInt,
    value1: BigInt,
    value2: BigInt,
    value3: BigInt,
    value4: BigInt,
    value5: BigInt,
    value6: BigInt
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
    this.value6 = value6;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    map.set("value4", ethereum.Value.fromUnsignedBigInt(this.value4));
    map.set("value5", ethereum.Value.fromUnsignedBigInt(this.value5));
    map.set("value6", ethereum.Value.fromUnsignedBigInt(this.value6));
    return map;
  }
}

export class PrimitiveManager extends ethereum.SmartContract {
  static bind(address: Address): PrimitiveManager {
    return new PrimitiveManager("PrimitiveManager", address);
  }

  BUFFER(): BigInt {
    let result = super.call("BUFFER", "BUFFER():(uint256)", []);

    return result[0].toBigInt();
  }

  try_BUFFER(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("BUFFER", "BUFFER():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  MIN_LIQUIDITY(): BigInt {
    let result = super.call("MIN_LIQUIDITY", "MIN_LIQUIDITY():(uint256)", []);

    return result[0].toBigInt();
  }

  try_MIN_LIQUIDITY(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "MIN_LIQUIDITY",
      "MIN_LIQUIDITY():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  PRECISION(): BigInt {
    let result = super.call("PRECISION", "PRECISION():(uint256)", []);

    return result[0].toBigInt();
  }

  try_PRECISION(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("PRECISION", "PRECISION():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  allocate(
    poolId: Bytes,
    recipient: Address,
    delRisky: BigInt,
    delStable: BigInt,
    fromMargin: boolean,
    data: Bytes
  ): BigInt {
    let result = super.call(
      "allocate",
      "allocate(bytes32,address,uint256,uint256,bool,bytes):(uint256)",
      [
        ethereum.Value.fromFixedBytes(poolId),
        ethereum.Value.fromAddress(recipient),
        ethereum.Value.fromUnsignedBigInt(delRisky),
        ethereum.Value.fromUnsignedBigInt(delStable),
        ethereum.Value.fromBoolean(fromMargin),
        ethereum.Value.fromBytes(data)
      ]
    );

    return result[0].toBigInt();
  }

  try_allocate(
    poolId: Bytes,
    recipient: Address,
    delRisky: BigInt,
    delStable: BigInt,
    fromMargin: boolean,
    data: Bytes
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "allocate",
      "allocate(bytes32,address,uint256,uint256,bool,bytes):(uint256)",
      [
        ethereum.Value.fromFixedBytes(poolId),
        ethereum.Value.fromAddress(recipient),
        ethereum.Value.fromUnsignedBigInt(delRisky),
        ethereum.Value.fromUnsignedBigInt(delStable),
        ethereum.Value.fromBoolean(fromMargin),
        ethereum.Value.fromBytes(data)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  calibrations(param0: Bytes): PrimitiveManager__calibrationsResult {
    let result = super.call(
      "calibrations",
      "calibrations(bytes32):(uint128,uint32,uint32,uint32,uint32)",
      [ethereum.Value.fromFixedBytes(param0)]
    );

    return new PrimitiveManager__calibrationsResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toBigInt(),
      result[3].toBigInt(),
      result[4].toBigInt()
    );
  }

  try_calibrations(
    param0: Bytes
  ): ethereum.CallResult<PrimitiveManager__calibrationsResult> {
    let result = super.tryCall(
      "calibrations",
      "calibrations(bytes32):(uint128,uint32,uint32,uint32,uint32)",
      [ethereum.Value.fromFixedBytes(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new PrimitiveManager__calibrationsResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toBigInt(),
        value[3].toBigInt(),
        value[4].toBigInt()
      )
    );
  }

  create(
    strike: BigInt,
    sigma: BigInt,
    maturity: BigInt,
    gamma: BigInt,
    riskyPerLp: BigInt,
    delLiquidity: BigInt,
    data: Bytes
  ): PrimitiveManager__createResult {
    let result = super.call(
      "create",
      "create(uint128,uint32,uint32,uint32,uint256,uint256,bytes):(bytes32,uint256,uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(strike),
        ethereum.Value.fromUnsignedBigInt(sigma),
        ethereum.Value.fromUnsignedBigInt(maturity),
        ethereum.Value.fromUnsignedBigInt(gamma),
        ethereum.Value.fromUnsignedBigInt(riskyPerLp),
        ethereum.Value.fromUnsignedBigInt(delLiquidity),
        ethereum.Value.fromBytes(data)
      ]
    );

    return new PrimitiveManager__createResult(
      result[0].toBytes(),
      result[1].toBigInt(),
      result[2].toBigInt()
    );
  }

  try_create(
    strike: BigInt,
    sigma: BigInt,
    maturity: BigInt,
    gamma: BigInt,
    riskyPerLp: BigInt,
    delLiquidity: BigInt,
    data: Bytes
  ): ethereum.CallResult<PrimitiveManager__createResult> {
    let result = super.tryCall(
      "create",
      "create(uint128,uint32,uint32,uint32,uint256,uint256,bytes):(bytes32,uint256,uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(strike),
        ethereum.Value.fromUnsignedBigInt(sigma),
        ethereum.Value.fromUnsignedBigInt(maturity),
        ethereum.Value.fromUnsignedBigInt(gamma),
        ethereum.Value.fromUnsignedBigInt(riskyPerLp),
        ethereum.Value.fromUnsignedBigInt(delLiquidity),
        ethereum.Value.fromBytes(data)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new PrimitiveManager__createResult(
        value[0].toBytes(),
        value[1].toBigInt(),
        value[2].toBigInt()
      )
    );
  }

  factory(): Address {
    let result = super.call("factory", "factory():(address)", []);

    return result[0].toAddress();
  }

  try_factory(): ethereum.CallResult<Address> {
    let result = super.tryCall("factory", "factory():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  invariantOf(poolId: Bytes): BigInt {
    let result = super.call("invariantOf", "invariantOf(bytes32):(int128)", [
      ethereum.Value.fromFixedBytes(poolId)
    ]);

    return result[0].toBigInt();
  }

  try_invariantOf(poolId: Bytes): ethereum.CallResult<BigInt> {
    let result = super.tryCall("invariantOf", "invariantOf(bytes32):(int128)", [
      ethereum.Value.fromFixedBytes(poolId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  liquidity(param0: Address, param1: Bytes): BigInt {
    let result = super.call(
      "liquidity",
      "liquidity(address,bytes32):(uint256)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromFixedBytes(param1)
      ]
    );

    return result[0].toBigInt();
  }

  try_liquidity(param0: Address, param1: Bytes): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "liquidity",
      "liquidity(address,bytes32):(uint256)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromFixedBytes(param1)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  margins(param0: Address): PrimitiveManager__marginsResult {
    let result = super.call("margins", "margins(address):(uint128,uint128)", [
      ethereum.Value.fromAddress(param0)
    ]);

    return new PrimitiveManager__marginsResult(
      result[0].toBigInt(),
      result[1].toBigInt()
    );
  }

  try_margins(
    param0: Address
  ): ethereum.CallResult<PrimitiveManager__marginsResult> {
    let result = super.tryCall(
      "margins",
      "margins(address):(uint128,uint128)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new PrimitiveManager__marginsResult(
        value[0].toBigInt(),
        value[1].toBigInt()
      )
    );
  }

  remove(poolId: Bytes, delLiquidity: BigInt): PrimitiveManager__removeResult {
    let result = super.call(
      "remove",
      "remove(bytes32,uint256):(uint256,uint256)",
      [
        ethereum.Value.fromFixedBytes(poolId),
        ethereum.Value.fromUnsignedBigInt(delLiquidity)
      ]
    );

    return new PrimitiveManager__removeResult(
      result[0].toBigInt(),
      result[1].toBigInt()
    );
  }

  try_remove(
    poolId: Bytes,
    delLiquidity: BigInt
  ): ethereum.CallResult<PrimitiveManager__removeResult> {
    let result = super.tryCall(
      "remove",
      "remove(bytes32,uint256):(uint256,uint256)",
      [
        ethereum.Value.fromFixedBytes(poolId),
        ethereum.Value.fromUnsignedBigInt(delLiquidity)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new PrimitiveManager__removeResult(
        value[0].toBigInt(),
        value[1].toBigInt()
      )
    );
  }

  reserves(param0: Bytes): PrimitiveManager__reservesResult {
    let result = super.call(
      "reserves",
      "reserves(bytes32):(uint128,uint128,uint128,uint32,uint256,uint256,uint256)",
      [ethereum.Value.fromFixedBytes(param0)]
    );

    return new PrimitiveManager__reservesResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toBigInt(),
      result[3].toBigInt(),
      result[4].toBigInt(),
      result[5].toBigInt(),
      result[6].toBigInt()
    );
  }

  try_reserves(
    param0: Bytes
  ): ethereum.CallResult<PrimitiveManager__reservesResult> {
    let result = super.tryCall(
      "reserves",
      "reserves(bytes32):(uint128,uint128,uint128,uint32,uint256,uint256,uint256)",
      [ethereum.Value.fromFixedBytes(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new PrimitiveManager__reservesResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toBigInt(),
        value[3].toBigInt(),
        value[4].toBigInt(),
        value[5].toBigInt(),
        value[6].toBigInt()
      )
    );
  }

  risky(): Address {
    let result = super.call("risky", "risky():(address)", []);

    return result[0].toAddress();
  }

  try_risky(): ethereum.CallResult<Address> {
    let result = super.tryCall("risky", "risky():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  scaleFactorRisky(): BigInt {
    let result = super.call(
      "scaleFactorRisky",
      "scaleFactorRisky():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_scaleFactorRisky(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "scaleFactorRisky",
      "scaleFactorRisky():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  scaleFactorStable(): BigInt {
    let result = super.call(
      "scaleFactorStable",
      "scaleFactorStable():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_scaleFactorStable(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "scaleFactorStable",
      "scaleFactorStable():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  stable(): Address {
    let result = super.call("stable", "stable():(address)", []);

    return result[0].toAddress();
  }

  try_stable(): ethereum.CallResult<Address> {
    let result = super.tryCall("stable", "stable():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  updateLastTimestamp(poolId: Bytes): BigInt {
    let result = super.call(
      "updateLastTimestamp",
      "updateLastTimestamp(bytes32):(uint32)",
      [ethereum.Value.fromFixedBytes(poolId)]
    );

    return result[0].toBigInt();
  }

  try_updateLastTimestamp(poolId: Bytes): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "updateLastTimestamp",
      "updateLastTimestamp(bytes32):(uint32)",
      [ethereum.Value.fromFixedBytes(poolId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class AllocateCall extends ethereum.Call {
  get inputs(): AllocateCall__Inputs {
    return new AllocateCall__Inputs(this);
  }

  get outputs(): AllocateCall__Outputs {
    return new AllocateCall__Outputs(this);
  }
}

export class AllocateCall__Inputs {
  _call: AllocateCall;

  constructor(call: AllocateCall) {
    this._call = call;
  }

  get poolId(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get recipient(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get delRisky(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get delStable(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get fromMargin(): boolean {
    return this._call.inputValues[4].value.toBoolean();
  }

  get data(): Bytes {
    return this._call.inputValues[5].value.toBytes();
  }
}

export class AllocateCall__Outputs {
  _call: AllocateCall;

  constructor(call: AllocateCall) {
    this._call = call;
  }

  get delLiquidity(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class CreateCall extends ethereum.Call {
  get inputs(): CreateCall__Inputs {
    return new CreateCall__Inputs(this);
  }

  get outputs(): CreateCall__Outputs {
    return new CreateCall__Outputs(this);
  }
}

export class CreateCall__Inputs {
  _call: CreateCall;

  constructor(call: CreateCall) {
    this._call = call;
  }

  get strike(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get sigma(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get maturity(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get gamma(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get riskyPerLp(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }

  get delLiquidity(): BigInt {
    return this._call.inputValues[5].value.toBigInt();
  }

  get data(): Bytes {
    return this._call.inputValues[6].value.toBytes();
  }
}

export class CreateCall__Outputs {
  _call: CreateCall;

  constructor(call: CreateCall) {
    this._call = call;
  }

  get poolId(): Bytes {
    return this._call.outputValues[0].value.toBytes();
  }

  get delRisky(): BigInt {
    return this._call.outputValues[1].value.toBigInt();
  }

  get delStable(): BigInt {
    return this._call.outputValues[2].value.toBigInt();
  }
}

export class DepositCall extends ethereum.Call {
  get inputs(): DepositCall__Inputs {
    return new DepositCall__Inputs(this);
  }

  get outputs(): DepositCall__Outputs {
    return new DepositCall__Outputs(this);
  }
}

export class DepositCall__Inputs {
  _call: DepositCall;

  constructor(call: DepositCall) {
    this._call = call;
  }

  get recipient(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get delRisky(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get delStable(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get data(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }
}

export class DepositCall__Outputs {
  _call: DepositCall;

  constructor(call: DepositCall) {
    this._call = call;
  }
}

export class RemoveCall extends ethereum.Call {
  get inputs(): RemoveCall__Inputs {
    return new RemoveCall__Inputs(this);
  }

  get outputs(): RemoveCall__Outputs {
    return new RemoveCall__Outputs(this);
  }
}

export class RemoveCall__Inputs {
  _call: RemoveCall;

  constructor(call: RemoveCall) {
    this._call = call;
  }

  get poolId(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get delLiquidity(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class RemoveCall__Outputs {
  _call: RemoveCall;

  constructor(call: RemoveCall) {
    this._call = call;
  }

  get delRisky(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }

  get delStable(): BigInt {
    return this._call.outputValues[1].value.toBigInt();
  }
}

export class SwapCall extends ethereum.Call {
  get inputs(): SwapCall__Inputs {
    return new SwapCall__Inputs(this);
  }

  get outputs(): SwapCall__Outputs {
    return new SwapCall__Outputs(this);
  }
}

export class SwapCall__Inputs {
  _call: SwapCall;

  constructor(call: SwapCall) {
    this._call = call;
  }

  get recipient(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get poolId(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }

  get riskyForStable(): boolean {
    return this._call.inputValues[2].value.toBoolean();
  }

  get deltaIn(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get deltaOut(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }

  get fromMargin(): boolean {
    return this._call.inputValues[5].value.toBoolean();
  }

  get toMargin(): boolean {
    return this._call.inputValues[6].value.toBoolean();
  }

  get data(): Bytes {
    return this._call.inputValues[7].value.toBytes();
  }
}

export class SwapCall__Outputs {
  _call: SwapCall;

  constructor(call: SwapCall) {
    this._call = call;
  }
}

export class UpdateLastTimestampCall extends ethereum.Call {
  get inputs(): UpdateLastTimestampCall__Inputs {
    return new UpdateLastTimestampCall__Inputs(this);
  }

  get outputs(): UpdateLastTimestampCall__Outputs {
    return new UpdateLastTimestampCall__Outputs(this);
  }
}

export class UpdateLastTimestampCall__Inputs {
  _call: UpdateLastTimestampCall;

  constructor(call: UpdateLastTimestampCall) {
    this._call = call;
  }

  get poolId(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }
}

export class UpdateLastTimestampCall__Outputs {
  _call: UpdateLastTimestampCall;

  constructor(call: UpdateLastTimestampCall) {
    this._call = call;
  }

  get lastTimestamp(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class WithdrawCall extends ethereum.Call {
  get inputs(): WithdrawCall__Inputs {
    return new WithdrawCall__Inputs(this);
  }

  get outputs(): WithdrawCall__Outputs {
    return new WithdrawCall__Outputs(this);
  }
}

export class WithdrawCall__Inputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }

  get recipient(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get delRisky(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get delStable(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class WithdrawCall__Outputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }
}
