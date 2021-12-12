import { getSizeFromElement } from "../../utils";

export function pathCircle(node: Element) {
  const { width, height } = getSizeFromElement(node);
  const cx = node.getAttribute("cx") || "50";
  const cy = node.getAttribute("cy") || "50";
  const r = node.getAttribute("r") || "50";
  const path = new Path2D();
  path.arc(
    (width * parseFloat(cx)) / 100,
    (height * parseFloat(cy)) / 100,
    (width * parseFloat(r)) / 100,
    0,
    2 * Math.PI
  );
  return path;
}
