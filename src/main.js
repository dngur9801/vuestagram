import { createApp } from 'vue';
import App from './App.vue';
import mitt from 'mitt';
import router from './router';
let emitter = mitt();
let app = createApp(App);
app.config.globalProperties.emitter = emitter;

import store from './store.js';

app.use(store);
app.use(router);
app.mount('#app');
