<template>
  <div class="detail">
    <v-header></v-header>
    <div class="detailContainer">
      <div class="detailContent">
        <div class="detailDiv">
          <div class="detailDivContent">
            <div class="detailDivContentHeader">
              <div class="headerImg">
                <img :src="companyInfo.logo" alt="" class="max100">
              </div>
              <div class="headerTitle">
                <span class="titelName">{{companyInfo.realName}}</span><br>
                <span class="realName">公司全称：{{companyInfo.allName}}</span><br>
                <span class="hz">合作地区: {{companyInfo.region}}</span><br>
                <span class="address"> 详细地址：{{companyInfo.address}}</span>
              </div>
              <div class="detailDivContentHeaderRight">
                <p><span class="iconsc"></span><span>收藏</span></p>
                <p><span class="iconly"></span><span>留言</span></p>
                <p><input type="button" name="" value="查看联系方式"></p>
              </div>
            </div>
            <div class="detailInfo">
              <p class="jj">公司简介</p>
              <p class="infoMsg">{{companyInfo.intro}}</p>
            </div>
            <div class="detailPhotos">
              <p class="jj">公司相册</p>
              <p class="photos">
                <ul>
                  <li v-for="photo in photos"><img :src="photo.fileSrc" alt=""></li>
                </ul>
              </p>
            </div>
          </div>
        </div>
        <div class="contact" style="margin-top:20px;">
          <p class="lxfs">联系方式：</p>
          <div class="contLx" v-if="!userToken">
            <img src="../../../images/msg.png" alt="">
            <div class="">
              <p class="errMsg">登录后可查看联系方式、留言</p>
              <!-- <a href="javascript:;" class="button">登录</a>
              <a href="javascript:;" class="button">注册</a> -->
            </div>
          </div>
          <div class="contLx msg w1200" v-if="userToken">
            <ul class="msgInfo">
              <li>联系人:{{companyInfo.contact}}</li>
              <li>部门:{{companyInfo.department}}</li>
              <li>职位:{{companyInfo.position}}</li>
              <li>公司固话:{{companyInfo.phone}}</li>
              <li>邮箱:{{companyInfo.email}}</li>
            </ul>
          </div>
          <div class="contLx ly w1200" v-if="userToken">
            <p class="lxfs">留言：</p>
            <textarea type="text" name="" value="" v-model="message.content"></textarea>
            <a href="javascript:;" class="button submit" >提交</a>
          </div>
        </div>
        <div class="partners">
          <p class="jj">合作项目</p>
          <div class="listLeft detialLeft">
            <ul>
              <li v-for="project in togetherProject">
                <a href="javascript:;">
                  <div class="img">
                    <img :src="project.fileSrc" alt="">
                  </div>
                  <div class="listContent">
                    <p class="contentTitle">{{project.content}}</p>
                    <p class="contentFooter">
                        <span class="kindLogo"></span>
                        <span>{{project.type}}</span>
                        <span class="foruser"></span>
                        <span>{{project.userGroup}}</span>
                        <span style="float:right;"><span class="contTime"></span>
                        <span>{{project.endDate | time}}</span></span>
                    </p>
                  </div>
                </a>
              </li>
            </ul>
            <!-- 分页 -->
            <!-- <div class="">
              <page v-on:page="changePage" :args="projectArgs"></page>
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import kindLogo from '../../../images/kindLogo.gif'
import header from '../header'
import footer from '../footer'
import photo from '../../../images/photo.png'
import global from '../../global/global'
export default {
  data () {
    return {
      photos: [],
      togetherProject: [],
      companyArgs: {
        userId: this.$route.params.id
      },
      companyPhotos: {
        userId: null,
        numberPerPage: 6
      },
      userToken: global.getToken(),
      userMsg: global.getUser(),
      message: {
        content: null,
        type:'1',
        projectId: this.$route.params.id
      },
      companyInfo: {}
    }
  },
  created () {
    this.getCompanyDetail(this.companyArgs)
  },
  methods: {
    getCompanyDetail (args) {
      global.axiosGetReq('company/getCompanyDetails?', args)
      .then((res) => {
        console.log(res)
        if (res.data.callStatus === 'SUCCEED') {
          this.companyInfo = res.data.data
          this.companyPhotos.userId = res.data.data.id
          this.getCompanyPhotos(this.companyPhotos)
          // this.getCompanyInfo(res.data.data.id)
        } else {
          global.error(this, res.data.data, '')
        }
      })
    },
    // 公司信息
    getCompanyInfo (userId) {
      var obj = {
        userId: userId
      }
      global.axiosGetReq('')
    },
    getCompanyPhotos (args) {
      global.axiosGetReq('photo/getPhotoList?numberPerPage=6', args)
      .then((res) => {
        // console.log(res)
        this.photos = res.data.data
        this.companyPhotos.numberPerPage = null
        this.getTogetherProject(this.companyPhotos)
      })
    },
    // 合作项目
    getTogetherProject (args) {
      global.axiosGetReq('company/getApplyProjects?', args)
      .then((res) => {
        // console.log(res)
        this.togetherProject = res.data.data
      })
    }
  },
  components: {
    'v-header': header,
    'v-footer': footer
  }
}
</script>

<style lang="css">
@@import "../style.css";
.max100{
  max-width: 100px;
  max-height: 100px;
}
.w1200,.w1200 textarea{
  width: 1200px!important;
}
.errMsg{
  line-height: 77px;
  color: rgb(233, 84, 18);
}
</style>
