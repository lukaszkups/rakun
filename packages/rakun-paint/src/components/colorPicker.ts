import { HTMLElementEvent } from '@/helpers/types';

export const syncInputs = (event: HTMLElementEvent, scenario: String, colorPickerInput: HTMLInputElement | null, colorPickerText: HTMLInputElement | null) => {
  if (scenario === 'text' && colorPickerText) {
    colorPickerText.value = event?.target?.value;
  }
}

export const setupColorPicker = async (element: HTMLElement | null) => {
  if (element) {
    element.innerHTML = `
      <input id="rkn-color-picker__input" name="color-picker-input" type="color" />
      <input id="rkn-color-picker__text" name="color-picker-text" type="text" value="#000000" />
    `;

    await setTimeout(() => {
      const colorPickerInput = document.getElementById('rkn-color-picker__input') as HTMLInputElement;
      const colorPickerText = document.getElementById('rkn-color-picker__text') as HTMLInputElement;

      colorPickerInput?.addEventListener('input', (e: Event) => syncInputs(e, 'text', colorPickerInput, colorPickerText), false);
    });
  } else {
    throw new Error('No element for colorPicker available!');
  }
}
