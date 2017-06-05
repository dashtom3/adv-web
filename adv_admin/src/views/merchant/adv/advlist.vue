<template lang="html">
  <div class="advOrder">
      <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-form class="form">
          <el-form-item label="订单状态">
            <el-select v-model="orderArgs.state" placeholder="请选择广告类型" @change="selectState">
              <el-option
              v-for="option in options"
              :key="option"
              :label="option.label"
              :value="option.value"></el-option>
            </el-select>
          </el-form-item>
          <div class="total">订单总计：{{total}}，未确认：{{unacknowledged}}</div>
      </el-form>
    </el-col>
    <div class="clearfix"></div>
    <el-table :data="orderLists" border style="width: 100%">
      <el-table-column prop="orderNum" label="订单号">
      </el-table-column>
      <el-table-column prop="num" label="订单数量">
      </el-table-column>
      <el-table-column prop="playAdvId" label="广告ID">
      </el-table-column>
      <el-table-column label="设备编号">
        <template scope="scope">
          <span>{{scope.row.device.id}}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备位置">
        <template scope="scope">
          <span>{{scope.row.device.place}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="registerTime" label="下单时间">
        <template scope="scope">
          <span>{{scope.row.registerTime | time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单状态">
        <template scope="scope">
          <span>{{status[scope.row.state]}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button type="success" v-on:click="verifyOrder(scope.row.id)" :disabled="scope.row.state === 1" size="small">确认</el-button>
          <el-button type="danger" v-on:click="deleteOrder(scope.row.id)"
          :disabled="scope.row.state === 0" size="small">删除</el-button>
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
import global from '../../global/global'
export default {
  data () {
    return {
      hah: '',
      value: '',
      options: [{
        label: '全部',
        value: null
      },{
        label: '未确认',
        value: 0
      },{
        label: '已确认',
        value: 1
      }],
      orderLists: [],
      orderArgs: {
        currentPage: 1,
        numberPage: 10,
        totalPage: -1,
        state: null
      },
      status: ['未确认', '已确认'],
      total: null,
      unacknowledged: null
    }
  },
  created () {
    this.getOrderLists(this.orderArgs)
  },
  methods: {
    getOrderLists(args) {
      // var self = this
      global.axiosGetReq('advOrder/getAdvOrderList?', args)
      .then((res) => {
        // console.log(res)
        this.orderArgs.currentPage = res.data.currentPage
        this.orderArgs.totalPage = res.data.totalPage
        this.total = res.data.totalNumber
        this.orderLists = res.data.data
        this.unacknowledged = res.data.unacknowledged
      })
    },
    // 确认订单
    verifyOrder (id) {
      var orderMsg = {
        advOrderId: id,
        state: 1
      }
      var self = this
      this.$confirm('是否确认该订单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
        // type: 'success'
      }).then(() => {
        global.axiosPostReq('advOrder/verify', orderMsg)
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            self.$message({
              type: 'success',
              message: '确认成功!',
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
      // console.log(id)
      var orderMsg = {
        advOrderId: id
      }
      var self = this
      this.$confirm('是否确认删除该订单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
        // type: 'success'
      }).then(() => {
        global.axiosPostReq('advOrder/delete', orderMsg)
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            self.getOrderLists(self.orderArgs)
            self.$message({
              type: 'success',
              message: '删除成功!',
              duration: '500'
            });
          }
        })
      }).catch(() => {
      });
    },
    // 状态
    selectState () {
      this.getOrderLists(this.orderArgs)
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
.total {
  color: #48576a;
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>
