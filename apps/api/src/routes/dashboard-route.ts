import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

interface DashboardOptions {}

const registerDashboardRoute = async (app: FastifyInstance, options: DashboardOptions) => {
  app.get('/api/dashboard-widget', async (request: FastifyRequest, reply: FastifyReply) => {
    reply.status(200).send({
      hello: 'world',
    });
  });
};

export default registerDashboardRoute;
