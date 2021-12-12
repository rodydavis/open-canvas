export function pathEllipse(node: Element) {
  const cx = node.getAttribute("cx") || "50";
  const cy = node.getAttribute("cy") || "50";
  const rx = node.getAttribute("rx") || "50";
  const ry = node.getAttribute("ry") || "50";
  const path = new Path2D();
  path.ellipse(
    Number(cx),
    Number(cy),
    Number(rx),
    Number(ry),
    0,
    0,
    2 * Math.PI
  );
  return path;
}
