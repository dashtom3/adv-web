<template>
  <div class="paging0">
    <span calss="indexPage firstPage" v-on:click="changePage(1)" v-if="args.currentPage != 1" style="position:relative;left:8px;">首页</span>
    <span class="pageRedue mg5" v-if="args.currentPage != 1" v-on:click="changePage(args.currentPage - 1)">上一页</span>
    <!-- <span class="noBorder" v-show="showPageBegin>0">...</span> -->
    <span :class="{currentPageStyle:(n == 4)}"
    v-for="n in 10" v-if="n + args.currentPage - 4 > 0 && n + args.currentPage - 4 <= args.totalPage">
    <a href="javascript:;" v-on:click="changePage(n + args.currentPage - 4)" class="fullWidth">{{n + args.currentPage - 4}}</a>
  </span>
    <span class="indexPage dian" v-if="args.currentPage < args.totalPage-6">...</span>
    <span class="pageAdd mg5 mg8" v-if="args.currentPage != args.totalPage"  v-on:click="changePage(args.currentPage + 1)">下一页</span>
    <span calss="indexPage mg5 lastPage mg8" v-on:click="changePage(args.totalPage)" v-if="args.currentPage != args.totalPage" style="border-right:1px solid #e2e2e2;left:-12px;position:relative;">尾页</span>
    {{args.currentPage}}/{{args.totalPage}}
  </div>
</template>
<script>
export default {
  name: 'page',
  props: ['args'],
  data () {
    return {
      goPage: null
    }
  },
  methods: {
    changePage: function (value) {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
      this.$emit('page', parseInt(value))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.paging0{
  text-align: center;
}
.paging0 span{
  border: 1px solid #e2e2e2;
  /*float: left;*/
  /*border-radius: 3px;*/
  height: 40px;
  width:40px;
  border-right: 0;
  /*margin-left: 5px;*/
  display: inline-block;
  cursor: pointer;
  line-height: 40px;
  text-align: center;
}
.paging0 input{
  width: 40px;
  height: 40px;
  border: 1px solid #5db7e8;
  border-radius: 3px;
  position: relative;
  top: -2px;
  left: 10px;
  margin-right: 10px;
  text-align: center;
}
.paging0 input:focus{
  outline: none;
}
.paging0 .currentPageStyle{
  color: white;
  background: #da6817;
}
.paging0 .currentPageStyle a{
  color: #fff;
}
.mg5{
  /*margin-left: 5px;*/
  position: relative;
  left: 4px!important;
}
.paging0 a{
  color: rgb(0, 0, 0);
}
.paging0 .noBorder{
  border: none;
}
.paging0 .pageRedue{
  width: 100px;
}
.paging0 .pageAdd{
  width: 100px;
}
.paging0 .sure{
  width: 60px;
  height: 40px;
}
.fullWidth{
  display:inline-block;
  width: 100%;
  height: 100%;
}
/*.fullWidth:last-child{
  border-right: 1px solid #e2e2e2;
}*/
.dian{
  position: relative;
  left: -4px;
}
.firstPage{
  display: inline-block;
  position: relative!important;
  left: 8px!important;
}
.mg8{
  display: inline-block!important;
  position: relative;
  left: -8px!important;
}
</style>
