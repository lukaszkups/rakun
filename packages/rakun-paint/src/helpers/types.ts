declare module '@/helpers/types' {
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

  export interface PositionXY {
    x: number;
    y: number;
  }

  export interface PositionArray {
    [0]: number | undefined;
    [1]: number | undefined;
  }
}
