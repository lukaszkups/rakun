import { getCurrentInstance } from 'vue';

export const propagateClick = (selector: string) => {
  (document.querySelector(selector) as HTMLButtonElement)?.click();
};

export const wasPixelMarked = (
  arrOfPixels: Array<[number, number]>,
  x: number,
  y: number,
) => {
  const index = arrOfPixels.findIndex((item) => item[0] === x && item[1] === y);
  if (index > -1) {
    return true;
  } else {
    arrOfPixels.push([x, y]);
    return false;
  }
};

export const vueForceUpdate = () => {
  const instance = getCurrentInstance();
  instance?.proxy?.$forceUpdate();
};
