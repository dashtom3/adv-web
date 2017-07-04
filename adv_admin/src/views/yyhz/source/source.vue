<template>
  <div class="">
    <div class="bg">
      <!-- <div class="h20"></div> -->
      <div class="bgcontent">
        <div class="bgCenter sourceheight">
          <div class="hy">
            <label for="">资源类型:</label>
            <div class="select">
              <ul>
                <li v-for="(industryList, index) in industryLists" :class="{ on: industry === index}"><a href="javascript:;" v-on:click="selectIndustryList(industryList, index)" class="hoverColor">{{industryList}}</a></li>
              </ul>
            </div>
          </div>
          <div class="hy">
            <label for="">用户群体:</label>
            <div class="select">
              <ul>
                <li v-for="(userList, index) in userLists" :class="{on: user === index}"><a href="javascript:;" v-on:click="selectUserGroup(userList, index)">{{userList}}</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="h20"></div>
      </div>
    </div>

    <div class="list sourceList">
      <ul>
        <li v-for="project in sourceLists">
          <a :href="'sourceDetail/' + project.id">
            <div class="sourceImg">
              <div class="h250">
                <img :src="project.fileSrc" alt="">
              </div>
              <p class="contentTitle">{{project.content}}</p>
              <p class="contentFooter source">
                  <span class="kindLogo"></span>
                  <span>{{project.type}}</span>
                  <span class="foruser"></span>
                  <span>{{project.userGroup}}</span>
              </p>
            </div>
          </a>
          <i class="ic"></i>
          <i class="zd"></i>
          <i class="xz"></i>
        </li>
      </ul>

        <!-- 分页 -->
        <div class="block" v-if="sourceArgs.totalPage > 1">
          <page v-on:page="changePage" :args="sourceArgs"></page>
        </div>
        <div class="h20">

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import sourceImg from '../../../images/sourceImg.png'
import page from '../page'
import global from '../../global/global'
export default {
  data () {
    return {
      kinds: ['项目', '公司', '资源'],
      item: 0,
      industry: 0,
      industryLists: ['不限', '卡券', '会员资源', '线下网点', '微信公众号', '线上流量资源', '实体产品', '线下场地', '媒体广告', '其他'],
      user: 0,
      userLists: ['不限', '男性', '女性', '母婴', '青少年', '中老年', '职场白领', '大学生', '高净值白领', '企业用户', '其他'],
      sourceLists: [],
      sourceArgs: {
        numberPerPage: 12,
        currentPage: 1,
        totalPage: -1,
        type: null,
        userGroup: null
      }
    }
  },
  created () {
    this.getSourceLists(this.sourceArgs)
  },
  methods: {
    selectKind (index) {
      this.item = index
    },
    getSourceLists (args) {
      global.axiosGetReq('resource/getResourceList?', args)
      .then((res) => {
        // console.log(res)
        if (res.data.callStatus === 'SUCCEED') {
          this.sourceLists = res.data.data
          this.sourceArgs.currentPage = res.data.currentPage
          this.sourceArgs.totalPage = res.data.totalPage
        }
      })
    },
    // 选择类别
    selectIndustryList (obj, index) {
      this.industry = index
      if (obj !== '不限') {
        this.sourceArgs.type = obj
      } else {
        this.sourceArgs.type = null
      }
      this.getSourceLists(this.sourceArgs)
    },
    // 选择用户
    selectUserGroup (obj, index) {
      this.user = index
      if (obj !== '不限') {
        this.sourceArgs.userGroup = obj
      } else {
        this.sourceArgs.userGroup = null
      }
      this.getSourceLists(this.sourceArgs)
    },
    changePage (value) {
      this.sourceArgs.currentPage = value
    }
  },
  components: {
    page
  }
}
</script>

<style lang="css">
@import "../style.css";
.sourceList{
  width: 1160px;
  margin: 0px auto;
}
.h250{
  height: 250px;
}
.h250 img{
  max-width: 250px;
  max-height: 250px;
}
.sourceList ul{
  overflow: hidden;
}
.sourceList ul li{
  width: 275px;
  height: 350px;
  text-align: center;
  display: inline-block;
  border: 1px solid #eaeaea;
  box-sizing: border-box;
  margin-right: 20px;
  margin-bottom: 60px;
  padding: 10px;
  position: relative;
  vertical-align: top;
}
.sourceList ul li:nth-child(4n){
  margin-right: 0px;
}
.source .kindLogo{
  margin-right: 10px;
  margin-left: 18px;
  width: 19px;
  height: 19px;
  background: url('../../../images/sourceKind.png');
}
.sourceImg .contentTitle{
  font-size: 18px;
  margin: 0;
  text-align: left;
}
.source .foruser{
  margin-left: 40px;
  margin-right: 10px;
  width: 21px;
  height: 18px;
  background: url('../../../images/sourceUser.png');
}
.ic{
  display: inline-block;
  background-color: rgb(233, 84, 18);
  width: 45px;
  height: 4px;
  z-index: 36;
  position: absolute;
  bottom: 0px;
  left: 20px;
}
.zd{
  display: inline-block;
  background-color: #fff;
  height: 1px;
  width: 160px;
  position: absolute;
  bottom: -1px;
  left: 65px;
  z-index: 999;
}
.xz{
  display: inline-block;
  width: 30px;
  background-color: #eaeaea;
  height: 1px;
  position: absolute;
  bottom: -10px;
  right: 43px;
  transform: rotate(-45deg);
}
.sourceheight{
  height: 115px;
}
</style>
