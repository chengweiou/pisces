import App from './App.vue'

import { createApp } from 'vue'
import { router } from './router'
import { store } from './store'
import { i18n } from './i18n'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import ElInputDiv from '@/component/el/el-input-div.vue'

import './assets/css/global.css'

const app = createApp(App)
app
  .use(router)
  .use(store)
  .use(i18n)
  .use(ElementPlus, { size: 'mini', zIndex: 0 })
  .component('ElInputDiv', ElInputDiv)

app.mount('#app')
