import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { UpdateSelection } from "../commands";
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
  @property({ type: Array }) selection: Element[] = [];

  render() {
    const items = getNodes(this.items);
    return html`<section>
      <ul>
        ${items.map((e) => this.renderGroup(e.child))}
      </ul>
    </section>`;
  }

  renderGroup(element: Element) {
    const children = Array.from(element.children);
    return html`<li
        ?selected=${element.hasAttribute("selected")}
        @click=${() => this.onSelectNodes([element])}
      >
        ${this.getTitle(element)}
      </li>
      ${children.length === 0
        ? ""
        : html`<ul>
            ${children.map((e) => {
              return html`<li
                ?selected=${e.hasAttribute("selected")}
                @click=${() => this.onSelectNodes([e])}
              >
                ${this.getTitle(e)}
              </li>`;
            })}
          </ul>`} `;
  }

  getTitle(element: Element) {
    return element.getAttribute("title") ?? element.tagName.toLowerCase();
  }

  onSelectNodes(indices: Element[]) {
    this.selection = indices;
    new UpdateSelection(indices).dispatch(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "canvas-layers": CanvasLayers;
  }
}
