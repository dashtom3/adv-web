import Login from './views/Login.vue'
import Register from './views/Register.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Userinfo from './views/nav1/userinfo.vue'
import MyProject from './views/nav1/myProject.vue'
import PublishProject from './views/nav1/publishProject.vue'
import MyResource from './views/nav1/MyResource.vue'
import PublishResource from './views/nav1/PublishResource.vue'
import MessageBox from './views/nav1/messageBox.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import EmployeeAccount from './views/nav2/employeeAccount.vue'
import MyAdv from './views/nav2/myAdv.vue'
import Shield from './views/nav2/shield.vue'
import MyDevice from './views/nav2/myDevice.vue'
import Total from './views/nav2/total.vue'
import Advlist from './views/nav2/advlist.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import WorkDesktop from './views/nav3/workDesktop.vue'
import echarts from './views/charts/echarts.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
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
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/workdesktop', component: WorkDesktop, name: '工作桌面' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '基本信息管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/userinfo', component: Userinfo, name: '基本资料' },
            { path: '/myproject', component: MyProject, name: '我的项目' },
            { path: '/publishproject', component: PublishProject, name: '发布项目' },
            { path: '/myResource', component: MyResource, name: '我的资源' },
            { path: '/publishResource', component: PublishResource , name: '发布资源' },
            { path: '/messagebox', component: MessageBox, name: '留言箱' },
            { path: '/table', component: Table, name: 'Table' },
            { path: '/form', component: Form, name: 'Form' },
            { path: '/user', component: user, name: '列表' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '广告平台管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/employeeaccount', component: EmployeeAccount, name: '员工账号' },
            { path: '/myadv', component: MyAdv , name: '我的广告' },
            { path: '/shield', component: Shield, name: '屏蔽行业' },
            { path: '/mydevice', component: MyDevice, name: '我的设备' },
            { path: '/total', component: Total, name: '统计数据' },
            { path: '/advlist', component: Advlist, name: '广告订单' },
            { path: '/page4', component: Page4, name: '页面4' },
            { path: '/page5', component: Page5, name: '页面5' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;