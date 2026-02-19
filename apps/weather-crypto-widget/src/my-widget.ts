import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('my-widget')
export class MyWidget extends LitElement {
  render() {
    return html`<div>
      <h1>Santiago, CL</h1>
      <span> 18 Feb, 2026 - 13:40</span>
      <div>☀️ 27°C Despejado</div>
      <hr />
      <div>Humedad 42% Viento 12 km/h Máx/Mín 29° / 18°</div>
      <hr />
      <div>Bitcoin BTC/USD $104,283 +2.4% ↑</div>
    </div>`;
  }
}
