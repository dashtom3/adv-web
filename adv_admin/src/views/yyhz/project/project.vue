<template>
  <div class="">
    <div class="bg">
      <!-- <div class="h20"></div> -->
      <div class="bgcontent">
        <div class="bgCenter">
          <div class="hy">
            <label for="">行&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业:</label>
            <div class="select">
              <ul>
                <li v-for="(industryList, index) in industryLists" :class="{ on: industry === index}"><a href="javascript:;" v-on:click="selectIndustryList(industryList, index)">{{industryList}}</a></li>
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
    <div class="list">
      <div class="listLeft">
        <ul>
          <li v-for="project in projectLists">
            <a :href="'/projectDetail/' + project.id">
              <div class="img">
                <img :src="project.src" alt="">
              </div>
              <div class="listContent">
                <p class="contentTitle">{{project.content}}</p>
                <p class="contentFooter pro">
                    <span class="kindLogo"></span>
                    <span class="w200">{{project.type}}</span>
                    <span class="foruser"></span>
                    <span class="w160">{{project.userGroup}}</span>
                    <span class="contTime"></span>
                    <span>{{project.createDate | time}}</span>
                </p>
              </div>
            </a>
          </li>
        </ul>
        <!-- 分页 -->
        <div class="h20"></div>
        <div class="" v-if="projectArgs.totalPage > 1">
          <page v-on:page="changePage" :args="projectArgs"></page>
        </div>
      </div>

      <!-- 右边 -->
      <div class="listRight">
        <div class="">
          <p class="listRightTitle">
          <img src="../../../images/rz.gif" alt=""></p>
          <ul>
            <li v-for="rzList in newJoinLists" class="w89">
              <a href="javascript:;">
                <img :src="rzList.logo" alt="">
              </a>
            </li>
          </ul>
        </div>

        <!-- 最新的资源 -->
        <div class="">
          <p class="listRightTitle">
          <img src="../../../images/source.gif" alt=""></p>
          <ul>
            <li v-for="rzList in newSourceLists" class="w89">
              <a href="javascript:;">
                <img :src="rzList.fileSrc" alt="">
              </a>
            </li>
          </ul>
        </div>
        <div class="" style="text-align:center;">
          <img src="../../../images/code.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import kindLogo from '../../../images/kindLogo.gif'
import rz from '../../../images/sourcename.png'
import global from '../../global/global'
import page from '../page'
export default {
  data () {
    return {
      kinds: ['项目', '公司', '资源'],
      item: 0,
      industry: 0,
      industryLists: ['不限', '品牌联合', '提供免费福利', '发放卡券', '线下渠道合作', '线上流量互换', '线上活动联合', '线下活动合作', '活动招商', '积分兑换', '产品置换', '媒体广告置换', '微信互推', '平台招商', 'CPS', '其他'],
      user: 0,
      userLists: ['不限', '男性', '女性', '母婴', '青少年', '中老年', '职场白领', '大学生', '高净值白领', '企业用户', '其他'],
      projectLists: [],
      newJoinLists: [],
      newSourceLists: [],
      projectArgs: {
        type: null,
        userGroup: null,
        numberPerPage: 10,
        currentPage: 1,
        totalPage: -1
      }
    }
  },
  created () {
    this.getProjectLists(this.projectArgs)
    this.getNewJoinLists()
    this.getNewSourceLists()
  },
  methods: {
    selectKind (index) {
      this.item = index
    },
    changePage (value) {
      this.projectArgs.currentPage = value
    },
    getProjectLists (args) {
      global.axiosGetReq('project/getProjectList?', args)
      .then((res) => {
        // console.log(res)
        if (res.data.callStatus === "SUCCEED") {
          this.projectLists = res.data.data
          this.projectArgs.currentPage = res.data.currentPage
          this.projectArgs.totalPage = res.data.totalPage
        } else {
          global.error(this, res.data.data, '')
        }
      })
    },
    // 获取最新入住
    getNewJoinLists () {
      var newJoinArgs = {
        numberPerPage: 6,
        currentPage: 1
      }
      global.axiosGetReq('company/getCompanyList?', newJoinArgs)
      .then((res) => {
        if (res.data.callStatus === 'SUCCEED') {
          this.newJoinLists = res.data.data
        }
      })
    },
    // 获取最新的资源
    getNewSourceLists () {
      var sourceArgs = {
        numberPerPage: 6,
        currentPage: 1
      }
      global.axiosGetReq('resource/getResourceList?', sourceArgs)
      .then((res) => {
        if (res.data.callStatus === 'SUCCEED') {
          this.newSourceLists = res.data.data
        } else {
          global.error(this, res.data.data, '')
        }
      })
    },
    // 选择类别
    selectIndustryList (obj, index) {
      this.industry = index
      if (obj !== '不限') {
        this.projectArgs.type = obj
      } else {
        this.projectArgs.type = null
      }
      this.getProjectLists(this.projectArgs)
    },
    // 选择用户
    selectUserGroup (obj, index) {
      this.user = index
      if (obj !== '不限') {
        this.projectArgs.userGroup = obj
      } else {
        this.projectArgs.userGroup = null
      }
      this.getProjectLists(this.projectArgs)
    }
  },
  components: {
    page
  }
}
</script>

