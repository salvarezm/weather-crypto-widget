import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const registerDashboardRoute = async (app: FastifyInstance) => {
  app.get('/api/dashboard-widget', async (request: FastifyRequest, reply: FastifyReply) => {
    const [wheaterResult, cryptoResult] = await Promise.allSettled([
      app.weatherService.getWeather(),
      app.cryptoService.getBtcData(),
    ]);

    reply.status(200).send({
      wheaterResult,
      cryptoResult,
    });
  });
};

export default registerDashboardRoute;
