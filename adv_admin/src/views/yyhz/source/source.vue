<template>
  <div class="">
    <div class="bg">
      <!-- <div class="h20"></div> -->
      <div class="bgcontent">
        <div class="bgCenter">
          <div class="hy">
            <label for="">资源类型:</label>
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

    <div class="list sourceList">
      <ul>
        <li v-for="project in projectLists">
          <a href="sourceDetail/1">
            <div class="sourceImg">
              <img :src="project.src" alt="">
              <p class="contentTitle">{{project.title}}</p>
              <p class="contentFooter source">
                  <span class="kindLogo"></span>
                  <span>{{project.kind}}</span>
                  <span class="foruser"></span>
                  <span>{{project.user}}</span>
              </p>
            </div>
          </a>
          <i class="ic"></i>
          <i class="zd"></i>
          <i class="xz"></i>
        </li>
      </ul>

        <!-- 分页 -->
        <div class="block">
          <page v-on:page="changePage" :args="projectArgs"></page>
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
export default {
  data () {
    return {
      kinds: ['项目', '公司', '资源'],
      item: 0,
      industry: '0',
      industryLists: [
        { name: '不限', value: '0' },
        { name: '卡券', value: '1' },
        { name: '会员资源', value: '2' },
        { name: '线下网点', value: '3' },
        { name: '微信公众号', value: '4' },
        { name: '线上流量资源', value: '5' },
        { name: '实体产品', value: '6' },
        { name: '线下场地', value: '7' },
        { name: '媒体广告', value: '8' },
        { name: '其他', value: '9' }
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
        { src: sourceImg, title: '你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好', kind: '母婴', user: '大众', time: '2016-01-12' },
        { src: sourceImg, title: '你好', kind: '母婴', user: '大众', time: '2016-01-12' },
        { src: sourceImg, title: '你好', kind: '母婴', user: '大众', time: '2016-01-12' },
        { src: sourceImg, title: '你好', kind: '母婴', user: '大众', time: '2016-01-12' },
        { src: sourceImg, title: '你好', kind: '母婴', user: '大众', time: '2016-01-12' },
        { src: sourceImg, title: '你好', kind: '母婴', user: '大众', time: '2016-01-12' }
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
@import "../style.css";
.sourceList{
  width: 1160px;
  margin: 20px auto;
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
}
.sourceList ul li:nth-child(4n){
  margin-right: 0px;
}
.source .kindLogo{
  margin-right: 10px;
  margin-left: 80px;
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
</style>
