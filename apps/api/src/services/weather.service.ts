import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import axios from 'axios';
import { WeatherApiResponse } from '../types';

interface weatherServiceProps {}

async function weatherService(fastify: FastifyInstance, opts: weatherServiceProps) {
  fastify.decorate('weatherService', {
    async getWeather(): Promise<WeatherApiResponse> {
      // llamamos a la api del clima
      const res = await axios.post(
        'http://api.weatherapi.com/v1/current.json?key=c668075047844d1d8f625316261902&q=Santiago&aqi=no',
        {},
        {
          timeout: 5000,
        }
      );

      if (res.status !== 200) {
      }

      return res.data as WeatherApiResponse;
    },
  });
}

export default fp(weatherService);
