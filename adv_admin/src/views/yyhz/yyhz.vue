<template>
  <div class="">
    <v-header v-bind:args="joinClick"></v-header>
    <div class="bg">
      <div class="h20"></div>
      <div class="bgcontent">
        <div class="contentHead">
          <div class="contentHeadKind">
            <ul>
              <li v-for="(kind, index) in kinds" :class="{active: item === index}"><a href="javascript:;" v-on:click="selectKind(index)">{{kind}}</a></li>
            </ul>
          </div>
          <div class="contentHeadRight">
            <el-input icon="search" class="inputStyle" placeholder="搜索公司"></el-input>
            <input type="button" v-on:click="join" value="入驻异业合作" class="rz">
          </div>
        </div>
        <transition name="fade">
          <!-- <router-view></router-view> -->
          <v-project v-if="item === 0"></v-project>
          <v-company v-if="item === 1"></v-company>
          <v-source v-if="item === 2"></v-source>
        </transition>
      </div>
      <div class="h20"></div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import header from './header'
import footer from './footer'
import project from './project/project'
import source from './source/source'
import company from './company/company'
export default {
  data () {
    return {
      kinds: ['项目', '公司', '资源'],
      item: 0,
      joinClick: false
    }
  },
  methods: {
    selectKind (index) {
      // console.log(index)
      this.item = index
    },
    join () {
      this.joinClick = !this.joinClick
    }
  },
  components: {
    'v-header': header,
    'v-footer': footer,
    'v-project': project,
    'v-source': source,
    'v-company': company
  }
}
</script>

<style lang="css">
ul,ul li{
  padding: 0px;
  margin: 0px;
  list-style: none;
}
a,a:hover{
  text-decoration: none;
}
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
</style>
