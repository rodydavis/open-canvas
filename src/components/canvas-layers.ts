import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getNodes } from "./canvas-node";

@customElement("canvas-layers")
export class CanvasLayers extends LitElement {
  static styles = css`
    section {
      width: var(--canvas-layers-width);
      height: var(--canvas-layers-height);
      background-color: var(--canvas-layers-background-color, #fff);
      color: var(--canvas-layers-color, #000);
      border-right: var(--canvas-layers-border-right, 1px solid #000);
      overflow-y: auto;
    }
  `;

  @property({ type: Array }) items: Element[] = [];

  render() {
    const items = getNodes(this.items);
    return html`<section>
      <ul>
        ${items.map((e) => html`<li>${e.child.tagName}</li>`)}
      </ul>
    </section>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "canvas-layers": CanvasLayers;
  }
}
