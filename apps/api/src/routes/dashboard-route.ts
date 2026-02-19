import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { CoinGeckoResponse, WeatherApiResponse } from '../types';

const registerDashboardRoute = async (app: FastifyInstance) => {
  app.get('/api/dashboard-widget', async (request: FastifyRequest, reply: FastifyReply) => {
    const [weatherResult, cryptoResult] = await Promise.allSettled([
      app.weatherService.getWeather(),
      app.cryptoService.getBtcData(),
    ]);

    let weather: WeatherApiResponse | null = null;
    let bitcoin: CoinGeckoResponse | null = null;

    if (weatherResult.status === 'fulfilled') {
      weather = weatherResult.value;
    }

    if (cryptoResult.status === 'fulfilled') {
      bitcoin = cryptoResult.value;
    }

    reply.status(200).send({
      wheaterData: weather,
      cryptoData: bitcoin,
    });
  });
};

export default registerDashboardRoute;
