import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getNodes } from "../nodes/base";

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
    li {
      cursor: pointer;
    }
    li[selected] {
      color: var(--canvas-layers-selected-background-color, red);
    }
  `;

  @property({ type: Array }) items: Element[] = [];
  @property({ type: Array }) selection: number[] = [];

  render() {
    const items = getNodes(this.items);
    return html`<section>
      <ul>
        ${items.map(
          (e, i) => html`<li
            ?selected=${e.child.hasAttribute("selected")}
            @click=${() => this.onSelectNodes([i])}
          >
            ${e.child.tagName}
          </li>`
        )}
      </ul>
    </section>`;
  }

  onSelectNodes(indices: number[]) {
    this.selection = indices;
    this.dispatchEvent(
      new CustomEvent("selection-changed", {
        detail: {
          selection: this.selection,
        },
        bubbles: true,
        composed: true,
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "canvas-layers": CanvasLayers;
  }
}
