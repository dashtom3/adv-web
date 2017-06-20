<template>
<div>
  <div class="section">
    <div class="container">
      <div class="header">
        <div class="logo">
          <a href="http://www.shichangbu.com/">
            <img src="../../images/logo.png" alt="">
          </a>
        </div>
        <div class="navbar">
          <ul class="navlist">
            <li v-for="(navbar, index) in navbarLists"  class="nav"><a :href="navbar.url" target="_blank" class="navfont">{{navbar.data}}<i class="caret" v-if="navbar.secondNavLists"></i></a>
              <ul class="secondNav" v-if="navbar.secondNavLists">
                <li v-for="secondNav in navbar.secondNavLists" class="secondFont">
                  <a :href="secondNav.url" target="_blank">{{secondNav.data}}<i>&gt;</i></a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="headerRight">
          <el-input icon="search" class="inputStyle"></el-input>
          <!-- <input type="text" name="" value=""> -->
          <a href="javascript:;" v-on:click="showLogin" :class="{active: loginShow}" v-if="!isLogin">登录</a>
          <span v-if="!isLogin">/</span>
          <a href="javascript:;" v-on:click="showRegister" :class="{active: registerShow}" v-if="!isLogin">注册</a>
          <!-- <span v-if="isLogin">我是小明</span> -->
          <span v-if="isLogin"><img src="../../images/head.png" alt="" class="tx"></span>
          <span v-if="isLogin"><a href="/merchant/workdesktop">进入商铺管理</a></span>
        </div>
      </div>
    </div>
  </div>
  <!-- 登录注册页面 -->
  <div class="loginContent">
    <div class="loginContentWidth">
      <!-- 注册 -->
      <el-collapse-transition>
        <div v-show="registerShow">
          <div class="h20"></div>
          <div class="loginFormData">
            <div class="formData">
              <p class="spzc">商铺注册</p>
              <div class="formDataLeft">
                <input type="text" placeholder="手机号/邮箱/会员"><br>
                <input type="password" placeholder="密码"><br>
                <input type="text" placeholder="商铺名"><br>
                <input type="text" placeholder="商铺全称"><br>
              </div>
              <div class="formDataLeft">
                <div class="a-upload">
                  <span>上传logo</span>
                  <a href="javascript:;"><input type="file" id="file" value="上传文件"><i class="el-icon-plus"></i></a>
                </div>
              </div>
              <div class="dl">
                <input type="button" value="注册" :disabled="!check" :class="{disable: !check}" v-on:click="register" style="margin-bottom:10px;"><br>
                <el-checkbox v-model="check"><span class="ch">同意市场部</span><span class="cr">网站服务条款</span></el-checkbox>
              </div>
            </div>
          </div>
          <div class="h20"></div>
        </div>
      </el-collapse-transition>
      <!-- 登录 -->
      <el-collapse-transition>
        <div v-show="loginShow">
          <div class="h20"></div>
          <div class="registFormData">
            <div class="registerForm">
              <div class="h90"></div>
              <p class="spdl">商铺登录</p>
              <input type="text" placeholder="手机号/邮箱/会员" v-model="loginInfo.userName"><br>
              <input type="password" placeholder="密码" v-model="loginInfo.password"><br>
              <a href="#" class="forgetPwd"><span>忘记密码</span></a>
              <div class="zc">
                <input type="button" name="" value="登录" v-on:click="loginSubmit">
              </div>
              <!-- <p><a href="javascript:;"><img src="../../images/qqLogin.png" alt=""></a></p> -->
            </div>
          </div>
          <div class="h20"></div>
        </div>
      </el-collapse-transition>
    </div>
  </div>
</div>
</template>

