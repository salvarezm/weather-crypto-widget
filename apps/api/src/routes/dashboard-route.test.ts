import { describe, it, expect, vi, beforeEach } from 'vitest';
import Fastify, { FastifyInstance } from 'fastify';
import DashboardRoute from './dashboard-route';
import WeatherService from '../services/weather.service';
import CryptoService from '../services/crypto.service';

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

const cryptoData = {
  bitcoin: {
    usd: 43521.87,
    usd_24h_change: -1.23,
    last_updated_at: 1700000000,
  },
};

async function buildApp(): Promise<FastifyInstance> {
  process.env.WEATHERAPI_KEY = 'test-key';
  const app = Fastify({ logger: false });
  await app.register(WeatherService);
  await app.register(CryptoService);
  await app.register(DashboardRoute);
  app.addHook('onSend', async (_request, reply) => {
    reply.header('cache-control', 'public, max-age=300');
  });
  return app;
}

describe('GET /api/dashboard-widget', () => {
  let app: FastifyInstance;

  beforeEach(async () => {
    vi.clearAllMocks();
    app = await buildApp();
  });

  it('debe retornar weather y crypto', async () => {
    vi.mocked(axios.get)
      .mockResolvedValueOnce({ data: weatherData })
      .mockResolvedValueOnce({ data: cryptoData });

    const res = await app.inject({
      method: 'GET',
      url: '/api/dashboard-widget',
    });

    const body = JSON.parse(res.body);
    expect(res.statusCode).toBe(200);
    expect(body.weather).toEqual(weatherData);
    expect(body.crypto).toEqual(cryptoData);
  });

  it('retorna crypto aunque falle weather', async () => {
    vi.mocked(axios.get)
      .mockRejectedValueOnce(new Error('timeout'))
      .mockResolvedValueOnce({ data: cryptoData });

    const res = await app.inject({ method: 'GET', url: '/api/dashboard-widget' });

    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.body);
    expect(body.weather).toBeNull();
    expect(body.crypto).toEqual(cryptoData);
  });

  it('retorna weather aunque falle crypto', async () => {
    vi.mocked(axios.get)
      .mockResolvedValueOnce({ data: weatherData })
      .mockRejectedValueOnce(new Error('network error'));

    const res = await app.inject({ method: 'GET', url: '/api/dashboard-widget' });
    const body = JSON.parse(res.body);

    expect(res.statusCode).toBe(200);
    expect(body.weather).toEqual(weatherData);
    expect(body.crypto).toBeNull();
  });

  it('cache-control header', async () => {
    vi.mocked(axios.get)
      .mockResolvedValueOnce({ data: weatherData })
      .mockResolvedValueOnce({ data: cryptoData });

    const res = await app.inject({ method: 'GET', url: '/api/dashboard-widget' });

    expect(res.headers['cache-control']).toBe('public, max-age=300');
  });
});
