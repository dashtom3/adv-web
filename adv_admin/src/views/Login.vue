<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">商铺系统登录</h3>
    <el-form-item prop="userName">
      <el-input type="text" v-model="ruleForm.userName" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click="logIn()" :loading="logining">登录</el-button>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click="register()">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import axios from 'axios'
  import global from './global/global'
  export default {
    name: 'login',
    data() {
      return {
        logining: false,
        ruleForm: {
          userName: '',
          password: '',
        },
        rules: {
          userName: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    methods: {
      handleReset2() {
        this.$refs.ruleForm.resetFields();
      },
      logIn: function() {
        var that = this;
        // 发送 POST 请求
        that.$refs.ruleForm.validate((valid) => {
          if (valid) {
            that.logining = true;
            // console.log(global.postHttpData(that.ruleForm))
            axios({
              method: 'post',
              url: global.baseUrl + '/Advertisement/api/user/login',
              data: global.postHttpData(that.ruleForm),
            }).then((res) => {
              console.log(res);
              if (res.data.callStatus === 'SUCCEED') {
                global.setToken(res.data.token)
                global.setUser(res.data.data)
                global.success(that, '登录成功', '/workdesktop')
                that.logining = false;
              } else {
                global.error(that, '账号或者密码错误', '')
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      register: function() {
        var that = this;
        that.$router.push({ path: '/register' });
      }
    }
  }

</script>

<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
