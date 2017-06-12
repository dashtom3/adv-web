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
            <li v-for="navbar in navbarLists"  class="nav"><a :href="navbar.url" target="_blank" class="navfont">{{navbar.data}}<i class="caret" v-if="navbar.secondNavLists"></i></a>
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
          <a href="javascript:;" v-on:click="showLogin">登录</a>
          <span>/</span>
          <a href="javascript:;" v-on:click="showRegister">注册</a>
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
          <div class="formData">
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
              <input type="button" name="" value="注册"><br>
              <el-checkbox><span class="ch">同意市场部</span><span class="cr">网站服务条款</span></el-checkbox>
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
              <input type="text" placeholder="手机号/邮箱/会员"><br>
              <input type="password" placeholder="密码"><br>
              <a href="#" class="forgetPwd"><span>忘记密码</span></a>
              <div class="zc">
                <input type="button" name="" value="登录">
              </div>
              <p><a href="javascript:;"><img src="../../images/qqLogin.png" alt=""></a></p>
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
export default {
  data () {
    return {
      loginShow: false,
      registerShow: false,
      navbarLists: [
        { data: '首页', url: 'http://www.shichangbu.com/' },
        { data: '知识库', url: 'http://www.shichangbu.com/knowledge/' },
        { data: '异业合作', url: 'http://www.shichangbu.com/yiye/' },
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
  methods: {
    showLogin () {
      this.registerShow = false
      this.loginShow = !this.loginShow
    },
    showRegister () {
      this.loginShow = false
      this.registerShow = !this.registerShow
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
  margin-right: 38px;
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
  margin: 50px 0 0 30px;
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
}
.inputStyle{
  width: 150px;
  margin-right: 30px;
}
.inputStyle input{
  border-radius: 20px;
}
.headerRight a{
  font-size: 14px;
  color: #000;
}
.headerRight a:hover{
  cursor: pointer;
  color: #ee7641;
}
</style>
