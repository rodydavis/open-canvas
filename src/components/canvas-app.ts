import { html, css, LitElement } from "lit";
import { customElement, query, state } from "lit/decorators.js";

import "./canvas-toolbar";
import "./canvas-layers";
import "./canvas-view";
import "./canvas-properties";
import { CanvasView } from "./canvas-view";
import { CanvasLayers } from "./canvas-layers";
import { getNodes } from "./canvas-node";

@customElement("canvas-app")
export class CanvasApp extends LitElement {
  static styles = css`
    main {
      --canvas-toolbar-width: 100%;
      --canvas-toolbar-height: 50px;
      --canvas-properties-width: 280px;
      --canvas-properties-height: calc(100vh - var(--canvas-toolbar-height));
      --canvas-layers-width: 230px;
      --canvas-layers-height: calc(100vh - var(--canvas-toolbar-height));
      --canvas-view-width: calc(
        100% - var(--canvas-layers-width) - var(--canvas-properties-width)
      );
      --canvas-view-height: calc(100vh - var(--canvas-toolbar-height));
      display: grid;
      grid-template-columns:
        var(--canvas-layers-width)
        var(--canvas-view-width)
        var(--canvas-properties-width);
      grid-template-rows: var(--canvas-toolbar-height) var(--canvas-view-height);
      grid-template-areas:
        "toolbar toolbar toolbar"
        "layers view properties";
    }

    canvas-toolbar {
      grid-area: toolbar;
    }

    canvas-layers {
      grid-area: layers;
    }

    canvas-view {
      grid-area: view;
    }

    canvas-properties {
      grid-area: properties;
    }
  `;

  @query("main") main!: HTMLElement;
  @query("canvas-view") canvas!: CanvasView;
  @query("canvas-layers") layers!: CanvasLayers;
  @state() items = Array.from(this.children);
  @state() selection: number[] = [];

  render() {
    return html`<main>
      <canvas-toolbar
        @add-node=${() => {
          this.addNode();
        }}
      ></canvas-toolbar>
      <canvas-layers
        .items=${this.items}
        .selection=${this.selection}
        @selection-changed=${(e: CustomEvent) => {
          const selection = e.detail.selection;
          this.updateSelection(selection);
        }}
      ></canvas-layers>
      <canvas-view
        .items=${this.items}
        .selection=${this.selection}
        @selection-changed=${(e: CustomEvent) => {
          const selection = e.detail.selection;
          this.updateSelection(selection);
        }}
      ></canvas-view>
      <canvas-properties></canvas-properties>
    </main> `;
  }

  firstUpdated() {
    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    this.canvas.paint();
  }

  addNode() {
    const node = document.createElement("rect");
    node.setAttribute("x", "0");
    node.setAttribute("y", "0");
    node.setAttribute("width", "100");
    node.setAttribute("height", "100");
    node.setAttribute("fill", "red");
    this.appendChild(node);
    this.items.push(node);
    this.canvas.paint();
    this.layers.requestUpdate();
    this.updateSelection([this.items.length - 1]);
  }

  updateSelection(indices: number[]) {
    this.selection = indices;
    const items = getNodes(this.items);
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (this.selection.includes(i)) {
        item.child.setAttribute("selected", "");
      } else {
        item.child.removeAttribute("selected");
      }
    }
    this.canvas.paint();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "canvas-app": CanvasApp;
  }
}
