export interface WeatherService {
  getWeather(city: string): Promise<WeatherApiResponse | null>;
}

export interface CryptoService {
  getBtcData(): Promise<CoinGeckoResponse | null>;
}

export interface WeatherApiResponse {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    feelslike_c: number;
    humidity: number;
    wind_kph: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}

export interface CoinGeckoResponse {
  bitcoin: {
    usd: number;
    usd_24h_change: number;
    last_updated_at: number;
  };
}

declare module 'fastify' {
  interface FastifyInstance {
    weatherService: WeatherService;
    cryptoService: CryptoService;
  }
}
