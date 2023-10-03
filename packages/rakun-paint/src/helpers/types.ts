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
