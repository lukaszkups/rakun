export interface ColorType {
  hex: string;
  alpha: string | number;
}

export interface KeyableInterface {
  [key: string]: any;
}

export interface RknMouseEvent extends MouseEvent {
  layerX: Number;
  layerY: Number;
}

export const Tools = {
  pencil: 'PENCIL',
  select: 'SELECT',
  line: 'LINE',
  square: 'SQUARE',
  filledSquare: 'FILLED_SQUARE',
  circle: 'CIRCLE',
  filledCircle: 'FILLED_CIRCLE',
}
