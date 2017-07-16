<template>
  <div>
    <!--工具条-->
    <!-- <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" @click="addBaseAlert = true">添加设备</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <div class="clearfix"></div> -->

    <el-table :data="baseLists" border style="margin-top: 20px; width: 100%">
      <el-table-column prop="id" label="设备编号">
      </el-table-column>
      <el-table-column label="设备所属商铺">
        <template scope="scope">
          <span>{{scope.row.deviceUser.userName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="mac" label="设备mac地址">
      </el-table-column>
      <el-table-column prop="place" label="所在位置">
      </el-table-column>
      <el-table-column label="注册时间">
        <template scope="scope">
          <span>{{scope.row.registerTime | date}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作">
        <template scope="scope">
          <el-button size="small" @click="editBase(scope.row.id)">修改位置</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>

    <!-- 分页 -->
    <div class="block" v-if="baseListArgs.totalPag > 1">
      <el-pagination
        layout="prev, pager, next"
        :current-page.sync="baseListArgs.currentPage"
        @current-change="changePage"
        :page-count="baseListArgs.totalPage">
      </el-pagination>
    </div>

    <!-- 弹出窗开始 -->
    <el-dialog title="添加设备" :visible.sync="addBaseAlert">
      <el-form :model="baseInfo" label-position="left">
        <el-form-item label="地点" :label-width="formLabelWidth">
          <el-input v-model="baseInfo.place" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="mac地址" :label-width="formLabelWidth">
          <el-input v-model="baseInfo.mac" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addBaseAlert = false">取 消</el-button>
        <el-button type="primary"
        @click="addBasePostClick">保 存</el-button>
      </div>
    </el-dialog>
    <!-- 弹出窗结束 -->

  </div>
</template>

<script>
import global from '../global/global'
  export default {
    data() {
      return {
        addBaseAlert: false,
        editBaseAlert: false,
        formLabelWidth: '120px',
        tableData: [],
        baseInfo: {
          place: null,
          mac: null,
          deviceId: null
        },
        baseListArgs: {
          numberPerPage: 10,
          currentPage: 1,
          totalPage: -1
        },
        baseLists: [],
        title: null,
        addBasePost: false,
        editBasePost: false,
        editBaseInfo: {
          deviceId: null,
          place: null
        }
      }
    },
    created () {
      this.getBaseLists(this.baseListArgs)
    },
    methods: {
      getBaseLists (args) {
        global.axiosGetReq('device/getDeviceListByAdmin?', args)
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            if (res.data.data.length > 0) {
              this.baseLists = res.data.data
              this.baseListArgs.currentPage = res.data.currentPage
              this.baseListArgs.totalPage = res.data.totalPage
            } else if(this.baseListArgs.currentPage !== 1){
              this.baseListArgs.currentPage --
              this.getBaseLists(this.baseListArgs)
            }
          } else {
            global.error(this, res.data.data, '')
            if (res.data.data == '用户未登录') {
              this.$router.push('/admin')
            }
          }
        })
      },
      // 添加设备
      addBasePostClick () {
        var self = this
        global.axiosPostReq('device/add', this.baseInfo)
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            global.success(self, '添加成功', '')
            self.addBaseAlert = false
            self.getBaseLists(self.baseListArgs)
          } else {
            global.error(self, res.data.data, '')
            if (res.data.data == '用户未登录') {
              this.$router.push('/admin')
            }
          }
        })
      },
      // 编辑设备
      editBase (id) {
        this.editBaseAlert = true
        this.editBaseInfo.deviceId = id
        global.axiosGetReq('device/getDeviceDetails?', this.editBaseInfo)
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            this.editBaseInfo.place = res.data.data.place
          } else {
            global.error(this, res.data.data, '')
            if (res.data.data == '用户未登录') {
              this.$router.push('/admin')
            }
          }
        })
      },
      editBasePostClick () {
        // console.log(this.baseInfo)
        global.axiosPostReq('device/update', this.editBaseInfo)
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            global.success(this, '修改成功', '')
            this.editBaseAlert = false
            this.getBaseLists(this.baseListArgs)
          } else {
            global.error(this, res.data.data, '')
            if (res.data.data == '用户未登录') {
              this.$router.push('/admin')
            }
          }
        })
      },
      // 删除设备
      handleDelete (id) {
        var adverMsg = {
          deviceId: id
        }
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var self = this
          global.axiosPostReq('device/delete', adverMsg)
          .then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              self.getBaseLists(self.baseListArgs)
              self.$message({
                type: 'success',
                message: '删除成功!',
                duration: '800'
              });
            } else {
              global.error(this, res.data.data, '')
              if (res.data.data == '用户未登录') {
                this.$router.push('/admin')
              }
            }
          })
        }).catch(() => {});
      },
      // 分页
      changePage (value) {
        this.baseListArgs.currentPage = value
        this.getBaseLists(this.baseListArgs)
      }
    },
    watch: {
      addBaseAlert () {
        if (this.addBaseAlert) {
          for (let i in this.baseInfo) {
            this.baseInfo[i] = null
          }
        }
      }
    }
  }
</script>

<style scoped>
  .el-dialog__header {
    text-align: center;
  }
</style>
