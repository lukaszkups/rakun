import { nextTick } from 'vue';
import { PositionArray, PositionXY, RknMouseEvent } from '@/helpers/types';

export const calculateRealMousePosition = (
  e: RknMouseEvent,
  element: HTMLElement | HTMLCanvasElement,
): PositionXY => {
  if (e.layerX === undefined || e.layerY === undefined) {
    console.error(
      'layerX/layerY MouseEvent property not supported, it is not advised to use zoom that makes canvas scroll!',
    );
    return {
      x: e.clientX - element.offsetLeft,
      y: e.clientY - element.offsetTop,
    };
  }
  return {
    x: e.layerX as number,
    y: e.layerY as number,
  };
};

export const drawPixelOnCanvas = (
  canvasContext: CanvasRenderingContext2D,
  squarePosX: number,
  squarePosY: number,
  size: number,
  color: string,
) => {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(squarePosX, squarePosY, size, size);
};

export const convertHexWithOpacityToRGBA = (
  hex: string,
  opacity: number,
): string => {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  const a = parseInt(String(opacity), 16) / 100;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

export const drawGrid = async (
  canvasContext: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
  gridColor: string,
  gridSize: number,
): Promise<void> => {
  // nextTick to be sure that all canvas HTML processing has been finished
  await nextTick();
  canvasContext.moveTo(0, 0);
  for (let x = 0; x <= canvasWidth; x += gridSize) {
    canvasContext.moveTo(x, 0);
    canvasContext.lineTo(x, canvasHeight);
  }
  for (let y = 0; y <= canvasHeight; y += gridSize) {
    canvasContext.moveTo(0, y);
    canvasContext.lineTo(canvasWidth, y);
  }
  canvasContext.strokeStyle = gridColor;
  canvasContext.stroke();
};

export const calculateGridPosition = (
  pos: number,
  gridSize: number,
): number => {
  return Math.floor(pos / gridSize) * gridSize;
};

export const clearCanvas = async (
  canvasContext: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
): Promise<void> => {
  // nextTick to be sure that all canvas HTML processing has been finished
  await nextTick();
  canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
};

export const ensureCanvasResized = (
  canvasContext: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
): void => {
  console.log('ensureCanvasResized', canvasContext, canvasWidth, canvasHeight);
};

export const getCanvasImage = async (
  canvasContext: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
): Promise<ImageData> => {
  // nextTick to be sure that all canvas HTML processing has been finished
  await nextTick();
  return canvasContext.getImageData(0, 0, canvasWidth, canvasHeight);
};

export const loadImageToCanvas = async (
  canvasContext: CanvasRenderingContext2D,
  imgData: ImageData,
): Promise<void> => {
  // nextTick to be sure that all canvas HTML processing has been finished
  await nextTick();
  canvasContext.putImageData(imgData, 0, 0);
};

export const loadAndResizeImageToCanvas = async (
  canvasSourceElement: HTMLCanvasElement,
  canvasContext: CanvasRenderingContext2D,
  imgWidth: number,
  imgHeight: number,
  previousZoom: number,
  currentZoom: number,
): Promise<void> => {
  // nextTick to be sure that all canvas HTML processing has been finished
  await nextTick();
  // @ts-ignore-next-line
  canvasContext.drawImage(
    canvasSourceElement,
    0,
    0,
    imgWidth * previousZoom,
    imgHeight * previousZoom,
    0,
    0,
    imgWidth * currentZoom,
    imgHeight * currentZoom,
  );
};

export const cloneCanvasElement = async (
  oldCanvas: HTMLCanvasElement,
): Promise<HTMLCanvasElement> => {
  // nextTick to be sure that all canvas HTML processing has been finished
  await nextTick();
  //create a new canvas
  const newCanvas = document.createElement('canvas');
  const context = newCanvas.getContext('2d');

  //set dimensions
  newCanvas.width = oldCanvas.width;
  newCanvas.height = oldCanvas.height;

  //apply the old canvas to the new one
  context?.drawImage(oldCanvas, 0, 0);

  //return the new canvas
  return newCanvas;
};

export const drawRectOnCanvas = async (
  canvasContext: CanvasRenderingContext2D,
  endX: number,
  endY: number,
  zoom: number,
  color: string,
  rectStartPoint: PositionArray,
): Promise<PositionArray[]> => {
  await nextTick();
  const coordinatesArray: PositionArray[] = [];
  // Translate coordinates
  const x1 = calculateGridPosition(rectStartPoint[0] as number, zoom);
  const y1 = calculateGridPosition(rectStartPoint[1] as number, zoom);
  const x2 = endX;
  const y2 = endY;
  // coords object will contain real starting and ending points, depending on direction
  const coords = { x1, x2, y1, y2 };
  if (x1 > x2) {
    coords.x1 = x2;
    coords.x2 = x1;
  }
  if (y1 > y2) {
    coords.y1 = y2;
    coords.y2 = y1;
  }

  // draw horizontal lines
  for (let x = coords.x1; x <= coords.x2; x += zoom) {
    await drawPixelOnCanvas(canvasContext, x, coords.y1, zoom, color);
    coordinatesArray.push([x, coords.y1]);
    await drawPixelOnCanvas(canvasContext, x, coords.y2, zoom, color);
    coordinatesArray.push([x, coords.y2]);
  }
  // draw vertical lines
  for (let y = coords.y1; y <= coords.y2; y += zoom) {
    await drawPixelOnCanvas(canvasContext, coords.x1, y, zoom, color);
    coordinatesArray.push([coords.x1, y]);
    await drawPixelOnCanvas(canvasContext, coords.x2, y, zoom, color);
    coordinatesArray.push([coords.x2, y]);
  }
  // Return the result
  return coordinatesArray;
};

// using Bresenham algorithm for lines
export const drawLineOnCanvas = async (
  canvasContext: CanvasRenderingContext2D,
  endX: number,
  endY: number,
  zoom: number,
  color: string,
  lineStartPoint: PositionArray,
): Promise<PositionArray[]> => {
  // nextTick to be sure that all canvas HTML processing has been finished
  await nextTick();
  const coordinatesArray: PositionArray[] = [];
  // Translate coordinates
  let x1 = calculateGridPosition(lineStartPoint[0] as number, zoom);
  let y1 = calculateGridPosition(lineStartPoint[1] as number, zoom);
  const x2 = endX;
  const y2 = endY;
  // Define differences and error check
  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);
  const sx = x1 < x2 ? zoom : -zoom;
  const sy = y1 < y2 ? zoom : -zoom;
  let err = dx - dy;
  // Set first coordinates
  coordinatesArray.push([x1, y1]);
  drawPixelOnCanvas(canvasContext, x1, y1, zoom, color);
  // Main loop
  while (!(x1 == x2 && y1 == y2)) {
    const e2 = err << 1;
    if (e2 > -dy) {
      err -= dy;
      x1 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y1 += sy;
    }
    // Set coordinates
    coordinatesArray.push([x1, y1]);
    drawPixelOnCanvas(canvasContext, x1, y1, zoom, color);
  }
  // Return the result
  return coordinatesArray;
};

