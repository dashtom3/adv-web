<template>
  <div class="detail">
    <v-header></v-header>
    <div class="detailContainer">
      <div class="detailContent">
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
            <div class="detailPhotos">
              <p class="jj">公司相册</p>
              <p class="photos">
                <ul>
                  <li v-for="photo in photos"><img :src="photo" alt=""></li>
                </ul>
              </p>
            </div>
          </div>
        </div>
        <div class="partners">
          <p class="jj">合作伙伴</p>
          <div class="listLeft detialLeft">
            <ul>
              <li v-for="project in projectLists">
                <a href="#">
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
                        <span style="float:right;"><span class="contTime"></span>
                        <span>{{project.time}}</span></span>
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
export default {
  data () {
    return {
      photos: [photo, photo, photo, photo, photo, photo],
      projectLists: [
        { src: kindLogo, title: '你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好', kind: '母婴', user: '大众', time: '2016-01-12' },
        { src: kindLogo, title: '你好', kind: '母婴', user: '大众', time: '2016-01-12' },
        { src: kindLogo, title: '你好', kind: '母婴', user: '大众', time: '2016-01-12' }
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
@@import "../style.css";
</style>
