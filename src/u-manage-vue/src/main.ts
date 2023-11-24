import './assets/css/style.css';
import './assets/css/dark.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { createElectron } from '@/hooks/electron';

const app = createApp(App);

app.use(createElectron());
app.use(createPinia());
app.use(router);

app.mount('#app');
