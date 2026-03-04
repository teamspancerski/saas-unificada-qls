import { FastifyInstance } from "fastify"
import { getBestTrade } from "../services/trading.service"

export async function tradeRoutes(fastify: FastifyInstance) {
  fastify.get("/scan", async (request, reply) => {
    const result = await getBestTrade()
    return result
  })
}
