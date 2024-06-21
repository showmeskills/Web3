import { createApp } from 'vue';
import 'vant/lib/index.css'; 
import init from "./init";
import App from './App.vue';

const app = createApp(App);

init(app).mount('#app')
