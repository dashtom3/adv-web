<template>
  <div class="detail">
    <v-header></v-header>
    <div class="detailContainer">
      <div class="h10"></div>
      <div class="detailContent project">
        <div class="detailDiv">
          <div class="detailDivContent">
            <div class="detailDivContentHeader">
              <div class="headerImg borad">
                <img :src="sourceInfo.fileSrc" alt="" class="max100">
              </div>
              <div class="headerTitle">
                <span class="titelName">{{sourceInfo.name}}</span><br><br><br>
                <div class="detailDivContentHeaderRight">
                  <!-- <p><span class="iconsc"></span><span>收藏</span></p>
                  <p><span class="iconly"></span><span>留言</span></p>
                  <p><input type="button" name="" value="查看联系方式"></p> -->
                </div>
              </div>
              <div class="arrow">
                <img src="../../../images/arrow.png" alt="">
              </div>
              <div class="fr">
                <img src="../../../images/sourceDetail.png" alt="">
              </div>

            </div>
            <!-- <div class="detailInfo">
              <p class="jj">公司简介</p>
              <p class="infoMsg">51Talk无忧英语， 美国纽交所上市公司，全球信赖的在线英语教育品牌。美国小学、青少英语、成人英语。100%真人外</p>
            </div> -->
          </div>
        </div>
        <div class="partners">
          <p class="jj projectName">{{sourceInfo.name}}</p>
          <p class="contentFooter cen">
            <span class="kindLogo"></span><span>{{sourceInfo.type}}</span>
            <span class="foruser"></span><span>{{sourceInfo.userGroup}}</span>
            <span class="contTime"></span><span>{{sourceInfo.endDate | date}}截至</span>
            <!-- <span class="iconsc"></span><span>收藏</span> -->
          </p>
          <p>{{sourceInfo.content}}</p>
          <!-- <p class="apply">
            <input type="button" name="" value="申请合作" v-on:click="apply">
          </p> -->
        </div>
        <div class="contact" style="margin-top:20px;">
          <p class="lxfs">联系方式：</p>
          <div class="contLx" v-if="!userToken">
            <img src="../../../images/msg.png" alt="">
            <div class="">
              <!-- <p>登录后可查看联系方式、留言</p> -->
                <p class="errMsg">登录后可查看联系方式、留言</p>
              <!-- <a href="javascript:;" class="button">登录</a>
              <a href="javascript:;" class="button">注册</a> -->
            </div>
          </div>
          <div class="contLx msg" v-if="userToken">
            <ul class="msgInfo">
              <li>联系人:</li>
              <li>部门:</li>
              <li>职位:</li>
              <li>公司固话:</li>
              <li>邮箱:</li>
            </ul>
          </div>
          <div class="contLx ly" v-if="userToken">
            <p class="lxfs">留言：</p>
            <textarea type="text" name="" value="" v-model="message.content"></textarea>
            <a href="javascript:;" class="button submit" >提交</a>
          </div>
        </div>
        <div class="contact">
          <!-- <div class="">
            <img src="../../../images/change.png" alt="">
          </div> -->
          <div class="applyCompany">
            <p class="applyCompanyTitle">合作公司({{applyCompanyLists.length}})</p>
            <ul>
              <li v-for="applyCompany in applyCompanyLists"><a href="javascript:;">
                <div class="middle">
                  <span></span>
                  <img :src="applyCompany.applyLogo" alt="">
                </div>
                <p>{{applyCompany.applyRealName}}</p>
              </a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="h65"></div>
    </div>
    <!-- <v-footer></v-footer> -->
  </div>
</template>

<script>
import kindLogo from '../../../images/kindLogo.gif'
import header from '../header'
// import footer from '../footer'
import photo from '../../../images/photo.png'
import global from '../../global/global'
export default {
  data () {
    return {
      photos: [photo, photo, photo, photo, photo, photo],
      applyCompanyLists: [],
      sourceDetailArgs: {
        resourceId: this.$route.params.id
      },
      sourceInfo: {},
      userinfo: global.getUser(),
      userToken: global.getToken(),
      userMsg: global.getUser(),
      message: {
        content: null,
        type: '3',
        projectId: this.$route.params.id
      }
    }
  },
  created () {
    this.getSourceDetail(this.sourceDetailArgs)
    this.getCooperationLIsts(this.sourceDetailArgs)
  },
  methods: {
    getSourceDetail (args) {
      // console.log(args)
      global.axiosGetReq('resource/getResourceDetails?', args)
      .then((res) => {
        // console.log(res)
        this.sourceInfo = res.data.data
      })
    },
    getCooperationLIsts (args) {
      global.axiosGetReq('resource/getApplyList?', args)
      .then((res) => {
        // console.log(res)
        this.applyCompanyLists = res.data.data
      })
    },
    // 申请合作
    apply () {
      if (!global.getToken()) {
        alert('请先登录')
      }
    }
  },
  components: {
    'v-header': header
    // 'v-footer': footer
  }
}
</script>

<style lang="css">
@import "../style.css";
.project{
  width: 1158px !important;
  margin: 0 auto;
}
.h10{
  height: 10px;
}
.h65{
  height: 65px;
}
.projectName,.cen{
  text-align: center;
  margin: 40px auto;
}
.cen .foruser,.cen .contTime,.cen .iconsc{
  margin-left: 100px;
}
.apply{
  text-align: center;
  margin: 0px;
}
.apply input{
  font-size: 14px;
    color: #fff;
    border-radius: 4px;
    background-color: rgb(233, 84, 18);
    width: 160px;
    height: 40px;
    border: none;
    outline: none;
    cursor: pointer;
    margin: 20px auto 0;
}
.applyCompany{
  border-width: 1px;
  border-color: rgb(191, 191, 191);
  border-style: solid;
  width: 1138px;
  padding: 10px;
  min-height: 158px;
  overflow: hidden;
  margin-top: 40px;
}
.applyCompanyTitle{
  font-size: 20px;
  font-family: "MicrosoftYaHei";
  color: rgba(0, 0, 0, 0.8);
  font-weight: bold;
  position: relative;
  left: 5px;
}
.applyCompany ul{
  margin-left: 20px;
}
.applyCompany ul li{
  width: 120px;
  float: left;
  text-align: center;
  margin-right: 20px;
  margin-top: 20px;
}
.applyCompany ul li:nth-child(8n){
  margin-right: 0;
}
.partners{
  width: 1160px;
}
.applyCompany ul li div{
  width: 120xp;
  height: 120px;
  border: 1px solid rgb(234, 234, 234);
}
.applyCompany ul li img{
  max-width: 120px;
  max-height: 120px;
  display: inline-block;
  vertical-align: middle;
}
.middle span{
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
.applyCompany p{
  margin: 0;
}
.middle+p{
  margin: 20px auto;
  font-size: 14px;
  font-family: "MicrosoftYaHei";
  color: rgba(0, 0, 0, 0.8);
}
.borad img{
  border-radius: 50%;
}
.arrow{
  display: inline-block;
  vertical-align: middle;
  position: relative;
  left: 80px;
  top: 50px;
}
.fr{
  float: right;
}
.max100{
  max-width: 100px;
  max-height: 100px;
}
</style>
