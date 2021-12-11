import { Offset, Size } from ".";

export function drawGridBackground(
  ctx: CanvasRenderingContext2D,
  size: Size,
  offset: Offset,
  scale: number
) {
  ctx.save();
  const { width, height } = size;

  drawDots(ctx, width, height, scale, offset);
  //   const bgColor = "rgba(0, 0, 0, 0.1)";
  //   const gridColor = "rgba(0, 0, 0, 0.2)";
  //   const gridSize = 20.0 * scale;
  //   const gridOffsetDx = offset.x % gridSize;
  //   const gridOffsetDy = offset.y % gridSize;
  //   const gridStrokeWidth = 1 / scale;

  //   ctx.fillStyle = bgColor;
  //   ctx.fillRect(0, 0, width, height);

  //   for (let x = gridOffsetDx; x < width; x += gridSize) {
  //     ctx.beginPath();
  //     ctx.moveTo(x, 0);
  //     ctx.lineTo(x, height);
  //     ctx.strokeStyle = gridColor;
  //     ctx.lineWidth = gridStrokeWidth;
  //     ctx.stroke();
  //   }

  //   for (let y = gridOffsetDy; y < height; y += gridSize) {
  //     ctx.beginPath();
  //     ctx.moveTo(0, y);
  //     ctx.lineTo(width, y);
  //     ctx.strokeStyle = gridColor;
  //     ctx.lineWidth = gridStrokeWidth;
  //     ctx.stroke();
  //   }

  ctx.restore();
}

function drawDots(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  scale: number,
  offset: Offset
) {
  let r = 2;

  const gridSize = 20.0 * scale;
  const gridOffsetDx = offset.x % gridSize;
  const gridOffsetDy = offset.y % gridSize;

  for (let x = gridOffsetDx; x < width; x += gridSize) {
    for (let y = gridOffsetDy; y < height; y += gridSize) {
      ctx.fillStyle = "#000";
      ctx.fillRect(x - r / 2, y - r / 2, r, r);
    }
  }
}
