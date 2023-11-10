import './assets/css/style.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import { initElectron } from '@/hooks/electron';

const app = createApp(App);

initElectron(app);

app.use(createPinia());
app.use(router);

app.mount('#app');
