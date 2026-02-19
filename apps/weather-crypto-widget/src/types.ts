export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
}

export interface CryptoData {
  bitcoin: {
    clp: number;
    clp_24h_change: number;
    last_updated_at: string;
  };
}

export interface ApiError {
  source: 'weather' | 'bitcoin';
  message: string;
  status?: number;
}

export interface DashboardData {
  wheaterData: WeatherData | null;
  cryptoData: CryptoData | null;
  timestamp: string;
  errors?: ApiError[];
}
