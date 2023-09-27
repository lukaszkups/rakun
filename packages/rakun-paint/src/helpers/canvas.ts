import { nextTick } from "vue";

export const calculateRealMousePosition = (e: MouseEvent, element: HTMLElement | HTMLCanvasElement) => {
  return {
    x: e.clientX - element.offsetLeft,
    y: e.clientY - element.offsetTop,
  }
}

export const drawSquareOnCanvas = (canvasContext: CanvasRenderingContext2D, squarePosX: number, squarePosY: number, size: number, color: string) => {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(squarePosX, squarePosY, size, size);
}

export const convertHexWithOpacityToRGBA = (hex: string, opacity: number) => {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  const a = parseInt(String(opacity), 16)/100;
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

export const drawGrid = async (canvasContext: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, gridColor: string, gridSize: number) => {
  // nextTick to be sure that all canvas HTML processing has been finished
  await nextTick();
  canvasContext.moveTo(0, 0);
  for (var x = 0; x <= canvasWidth; x += gridSize) {
    canvasContext.moveTo(x, 0);
    canvasContext.lineTo(x, canvasHeight);
  }
  for (var y = 0; y <= canvasHeight; y += gridSize) {
    canvasContext.moveTo(0, y);
    canvasContext.lineTo(canvasWidth, y);
  }
  canvasContext.strokeStyle = gridColor;
  canvasContext.stroke();
}

export const calculateGridPosition = (pos: number, gridSize: number) => {
  return Math.floor(pos / gridSize) * gridSize;
}

export const clearCanvas = async (canvasContext: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) => {
  // nextTick to be sure that all canvas HTML processing has been finished
  await nextTick();
  canvasContext.clearRect(0 ,0, canvasWidth, canvasHeight);
}

export const ensureCanvasResized = (canvasContext: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) => {
  console.log('ensureCanvasResized', canvasContext, canvasWidth, canvasHeight);
}

export const getCanvasImage = async (canvasContext: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number): Promise<ImageData> => {
  // nextTick to be sure that all canvas HTML processing has been finished
  await nextTick();
  return canvasContext.getImageData(0, 0, canvasWidth, canvasHeight);
}

export const loadImageToCanvas = async (canvasContext: CanvasRenderingContext2D, imgData: ImageData) => {
  // nextTick to be sure that all canvas HTML processing has been finished
  await nextTick();
  canvasContext.putImageData(imgData, 0, 0);
}
