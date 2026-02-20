import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { CoinGeckoResponse } from '../types';

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
    async getBtcData(): Promise<CoinGeckoResponse | null> {
      const res = await axios.get(COINGECKO_API_URL, {
        timeout: 5000,
      });

      return res.data as CoinGeckoResponse;
    },
  });
}

export default fp(cryptoService);
