import { z } from 'zod';

// Zod schemas para validación runtime
export const CryptoResponseSchema = z.object({
  bitcoin: z.object({
    usd: z.number(),
    usd_24h_change: z.number(),
    last_updated_at: z.number(),
  }),
});

export type CryptoResponse = z.infer<typeof CryptoResponseSchema>;

export const WeatherApiResponseSchema = z.object({
  location: z.object({
    name: z.string(),
    country: z.string(),
  }),
  current: z.object({
    temp_c: z.number(),
    feelslike_c: z.number(),
    humidity: z.number(),
    wind_kph: z.number(),
    condition: z.object({
      text: z.string(),
      icon: z.string(),
    }),
  }),
});

export type WeatherApiResponse = z.infer<typeof WeatherApiResponseSchema>;

// Fastify JSON schemas
export const dashboardQuerySchema = {
  type: 'object',
  properties: {
    city: { type: 'string' },
  },
} as const;

export const dashboardResponseSchema = {
  type: 'object',
  properties: {
    weather: {
      type: ['object', 'null'],
      properties: {
        location: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            country: { type: 'string' },
          },
        },
        current: {
          type: 'object',
          properties: {
            temp_c: { type: 'number' },
            feelslike_c: { type: 'number' },
            humidity: { type: 'number' },
            wind_kph: { type: 'number' },
            condition: {
              type: 'object',
              properties: {
                text: { type: 'string' },
                icon: { type: 'string' },
              },
            },
          },
        },
      },
    },
    crypto: {
      type: ['object', 'null'],
      properties: {
        bitcoin: {
          type: ['object', 'null'],
          properties: {
            usd: { type: 'number' },
            usd_24h_change: { type: 'number' },
            last_updated_at: { type: 'number' },
          },
        },
      },
    },
  },
  required: ['weather', 'crypto'],
} as const;
