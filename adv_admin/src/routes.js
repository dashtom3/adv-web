import Login from './views/Login.vue'
import Register from './views/Register.vue'
import NotFound from './views/404.vue'
import Home from './views/merchant/main_mer.vue'
import Main from './views/Main.vue'
import Userinfo from './views/merchant/basic/userinfo.vue'
import MyProject from './views/merchant/basic/myProject.vue'
import PublishProject from './views/merchant/basic/publishProject.vue'
import MyResource from './views/merchant/basic/MyResource.vue'
import PublishResource from './views/merchant/basic/PublishResource.vue'
import MessageBox from './views/merchant/basic/messageBox.vue'
import Table from './views/merchant/basic/Table.vue'
import Form from './views/merchant/basic/Form.vue'
import user from './views/merchant/basic/user.vue'
import EmployeeAccount from './views/merchant/adv/employeeAccount.vue'
import MyAdv from './views/merchant/adv/myAdv.vue'
import Shield from './views/merchant/adv/shield.vue'
import MyDevice from './views/merchant/adv/myDevice.vue'
import Total from './views/merchant/adv/total.vue'
import Advlist from './views/merchant/adv/advlist.vue'
import Page4 from './views/merchant/adv/Page4.vue'
import Page5 from './views/merchant/adv/Page5.vue'
import WorkDesktop from './views/merchant/work/workDesktop.vue'
import games from './views/merchant/games/gamelist.vue'
// import echarts from './views/charts/echarts.vue'

// 高级管理员
import admin from './views/admin/admin.vue'
import adm from './views/admin/adm.vue'
import merchant from './views/admin/merchant.vue'
import adver from './views/admin/adver.vue'

// 异业合作
import yyhz from './views/yyhz/yyhz.vue'
import companyDetail from './views/yyhz/company/companyDetail.vue'
import projectDetail from './views/yyhz/project/projectDetail.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: 'login',
        hidden: true
    },
    {
        path: '/register',
        component: Register,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/merchant',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        hidden: 'merchant',
        leaf: true,//只有一个节点
        children: [
            { path: '/merchant/workdesktop', component: WorkDesktop, name: '工作桌面' }
        ]
    },
    {
        path: '/merchant',
        component: Home,
        name: '基本信息管理',
        iconCls: 'el-icon-message',//图标样式class
        hidden: 'merchant',
        children: [
            { path: '/merchant/userinfo', component: Userinfo, name: '基本资料' },
            { path: '/merchant/myproject', component: MyProject, name: '我的项目' },
            { path: '/merchant/publishproject', component: PublishProject, name: '发布项目' },
            { path: '/merchant/myResource', component: MyResource, name: '我的资源' },
            { path: '/merchant/publishResource', component: PublishResource , name: '发布资源' },
            { path: '/merchant/messagebox', component: MessageBox, name: '留言箱' }
        ]
    },
    {
        path: '/merchant',
        component: Home,
        name: '广告平台管理',
        iconCls: 'fa fa-id-card-o',
        hidden: 'merchant',
        children: [
            { path: '/merchant/employeeaccount', component: EmployeeAccount, name: '员工账号' },
            { path: '/merchant/myadv', component: MyAdv , name: '播放广告' },
            { path: '/merchant/shield', component: Shield, name: '屏蔽行业' },
            { path: '/merchant/mydevice', component: MyDevice, name: '我的设备' },
            { path: '/merchant/total', component: Total, name: '统计数据' },
            { path: '/merchant/advlist', component: Advlist, name: '广告订单' }
        ]
    },
    {
        path: '/merchant',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        hidden: 'merchant',
        leaf: true,//只有一个节点
        children: [
            { path: '/merchant/games', component: games, name: '游戏管理' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    },
    {
        path: '/',
        hidden: true,
        redirect: { path: '/login' }
    },
    {
    path: '/admin/login',
    name: 'admin',
    component: admin,
    hidden: true
  }, {
    path: '/adm',
    name: 'adm',
    component: adm,
    hidden: 'admin',
    children: [{
      path: '/admin/merchant',
      name: '商户管理',
      component: merchant
    }, {
      path: '/admin/adver',
      name: '广告管理',
      component: adver
    }]
  },
  {
    path: '/yyhz',
    component: yyhz
  },
  {
    path: '/companyDetail/:id',
    component: companyDetail
  },
  {
    path: '/projectDetail/:id',
    component: projectDetail
  }
];

export default routes;
