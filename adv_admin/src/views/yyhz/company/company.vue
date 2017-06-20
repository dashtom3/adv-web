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
                <li v-for="industryList in industryLists" :class="{ on: industry === industryList.value}"><a href="javascript:;">{{industryList.name}}</a></li>
              </ul>
            </div>
          </div>
          <div class="hy">
            <label for="">用户群体:</label>
            <div class="select">
              <ul>
                <li v-for="userList in userLists" :class="{on: user === userList.value}"><a href="#">{{userList.name}}</a></li>
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
          <a :href="'/companyDetail/' + project.id">
            <div class="sourceImg companyImg">
              <div class="companyw160">
                <img :src="project.logo" alt="">
              </div>
              <p class="contentFooter source companyFooter">
                  <span class="fl">{{project.intro}}</span>
                  <span class="fr">
                    <span class="eye"></span>
                    <span>100</span>
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
      industryLists: [
        { name: '不限', value: '0' },
        { name: '母婴', value: '1' },
        { name: '金融', value: '2' },
        { name: '地产', value: '3' },
        { name: '零售', value: '4' },
        { name: '物流', value: '5' },
        { name: '企业服务', value: '6' },
        { name: '工业制造', value: '7' },
        { name: '农业', value: '8' },
        { name: '3C', value: '9' },
        { name: '广告传媒', value: '10' },
        { name: '汽车', value: '11' },
        { name: '医疗', value: '12' },
        { name: '家居建材', value: '13' },
        { name: '线下活动合作', value: '14' },
        { name: '积分兑换', value: '15' },
        { name: '产品置换', value: '16' },
        { name: '媒体广告置换', value: '17' },
        { name: '微信互推', value: '18' },
        { name: '平台招商', value: '19' },
        { name: 'GPS', value: '20' },
        { name: '其他', value: '21' }
      ],
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
        totalPage: -1
      }
    }
  },
  created () {
    this.getAllCompanys(this.projectArgs)
  },
  methods: {
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
    changePage (value) {
      this.projectArgs.currentPage = value
    }
  },
  components: {
    page
  }
}
</script>

<style lang="css">
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
.companyLists ul li a:hover .companyImg img{
  background-color: rgb(248, 247, 245);
  box-shadow: 0px 3px 5px 0px rgba(186, 186, 186, 0.75);
  transition: background-color .5s;
  transition: box-shadow .5s;
}
.companyLists ul li a:hover .fl,.companyLists ul li a:hover .fr span{
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
.companyLists ul li a:hover .eye{
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
</style>
