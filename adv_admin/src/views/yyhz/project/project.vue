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
    <div class="list">
      <div class="listLeft">
        <ul>
          <li v-for="project in projectLists">
            <a href="/projectDetail/1">
              <div class="img">
                <img :src="project.src" alt="">
              </div>
              <div class="listContent">
                <p class="contentTitle">{{project.title}}</p>
                <p class="contentFooter">
                    <span class="kindLogo"></span>
                    <span>{{project.kind}}</span>
                    <span class="foruser"></span>
                    <span>{{project.user}}</span>
                    <span class="contTime"></span>
                    <span>{{project.time}}</span>
                </p>
              </div>
            </a>
          </li>
        </ul>
        <!-- 分页 -->
        <div class="h20"></div>
        <div class="">
          <page v-on:page="changePage" :args="projectArgs"></page>
        </div>
      </div>

      <!-- 右边 -->
      <div class="listRight">
        <div class="">
          <p class="listRightTitle">
          <img src="../../../images/rz.gif" alt=""></p>
          <ul>
            <li v-for="rzList in rzLists">
              <a :href="rzList.url">
                <img :src="rzList.src" alt="">
              </a>
            </li>
          </ul>
        </div>
        <div class="">
          <p class="listRightTitle">
          <img src="../../../images/source.gif" alt=""></p>
          <ul>
            <li v-for="rzList in rzLists">
              <a :href="rzList.url">
                <img :src="rzList.src" alt="">
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import kindLogo from '../../../images/kindLogo.gif'
import rz from '../../../images/sourcename.png'
import page from '../page'
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
      projectLists: [
        { src: kindLogo, title: '你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好', kind: '母婴', user: '大众', time: '2016-01-12' },
        { src: kindLogo, title: '你好', kind: '母婴', user: '大众', time: '2016-01-12' },
        { src: kindLogo, title: '你好', kind: '母婴', user: '大众', time: '2016-01-12' }
      ],
      rzLists: [
        { url: 'javascript:;', src: rz },
        { url: 'javascript:;', src: rz },
        { url: 'javascript:;', src: rz },
        { url: 'javascript:;', src: rz }
      ],
      projectArgs: {
        numPerPage: 10,
        currentPage: 1,
        totalPage: 5
      }
    }
  },
  methods: {
    selectKind (index) {
      this.item = index
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
.kindLogo{
  display: inline-block;
  width: 27px;
  height: 26px;
  background: url('../../../images/kind.gif');
  margin-right: 20px;
}
.foruser{
  width: 30px;
  height: 21px;
  background: url('../../../images/user.gif');
  margin-left: 180px;
  margin-right: 20px;
}
.contTime{
  width: 25px;
  height: 26px;
  background:url('../../../images/time.gif');
  margin-left: 160px;
  margin-right: 20px;
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
}
</style>
