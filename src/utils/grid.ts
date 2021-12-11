import { Offset, Size } from ".";

export function drawGridBackground(
  ctx: CanvasRenderingContext2D,
  size: Size,
  offset: Offset,
  scale: number
) {
  ctx.save();
  const { width, height } = size;

  const r = 2;
  const gridSize = 25.0 * scale;
  const gridOffsetDx = offset.x % gridSize;
  const gridOffsetDy = offset.y % gridSize;

  for (let x = gridOffsetDx; x < width; x += gridSize) {
    for (let y = gridOffsetDy; y < height; y += gridSize) {
      ctx.fillStyle = "#000";
      ctx.fillRect(x - r / 2, y - r / 2, r, r);
    }
  }

  ctx.restore();
}
