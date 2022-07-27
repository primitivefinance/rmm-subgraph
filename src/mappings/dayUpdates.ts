import { Address, BigDecimal, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { Pool, PoolDayData, PoolHourData } from "../types/schema";

export const ZERO_BI = BigInt.fromI32(0);
export const ZERO_BD = BigInt.fromI32(0).toBigDecimal();

export const ONE_BI = BigInt.fromI32(1);

export function updatePoolDayData(
  event: ethereum.Event,
  pool: Pool
): PoolDayData | null {
  let timestamp = event.block.timestamp.toI32();
  let dayID = timestamp / 86400;
  let dayStartTimestamp = dayID * 86400;
  let dayPairID = pool.id
    .toString()
    .concat("-")
    .concat(BigInt.fromI32(dayID).toString());
  let poolDayData = PoolDayData.load(dayPairID);
  if (pool) {
    if (poolDayData === null) {
      poolDayData = new PoolDayData(dayPairID);
      poolDayData.date = dayStartTimestamp;
      poolDayData.underlyingToken = pool.underlyingToken;
      poolDayData.quoteToken = pool.quoteToken;
      poolDayData.pool = pool.id;
      poolDayData.dailyVolumeUnderlying = ZERO_BD;
      poolDayData.dailyVolumeQuote = ZERO_BD;
      poolDayData.dailyTxns = ZERO_BI;
    }

    poolDayData.liquidity = pool.liquidity;
    poolDayData.reserveUnderlying = pool.reserveUnderlying;
    poolDayData.reserveQuote = pool.reserveQuote;
    poolDayData.dailyTxns = poolDayData.dailyTxns.plus(ONE_BI);
    poolDayData.save();
    return poolDayData;
  }

  return null;
}

export function updatePoolHourData(
  event: ethereum.Event,
  pool: Pool
): PoolHourData | null {
  let timestamp = event.block.timestamp.toI32();
  let dayID = timestamp / 86400;
  let dayStartTimestamp = dayID * 86400;
  let hourStartTimestamp = (timestamp % 86400) / 3600;
  let hourPairId = pool.id
    .concat("-")
    .concat(BigInt.fromI32(dayID).toString())
    .concat("-")
    .concat(BigInt.fromI64(hourStartTimestamp).toString());
  let poolHourData = PoolHourData.load(hourPairId);
  if (pool) {
    if (poolHourData === null) {
      poolHourData = new PoolHourData(hourPairId);
      poolHourData.date = dayStartTimestamp;
      poolHourData.underlyingToken = pool.underlyingToken;
      poolHourData.quoteToken = pool.quoteToken;
      poolHourData.pool = pool.id;
      poolHourData.hourlyVolumeUnderlying = ZERO_BD;
      poolHourData.hourlyVolumeQuote = ZERO_BD;
      poolHourData.hourlyTxns = ZERO_BI;
    }

    poolHourData.liquidity = pool.liquidity;
    poolHourData.reserveUnderlying = pool.reserveUnderlying;
    poolHourData.reserveQuote = pool.reserveQuote;
    poolHourData.hourlyTxns = poolHourData.hourlyTxns.plus(ONE_BI);
    poolHourData.save();
    return poolHourData;
  }

  return null;
}
