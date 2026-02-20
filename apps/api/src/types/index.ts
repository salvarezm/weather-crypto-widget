import { CryptoResponse, WeatherApiResponse } from '../schemas/schema';

export type { CryptoResponse, WeatherApiResponse };

export interface WeatherService {
  getWeather(city?: string): Promise<WeatherApiResponse | null>;
}

export interface CryptoService {
  getBtcData(): Promise<CryptoResponse | null>;
}

declare module 'fastify' {
  interface FastifyInstance {
    weatherService: WeatherService;
    cryptoService: CryptoService;
  }
}
