import { html, css, LitElement } from "lit";
import { customElement, query, state } from "lit/decorators.js";

import "./canvas-toolbar";
import "./canvas-layers";
import "./canvas-view";
import "./canvas-properties";

import { CanvasView } from "./canvas-view";
import { CanvasLayers } from "./canvas-layers";
import { CanvasProperties } from "./canvas-properties";
import { BaseCommand } from "../commands/base";

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
  @query("canvas-properties") properties!: CanvasProperties;
  @state() items = Array.from(this.children);
  @state() selection: number[] = [];

  render() {
    return html`<main>
      <canvas-toolbar></canvas-toolbar>
      <canvas-layers
        .items=${this.items}
        .selection=${this.selection}
      ></canvas-layers>
      <canvas-view
        .items=${this.items}
        .selection=${this.selection}
      ></canvas-view>
      <canvas-properties
        .items=${this.items}
        .selection=${this.selection}
      ></canvas-properties>
    </main> `;
  }

  firstUpdated() {
    window.addEventListener("resize", () => this.resize());
    this.addEventListener("command", (e: Event) => {
      const event = e as CustomEvent;
      const command = event.detail;
      command.execute(this);
    });
  }

  resize() {
    this.canvas.paint();
  }

  addCommand(command: BaseCommand) {
    command.execute(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "canvas-app": CanvasApp;
  }
}
