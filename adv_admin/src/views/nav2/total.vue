<template lang="html">
  <div class="advOrder">
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-form class="form">
        <el-form-item class="screen" label="广告">
          <el-select v-model="hah" placeholder="请选择">
            <el-option label="未确认" value="scroll"></el-option>
            <el-option label="已确认" value="tanchu"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="screen" label="所属商铺">
          <el-select v-model="hah" placeholder="请选择">
            <el-option label="未确认" value="scroll"></el-option>
            <el-option label="已确认" value="tanchu"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="screen" label="播放商铺">
          <el-select v-model="hah" placeholder="请选择广告类型">
            <el-option label="未确认" value="scroll"></el-option>
            <el-option label="已确认" value="tanchu"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="screen" label="时间">
          <el-date-picker v-model="value3" type="datetimerange" placeholder="选择时间范围">
          </el-date-picker>
        </el-form-item>
        <el-button class="search_btn" type="primary">查找</el-button>
      </el-form>
    </el-col>
    <div class="clearfix"></div>
    <el-table :data="totalLists" border style="width: 100%">
      <el-table-column prop="id" label="广告ID">
      </el-table-column>
      <el-table-column prop="name" label="广告名称">
      </el-table-column>
      <el-table-column prop="playadvid" label="广告文件">
      </el-table-column>
      <el-table-column prop="business" label="所属商铺">
      </el-table-column>
      <el-table-column prop="deviceid" label="播放商铺">
      </el-table-column>
      <el-table-column prop="regtime" label="播放日期">
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
        options: [{
          label: '未确认'
        },{
          label: '已确认'
        }],
        totalLists: [{ 
          id: '123456',
          name: '秋衣',
          deviceid: '文件', 
          business: '自家商铺', 
          status: '自家商铺', 
          regtime: '2017-12-12', 
          playadvid: '1' }],
        orderArgs: {
          currentPage: 1,
          numberPage: 10,
          totalPage: -1
        },
        status: ['未确认', '已确认'],
        value3: [],
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
</style>
