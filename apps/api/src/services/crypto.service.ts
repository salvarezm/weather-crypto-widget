import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { CoinGeckoResponse } from '../types';

const COINGECKO_API_URL =
  'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=clp&include_24hr_change=true&include_last_updated_at=true';

// la api de clima no es estable
axiosRetry(axios, {
  retryDelay: (retryCount) => {
    return retryCount * 1000;
  },
});

async function cryptoService(fastify: FastifyInstance) {
  fastify.decorate('cryptoService', {
    async getBtcData(): Promise<CoinGeckoResponse | null> {
      // llamamos a la api del clima
      const res = await axios.get(COINGECKO_API_URL, {
        timeout: 5000,
      });

      return res.data as CoinGeckoResponse;
    },
  });
}

export default fp(cryptoService);
