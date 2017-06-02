<template>
    <el-menu class="el-menu-vertical-demo" :default-active="routerActive" router>
    <el-menu-item v-for="nav in navbar" :key="nav" :index="nav.url">
      <i :class="nav.className"></i>{{nav.name}}
    </el-menu-item>
  </el-menu>
  </el-col>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      routerActive: this.$route.path,
      navbar: [
        { url: '/admin/merchant', className: 'el-icon-menu', name: '商户管理' },
        { url: '/admin/adver', className: 'el-icon-document', name: '广告管理' },
        { url: '/admin/dataview', className: 'el-icon-message', name: '数据查看' }
      ]
    }
  }
}
</script>
