import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { CoinGeckoResponse, WeatherApiResponse } from '../types';
import { dashboardQuerySchema, dashboardResponseSchema } from '../schemas/schema';

const registerDashboardRoute = async (app: FastifyInstance) => {
  app.get(
    '/api/dashboard-widget',
    {
      schema: {
        querystring: dashboardQuerySchema,
        response: {
          200: dashboardResponseSchema,
        },
      },
    },
    async (request: FastifyRequest<{ Querystring: { city: string } }>, reply: FastifyReply) => {
      const city = request.query.city ?? 'Santiago';

      const [weatherResult, cryptoResult] = await Promise.allSettled([
        app.weatherService.getWeather(city),
        app.cryptoService.getBtcData(),
      ]);

      let weather: WeatherApiResponse | null = null;
      let crypto: CoinGeckoResponse | null = null;

      if (weatherResult.status === 'fulfilled') {
        weather = weatherResult.value;
      }

      if (cryptoResult.status === 'fulfilled') {
        crypto = cryptoResult.value;
      }

      reply.status(200).send({
        weather,
        crypto,
      });
    }
  );
};

export default registerDashboardRoute;