<script>
import global from '../global/global'
import axios from 'axios'
export default {
  props: ['args', 'projectDetailInfo'],
  data () {
    return {
      loginShow: false,
      registerShow: false,
      check: false,
      isLogin: false,
      userinfo: global.getUser(),
      loginInfo: {
        userName: null,
        password: null
      },
      navbarLists: [
        { data: '首页', url: 'http://www.shichangbu.com/' },
        { data: '知识库', url: 'http://www.shichangbu.com/knowledge/' },
        { data: '异业合作', url: 'javascript:showNavlists();' },
        { data: '服务商', url: 'http://www.shichangbu.com/agency/' },
        { data: '学院', url: 'http://www.shichangbu.com/edu/' },
        { data: '问答', url: 'http://www.shichangbu.com/forum-52-1.html' },
        { data: '助手',
          url: 'javascript:;',
          secondNavLists: [
          { data: '软文发稿', url: 'http://www.fagaoshi.com/' },
          { data: '视频拍摄', url: 'http://www.shichangbu.com/zhuantiye/shipin/' },
          { data: '数字广告', url: 'http://www.shumeitong.cn' },
          { data: '短信营销', url: 'http://www.shichangbu.com/zhuantiye/edm/sms.html' },
          { data: '邮件营销', url: 'http://www.shichangbu.com/zhuantiye/edm/email.html' }
          ] },
        { data: '社群',
          url: 'javascript:;',
          secondNavLists: [
          { data: '活动', url: 'http://www.shichangbu.com/events/' },
          { data: '论坛', url: 'http://www.shichangbu.com/forum-44-1.html' },
          { data: '资料下载', url: 'http://www.shichangbu.com/forum-121-1.html' }
          ] }
      ]
    }
  },
  created () {
    console.log(this.projectDetailInfo)
    if (global.getToken()) {
      this.isLogin = true
    }
  },
  methods: {
    showLogin () {
      this.registerShow = false
      this.loginShow = !this.loginShow
    },
    showRegister () {
      this.loginShow = false
      this.registerShow = !this.registerShow
    },
    // 登录
    loginSubmit () {
      axios.post(global.baseUrl + 'user/login', global.postHttpData(this.loginInfo))
      .then((res) => {
        if (res.data.callStatus === 'SUCCEED') {
          global.setToken(res.data.token)
          global.setUser(res.data.data)
          global.success(this, '登录成功', '/yyhz')
          location.reload()
        } else {
          global.error(this, res.data.data, '')
        }
      })
    },
    register () {
      console.log(123)
    },
    showNavlists () {
      console.log(123)
    }
  },
  watch: {
    args () {
      this.showRegister()
    },
    projectDetailInfo () {
      console.log(this.projectDetailInfo.login)
    }
  }
}
</script>

<style lang="css">
.transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #20A0FF;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
  .loginContentWidth{
    width: 1200px;
    margin: 0 auto;
  }
  .ch{
    color: #b8b8b8;
    font-size: 12px;
  }
  .cr{
    color: #e15310;
    font-size: 12px;
  }
  .h90{
    height: 90px;
  }
  .loginContent{
    background: url('../../images/bg.png') center;
    margin: 0px auto;
    position: relative;
    /*opacity: .9;*/
  }
  .registerForm{
    width: 400px;
    height: 460px;
    position: absolute;
    right: 20px;
    background-color: #fff;
    text-align: center;
  }
