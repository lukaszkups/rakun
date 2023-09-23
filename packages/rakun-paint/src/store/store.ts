// RakunPaintStore 

interface RakunColor {
  hex: string;
  alpha: string | number;
}

interface RakunPaintStore {
  colors: RakunColor[];
}

export default {
  load() {
    const ls = localStorage.getItem('rakun-paint-store') || '{}';
    return JSON.parse(ls);
  },
  save(state: RakunPaintStore) {
    localStorage.setItem('rakun-paint-store', JSON.stringify(state));
  },
  saveColor(hex: string, alpha: string | number) {
    const state = this.load();
    if (state && state.colors) {
      const colorExists = state.colors.findIndex((color: RakunColor) => color.hex === hex && color.alpha === alpha);
      if (colorExists === -1) {
        state.colors.push({ hex, alpha });
      }
    } else {
      state.colors = [];
      state.colors.push({ hex, alpha });
    }
    this.save(state);
  }
}
