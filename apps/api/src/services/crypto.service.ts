import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { CryptoResponse, CryptoResponseSchema } from '../schemas/schema';

const COINGECKO_API_URL =
  'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true&include_last_updated_at=true';

axiosRetry(axios, {
  retries: 3,
  retryDelay: (retryCount) => {
    return retryCount * 1000;
  },
});

async function cryptoService(fastify: FastifyInstance) {
  fastify.decorate('cryptoService', {
    async getBtcData(): Promise<CryptoResponse | null> {
      const res = await axios.get(COINGECKO_API_URL);

      const parsed = CryptoResponseSchema.safeParse(res.data);

      if (!parsed.success) {
        fastify.log.error({ error: parsed.error }, 'Invalid Coingecko response');
        return null;
      }

      return parsed.data;
    },
  });
}

export default fp(cryptoService);
