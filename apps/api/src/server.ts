import Fastify from 'fastify';
import cors from '@fastify/cors';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import DashboardRoute from './routes/dashboard-route';
import WeatherService from './services/weather.service';
import CryptoService from './services/crypto.service';
import { MAX_AGE_IN_SECONDS } from './config/constants';

const fastify = Fastify({
  logger: true,
});

axiosRetry(axios, {
  retries: 3,
  retryDelay: (retryCount) => {
    return retryCount * 1000;
  },
});

fastify.register(cors, {
  origin: true,
  methods: ['GET', 'OPTIONS'],
});

fastify.addHook('onSend', async (_request, reply) => {
  reply.header('cache-control', `public, max-age=${MAX_AGE_IN_SECONDS}`);
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
