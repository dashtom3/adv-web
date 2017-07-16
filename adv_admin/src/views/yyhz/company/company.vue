<template>
  <div class="">
    <div class="bg">
      <!-- <div class="h20"></div> -->
      <div class="bgcontent">
        <div class="bgCenter">
          <div class="hy pr">
            <label for="">行&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业:</label>
            <div class="select">
              <ul class="firstUl">
                <li :class="{ on: industry === '0'}" class="firstLi"><a href="javascript:;" v-on:click="selectIndustryList('不限', '0')">不限</a></li>
                <li v-for="(industryList, index) in industryLists" :class="{ on: industry === index}" class="firstLi"><a href="javascript:;" v-on:click="selectIndustryList(industryList, index)" class="hoverColor">{{industryList.name}}</a>
                  <ul class="childrenUl">
                    <li v-for="item in industryList.subIndusrty" :class="{ on: industry === index}">
                      <a href="javascript:;" v-on:click="selectIndustryList(item, index)">{{item.name}}</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div class="hy">
            <label for="">用户群体:</label>
            <div class="select">
              <ul>
                <li v-for="(userList, index) in userLists" :class="{on: user === index}"><a href="javascript:;"  v-on:click="selectUserGroup(userList, index)">{{userList.name}}</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="h20"></div>
      </div>
    </div>

    <div class="list companyLists">
      <ul>
        <li v-for="project in projectLists">
          <a :href="'/companyDetail/' + project.id" target="_blank">
            <div class="sourceImg companyImg">
              <div class="companyw160">
                <img :src="project.logo" alt="">
              </div>
              <p class="contentFooter source companyFooter">
                  <span class="fl">{{project.intro}}</span>
                  <span class="fr">
                    <!-- <span class="eye"></span>
                    <span>100</span> -->
                </span>
              </p>
            </div>
          </a>
        </li>
      </ul>

        <!-- 分页 -->
        <div class="block" v-if="projectArgs.totalPage > 1">
          <page v-on:page="changePage" :args="projectArgs"></page>
        </div>
        <div class="h20">

        </div>
      </div>

    </div>
  </div>
</template>

<script>
// import companyImg from '../../../images/company.png'
import page from '../page'
import global from '../../global/global'
export default {
  data () {
    return {
      kinds: ['项目', '公司', '资源'],
      item: 0,
      industry: '0',
      industryLists: [],
      user: '0',
      userLists: [
        { name: '不限', value: '0' },
        { name: '男性', value: '1' },
        { name: '女性', value: '2' },
        { name: '母婴', value: '3' },
        { name: '青少年', value: '4' },
        { name: '中老年', value: '5' },
        { name: '职场白领', value: '6' },
        { name: '大学生', value: '7' },
        { name: '高净值人群', value: '8' },
        { name: '企业用户', value: '9' },
        { name: '其他', value: '10' }
      ],
      projectLists: [],
      projectArgs: {
        numberPerPage: 10,
        currentPage: 1,
        totalPage: -1,
        industryId: null,
        userGroup: null
      }
    }
  },
  created () {
    this.getAllCompanys(this.projectArgs)
    this.getAllindustry()
  },
  methods: {
    selectIndustryList (obj, index) {
      this.industry = index
      if (obj !== '不限') {
        this.projectArgs.industryId = obj.industryId
      } else {
        this.projectArgs.industryId = null
      }
      this.getAllCompanys(this.projectArgs)
    },
    // 选择用户
    selectUserGroup (obj, index) {
      console.log(obj, index)
      this.user = index
      if (obj.name !== '不限') {
        this.projectArgs.userGroup = obj.name
      } else {
        this.projectArgs.userGroup = null
      }
      this.getAllCompanys(this.projectArgs)
    },
    selectKind (index) {
      this.item = index
    },
    getAllCompanys (args) {
      global.axiosGetReq('company/getCompanyList?', args)
      .then((res) => {
        if (res.data.callStatus === 'SUCCEED') {
          this.projectLists = res.data.data
          this.projectArgs.currentPage = res.data.currentPage
          this.projectArgs.totalPage = res.data.totalPage
        } else {
          global.error(this, res.data.data, '')
        }
      })
    },
    getAllindustry () {
      global.axiosGetReq('exclude/getIndustryList')
      .then((res) => {
        this.industryLists = res.data.data
        // console.log(res)
      })
    },
    changePage (value) {
      this.projectArgs.currentPage = value
    }
  },
  components: {
    page
  }
}
</script>

<style lang="scss">
@import "../style.css";
.companyLists{
  width: 1160px;
  margin: 0px auto;
}
.companyLists ul{
  overflow: hidden;
}
.companyLists ul li{
  border-width: 1px;
  border-color: rgb(234, 234, 234);
  border-style: solid;
  width: 158px;
  height: 188px;
  margin-right: 15px;
  margin-bottom: 20px;
  display: inline-block;
  text-align: center;
  padding: 10px;
  vertical-align: top;
}
.companyLists ul li.firstLi a:hover .companyImg img{
  background-color: rgb(248, 247, 245);
  box-shadow: 0px 3px 5px 0px rgba(186, 186, 186, 0.75);
  transition: background-color .5s;
  transition: box-shadow .5s;
}
.companyLists ul li.firstLi a:hover .fl,.companyLists ul li.firstLi a:hover .fr span{
  color: rgb(240, 141, 97);
}
.companyLists ul li:nth-child(6n){
  margin-right: 0px;
}
.eye{
  display: inline-block;
  width: 16px;
  height: 12px;
  background: url('../../../images/companyeye.png');
}
.companyLists ul li.firstLi a:hover .eye{
  background: url('../../../images/companyeyeHover.png');
}
.fl{
  float: left;
}
.fr{
  float: right;
}
.companyFooter{
  margin-top: 0px;
}
.companyw160{
  width: 160px;
  height: 160px;
}
.companyw160 img{
  max-width: 160px;
  max-height: 160px;
}
.pr{
  position: relative;
}
.childrenUl{
  position: absolute;
  /*left: 0;*/
  display: none;
  background: #e2e2e2;
  width: 1032px;
  /*height: 40px;*/
  z-index: 9;
  left:0;
  li{
    margin: 5px;
  }
}
.firstUl{
  position: relative;
}
.firstLi:hover .childrenUl{
  display: block;
}
.firstLi:hover{
  border:1px solid #e2e2e2;
  background: #e2e2e2;
}
.select ul li a:hover, .select ul li.on .hoverColor{
  color: #f6bba0!important;
}
.select ul li.on ul li a:hover{
    color: #f6bba0!important;
  }
.select ul li.on ul li a{
  color: #000!important;
}
</style>
