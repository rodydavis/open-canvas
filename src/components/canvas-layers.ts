import { html, css, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { UpdateSelection } from "../commands";
import { GraphNode } from "../graph";
import { useContext } from "./canvas-context";

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

  @state() context = useContext(this);

  render() {
    const state = this.context.state;
    const items = state.store.rootNodes;
    return html`<section>
      <ul>
        ${items.map((e) => this.renderGroup(e))}
      </ul>
    </section>`;
  }

  renderGroup(element: GraphNode) {
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

  getTitle(element: GraphNode) {
    return element.getAttribute("title") ?? element.tag;
  }

  onSelectNodes(indices: GraphNode[]) {
    new UpdateSelection(indices).dispatch(this);
  }

  firstUpdated() {
    this.context = useContext(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "canvas-layers": CanvasLayers;
  }
}
