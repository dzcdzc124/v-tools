import './plugins/bootstrap-vue'
import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'vue-toast-notification/dist/theme-bootstrap.css';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.mount('#app')
