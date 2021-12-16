import { GraphNode } from "../graph";

export function getSizeFromElement(elem: GraphNode) {
  return {
    x: elem.x,
    y: elem.y,
    width: elem.width,
    height: elem.height,
  };
}

export function getPxNumber(elem: HTMLElement, prop: string) {
  return pxToNumber(elem.style.getPropertyValue(prop));
}

export function pxToNumber(value: string) {
  return Number(value.replace("px", ""));
}
