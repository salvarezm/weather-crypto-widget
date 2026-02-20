import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import axios from 'axios';
import { CryptoResponse, CryptoResponseSchema } from '../schemas/schema';

const COINGECKO_API_URL =
  'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true&include_last_updated_at=true';

async function cryptoService(fastify: FastifyInstance) {
  fastify.decorate('cryptoService', {
    async getBtcData(): Promise<CryptoResponse | null> {
      try {
        const res = await axios.get(COINGECKO_API_URL);

        const parsed = CryptoResponseSchema.safeParse(res.data);

        if (!parsed.success) {
          fastify.log.error({ error: parsed.error }, 'Invalid Coingecko response');
          return null;
        }

        return parsed.data;
      } catch (err) {
        fastify.log.error(err, 'Ocurrio un error insperado en CryptoService');
        return null;
      }
    },
  });
}

export default fp(cryptoService);
