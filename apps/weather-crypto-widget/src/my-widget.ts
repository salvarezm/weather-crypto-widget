import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('my-widget')
export class MyWidget extends LitElement {
  render() {
    return html`<h1>Hola Mundo</h1>`;
  }
}
