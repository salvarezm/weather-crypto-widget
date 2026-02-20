import { describe, it, expect, vi, beforeEach } from 'vitest';
import Fastify, { FastifyInstance } from 'fastify';
import CryptoService from './crypto.service';

vi.mock('axios', () => ({
  default: { get: vi.fn() },
}));
vi.mock('axios-retry', () => ({ default: vi.fn() }));

import axios from 'axios';

const btcData = {
  bitcoin: {
    usd: 43521.87,
    usd_24h_change: -1.23,
    last_updated_at: 1700000000,
  },
};

describe('CryptoService', () => {
  let app: FastifyInstance;

  beforeEach(async () => {
    vi.clearAllMocks();
    app = Fastify({ logger: false });
    await app.register(CryptoService);
  });

  it('obtiene precio de BTC', async () => {
    vi.mocked(axios.get).mockResolvedValueOnce({ data: btcData });

    const result = await app.cryptoService.getBtcData();
    expect(result).toEqual(btcData);
  });

  it('retorna null si falla la API', async () => {
    vi.mocked(axios.get).mockRejectedValueOnce(new Error('timeout'));

    const result = await app.cryptoService.getBtcData();
    expect(result).toBeNull();
  });
});
