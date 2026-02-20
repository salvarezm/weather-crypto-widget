import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './weather-crypto-widget';
import type { WeatherCryptoWidget } from './weather-crypto-widget';

const mockDashboardData = {
  weather: {
    location: { name: 'Santiago', country: 'Chile' },
    current: {
      temp_c: 25,
      feelslike_c: 27,
      humidity: 60,
      condition: { text: 'Soleado', icon: 'https://cdn.weather.com/sunny.png' },
    },
  },
  crypto: {
    bitcoin: { usd: 45000, usd_24h_change: 2.5 },
  },
};

function mockFetchSuccess(data: unknown = mockDashboardData) {
  return () => Promise.resolve(new Response(JSON.stringify(data)));
}

describe('WeatherCryptoWidget', () => {
  let fetchSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    fetchSpy = vi.spyOn(globalThis, 'fetch');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('render del componente', async () => {
    fetchSpy.mockImplementation(() => Promise.resolve(new Response(JSON.stringify({}))));

    const el = await fixture<WeatherCryptoWidget>(
      html`<weather-crypto-widget></weather-crypto-widget>`
    );

    expect(el).toBeDefined();
    expect(el.tagName.toLowerCase()).toBe('weather-crypto-widget');
  });

  it('muestra spinner mientras carga', async () => {
    fetchSpy.mockImplementation(
      () => new Promise(() => {}) // loading infinito
    );

    const el = await fixture<WeatherCryptoWidget>(
      html`<weather-crypto-widget></weather-crypto-widget>`
    );

    const spinner = el.shadowRoot?.querySelector('.spinner');
    const loadingText = el.shadowRoot?.querySelector('.loading-text');

    expect(spinner).not.toBeNull();
    expect(loadingText?.textContent).toContain('Cargando');
  });

  it('usa la prop city en la URL del fetch', async () => {
    fetchSpy.mockImplementation(() => Promise.resolve(new Response(JSON.stringify({}))));

    await fixture<WeatherCryptoWidget>(
      html`<weather-crypto-widget city="Valparaiso"></weather-crypto-widget>`
    );

    expect(fetchSpy).toHaveBeenCalledWith(expect.stringContaining('city=Valparaiso'));
  });

  it('muestra datos cuando el fetch es exitoso', async () => {
    fetchSpy.mockImplementation(mockFetchSuccess());

    const el = await fixture<WeatherCryptoWidget>(
      html`<weather-crypto-widget></weather-crypto-widget>`
    );
    await el.updateComplete;

    const weatherSection = el.shadowRoot?.querySelector('.weather-section');
    const bitcoinSection = el.shadowRoot?.querySelector('.bitcoin-section');

    expect(weatherSection?.textContent).toContain('Santiago');
    expect(weatherSection?.textContent).toContain('25');
    expect(bitcoinSection?.textContent).toContain('45,000');
  });

  it('muestra error cuando el fetch falla', async () => {
    fetchSpy.mockImplementation(() => Promise.reject(new Error('Network error')));

    const el = await fixture<WeatherCryptoWidget>(
      html`<weather-crypto-widget></weather-crypto-widget>`
    );
    await el.updateComplete;

    const errorMessage = el.shadowRoot?.querySelector('.error-message');
    expect(errorMessage?.textContent).toContain('problema inesperado');
  });

  it('re-fetch cuando cambia la prop city', async () => {
    fetchSpy.mockImplementation(mockFetchSuccess());

    const el = await fixture<WeatherCryptoWidget>(
      html`<weather-crypto-widget city="Santiago"></weather-crypto-widget>`
    );
    await el.updateComplete;

    fetchSpy.mockClear();
    el.city = 'Concepcion';
    await el.updateComplete;

    expect(fetchSpy).toHaveBeenCalledWith(expect.stringContaining('city=Concepcion'));
  });

  it('muestra mensaje cuando weather es null', async () => {
    fetchSpy.mockImplementation(
      mockFetchSuccess({ weather: null, crypto: mockDashboardData.crypto })
    );

    const el = await fixture<WeatherCryptoWidget>(
      html`<weather-crypto-widget></weather-crypto-widget>`
    );
    await el.updateComplete;

    expect(el.shadowRoot?.textContent).toContain('Clima no disponible');
  });

  it('muestra mensaje cuando crypto es null', async () => {
    fetchSpy.mockImplementation(
      mockFetchSuccess({ weather: mockDashboardData.weather, crypto: null })
    );

    const el = await fixture<WeatherCryptoWidget>(
      html`<weather-crypto-widget></weather-crypto-widget>`
    );
    await el.updateComplete;

    expect(el.shadowRoot?.textContent).toContain('bitcoin no disponibles');
  });
});
