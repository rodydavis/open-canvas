import { html, css, LitElement } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";

import "./canvas-toolbar";
import "./canvas-layers";
import "./canvas-view";
import "./canvas-properties";
import { pxToNumber } from "../utils";
import { createContext } from "./canvas-context";

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
      overflow: hidden;
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
  @property({ type: Boolean, attribute: "debug" }) debug = false;
  @state() context = createContext(this);

  render() {
    return html`<main>
      <canvas-toolbar></canvas-toolbar>
      <canvas-layers></canvas-layers>
      <canvas-view></canvas-view>
      <canvas-properties></canvas-properties>
    </main> `;
  }

  firstUpdated() {
    window.addEventListener("resize", () => this.resize());
    const state = this.context.state;
    const items = Array.from(this.children);
    for (const elem of items) {
      for (const ext of state.extensions) {
        if (ext.valid(elem.tagName.toLowerCase())) {
          const node = ext.createNode(elem, state.store);
          state.store.addNode(node);
        }
      }
    }
    state.notifyListeners();
  }

  resize() {
    const state = this.context.state;
    const computedStyle = getComputedStyle(this.main);
    state.canvas.width = pxToNumber(
      computedStyle.getPropertyValue("--canvas-view-width")
    );
    state.canvas.height = pxToNumber(
      computedStyle.getPropertyValue("--canvas-view-height")
    );
    state.notifyListeners();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "canvas-app": CanvasApp;
  }
}
