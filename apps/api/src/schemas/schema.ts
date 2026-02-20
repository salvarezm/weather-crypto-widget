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
