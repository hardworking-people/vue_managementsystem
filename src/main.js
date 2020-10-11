import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/common.less'
import axios from 'axios'
import { Button, Form, Select, FormItem, Input, Notification, Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Form)
Vue.use(Button)
Vue.use(Select)
Vue.use(FormItem)
Vue.use(Input)
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
