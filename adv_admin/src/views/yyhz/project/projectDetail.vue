<template>
  <div class="detail">
    <v-header></v-header>
    <div class="detailContainer">
      <div class="h10"></div>
      <div class="detailContent project">
        <div class="detailDiv">
          <div class="detailDivContent">
            <div class="detailDivContentHeader">
              <div class="headerImg">
                <img src="../../../images/detailImg.png" alt="">
              </div>
              <div class="headerTitle">
                <span class="titelName">51Talk无忧英语</span><br>
                <span class="realName">公司全称：北京大生知行科技有限公司上海分公司</span><br>
                <span class="hz">合作地区: 上海市</span><br>
                <span class="address"> 详细地址：上海市徐汇区桂林路406号华鑫中心1号楼6楼</span>
              </div>
              <div class="detailDivContentHeaderRight">
                <p><span class="iconsc"></span><span>收藏</span></p>
                <p><span class="iconly"></span><span>留言</span></p>
                <p><input type="button" name="" value="查看联系方式"></p>
              </div>
            </div>
            <div class="detailInfo">
              <p class="jj">公司简介</p>
              <p class="infoMsg">51Talk无忧英语， 美国纽交所上市公司，全球信赖的在线英语教育品牌。美国小学、青少英语、成人英语。100%真人外</p>
            </div>
          </div>
        </div>
        <div class="partners">
          <p class="jj projectName">这个是公司的名字</p>
          <p class="contentFooter cen">
            <span class="kindLogo"></span><span>线上合作联合</span>
            <span class="foruser"></span><span>大众</span>
            <span class="contTime"></span><span>2017-05-19截至</span>
            <span class="iconsc"></span><span>收藏</span>
          </p>
          <p>51Talk无忧英语， 美国纽交所上市公司，全球信赖的在线英语教育品牌。美国小学、青少英语、成人英语。100%真人外</p>
          <p class="apply">
            <input type="button" name="" value="申请合作">
          </p>
        </div>
        <div class="contact">
          <div class="">
            <img src="../../../images/change.png" alt="">
          </div>
          <div class="applyCompany">
            <p class="applyCompanyTitle">合作公司(2)</p>
            <ul>
              <li v-for="applyCompany in applyCompanyLists"><a href="javascript:;">
                <div class="middle">
                  <span></span>
                  <img :src="applyCompany.img" alt="">
                </div>
                <p>{{applyCompany.name}}</p>
              </a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="h65"></div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import kindLogo from '../../../images/kindLogo.gif'
import header from '../header'
import footer from '../footer'
import photo from '../../../images/photo.png'
export default {
  data () {
    return {
      photos: [photo, photo, photo, photo, photo, photo],
      projectLists: [
        { src: kindLogo, title: '你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好', kind: '母婴', user: '大众', time: '2016-01-12' },
        { src: kindLogo, title: '你好', kind: '母婴', user: '大众', time: '2016-01-12' },
        { src: kindLogo, title: '你好', kind: '母婴', user: '大众', time: '2016-01-12' }
      ],
      applyCompanyLists: [
        { img: kindLogo, name: '51Talk无忧英语'},
        { img: kindLogo, name: '51Talk无忧英语'},
        { img: kindLogo, name: '51Talk无忧英语'},
        { img: kindLogo, name: '51Talk无忧英语'},
        { img: kindLogo, name: '51Talk无忧英语'},
        { img: kindLogo, name: '51Talk无忧英语'},
        { img: kindLogo, name: '51Talk无忧英语'},
        { img: kindLogo, name: '51Talk无忧英语'},
        { img: kindLogo, name: '51Talk无忧英语'}
      ]
    }
  },
  components: {
    'v-header': header,
    'v-footer': footer
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
</style>
