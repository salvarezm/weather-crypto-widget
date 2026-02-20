import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import axios from 'axios';
import { WeatherApiResponse, WeatherApiResponseSchema } from '../schemas/schema';
import { config } from 'dotenv';

config();

async function weatherService(fastify: FastifyInstance) {
  fastify.decorate('weatherService', {
    async getWeather(city: string = 'Santiago'): Promise<WeatherApiResponse | null> {
      // validamos que exista la api key
      const WEATHERAPI_KEY = process.env.WEATHERAPI_KEY;
      if (!WEATHERAPI_KEY) {
        fastify.log.error('La api key WEATHERAPI_KEY no esta definida');
        return null;
      }

      try {
        const res = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${WEATHERAPI_KEY}&q=${encodeURIComponent(city)}`
        );

        const parsed = WeatherApiResponseSchema.safeParse(res.data);

        if (!parsed.success) {
          fastify.log.error({ error: parsed.error }, 'Invalid WeatherAPI response');
          return null;
        }

        return parsed.data;
      } catch (err) {
        fastify.log.error(err, 'Error inesperado en WeatherService');
        return null;
      }
    },
  });
}

export default fp(weatherService);
