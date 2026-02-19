import Fastify from 'fastify';
import DashboardRoute from './routes/dashboard-route';
import WeatherService from './services/weather.service';
import CryptoService from './services/crypto.service';

const fastify = Fastify({
  logger: true,
});

fastify.register(WeatherService);
fastify.register(CryptoService);
fastify.register(DashboardRoute);

fastify.listen({ port: 3001 }, function (err) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
