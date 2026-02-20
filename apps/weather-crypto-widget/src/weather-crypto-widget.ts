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

  //widget function
  private async fetchData() {
    try {
      const response = await fetch(`${API_URL}/api/dashboard-widget?city=${this.city}`);

      if (!response.ok && response.status >= 500) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const data = (await response.json()) as DashboardData;

      this.data = data;
    } catch (err) {
      throw new Error(`Error en el widget: ${err}`);
    }
  }

  private formatPrice(price: number): string {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0,
    }).format(price);
  }

  //component state funcions
  connectedCallback(): void {
    super.connectedCallback();
    this.fetchData();
  }

  updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('city')) {
      this.fetchData();
    }
  }

  //weather section
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
          <img src=${weather.current?.condition?.icon} />
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

  //crypto section

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
          <div class="bitcoin-title">${this.formatPrice(crypto.bitcoin?.clp)}</div>
          <div class=${crypto.bitcoin?.clp_24h_change > 0 ? 'bitcoin-up' : 'bitcoin-down'}>
            ${crypto.bitcoin?.clp_24h_change.toFixed(2)}% (24h)
          </div>
        </div>
      </div>
    `;
  }

  render() {
    return html` <div class="widget-card">
      <div class="widget-content">${this.renderWeatherSection()} ${this.renderCryptoSection()}</div>
    </div>`;
  }
}
