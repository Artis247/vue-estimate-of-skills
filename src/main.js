import { createApp } from 'vue'
import App from './App.vue'
import store from './vuex/store'
import 'material-design-icons-iconfont'

createApp(App).
use(store).
mount('#app')

