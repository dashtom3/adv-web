<template>
  <div class="footer">
    <div class="container">
      <div class="foo">
        <a href="http://www.shichangbu.com/">
          <img src="../../images/footerLeft.png" alt="">
        </a>
        <p class="qs">
          <a href="http://www.shichangbu.com/article-599-1.html" target="_blank">网站介绍</a><span>|</span>
          <a href="http://www.shichangbu.com/article-28788-1.html" target="_blank">网站服务</a><span>|</span>
          <a href="http://www.shichangbu.com/article-600-1.html" target="_blank">投稿合作</a><span>|</span>
          <a href="http://www.shichangbu.com/article-601-1.html" target="_blank">法律声明</a>
        </p>
        <p>
          <a href="http://wpa.qq.com/msgrd?v=3&uin=1276629515&site=qq&menu=yes" target="_blank">
          <img src="../../images/qq.gif" title="点击给我发消息"></a>
        </p>
      </div>
      <div class="foo">
        <p class="f14">合作伙伴</p>
        <p class="friend">
          <a :href="friend.url" v-for="friend in friendsList" target="_blank">{{friend.name}}</a>
        </p>
      </div>
      <div class="foo">
        <p class="f14 tc">关于我们</p>
        <p>
          <img src="../../images/one.jpg" alt="">
          <img src="../../images/two.jpg" alt="">
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      friendsList: [
        { name: '数媒通', url: 'http://www.shumeitong.cn' },
        { name: '发稿狮', url: 'http://www.fagaoshi.com' },
        { name: '和讯商学院', url: 'http://bschool.hexun.com' },
        { name: '全球品牌网', url: 'http://www.globrand.com' },
        { name: '成功营销', url: 'http://www.vmarketing.cn' },
        { name: '第一营销网', url: 'http://www.cmmo.cn' },
        { name: '品牌中国', url: 'http://www.brandcn.com' },
        { name: '31会议网', url: 'http://www.31huiyi.com' },
        { name: '人人都是产品经理', url: 'http://www.woshipm.com' },
        { name: '推酷网', url: 'http://www.tuicool.com' },
        { name: '网商在线', url: 'http://www.wshang.com' },
        { name: '老A电商', url: 'http://www.13980.com' },
        { name: '智火营销', url: 'http://www.zhihuoseo.com' },
        { name: '广告买卖网', url: 'http://www.admaimai.com' },
        { name: '发稿狮', url: 'http://www.fagaoshi.com' },
        { name: '中华广告网', url: 'http://www.a.com.cn' },
        { name: '中国婴童网', url: 'http://www.baobei360.com' },
        { name: 'MBA中国网', url: 'http://www.mbachina.com' },
        { name: '内行', url: 'http://www.neihang.me' },
        { name: 'Focussend', url: 'http://www.focussend.com' },
        { name: '易企秀', url: 'http://www.eqxiu.com' },
        { name: '问营网', url: 'https://www.asky.cn/' },
        { name: 'MAKA', url: 'http://maka.im' },
        { name: '视频工场', url: 'http://www.shichangbu.com/zhuantiye/shipin/' },
        { name: '更多', url: 'http://www.shichangbu.com/article-603-1.html' }
      ]
    }
  }
}
</script>

<style lang="css">
.footer{
  background-color: #2D3230;
}
.footer .container{
  width: 1200px;
  height: 204px;
  padding: 20px 0 15px;
  margin: 0 auto;
  font-size: 12px;
  color: #d8d8d8;
  background-color: #2D3230;
  box-sizing: border-box;
}
.foo{
  /*display: inline-block;*/
  float: left;
  /*width: 33%;*/
}
.f14{
  font-size: 14px;
}
.tc{
  text-align: center;
}
.foo:nth-child(1){
  width: 305px;
  /*border-right: 1px solid #fff;*/
}
.foo:nth-child(2){
  width: 645px;
  /*border-left: 1px solid #fff;*/
}
.foo:last-child{
  /*width: 645px;*/
  margin-left: 20px;
  /*border-left: 1px solid #fff;*/
}
.qs span{
  margin: 0px 10px;
}
.foo p a{
  color: #fff;
}
.friend{
  position: relative;
}
.friend::before{
  content: '';
  display: inline-block;
  width: 2px;
  height: 126px;
  background-color: #24282d;
  position: absolute;
  left: -20px;
  top: -20px;
  /*border-left: 1px solid #fff*/
}
.friend::after{
  content: '';
  display: inline-block;
  width: 2px;
  height: 126px;
  background-color: #24282d;
  position: absolute;
  right: 0px;
  top: -20px;
  /*margin-right: 40px;*/
  /*border-left: 1px solid #fff*/
}
.friend a{
  display: inline-block;
  line-height: 1;
  margin-bottom: 10px;
  margin-right: 13px;
  /*margin-top: 13px;*/
}
.friend a:hover,.qs a:hover{
  cursor: pointer;
  color: #d95c00;
}
.friend a::after{
  content: '';
  display: inline-block;
  width: 2px;
  height: 12px;
  background-color: #fff;
  margin-left:15px;
  position: relative;
  top: 1px;
}
.friend a:last-child::after{
  content: '>>'!important;
  width: 0px;
  height: 0px;
  display: inline-block;
  background-color: #fff;
  margin-left:15px;
  position: relative;
  top: -1px;
}
</style>
