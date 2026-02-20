import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { DashboardData } from './types';
import { globalStyles } from './styles';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

@customElement('weather-crypto-widget')
export class WeatherCryptoWidget extends LitElement {
  static override styles = globalStyles;

  @property({ type: String })
  city = 'Santiago';

  @state()
  private data: DashboardData | null = null;

  @state()
  private loading = true;

  @state()
  private error: string | null = null;

  private async fetchData() {
    this.loading = true;
    this.error = null;

    try {
      const response = await fetch(`${API_URL}/api/dashboard-widget?city=${this.city}`);

      if (!response.ok) {
        this.error = 'Ocurrio un problema inesperado';
        return;
      }

      const data = (await response.json()) as DashboardData;

      this.data = data;
    } catch (err) {
      console.error(err);
      this.error = 'Ocurrio un problema inesperado';
    } finally {
      this.loading = false;
    }
  }

  private formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    }).format(price);
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.fetchData();
  }

  updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('city')) {
      this.fetchData();
    }
  }

  private renderLoading() {
    return html`<div class="widget-card">
      <div class="loading-state">
        <div class="spinner"></div>
        <div class="loading-text">Cargando...</div>
      </div>
    </div>`;
  }

  private renderError() {
    return html`
      <div class="widget-card">
        <div class="error-state">
          <div class="error-icon">&#9888;</div>
          <div class="error-message">${this.error}</div>
        </div>
      </div>
    `;
  }

  private renderWeatherSection() {
    const weather = this.data?.weather;

    if (!weather) {
      return html`
        <div>
          <div>Clima no disponible</div>
        </div>
      `;
    }

    return html`
      <div class="weather-section">
        <div class="weather-icon">
          <img src=${weather.current.condition.icon} />
        </div>
        <div>
          <div>${weather.location?.name}, ${weather.location?.country}</div>
          <div class="weather-title">${weather.current.temp_c} °C</div>
          <div>${weather.current.condition.text}</div>
          <div class="widget-secondary-text">
            <div>Sensación: ${weather.current?.feelslike_c} °C</div>
            <div>Humedad: ${weather.current?.humidity} %</div>
          </div>
        </div>
      </div>
    `;
  }

  private renderCryptoSection() {
    const crypto = this.data?.crypto;

    if (!crypto) {
      return html`
        <div>
          <div>Datos de bitcoin no disponibles</div>
        </div>
      `;
    }

    return html`
      <div class="bitcoin-section">
        <div class="bitcoin-icon">
          <div class="bitcoin-logo">&#8383;</div>
        </div>
        <div class="bitcoin-info">
          <div>Bitcoin (BTC)</div>
          <div class="bitcoin-title">${this.formatPrice(crypto.bitcoin?.usd)}</div>
          <div class=${crypto.bitcoin?.usd_24h_change > 0 ? 'bitcoin-up' : 'bitcoin-down'}>
            ${crypto.bitcoin?.usd_24h_change.toFixed(2)}% (24h)
          </div>
        </div>
      </div>
    `;
  }

  render() {
    if (this.loading) {
      return this.renderLoading();
    }

    if (this.error) {
      return this.renderError();
    }

    return html` <div class="widget-card">
      <div class="widget-content">${this.renderWeatherSection()} ${this.renderCryptoSection()}</div>
    </div>`;
  }
}