.section{
  width: 100%;
  height: 92px;
  /*line-height: 92px;*/
  border-bottom: 1px solid #dcdcdc;
  box-sizing: border-box;
}
.container{
  width: 1200px;
  margin: 0 auto;
}
.logo,.navbar,.headerRight{
  /*display: inline-block;*/
  float: left;
}
.h20{
  height: 20px;
}
.nav{
  /*float: left;*/
  display: inline-block;
  position: relative;
  margin-right: 25px;
  top: 20px;
  /*height: px;*/
  /*line-height: 92px;*/
}
.loginContent{
  clear: both;
}
.dl{
  text-align: center;
  margin-top: 20px;
}
.registFormData{
  /*width: 400px;*/
  height: 461px;
  position: relative;
  /*background-color: #fff;*/
  /*float: right;*/
}
.forgetPwd{
  /*text-align: right;*/
  /*float: right;*/
  position: relative;
  font-size: 12px;
  color: #000;
  right: -115px;
  top: -20px;
}
.zc input{
  width: 280px!important;
height: 40px;
/*padding-left: 20px;
margin-bottom: 30px;*/
border: none;
outline: none;
background-color: #df4700!important;
color: #fff;
cursor: pointer;
font-size: 14px;
}
/*.forgetPwd sapn{
  position: absolute;
  right:
}*/
.dl input{
  width: 280px;
  height: 40px;
  background-color: #df4700;
  color: #fff;
  text-align: center;
  outline: none;
  border: none;
  cursor: pointer;
  margin-bottom: 5px;
}
/*.a-upload {
    padding: 4px 10px;
    height: 160px;
    width: 112px;
    line-height: 40px;
    text-align: center;
    position: relative;
    cursor: pointer;
    color: #888;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
    display: inline-block;
    *display: inline;
    *zoom: 1;
}*/
.a-upload span{
  display: inline-block;
  vertical-align: middle;
}
.a-upload a{
  display: inline-block;
  vertical-align: middle;;
  /*float: left;*/
  width: 115px;
  height: 115px;
  color:#ff9b3c!important;
  position: relative;
  text-align: center;
  line-height: 115px;
  border: 1px solid #ebebeb;
  margin-left: 20px;
  /*top: 30px;*/
}
.a-upload  input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer;
    height: 100%!important;
    width: 115px!important;
    padding: 0!important;
    margin: 0!important;
}
.navfont{
  font-size: 18px;
  color: #000;
  display: inline-block;
  margin-bottom: 31px;
}
.navbar ul li a:hover{
  cursor: pointer;
  color: #ee7641;
}
.formData{
  width: 645px;
  height: 460px;
  margin:0px auto;
  background-color: #fff;
}
.navlist{
  padding-left: 40px;
  margin-top: 15px!important;
}
.formDataLeft{
  display: inline-block;
  vertical-align: middle;
  margin: 20px 0 0 30px;
}
.formDataLeft:last-child{
  margin-left: 66px;
}
.formDataLeft input,.registerForm input{
  width: 260px;
  height: 40px;
  padding-left:20px;
  margin-bottom: 30px;
  border: none;
  outline: none;
  background-color: #eeeeee;
}
.logo{
  margin-top: 15px;
}
.secondNav{
  position: absolute;
  width: 100px;
  padding:0px;
  display: none;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0,0,0,.175);
  z-index: 999;
}
.secondNav li{
  padding: 0 10px;
}
.nav:hover .secondNav{
  display: block;
}
.logo::after{
  content: '';
  display: inline-block;
  background-color: #dddddd;
  width: 1px;
  height: 50px;
  top: 60%;
  position: relative;
  left: 20px;
  /*transform: translateY(-50%);*/
}
.secondFont{
  padding: 0 10px;
}
.secondFont a{
  font-size: 16px;
  color: #000;
  line-height: 40px;
}
.caret{
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: 2px;
  vertical-align: middle;
  border-top: 4px dashed;
  border-top: 4px solid\9;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
  color: #ee7641;
  margin-left: 9px;
}
.secondFont i{
  float: right;
}
.headerRight{
  height: 92px;
  line-height: 92px;
  float: right;
}
.inputStyle{
  width: 150px;
  margin-right: 30px;
}
.inputStyle input{
  border-radius: 20px;
}
.inputStyle input:focus,.dl .el-checkbox__inner:hover{
  border: 1px solid #e95412!important;
}
.dl .el-checkbox__input.is-checked .el-checkbox__inner{
  border: 1px solid #e95412;
  background-color: #e95412;
}
.headerRight a{
  font-size: 14px;
  color: #000;
}
.headerRight a:hover{
  cursor: pointer;
  color: #ee7641;
}
.loginFormData{
  position: relative;
  height: 461px;
}
.loginFormData .formData{
  position: absolute;
  right: 20px;
}
a.active{
  cursor: pointer;
  color: #ee7641;
}
.spzc{
  margin: 20px 0 0;
  font-size: 18px;
  text-align: center;
}
.spdl{
  margin: 0 0 20px 0;
  font-size: 18px;
  text-align: center;
}
.disable{
  background-color: #e2e2e2!important;
}
.tx{
  max-width: 20px;
  max-height: 20px;
  border-radius: 50%;
}
.headerRight span{
  display: inline-block;
  vertical-align: middle;
}
</style>
