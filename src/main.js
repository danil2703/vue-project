import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify'
import RegForm from './components/RegForm'
import Contacts from './components/Contacts'
import AuthForm from './components/AuthForm'
import Block from './components/Block'
import NotFound from './components/NotFound'
import store from './store/store'
import '@mdi/font/css/materialdesignicons.css'


Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
  { path: '/', component: AuthForm },
  { path: '/reg', component: RegForm },
  { path: '/contacts', component: Contacts },
  { path: '/block', component: Block},
  { path: '*', component: NotFound }
]

const router = new VueRouter({
  routes 
})

new Vue({
  router,
  vuetify,
  store,
  icons: {
    iconfont: 'mdi',
  },

  render: h => h(App)
}).$mount('#app')
