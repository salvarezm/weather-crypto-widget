import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

interface DashboardOptions {}

const registerDashboardRoute = async (app: FastifyInstance, options: DashboardOptions) => {
  app.get('/api/dashboard-widget', async (request: FastifyRequest, reply: FastifyReply) => {
    const clima = await app.weatherService.getWeather();

    reply.status(200).send({
      hello: 'world',
      clima,
    });
  });
};

export default registerDashboardRoute;
