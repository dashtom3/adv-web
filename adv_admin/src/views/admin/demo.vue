<template>
  <div class="demo">
  <div class="top">
    <img src="../../assets/demo.png">
    <span>冰箱智能营销互动数据</span>
  </div>
  <div class="center">
    <span class="c-le">位置:微软加速器</span>
    <span class="c-ri">{{time}}</span>
  </div>
  <div>
    <el-table
      :data="data"
       stripe
      style="width: 100%">
      <el-table-column
        prop="id"
        label="序号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        label="图片">
        <template scope="scope">
          <img class="demo_pic" :src='scope.row.imgSrc' v-if="scope.row.imgSrc != null">
          <img class="demo_pic" src='../../assets/caomei.jpeg' v-if="scope.row.imgSrc == null">
        </template>
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格">
      </el-table-column>
      <el-table-column
        prop="count1"
        label="扫码数">
      </el-table-column>
      <el-table-column
        prop="count2"
        label="下单数">
      </el-table-column>
      <el-table-column
        prop="rate"
        label="转换率">
      </el-table-column>
    </el-table>
  </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import global from '../global/global'
  export default {
    name: 'login',
    data() {
      return {
        time:null,
        checked: true,
        playAdvIds:[515,516,517,518,520,521,525],
        data:[{"id":515,"userId":20,"name":"太妃麻糬味冰淇淋81g","price":"35元","imgSrc":"http://oqhy88nu6.bkt.clouddn.com/FjMODB9om4cjtVErbXvgn3_bGNli",count1:0,count2:0,rate:"0%"},
        {"id":516,"userId":20,"name":"杏仁豆腐风味冰淇淋81g","price":"35元","imgSrc":"http://oqhy88nu6.bkt.clouddn.com/FhDIM9ByIFRhSfG7h7wk4ucA6n2V",count1:0,count2:0,rate:"0%"},
        {"id":517,"userId":20,"name":"草莓味脆皮条冰淇淋单支","price":"35元","imgSrc":"http://oqhy88nu6.bkt.clouddn.com/FnJ7Lj17n6g3vqrMXmQtq7SCYK1C",count1:0,count2:0,rate:"0%"},
        {"id":518,"userId":20,"name":"熔岩冰淇淋392g","price":"88元","imgSrc":"http://oqhy88nu6.bkt.clouddn.com/FlOfAGxEnAQCj0LbDSHk118fzY9q",count1:0,count2:0,rate:"0%"},
        {"id":520,"userId":20,"name":"皇室奶茶冰淇淋81g","price":"35元","imgSrc":"http://oqhy88nu6.bkt.clouddn.com/FjKCK-fzjrnAc_0RgajCj3nGVChO",count1:0,count2:0,rate:"0%"},
        {"id":521,"userId":20,"name":"经典系列冰淇淋四杯装","price":"99元","imgSrc":"http://oqhy88nu6.bkt.clouddn.com/Fs8yZFd0RskcbqZ1b4iHJNfv6A5m",count1:0,count2:0,rate:"0%"},
        {"id":525,"userId":1,"name":"草莓味冰淇淋392g","price":"88元","imgSrc":null,count1:0,count2:0,rate:"0%"}]
      };
    },
    created(){
      var self = this
      setInterval(function(){
        var temp = new Date()
        self.time = temp.getFullYear()+"年"+(temp.getMonth()+1)+"月"+temp.getDate()+"日"+temp.getHours()+"时"+temp.getMinutes()+"分"
      },1000)
      setInterval(function(){
        self.getData();
      },5000)
      self.getData();
    },
    methods: {
      formData(){
        var temp = new FormData();
        this.playAdvIds.forEach(function(item){
          temp.append('playAdvIds',item)
        })
        temp.append('type',15)
        return temp
      },
      getData(){
        var self = this
        var temp = this.formData()
        global.axiosPostReqWithoutToken('record/getOperateCount',temp).then((res)=>{
          console.log(res)
          temp.set('type',16)
          global.axiosPostReqWithoutToken('record/getOperateCount',temp).then((res2)=>{
            console.log(res2)
            self.operateData(res.data.data.playAdvCount,res2.data.data.playAdvCount)
          })
        })
      },
      // type1 15 type2 16
      operateData(type1,type2){
        this.data.forEach(function(item){
          type1.forEach(function(item2){
            if(item.id == item2.playAdvId) {
              item.count1 = item2.count
            }
          })
          type2.forEach(function(item3){
            if(item.id == item3.playAdvId) {
              item.count2 = item3.count
            }
          })
          item.rate = item.count1 == 0 ? "0%": (parseFloat(item.count2)/parseFloat(item.count1)*100).toFixed(2)+"%"
        })
        console.log(this.data)
      }
    }
  }

</script>

<style lang="scss" scoped>
.demo_pic {
  width: 160px;
  height: 100px;
}
.top {
  text-align: center;
  height: 50px;
  font-size: 28px;
  color: white;
  background-color: #3994AD;
  padding-top: 15px;
}

.top img {
  float: left;
  height: 50px;
}
.center {
  height: 35px;
  font-size: 16px;
  padding-top: 10px;
  padding-left:5px;
  padding-right:5px;
  background-color: #BED7DA;
}
.c-ri {
  float: right;
}
</style>
