import { describe, it, expect, vi, beforeEach } from 'vitest';
import Fastify, { FastifyInstance } from 'fastify';
import WeatherService from './weather.service';

vi.mock('axios', () => ({
  default: { get: vi.fn() },
}));
vi.mock('axios-retry', () => ({ default: vi.fn() }));

import axios from 'axios';

const weatherData = {
  location: { name: 'Santiago', country: 'Chile' },
  current: {
    temp_c: 22.5,
    feelslike_c: 21,
    humidity: 58,
    wind_kph: 12,
    condition: { text: 'Sunny', icon: '//cdn.weatherapi.com/sunny.png' },
  },
};

describe('WeatherService', () => {
  let app: FastifyInstance;

  beforeEach(async () => {
    vi.clearAllMocks();
    process.env.WEATHERAPI_KEY = 'test-key';
    app = Fastify({ logger: false });
    await app.register(WeatherService);
  });

  it('obtiene clima', async () => {
    vi.mocked(axios.get).mockResolvedValueOnce({ data: weatherData });

    const result = await app.weatherService.getWeather('Santiago');
    expect(result).toEqual(weatherData);
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('q=Santiago'));
  });

  it('retorna null si no hay api key', async () => {
    delete process.env.WEATHERAPI_KEY;
    const appSinKey = Fastify({ logger: false });
    await appSinKey.register(WeatherService);

    const result = await appSinKey.weatherService.getWeather('Santiago');
    expect(result).toBeNull();
    expect(axios.get).not.toHaveBeenCalled();
  });

  it('usa Santiago por defecto', async () => {
    vi.mocked(axios.get).mockResolvedValueOnce({ data: weatherData });

    await app.weatherService.getWeather();
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('q=Santiago'));
  });
});
