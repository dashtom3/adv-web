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
            :label="adver.showName"
            :value="adver.playAdv.advertisement.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="screen" label="所属商铺">
          <el-select v-model="searchMsg.ownShop" placeholder="请选择所属商铺"  >
            <el-option
            label="全部"
            :value=null></el-option>
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
            label="全部"
            :value=null></el-option>
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
    <div class="block" v-if="totalLists.length/10 > 1">
      <el-pagination
      layout="prev, pager, next"
      @current-change="changePage"
      :page-count="totalLists.length%10">
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
          playShop: null,
          time: []
        },
        arr: [],
        allDate: []
      }
    },
    created () {
    this.getOrderLists()
  },
  methods: {
    search () {
      this.tableData = []
      // console.log(this.allDate)
      this.totalLists = this.allDate
      for (let i in this.searchMsg) {
        if (this.searchMsg[i] != null) {
          // console.log(i,this.searchMsg[i])
          if (i == 'adverId') {
            this.tableData = this.totalLists.filter((item) => {
              return item.playAdv.advertisement.id == this.searchMsg[i]
            })
            // console.log(this.totalLists,this.tableData)
          }
          if (i == 'ownShop' && this.searchMsg[i] != 'null') {
            if (this.tableData.length != 0) {
              this.tableData = this.tableData.filter((item) => {
                return item.playAdv.advertisement.realName == this.searchMsg[i]
              })
            } else {
              this.tableData = this.totalLists.filter((item) => {
                // console.log(this.searchMsg[i])
                return item.playAdv.advertisement.realName == this.searchMsg[i]
              })
            }
          }
          if (i == 'playShop' && this.searchMsg[i] != 'null') {
            if (this.tableData.length != 0) {
              this.tableData = this.tableData.filter((item) => {
                return item.playAdv.realName == this.searchMsg[i]
              })
            } else {
              this.tableData = this.totalLists.filter((item) => {
                return item.playAdv.realName == this.searchMsg[i]
              })
            }
          }
          if (i == 'time' && this.searchMsg[i][0] != null) {
            if (this.tableData.length != 0) {
              this.tableData = this.tableData.filter((item) => {
                return new Date(item.playDate) > this.searchMsg[i][0] && new Date(item.playDate) < this.searchMsg[i][1]
              })
            } else {
              this.tableData = this.totalLists.filter((item) => {
                return new Date(item.playDate) > this.searchMsg[i][0] && new Date(item.playDate) < this.searchMsg[i][1]
              })
            }
          }
        }
      }
      if (this.searchMsg.adverId==null && this.searchMsg.ownShop==null && this.searchMsg.playShop==null && this.searchMsg.time[0] == null) {
        this.tableData = this.totalLists
      }
      this.totalLists = this.tableData
    },
    getOrderLists() {
      global.axiosGetReq('record/getPlayRecordList')
      .then((res) => {
        if (res.data.callStatus === 'SUCCEED') {
          this.allDate = res.data.data
          let newArr = res.data.data
          console.log(this.allDate)
          for (let i in res.data.data) {
            res.data.data[i].showName = res.data.data[i].playAdv.advertisement.id + res.data.data[i].playAdv.advertisement.name
            res.data.data[i].time = Date.parse(new Date(res.data.data[i].playDate))
          }
          // 广告id列表
          this.adverIdLists = res.data.data.filter((item) => {
            return this.adverIdLists.indexOf(item.playAdv.advertisement.id) == -1
          })
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
          // // console.log(res.data.data)
          this.totalLists = res.data.data
          this.tableData = this.totalLists
          // if (res.data.data.length > 10) {
          //   this.tableData = res.data.data.splice(0, 10)
          // } else {
          //   this.tableData = res.data.data
          // }
        } else {
          global.error(this, res.data.data, '')
          if (res.data.data == '用户未登录') {
            this.$router.push('/login')
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
      // this.searchMsg.ownShop = 'null'
      // this.searchMsg.playShop = 'null'
      this.getOrderLists()
    },
    // 分页
    changePage (value) {
      this.orderArgs.currentPage = value
      if (value < this.totalLists.length%10) {
        this.tableData = this.totalLists.slice((value-1)*10, value*10)
      } else {
        this.tableData = this.totalLists.slice((value-1)*10, this.totalLists.length)
      }
      // this.getOrderLists(this.orderArgs)
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
