import { toggleSidebarElement } from "@/helpers/events";
import { setupColorPicker } from "./colorPicker";

export const setupPaintWrapper = async (element: HTMLElement | null) => {
  if (element) {
    element.innerHTML = `
      <div class="rkn-paint__wrapper">
        <div class="rkn-paint__canvas-wrapper">
          <canvas id="rkn-canvas--main" class="rkn-canvas"></canvas>
          <canvas id="rkn-canvas--helper" class="rkn-canvas"></canvas>
        </div>
        <div class="rkn-paint__sidebar">
          <div class="rkn-paint__sidebar-element-wrapper">
            <p class="rkn-paint__sidebar-element-title">Miniature</p>
            <div class="rkn-paint__sidebar-element-content">
              <canvas id="rkn-canvas--miniature" class="rkn-canvas"></canvas>
            </div>
          </div>
          <div class="rkn-paint__sidebar-element-wrapper">
            <p class="rkn-paint__sidebar-element-title">Colors</p>
            <div class="rkn-paint__sidebar-element-content">
              <div id="rkn-paint__color-picker" class="rkn-paint__color-picker"></div>
              <div id="rkn-paint__color-palette" class="rkn-paint__color-palette"></div>
            </div>
          </div>
          <div class="rkn-paint__sidebar-element-wrapper">
            <p class="rkn-paint__sidebar-element-title">Tools</p>
            <div class="rkn-paint__sidebar-element-content">
              <button id="rkn-paint__pencil" class="rkn-paint__tools-button">Pencil</button>
              <button id="rkn-paint__eraser" class="rkn-paint__tools-button">Eraser</button>
              <button id="rkn-paint__color-inspector" class="rkn-paint__tools-button">Color Inspector</button>
            </div>
          </div>
          <div class="rkn-paint__sidebar-element-wrapper">
            <p class="rkn-paint__sidebar-element-title">Settings</p>
            <div class="rkn-paint__sidebar-element-content">
              <div>
                <label for="rkn-paint__settings-width">Frame width: </label>
                <input type="number" value="32" id="rkn-paint__settings-width" name="rkn-paint__settings-width" />
              </div>
              <div>
                <label for="rkn-paint__settings-height">Frame height: </label>
                <input type="number" value="32" id="rkn-paint__settings-height" name="rkn-paint__settings-height" />
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    await setTimeout(async () => {
      await setupColorPicker(document.getElementById('rkn-paint__color-picker'));
      document.querySelectorAll('.rkn-paint__sidebar-element-title').forEach((element) => element.addEventListener('dblclick', () => toggleSidebarElement(element as HTMLElement), false));
      // document.querySelectorAll('.rkn-paint__tools-button').forEach((element) => element.addEventListener('click', () => toggleButtonActive(element as HTMLButtonElement), false));
    }, 0);
  } else {
    throw new Error('No wrapper element for paintWrapper available!');
  }
}
