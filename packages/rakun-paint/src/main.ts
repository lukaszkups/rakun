import '@/styles/style.scss';
import { createApp } from 'vue'
import App from './App.vue'
import RakunPaintStore from './store/store';

const app = createApp(App);

app.use(RakunPaintStore)

app.mount('#app');
