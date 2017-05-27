<template lang="html">
  <div class="advOrder">
    <el-table
      :data="orderLists"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="订单编号">
      </el-table-column>
      <el-table-column
        prop="num"
        label="个数">
      </el-table-column>
      <el-table-column
        prop="playadvid"
        label="广告ID">
      </el-table-column>
      <el-table-column
        prop="name"
        label="广告名称">
      </el-table-column>
      <el-table-column
        label="广告文件">
        <template scope="scope">
          <img src="" alt="">
        </template>
      </el-table-column>
      <el-table-column
        prop="deviceid"
        label="设备编号">
      </el-table-column>
      <el-table-column
        prop="deviceaddress"
        label="设备位置">
      </el-table-column>
      <el-table-column
        prop="regtime"
        label="下单时间">
      </el-table-column>
      <el-table-column
        label="订单状态">
        <template scope="scope">
          <span>{{status[scope.row.status]}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template scope="scope">
          <el-button type="button" v-on:click="verifyOrder(scope.row.id)" :disabled="scope.row.status === 1" size="small">确认</el-button>
          <el-button type="danger" v-on:click="deleteOrder(scope.row.id)"
          :disabled="scope.row.status === 0" size="small">删除</el-button>
        </template>
      </el-table-column>
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
      orderLists: [
        { id: '1', playadvid: '123', deviceid: '1244', num: '5', status: 0, name: '广告名字', deviceaddress: '123', regtime: '2017-12-12', playadvid: '1' }
      ],
      orderArgs: {
        currentPage: 1,
        numberPage: 10,
        totalPage: -1
      },
      status: ['未确认', '已确认']
    }
  },
  created () {
    // this.getOrderLists(this.orderArgs)
  },
  methods: {
    getOrderLists(args) {
      var self = this
      axios.post(global.baseUrl + '', global.postHttpData(args))
      .then((res) => {
        if (res.data.callStatus === 'SUCCEED') {
          self.orderLists = res.data.data
          self.orderArgs.currentPage = res.data.currentPage
          self.orderArgs.totalPage = res.data.totalPage
        }
      })
    },
    // 确认订单
    verifyOrder (id) {
      var orderMsg = {
        id: id
      }
      var self = this
      this.$confirm('是否确认该订单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
        // type: 'success'
      }).then(() => {
        axios.post(global.baseUrl + '', global.postHttpData(orderMsg))
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            self.$message({
              type: 'success',
              message: '删除成功!',
              duration: '500',
              onClose: function () {
                self.getOrderLists(self.orderArgs)
              }
            });
          }
        })
      }).catch(() => {
      });
      // console.log(id)
    },
    // 删除订单
    deleteOrder (id) {
      console.log(id)
    },
    // 分页
    changePage (value) {
      this.orderArgs.currentPage = value
      this.getOrderLists(this.orderArgs)
    }
  }
}
</script>

<style lang="css">
</style>
