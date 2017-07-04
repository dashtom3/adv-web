<template lang="html">
  <div class="advOrder">
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-form class="form">
        <el-form-item class="screen" label="广告">
          <el-select v-model="searchMsg.adverId" placeholder="请选择" >
            <el-option
            v-for="adver in adverIdLists"
            :key="adver"
            :label="adver"
            :value="adver"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="screen" label="所属商铺">
          <el-select v-model="searchMsg.ownShop" placeholder="请选择所属商铺"  >
            <el-option
            v-for="item in ownShopLists"
            :key="item"
            :label="item"
            :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="screen" label="播放商铺">
          <el-select v-model="searchMsg.playShop" placeholder="请选择播放商铺">
            <el-option
            v-for="item in playShopLists"
            :key="item"
            :label="item"
            :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="screen" label="时间">
    </el-date-picker>
          <el-date-picker v-model="searchMsg.time" type="daterange" placeholder="选择时间范围">
          </el-date-picker>
        </el-form-item>
        <el-button class="search_btn" type="primary" v-on:click="search">查找</el-button>
        <el-button class="search_btn" type="primary" v-on:click="qx">取消</el-button>
      </el-form>
    </el-col>
    <div class="clearfix"></div>


    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="广告ID">
        <template scope="scope">
          <span>{{scope.row.playAdv.advertisement.id}}</span>
        </template>
      </el-table-column>
      <el-table-column label="广告名称">
        <template scope="scope">
          <span>{{scope.row.playAdv.advertisement.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="文件">
        <template scope="scope">
          <img :src="scope.row.playAdv.advertisement.fileSrc" v-if="scope.row.playAdv.advertisement.fileType === 0" alt="" class="maxAndMin">
          <video :src="scope.row.playAdv.advertisement.fileSrc" controls v-if="scope.row.playAdv.advertisement.fileType === 1" class="maxAndMin"></video>
        </template>
      </el-table-column>
      <el-table-column label="所属商铺">
        <template scope="scope">
          <span>{{scope.row.playAdv.advertisement.realName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="播放商铺">
        <template scope="scope">
          <span>{{scope.row.playAdv.realName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="playDate" label="播放日期">
      </el-table-column>
<!--       <el-table-column prop="regtime" label="下单时间">
      </el-table-column>
      <el-table-column label="订单状态">
        <template scope="scope">
          <span>{{status[scope.row.status]}}</span>
        </template>
      </el-table-column> -->
    </el-table>

    <!-- 分页 -->
    <div class="block" v-if="orderArgs.totalPage > 1">
      <el-pagination
      layout="prev, pager, next"
      @current-change="changePage"
      :page-count="orderArgs.totalPage">
    </el-pagination>
  </div>
</div>
</template>

<script>
  import axios from 'axios'
  import global from '../global/global'
  export default {
    data () {
      return {
        hah: '',
        value: '',
        tableData: [],
        totalLists: [],
        orderArgs: {
          currentPage: 1,
          numberPerPage: 10,
          totalPage: -1
        },
        adverIdLists: [],
        ownShopLists: [],
        playShopLists: [],
        searchMsg: {
          adverId: null,
          ownShop: null,
          time: null
        },
        arr: []
      }
    },
    created () {
    this.getOrderLists()
  },
  methods: {
    search:function(){
      // console.log(Date.parse(this.searchMsg.time[0]))
      if(this.searchMsg.adverId){
        for(let i in this.totalLists){
          if (this.totalLists[i].playAdv.advertisement.id === this.searchMsg.adverId) {
            this.arr.push(this.totalLists[i])
          }
        }
      }


      if(this.arr.length>0){
        var newArr2 = []
        if(this.searchMsg.ownShop){
          for(let i in this.arr){
            if (this.arr[i].playAdv.advertisement.realName === this.searchMsg.ownShop) {
              newArr2.push(this.arr[i])
            }
          }
          this.arr = newArr2
        }
      }else{
        if(this.searchMsg.ownShop){
          for(let i in this.totalLists){
            if (this.totalLists[i].playAdv.advertisement.realName === this.searchMsg.ownShop) {
              this.arr.push(this.totalLists[i])
            }
          }
        }
      }

      if (this.arr.length > 0) {
        if (this.searchMsg.time) {
          console.log(1)
          if (newArr2) {
            console.log(2)
            var newArr3 = []
            for (let i in this.newArr2) {
              if (Date.parse(this.searchMsg.time[0]) < this.totalLists[i].playAdv.advertisement.time < Date.parse(this.searchMsg.time[1])) {
                newArr3.push(this.newArr2[i])
              }
            }
            this.arr = newArr3
          } else {
            console.log(4)
            var newArr4 = []
            for (let i in this.arr) {
              if (Date.parse(this.searchMsg.time[0]) < this.totalLists[i].playAdv.advertisement.time < Date.parse(this.searchMsg.time[1])) {
                newArr4.push(this.arr[i])
              }
            }
            this.arr = newArr4
          }
        }
      } else {
        if (this.searchMsg.time) {
          console.log(5)
          var newArr5 = []
          for (let i in this.totalLists) {
            if (Date.parse(this.searchMsg.time[0]) < this.totalLists[i].playAdv.advertisement.time && this.totalLists[i].playAdv.advertisement.time < Date.parse(this.searchMsg.time[1])) {
              console.log(Date.parse(this.searchMsg.time[0]), this.totalLists[i].time<Date.parse(this.searchMsg.time[1]))
              newArr5.push(this.totalLists[i])
            }
          }
          this.arr = newArr5
        }
      }

      // if (newArr2.length > 0) {
      //   if ()
      // }
        this.tableData=this.arr
      //   console.log(this.arr.length)
      this.arr=[]
      console.log(this.tableData.length/10)
      // console.log("e")
    },
    getOrderLists() {
      global.axiosGetReq('record/getPlayRecordList')
      .then((res) => {
        if (res.data.callStatus === 'SUCCEED') {
          for (let i in res.data.data) {
            res.data.data[i].time = Date.parse(new Date(res.data.data[i].playDate))
          }
          // 广告id列表
          for (let i in res.data.data) {
            if (this.adverIdLists.indexOf(res.data.data[i].playAdv.advertisement.id) === -1) {
              this.adverIdLists.push(res.data.data[i].playAdv.advertisement.id)
            }
          }
          // 所属商铺列表
          for (let i in res.data.data) {
            if (this.ownShopLists.indexOf(res.data.data[i].playAdv.advertisement.realName) === -1) {
              this.ownShopLists.push(res.data.data[i].playAdv.advertisement.realName)
            }
          }
          // 播放商铺列表
          for (let i in res.data.data) {
            if (this.playShopLists.indexOf(res.data.data[i].playAdv.realName) === -1) {
              this.playShopLists.push(res.data.data[i].playAdv.realName)
            }
          }
          console.log(res.data.data)
          this.totalLists = res.data.data
          if (res.data.data.length > 10) {
            this.tableData = res.data.data.splice(this.orderArgs.currentPage-1*10, this.orderArgs.currentPage*10)
          } else {
            this.tableData = res.data.data
          }
        }
      })
    },
    // 过滤
    filterData () {
      this.tableData = []
      if (this.searchMsg.adverId !== null) {
        for (let i in this.totalLists) {
          if (this.totalLists[i].playAdv.advertisement.id === this.searchMsg.adverId) {
            this.tableData.push(this.totalLists[i])
          }
        }
      }

    },
    qx () {
      for (let i in this.searchMsg) {
        this.searchMsg[i] = null
      }
      this.getOrderLists()
    },
    // 分页
    changePage (value) {
      this.orderArgs.currentPage = value
      this.getOrderLists(this.orderArgs)
    }
  }
}
</script>

<style scoped>
  .el-dialog__header {
    text-align: center;
  }
  .el-form-item {
    margin-bottom: 0px !important;
  }
  .form {
    position: relative;
  }
  .screen {
    float: left !important;
    margin-right: 20px;
  }
  .search_btn {
    float: left;
    margin-top: 36px;
  }
  .maxAndMin{
    max-width: 100px;
    max-height: 100px;
  }
</style>
