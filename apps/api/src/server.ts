import Fastify from 'fastify';
import DashboardRoute from './routes/dashboard-route';
import WeatherService from './services/weather.service';

const fastify = Fastify({
  logger: true,
});

fastify.register(WeatherService);
fastify.register(DashboardRoute);

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
