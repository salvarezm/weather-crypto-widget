import Fastify from 'fastify';
import DashboardRoute from './routes/dashboard-route';

const fastify = Fastify({
  logger: true,
});

fastify.register(DashboardRoute);

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
