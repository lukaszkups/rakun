export const propagateClick = (selector: string) => {
  (document.querySelector(selector) as HTMLButtonElement)?.click();
}