<style lang="css">
.bg{
  width: 100%;
  background: #ebebeb;
}
.bgcontent{
  width: 1200px;
  background-color: #fff;
  margin: 0 auto;
  /*padding: 10px 0 0;*/
}
.contentHead{
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #e2e2e2;
}
.contentHeadKind ul{
  padding: 0;
}
.contentHeadKind ul li{
  float: left;
  width: 105px;
  text-align: center;
}
.contentHeadKind ul li.active a{
  border-bottom: 3px solid #e95412;
}
.contentHeadKind ul li a{
  display: inline-block;
  width: 100%;
  /*height: 80%;*/
  color: #000;
}
.contentHeadRight{
  float: right;
}
.bgCenter{
  width: 1160px;
  height: 148px;
  border: 1px solid #bfbfbf;
  margin: 20px auto;
}
.rz{
  width: 160px;
  height: 40px;
  border: none;
  outline: none;
  background-color: #e95412;
  color: #fff;
  border-radius: 5px;
  position: relative;
  right: 10px;
  cursor: pointer;
}
.hy{
  margin-left: 20px;
}
.hy:nth-child(1){
  margin-top: 20px;
}
.hy label,.hy .select{
  display: inline-block;
  vertical-align: top;
}
.hy .select{
  width: 1032px;
}
.hy label{
  width: 70px;
  font-size: 16px;
}
.select{
  margin-left: 20px;
}
.select a{
  color: #000;
  font-size: 14px;
}
.select ul{
  margin: 0;
  padding: 0;
}
.select ul li{
  float: left;
  margin-right: 18px;
  margin-bottom: 23px;
}
.select ul li.active{
  color: #f6bba0;
}
.select ul li a:hover,.select ul li.on a{
  color: #f6bba0;
}
.img,.listContent,.listLeft,.listRight{
  display: inline-block;
  vertical-align: top;
}

.img{
  width: 140px;
  text-align: center;
}
.img img{
  max-width: 140px;
  max-height: 140px;
}
.contentTitle{
  font-size: 20px;
  color: rgba(0, 0, 0, 0.8);
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.contentFooter span{
  font-size: 14px;
  display: inline-block;
  vertical-align: middle;
  font-family: "MicrosoftYaHei";
  color: rgba(0, 0, 0, 0.6);
}
.pro .kindLogo{
  display: inline-block;
  width: 19px;
  height: 19px;
  background: url('../../../images/sourceKind.png');
  margin-right: 10px;
}
.w200{
  width: 200px;
}
.pro .foruser{
  width: 20px;
  height: 18px;
  background: url('../../../images/sourceUser.png');
  margin-right: 10px;
  margin-left: 0!important;
}
.w160{
  display: inline-block;
  width: 160px;
}
.pro .contTime{
  width: 19px !important;
  height: 19px !important;
  background:url('../../../images/time.jpg')!important;
  margin-right: 20px;
  margin-left: 0!important;
}
.listContent{
  width: 714px;
}
.listLeft ul li:hover .contentTitle{
  color:#ff8000
}
.listLeft ul li{
  border-bottom: 1px solid #e2e2e2;
}
.listLeft{
  width: 860px;
}
.listRight{
  width: 320px;
  margin-left: 10px;
}
.listRightTitle{
  margin: 45px 0 30px 0;
}
.listRight ul li{
  /*float: left;*/
  display: inline-block;
  margin-right: 15px;
  vertical-align: top;
}
.w89{
  width: 89px;
  height: 94px;
}
.w89 img{
  max-width: 100%;
  max-height: 100%;
}
</style>
