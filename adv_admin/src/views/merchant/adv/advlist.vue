<template lang="html">
  <div class="advOrder">
      <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-form class="form">
          <el-col :span="7">
            <el-form-item label="订单状态">
              <el-select v-model="orderArgs.state" placeholder="请选择广告类型" @change="selectState">
                <el-option
                v-for="option in options"
                :key="option"
                :label="option.label"
                :value="option.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单时间段">
              <el-date-picker
                v-model="orderArgs.date"
                type="daterange"
                placeholder="选择日期范围"  @change="selectState">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="订单排序">
              <el-select v-model="orderArgs.orderType" placeholder="请选择订单排序" @change="selectState">
                <el-option
                label="顺序"
                value="0"></el-option>
                <el-option
                label="倒序"
                value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <div class="total">订单总计：{{total}}，未确认：{{unacknowledged}}</div>
      </el-form>
    </el-col>
    <div class="clearfix"></div>

    <el-table :data="orderLists" border style="width: 100%">
      <el-table-column prop="orderNum" label="订单号">
      </el-table-column>
      <el-table-column label="广告名称">
        <template scope="scope">
          <span>{{scope.row.playAdv.advertisement.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="广告描述">
        <template scope="scope">
          <span>{{scope.row.playAdv.advertisement.content}}</span>
        </template>
      </el-table-column>
      <el-table-column label="文件">
        <template scope="scope">
          <img :src="scope.row.playAdv.advertisement.fileSrc" v-if="scope.row.playAdv.advertisement.fileType === 0" alt="" class="maxAndMin">
          <video :src="scope.row.playAdv.advertisement.fileSrc" controls v-if="scope.row.playAdv.advertisement.fileType === 1" class="maxAndMin"></video>
        </template>
      </el-table-column>
      <el-table-column prop="num" label="订单数量">
      </el-table-column>
      <el-table-column label="单价">
        <template scope="scope">
          <span>{{scope.row.playAdv.advertisement.price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="总价">
        <template scope="scope">
          <span>{{scope.row.num*scope.row.playAdv.advertisement.price}}</span>
        </template>
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
      <el-table-column prop="registerTime" label="下单时间" sortable>
        <template scope="scope">
          <span>{{scope.row.boughtTime | date}}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单状态">
        <template scope="scope">
          <span>{{status[scope.row.state]}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
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
        numberPerPage: 10,
        totalPage: -1,
        state: null,
        date: [],
        startDate: null,
        endDate: null,
        orderType: '1'
      },
      status: ['未确认', '已确认'],
      total: null,
      unacknowledged: null
    }
  },
  created () {
    this.getOrderLists(this.orderArgs)
    // this.get()
    var self = this
    this.$root.eventHub.$on('shishi', (val) => {
      console.log(val)
      if (val.state == '0') {
        // self.orderLists.pop()
        self.orderLists.unshift(val)
      } else {
        for (let i in self.orderLists) {
          if (self.orderLists[i].orderNum = val.orderNum) {
            self.orderLists[i] = val
          }
        }
      }
      // this.getOrderLists(this.orderArgs)
    })
  },
  methods: {
    getOrderLists(args) {
      // var self = this
      global.axiosGetReq('advOrder/getAdvOrderList?', args)
      .then((res) => {
        // console.log(res)
        if (res.data.callStatus === 'SUCCEED') {
          if (res.data.data.length > 0) {
            this.orderArgs.currentPage = res.data.currentPage
            this.orderArgs.totalPage = res.data.totalPage
            this.total = res.data.totalNumber
            this.orderLists = res.data.data
            this.unacknowledged = res.data.unacknowledged
          } else if (this.orderArgs.currentPage != 1 && res.data.data.length != 0) {
            this.orderArgs.currentPage --
            this.getOrderLists(this.orderArgs)
          }
        }
        else if (res.data.data == '用户未登录') {
        global.error(this, res.data.data, '/login')
      }
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
          } else {
            global.error(this, res.data.data, '')
            if (res.data.data == '用户未登录') {
              this.$router.push('/logo')
            }
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
          } else {
            global.error(this, res.data.data, '')
            if (res.data.data == '用户未登录') {
              this.$router.push('/login')
            }
          }
        })
      }).catch(() => {
      });
    },
    timeFilter (value) {
      const month = (value.getMonth()+1) > 10 ? (value.getMonth()+1) : '0' + (value.getMonth()+1)
      const day = value.getDate() > 9 ? value.getDate() : '0' + value.getDate()
      return `${value.getFullYear()}-` + month + '-' + day
    },
    // 状态
    selectState () {
      // console.log(this.orderArgs.date)
      if (this.orderArgs.date[0] != null) {
        this.orderArgs.startDate = this.timeFilter(this.orderArgs.date[0])
        this.orderArgs.endDate = this.timeFilter(this.orderArgs.date[1])
      } else {
        this.orderArgs.startDate = null
        this.orderArgs.endDate = null
      }
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
.maxAndMin{
  max-width: 100px;
  max-height: 100px;
}
</style>