// Circle draw logic inspiration: https://codepen.io/sdvg/pen/bGweeM
export const drawCircleOnCanvas = async (
  canvasContext: CanvasRenderingContext2D,
  endX: number,
  endY: number,
  zoom: number,
  color: string,
  circleStartPoint: PositionArray,
) => {
  // nextTick to be sure that all canvas HTML processing has been finished
  await nextTick();
  const coordinatesArray: PositionArray[] = [];
  // Translate coordinates
  const x1 = calculateGridPosition(circleStartPoint[0] as number, zoom);
  const y1 = calculateGridPosition(circleStartPoint[1] as number, zoom);
  const x2 = endX;
  const y2 = endY;
  // Define differences and error check
  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);
  // calculate coords of the center of the circle
  const ccx = x1 > x2 ? x2 + dx : x1 + dx;
  const ccy = y1 > y2 ? y2 + dy : y1 + dy;
  const radius = Math.sqrt(dx * dx + dy * dy);
  // const sx = x1 < x2 ? zoom : -zoom;
  // const sy = y1 < y2 ? zoom : -zoom;
  // let err = dx - dy;

  let step = 0;
  let xCalc = radius;
  let radiusError = zoom - radius;
  console.log(radius, step);
  while (radius >= step) {
    drawPixelOnCanvas(canvasContext, xCalc + ccx, step + ccy, zoom, color);
    coordinatesArray.push([xCalc + ccx, step + ccy]);
    drawPixelOnCanvas(canvasContext, step + ccx, xCalc + ccy, zoom, color);
    coordinatesArray.push([step + ccx, xCalc + ccy]);
    drawPixelOnCanvas(canvasContext, -xCalc + ccx, step + ccy, zoom, color);
    coordinatesArray.push([-xCalc + ccx, step + ccy]);
    drawPixelOnCanvas(canvasContext, -step + ccx, xCalc + ccy, zoom, color);
    coordinatesArray.push([-step + ccx, xCalc + ccy]);
    drawPixelOnCanvas(canvasContext, -xCalc + ccx, -step + ccy, zoom, color);
    coordinatesArray.push([-xCalc + ccx, -step + ccy]);
    drawPixelOnCanvas(canvasContext, -step + ccx, -xCalc + ccy, zoom, color);
    coordinatesArray.push([-step + ccx, -xCalc + ccy]);
    drawPixelOnCanvas(canvasContext, xCalc + ccx, -step + ccy, zoom, color);
    coordinatesArray.push([-step + ccx, -xCalc + ccy]);
    drawPixelOnCanvas(canvasContext, step + ccx, -xCalc + ccy, zoom, color);
    coordinatesArray.push([step + ccx, -xCalc + ccy]);
    step += zoom;

    if (radiusError < 0) {
      radiusError += 2 * step + zoom;
    } else {
      xCalc -= zoom;
      radiusError += 2 * (step - xCalc + zoom);
    }
  }
  console.log(coordinatesArray);
  return coordinatesArray;
  // var DrawCirle = function (x0, y0, radius) {
  //   var x = radius;
  //   var y = 0;
  //   var radiusError = 1 - x;

  //   while (x >= y) {
  //     DrawPixel(x + x0, y + y0);
  //     DrawPixel(y + x0, x + y0);
  //     DrawPixel(-x + x0, y + y0);
  //     DrawPixel(-y + x0, x + y0);
  //     DrawPixel(-x + x0, -y + y0);
  //     DrawPixel(-y + x0, -x + y0);
  //     DrawPixel(x + x0, -y + y0);
  //     DrawPixel(y + x0, -x + y0);
  //     y++;

  //     if (radiusError < 0) {
  //         radiusError += 2 * y + 1;
  //     }
  //     else {
  //         x--;
  //         radiusError+= 2 * (y - x + 1);
  //     }
  //   }
  // };
};

