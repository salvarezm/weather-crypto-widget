export interface WeatherData {
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

export interface CryptoData {
  bitcoin: {
    usd: number;
    usd_24h_change: number;
    last_updated_at: string;
  };
}

export interface DashboardData {
  weather: WeatherData | null;
  crypto: CryptoData | null;
}
