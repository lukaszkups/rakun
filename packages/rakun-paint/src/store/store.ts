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
    },
    loadSavedState(context: context) {
      const savedState = JSON.parse(localStorage.getItem('rakun-paint-store') || '{}');
      Object.keys(savedState).forEach((key) => {
        // console.log(key, savedState[key]);
        context.commit('updateProp', { name: key, value: savedState[key] });
      });
    },
    saveState(context: context) {
      console.log(context);
      localStorage.setItem('rakun-paint-store', JSON.stringify(context.store.state || {}));
    },
    updateSelectedColor(context: context, payload: ColorType) {
      context.commit('updateProp', { name: 'selectedColor', value: payload.hex });
      context.commit('updateProp', { name: 'selectedOpacity', value: payload.alpha });
    }
  }
});

export default store;
