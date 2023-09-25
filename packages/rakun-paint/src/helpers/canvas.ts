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
