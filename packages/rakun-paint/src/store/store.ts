import { createStore } from 'vuex';
import { ColorType, KeyableInterface } from 'helpers/types';
import { Tools } from '@/helpers/enums';

interface UpdatePropPayload {
  name: string;
  value: any;
}

const store = createStore({
  state() {
    return {
      colors: [],
      selectedColor: '#000000',
      selectedOpacity: 100,
      canvasWidth: 32,
      canvasHeight: 32,
      fps: 60,
      zoom: 20,
      canvasHoverCtx: null,
      canvasGridCtx: null,
      canvasImageCtx: null,
      canvasThumbnailCtx: null,
      selectedTool: Tools.pencil,
    };
  },
  mutations: {
    updateProp(state: KeyableInterface, payload: UpdatePropPayload) {
      state[payload.name] = payload.value;
    },
  },
  actions: {
    updateProp(context: KeyableInterface, payload: UpdatePropPayload) {
      context.commit('updateProp', payload);
      context.dispatch('saveState'); // TODO - if poor performance then disable this
    },
    loadSavedState(context: KeyableInterface) {
      const savedState = JSON.parse(
        localStorage.getItem('rakun-paint-store') || '{}',
      );
      Object.keys(savedState).forEach((key) => {
        // console.log(key, savedState[key]);
        if (context.state.hasOwnProperty(key)) {
          context.commit('updateProp', { name: key, value: savedState[key] });
        }
      });
    },
    saveState(context: KeyableInterface) {
      localStorage.setItem(
        'rakun-paint-store',
        JSON.stringify(context.state || {}),
      );
    },
    updateSelectedColor(context: KeyableInterface, payload: ColorType) {
      context.commit('updateProp', {
        name: 'selectedColor',
        value: payload.hex,
      });
      context.commit('updateProp', {
        name: 'selectedOpacity',
        value: payload.alpha,
      });
    },
    // this method returns color index from saved colors (if exists) - for highlighting purposes (UX)
    saveColorToPalette(context: KeyableInterface, payload: ColorType) {
      const existingColorIndex = context.state.colors.findIndex(
        (color: ColorType) =>
          color.hex === payload.hex && color.alpha === payload.alpha,
      );
      if (existingColorIndex > -1) {
        return existingColorIndex;
      } else {
        const colors = [...context.state.colors];
        colors.push(payload);
        context.commit('updateProp', { name: 'colors', value: colors });
        return -1;
      }
    },
    // payload is index of the color in palette colors array
    removeColorFromPalette(context: KeyableInterface, payload: number) {
      const colors = [...context.state.colors];
      colors.splice(payload, 1);
      context.commit('updateProp', { name: 'colors', value: colors });
    },
  },
});

export default store;
