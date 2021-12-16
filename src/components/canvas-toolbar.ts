import { html, css, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { AddNode } from "../commands";
import { useContext } from "./canvas-context";

@customElement("canvas-toolbar")
export class CanvasToolbar extends LitElement {
  static styles = css`
    header {
      width: var(--canvas-toolbar-width);
      height: var(--canvas-toolbar-height);
      background-color: var(--canvas-toolbar-background-color, black);
      color: var(--canvas-toolbar-color, white);
      border-bottom: var(--canvas-toolbar-border-bottom, 1px solid white);
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
    span.title {
      margin-left: var(--canvas-toolbar-margin-left, 10px);
      font-family: var(--canvas-toolbar-font-family, sans-serif);
      font-size: var(--canvas-toolbar-font-size, 20px);
      font-weight: var(--canvas-toolbar-font-weight, bold);
    }
    button.action {
      margin-right: var(--canvas-toolbar-margin-right, 10px);
    }
  `;

  @property({ type: String }) label = document.title;
  @state() context = useContext(this);

  render() {
    return html`<header>
      <span class="title">${this.label}</span>
      <button class="action" @click=${() => new AddNode().dispatch(this)}>
        +
      </button>
    </header>`;
  }

  firstUpdated() {
    this.context = useContext(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "canvas-toolbar": CanvasToolbar;
  }
}
