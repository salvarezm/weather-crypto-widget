export interface WeatherService {
  getWeather(): Promise<WeatherApiResponse>;
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

declare module 'fastify' {
  interface FastifyInstance {
    weatherService: WeatherService;
  }
}
