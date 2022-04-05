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

export class DeployEngine extends ethereum.Event {
  get params(): DeployEngine__Params {
    return new DeployEngine__Params(this);
  }
}

export class DeployEngine__Params {
  _event: DeployEngine;

  constructor(event: DeployEngine) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get risky(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get stable(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get engine(): Address {
    return this._event.parameters[3].value.toAddress();
  }
}

export class PrimitiveFactory__argsResult {
  value0: Address;
  value1: Address;
  value2: Address;
  value3: BigInt;
  value4: BigInt;
  value5: BigInt;

  constructor(
    value0: Address,
    value1: Address,
    value2: Address,
    value3: BigInt,
    value4: BigInt,
    value5: BigInt
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddress(this.value0));
    map.set("value1", ethereum.Value.fromAddress(this.value1));
    map.set("value2", ethereum.Value.fromAddress(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    map.set("value4", ethereum.Value.fromUnsignedBigInt(this.value4));
    map.set("value5", ethereum.Value.fromUnsignedBigInt(this.value5));
    return map;
  }
}

export class PrimitiveFactory extends ethereum.SmartContract {
  static bind(address: Address): PrimitiveFactory {
    return new PrimitiveFactory("PrimitiveFactory", address);
  }

  MIN_LIQUIDITY_FACTOR(): BigInt {
    let result = super.call(
      "MIN_LIQUIDITY_FACTOR",
      "MIN_LIQUIDITY_FACTOR():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_MIN_LIQUIDITY_FACTOR(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "MIN_LIQUIDITY_FACTOR",
      "MIN_LIQUIDITY_FACTOR():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  args(): PrimitiveFactory__argsResult {
    let result = super.call(
      "args",
      "args():(address,address,address,uint256,uint256,uint256)",
      []
    );

    return new PrimitiveFactory__argsResult(
      result[0].toAddress(),
      result[1].toAddress(),
      result[2].toAddress(),
      result[3].toBigInt(),
      result[4].toBigInt(),
      result[5].toBigInt()
    );
  }

  try_args(): ethereum.CallResult<PrimitiveFactory__argsResult> {
    let result = super.tryCall(
      "args",
      "args():(address,address,address,uint256,uint256,uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new PrimitiveFactory__argsResult(
        value[0].toAddress(),
        value[1].toAddress(),
        value[2].toAddress(),
        value[3].toBigInt(),
        value[4].toBigInt(),
        value[5].toBigInt()
      )
    );
  }

  deploy(risky: Address, stable: Address): Address {
    let result = super.call("deploy", "deploy(address,address):(address)", [
      ethereum.Value.fromAddress(risky),
      ethereum.Value.fromAddress(stable)
    ]);

    return result[0].toAddress();
  }

  try_deploy(risky: Address, stable: Address): ethereum.CallResult<Address> {
    let result = super.tryCall("deploy", "deploy(address,address):(address)", [
      ethereum.Value.fromAddress(risky),
      ethereum.Value.fromAddress(stable)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  deployer(): Address {
    let result = super.call("deployer", "deployer():(address)", []);

    return result[0].toAddress();
  }

  try_deployer(): ethereum.CallResult<Address> {
    let result = super.tryCall("deployer", "deployer():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getEngine(param0: Address, param1: Address): Address {
    let result = super.call(
      "getEngine",
      "getEngine(address,address):(address)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromAddress(param1)]
    );

    return result[0].toAddress();
  }

  try_getEngine(
    param0: Address,
    param1: Address
  ): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getEngine",
      "getEngine(address,address):(address)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromAddress(param1)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
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

export class DeployCall extends ethereum.Call {
  get inputs(): DeployCall__Inputs {
    return new DeployCall__Inputs(this);
  }

  get outputs(): DeployCall__Outputs {
    return new DeployCall__Outputs(this);
  }
}

export class DeployCall__Inputs {
  _call: DeployCall;

  constructor(call: DeployCall) {
    this._call = call;
  }

  get risky(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get stable(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class DeployCall__Outputs {
  _call: DeployCall;

  constructor(call: DeployCall) {
    this._call = call;
  }

  get engine(): Address {
    return this._call.outputValues[0].value.toAddress();
  }
}
