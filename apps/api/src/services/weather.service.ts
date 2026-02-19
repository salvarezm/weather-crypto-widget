import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { WeatherApiResponse } from '../types';
import { config } from 'dotenv';

config();

// la api de clima no es estable
axiosRetry(axios, {
  retryDelay: (retryCount) => {
    return retryCount * 1000;
  },
});

async function weatherService(fastify: FastifyInstance) {
  fastify.decorate('weatherService', {
    async getWeather(): Promise<WeatherApiResponse | null> {
      // validamos que exista la api key
      const WEATHERAPI_KEY = process.env.WEATHERAPI_KEY;
      if (!WEATHERAPI_KEY) {
        fastify.log.error('La api key WEATHERAPI_KEY no esta definida');
        return null;
      }

      // llamamos a la api del clima
      const res = await axios.post(
        `http://api.weatherapi.com/v1/current.json?key=${WEATHERAPI_KEY}&q=Santiago`,
        {},
        {
          timeout: 5000,
        }
      );

      return res.data as WeatherApiResponse;
    },
  });
}

export default fp(weatherService);
