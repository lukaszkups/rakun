export function setupPaintWrapper(element: HTMLDivElement) {
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
            <button id="rkn-paint__pencil" class="rkn-paint__tools-button">Pencil</div>
            <button id="rkn-paint__eraser" class="rkn-paint__tools-button">Eraser</div>
            <button id="rkn-paint__color-picker" class="rkn-paint__tools-button">Color Picker</div>
          </div>
        </div>
      </div>
    </div>
  `
  // element.addEventListener('click', () => setCounter(counter + 1))
  // setCounter(0)
}
