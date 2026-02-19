import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { DashboardData } from './types';

@customElement('weather-crypto-widget')
export class WeatherCryptoWidget extends LitElement {
  @property({ type: String })
  city = 'Santiago';

  @state()
  private data: DashboardData | null = null;

  //widget function
  private async fetchData() {
    try {
      const response = await fetch('http://localhost:3001/api/dashboard-widget');

      if (!response.ok && response.status >= 500) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const data = (await response.json()) as DashboardData;
      console.log(data);
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

  render() {
    return html`<div>
      <h1>Santiago, CL</h1>
      <span> 18 Feb, 2026 - 13:40</span>
      <div>☀️ 27°C Despejado</div>
      <hr />
      <div>Humedad 42% Viento 12 km/h Máx/Mín 29° / 18°</div>
      <hr />
      <div>
        Bitcoin BTC/CLP
        ${this.data?.cryptoData?.bitcoin.clp &&
        this.formatPrice(this.data?.cryptoData?.bitcoin.clp)}
        +2.4% ↑
      </div>
    </div>`;
  }
}
