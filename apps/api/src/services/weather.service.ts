import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { WeatherApiResponse, WeatherApiResponseSchema } from '../schemas/schema';
import { config } from 'dotenv';

config();

// la api de clima no es estable
axiosRetry(axios, {
  retries: 3,
  retryDelay: (retryCount) => {
    return retryCount * 1000;
  },
});

async function weatherService(fastify: FastifyInstance) {
  fastify.decorate('weatherService', {
    async getWeather(city: string = 'Santiago'): Promise<WeatherApiResponse | null> {
      // validamos que exista la api key
      const WEATHERAPI_KEY = process.env.WEATHERAPI_KEY;
      if (!WEATHERAPI_KEY) {
        fastify.log.error('La api key WEATHERAPI_KEY no esta definida');
        return null;
      }

      // llamamos a la api del clima
      const res = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${WEATHERAPI_KEY}&q=${city}`
      );

      const parsed = WeatherApiResponseSchema.safeParse(res.data);

      if (!parsed.success) {
        fastify.log.error({ error: parsed.error }, 'Invalid WeatherAPI response');
        return null;
      }

      return parsed.data;
    },
  });
}

export default fp(weatherService);
