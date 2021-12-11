import { html, css, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("canvas-properties")
export class CanvasProperties extends LitElement {
  static styles = css`
    section {
      width: var(--canvas-properties-width);
      height: var(--canvas-properties-height);
      background-color: var(--canvas-properties-background-color, #fff);
      color: var(--canvas-properties-color, #000);
      border-left: var(--canvas-properties-border-left, 1px solid #000);
    }
  `;

  render() {
    return html`<section></section>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "canvas-properties": CanvasProperties;
  }
}
