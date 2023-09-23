import { HTMLElementEvent } from '@/helpers/types';

export const syncInputs = (event: HTMLElementEvent, scenario: String, colorPickerInput: HTMLInputElement | null, colorPickerText: HTMLInputElement | null) => {
  if (scenario === 'text' && colorPickerText) {
    colorPickerText.value = event?.target?.value as string;
  } else if (scenario === 'picker' && colorPickerInput) {
    let initialValue = event?.target?.value as string || '';
    const initialValueArr = initialValue.split('#');
    // check if #RGB format and make it #RRGGBB one
    if (initialValueArr && initialValueArr[1] && initialValueArr[1].length === 3) {
      let rgbLong = '#';
      initialValueArr[1].split('').forEach((char) => {
        rgbLong += `${char}${char}`;
      });
      colorPickerInput.value = rgbLong;
      if(colorPickerText) {
        colorPickerText.value = rgbLong;
      }
    } else {
      colorPickerInput.value = event?.target?.value as string;
    }
  }
  syncColorTileWithValues();
}

export const syncAlphaRangeWithLabel = (event: HTMLElementEvent, rangeLabel: HTMLInputElement | null) => {
  if (rangeLabel) {
    rangeLabel.innerText = event.target.value as string;
  }
  syncColorTileWithValues();
}

export const percentageToHex = (perc: string | number) => {
  return (Math.floor((Number(perc) * 255) / 100)).toString(16);
}

export const syncColorTileWithValues = () => {
  const colorPickerInput = document.getElementById('rkn-color-picker__input') as HTMLInputElement;
  const colorPickerInputLabel = document.querySelector('#rkn-color-picker__input-label span') as HTMLInputElement;
  const rangeInput = document.getElementById('rkn-color-picker__alpha') as HTMLInputElement;

  colorPickerInputLabel.style.backgroundColor = colorPickerInput.value || '#000';
  colorPickerInputLabel.style.opacity = String((Number(rangeInput.value || 100)/100));
}

export const setupColorPicker = async (element: HTMLElement | null) => {
  if (element) {
    element.innerHTML = `
      <div class="rkn-inline">
        <input id="rkn-color-picker__input" name="color-picker-input" class="rkn-color-picker-input" type="color" />
        <label id="rkn-color-picker__input-label" for="color-picker-input" class="rkn-color-picker-input-label"><span></span></label>
        <input id="rkn-color-picker__text" name="color-picker-text" type="text" value="#000000" />
      </div>
      <input id="rkn-color-picker__alpha" name="color-picker-alpha" type="range" min="0" max="100" value="100" />
      <label for="color-picker-alpha" id="rkn-color-picker__alpha-value">100</label>
    `;

    await setTimeout(() => {
      const colorPickerInput = document.getElementById('rkn-color-picker__input') as HTMLInputElement;
      const colorPickerInputLabel = document.getElementById('rkn-color-picker__input-label') as HTMLInputElement;
      const colorPickerText = document.getElementById('rkn-color-picker__text') as HTMLInputElement;
      const rangeInput = document.getElementById('rkn-color-picker__alpha') as HTMLInputElement;
      const rangeLabel = document.getElementById('rkn-color-picker__alpha-value') as HTMLInputElement;

      // sync text input after choosing color via picker
      colorPickerInput?.addEventListener('input', (e: Event) => syncInputs(e as HTMLElementEvent, 'text', colorPickerInput, colorPickerText), false);
      // sync color input after writing HEX color value manually inside input
      colorPickerText?.addEventListener('blur', (e: Event) => syncInputs(e as HTMLElementEvent, 'picker', colorPickerInput, colorPickerText), false);
      // sync alpha/opacity value label with the range input
      rangeInput?.addEventListener('input', (e: Event) => syncAlphaRangeWithLabel(e as HTMLElementEvent, rangeLabel), false);
      // propagate click on dummy/styled color picker to actual color input DOM element
      colorPickerInputLabel?.addEventListener('click', () => colorPickerInput?.click(), false);
    });
  } else {
    throw new Error('No element for colorPicker available!');
  }
}
