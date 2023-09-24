import { createStore, context, state } from 'vuex';
import { ColorType } from '@/helpers/types';

interface UpdatePropPayload {
  name: string;
  value: any;
}

const store = createStore({
  state () {
    return {
      colors: [],
      selectedColor: '#000000',
      selectedOpacity: 100,
    }
  },
  mutations: {
    updateProp(state: state, payload: UpdatePropPayload) {
      state[payload.name] = payload.value;
    }
  },
  actions :{
    updateProp(context: context, payload: UpdatePropPayload) {
      context.commit('updateProp', payload);
      context.dispatch('saveState'); // TODO - if poor performance then disable this
    },
    loadSavedState(context: context) {
      const savedState = JSON.parse(localStorage.getItem('rakun-paint-store') || '{}');
      Object.keys(savedState).forEach((key) => {
        // console.log(key, savedState[key]);
        if (context.state.hasOwnProperty(key)) {
          context.commit('updateProp', { name: key, value: savedState[key] });
        }
      });
    },
    saveState(context: context) {
      localStorage.setItem('rakun-paint-store', JSON.stringify(context.state || {}));
    },
    updateSelectedColor(context: context, payload: ColorType) {
      context.commit('updateProp', { name: 'selectedColor', value: payload.hex });
      context.commit('updateProp', { name: 'selectedOpacity', value: payload.alpha });
    },
    // this method returns color index from saved colors (if exists) - for highlighting purposes (UX)
    saveColorToPalette(context: context, payload: ColorType) {
      const existingColorIndex = context.state.colors.findIndex((color: ColorType) => color.hex === payload.hex && color.alpha === payload.alpha);
      if (existingColorIndex > -1) {
        return existingColorIndex;
      } else {
        const colors = [...context.state.colors];
        colors.push(payload);
        context.commit('updateProp', { name: 'colors', value: colors });
        return -1;
      }
    }
  }
});

export default store;
