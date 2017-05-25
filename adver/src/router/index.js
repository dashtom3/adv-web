import Vue from 'vue'
import ElementUI from 'element-ui'
import Router from 'vue-router'
// import '../theme/index.css'
import 'element-ui/lib/theme-default/index.css'
import admin from '@/components/admin/admin'
import adm from '@/components/admin/adm'
import merchant from '@/components/admin/merchant'

Vue.use(Router)
Vue.use(ElementUI)

export default new Router({
  mode: 'history',
  hashbang: true,
  routes: [{
    path: '/',
    name: 'admin',
    component: admin
  }, {
    path: '/adm',
    name: 'adm',
    component: adm,
    children: [{
      path: '/admin/merchant',
      name: '商户管理',
      component: merchant
    }]
    // children: [{
    //   path: '/admNews',
    //   name: '新闻管理',
    //   component: admNews
    // }, {
    //   path: '/admUser',
    //   name: '用户管理',
    //   component: admUser
    // }, {
    //   path: '/admProject',
    //   name: '项目管理',
    //   component: admProject
    // }, {
    //   path: '/admActive',
    //   name: '活动管理',
    //   component: admActive
    // }, {
    //   path: '/admNotice',
    //   name: '公告管理',
    //   component: admNotice
    // }, {
    //   path: '/admVideo',
    //   name: '视频管理',
    //   component: admVideo
    // }, {
    //   path: '/admFile',
    //   name: '资料管理',
    //   component: admFile
    // }, {
    //   path: '/admPhotoWall',
    //   name: '照片墙管理',
    //   component: admPhotoWall
    // }]
  }]
})
