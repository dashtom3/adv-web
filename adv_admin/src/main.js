import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
//import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import routes from './routes'
// import Mock from './mock'
// Mock.bootstrap();
import 'font-awesome/css/font-awesome.min.css'
import global from './views/global/global'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.filter('time', function (value) {
  if (value) {
    var month = new Date(parseInt(value)).getMonth() + 1
    var date = new Date(parseInt(value)).getDate()
    var hour = new Date(parseInt(value)).getHours()
    var minutes = new Date(parseInt(value)).getMinutes()
    var seconds = new Date(parseInt(value)).getSeconds()
    if (minutes < 10) {
      minutes = '0' + minutes
    }
    if (seconds < 10) {
      seconds = '0' + seconds
    }
    if (hour < 10) {
      hour = '0' + hour
    }
    if (month < 10) {
      month = '0' + month
    }
    if (date < 10) {
      date = '0' + date
    }
    return new Date(parseInt(value)).getFullYear() + '-' + month + '-' + date + ' ' + hour + ':' + minutes + ':' + seconds
  }
})

//NProgress.configure({ showSpinner: false });

const router = new VueRouter({
  mode: 'history',
  routes
})

// router.beforeEach((to, from, next) => {
//   //NProgress.start();
//   if (to.path == '/login') {
//   	let adverToken = global.getToken();
//     localStorage.removeItem('adverToken');
//   }
//   let adverToken = global.getToken();
//   if (!adverToken && to.path != '/login' && to.path != '/register') {
//     next({ path: '/login' })
//   } else {
//     next()
//   }
// })

//router.afterEach(transition => {
//NProgress.done();
//});

new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app')
