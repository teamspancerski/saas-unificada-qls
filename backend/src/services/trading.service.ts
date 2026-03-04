import { scanMarket } from "../trading-engine/qlc-engine"

export async function getBestTrade() {
  const bestTrade = await scanMarket()
  return bestTrade
}