export const removeSquareOnCanvas = (
  canvasContext: CanvasRenderingContext2D,
  squarePosX: number,
  squarePosY: number,
  size: number,
) => {
  canvasContext.clearRect(squarePosX, squarePosY, size, size);
};

// Helper method for fillCanvasFragment
export const checkNearPixelsAndColor = (
  canvasContext: CanvasRenderingContext2D,
  squarePosX: number,
  squarePosY: number,
  color: string,
) => {};

export const fillCanvasFragment = (
  canvasContext: CanvasRenderingContext2D,
  squarePosX: number,
  squarePosY: number,
  size: number,
  color: string,
) => {
  // tranform rgba to Uint8ClampedArray format that is being used to store pixel colors inside <canvas> elements
  const colorFill = String(
    new Uint8ClampedArray(
      color.split(',').map((n) => Number(n.replace(/\D/g, ''))),
    ),
  );
  // first we need to check on what color user clicked so the same ones will be affected by fill method
  const clickedColor = String(
    canvasContext.getImageData(squarePosX, squarePosY, 1, 1).data,
  );

  // if user clicked same color, do nothing
  if (colorFill === clickedColor) {
    console.log('Same colors: ', colorFill, clickedColor);
    return;
  }
  // go up and down, check if can move left or right and memorize it
  // when finished, go left (-1) and go up and down again, checking if can go further left
  // when cant go any further, go right from initial x,y (if was possible), go up and down, check every time if possible moving further right etc.
  // when cant move anymore, finish action
};
