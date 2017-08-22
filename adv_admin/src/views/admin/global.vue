<template lang="html">
  <div class="selectEquipment">
    <el-row class="m20">
      <!-- <el-radio-group v-model="merchantArgs.type" v-on:change="selectEquipment">
        <el-radio :label="null">全部</el-radio>
        <el-radio :label="1">有设备商户</el-radio>
        <el-radio :label="2">无设备商户</el-radio>
      </el-radio-group> -->
      <!-- <div class="equipmentRight">
        <el-button type="primary" v-on:click="addGlobal">添加</el-button>
      </div> -->
    </el-row>

    <!-- 商户列表 -->
    <div class="lists">
      <el-table
        :data="merchantLists"
        border
        style="width: 100%">
        <el-table-column
          prop="id"
          label="ID">
        </el-table-column>
        <el-table-column
          label="文件">
          <template scope="scope">
            <a :href="scope.row.appUrl" download>{{scope.row.appName}}</a>
            <!-- <img :src="scope.row.appUrl" alt="" class="maxAndMin"> -->
          </template>
        </el-table-column>
        <el-table-column
          prop="refreshTime"
          label="每天更新时间">
        </el-table-column>
        <el-table-column
          prop="playTime"
          label="播放时长(s)">
        </el-table-column>
        <el-table-column
          prop="playRate"
          label="播放比例">
        </el-table-column>
        <el-table-column
          prop="popTime"
          label="弹出无操作返回时长(s)">
        </el-table-column>
        <el-table-column
          prop="shutTime"
          label="清单播放广告无操作返回时长(s)">
        </el-table-column>
        <el-table-column
          prop="version"
          label="版本号">
        </el-table-column>
        <el-table-column
          prop="gameReturnTime"
          label="游戏无操作返回时间(s)">
        </el-table-column>

        <el-table-column
         label="操作"
         width="150">
         <template scope="scope">
           <el-button size="small" v-on:click.native.prevent="editGlobal(scope.row.index)">修改</el-button>
           <!-- <el-button type="danger" size="small" v-on:click.native.prevent="deleteuser(scope.row.id)">删除</el-button> -->
         </template>
       </el-table-column>
      </el-table>
    </div>

    <!-- 添加商户 -->
    <el-dialog
      :title="title"
      size="tiny"
      :visible.sync="addmerchantAlert">
      <el-form ref="addGlobalMsg" :model="addGlobalMsg" label-position="left" label-width="120px" :rules="rules">
        <el-form-item label="每天更新时间" prop="refreshTime">
          <el-time-select
            v-model="addGlobalMsg.refreshTime"
            :picker-options="{
              start: '00:00',
              step: '00:01',
              end: '24:00'
            }">
          </el-time-select>
          <!-- <el-input v-model="addGlobalMsg.refreshTime"></el-input> -->
        </el-form-item>
        <el-form-item label="文件">
          <el-upload class="upload-demo"
          :action=qiNiuUrl
          :on-success="uploadFile"
          :on-remove="removeFile"
          :data="qiNiuToken"
          :file-list="fileList"
          :disabled="fileList.length !== 0">
            <el-button size="small" type="primary" :disabled="fileList.length !== 0">点击上传</el-button>
            <!-- <div slot="tip" class="el-upload__tip">(上传视频的最大播放时长为2分钟)</div> -->
          </el-upload>
        </el-form-item>
        <el-form-item label="播放时长(s)" prop="playTime">
          <el-input v-model="addGlobalMsg.playTime"></el-input>
        </el-form-item>
        <el-form-item label="播放比例" prop="playRate">
          <el-input v-model="addGlobalMsg.playRate"></el-input>
        </el-form-item>
        <el-form-item label="弹出无操作返回时长(s)" prop="popTime">
          <el-input v-model="addGlobalMsg.popTime"></el-input>
        </el-form-item>
        <el-form-item label="清单播放广告无操作返回时长(s)" prop="shutTime">
          <el-input v-model="addGlobalMsg.shutTime"></el-input>
        </el-form-item>
        <el-form-item label="版本号">
          <el-input v-model="addGlobalMsg.version"></el-input>
        </el-form-item>
        <el-form-item label="游戏无操作返回时间(s)">
          <el-input v-model="addGlobalMsg.gameReturnTime"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="addmerchantpost" v-if="addGlobalClick">添加</el-button>
          <el-button type="primary" v-on:click="editGlobalpost" v-if="editGlobalClick">修改</el-button>
          <el-button v-on:click="addmerchantAlert = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import global from '../global/global'
import axios from 'axios'
export default {
  data () {
    return {
      addmerchantAlert: false,
      editUserTypeAlert: false,
      title: null,
      addGlobalClick: false,
      editGlobalClick: false,
      merchantArgs: {
        currentPage: 1,
        numberPerPage: 10,
        totalPage: -1,
        type: null
      },
      rules: {
        refreshTime: [
          { required: true, message: '请选择每天更新时间', trigger: 'change' }
        ],
        playTime: [
          { required: true, message: '请输入播放时长', trigger: 'blur' }
        ],
        playRate: [
          { required: true, message: '请输入比例', trigger: 'blur' }
        ],
        popTime: [
          { required: true, message: '请输入弹出无操作返回时长', trigger: 'blur' }
        ],
        shutTime: [
          { required: true, message: '请输入清单播放广告无操作返回时长', trigger: 'blur' }
        ],
      },
      globalInfo: {
        numberPerPage: 10,
        currentPage: 1,
        totalPage: -1
      },
      addGlobalMsg: {
        refreshTime: null,
        playTime: null,
        playRate: null,
        popTime: null,
        shutTime: null,
        gameReturnTime: null,
        version: null
      },
      merchantLists: [],
      allIndustryLists: [],
      type: ['有设备账号', '无设备账号', '子账号'],
      qiNiuUrl: global.qiNiuUrl,
      qiNiuToken: null,
      fileList: []
    }
  },
  created () {
    this.getGlobalLists(this.globalInfo)
    global.getQiNiuToken().then((res) => {
      this.qiNiuToken = {token: res.data.data}
    })
    // this.getAllindustryLists()
  },
  methods: {
    getGlobalLists (args) {
      this.merchantLists = []
      global.axiosGetReq('env/getEnvListByAdmin?', args)
      .then((res) => {
        if (res.data.callStatus === 'SUCCEED') {
          for (var i in res.data.data) {
            res.data.data[i].index = i
          }
          this.merchantLists = res.data.data
        } else {
          global.error(this, res.data.data, '')
          this.$router.push('/admin')
        }
      })
    },

    // 添加全局变量
    addGlobal () {
      this.title = '添加全局变量'
      this.addGlobalClick = true
      this.editGlobalClick = false
      this.addmerchantAlert = true
    },
    addmerchantpost () {
      this.$refs['addGlobalMsg'].validate((valid) => {
        if (valid) {
          global.axiosPostReq('env/add', this.addGlobalMsg)
          .then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              global.success(this, '添加成功', '')
              this.addmerchantAlert = false
              this.getGlobalLists(this.globalInfo)
            } else {
              global.error(this, res.data.data, '')
              if (res.data.data == '用户未登录') {
                this.$router.push('/admin')
              }
            }
          })
        } else {
          return false
        }
      })
    },

    // 修改全局变量
    editGlobal (index) {
      this.fileList = []
      for (var i in this.merchantLists[index]) {
        this.addGlobalMsg[i] = this.merchantLists[index][i]
      }
      this.fileList.push({name:this.merchantLists[index].appName,url:this.merchantLists[index].appUrl})
      this.addGlobalMsg.envId = this.merchantLists[index].id
      this.title = '修改全局变量'
      this.addGlobalClick = false
      this.editGlobalClick = true
      this.addmerchantAlert = true
    },
    editGlobalpost () {
      global.axiosPostReq('env/update', this.addGlobalMsg)
      .then((res) => {
        if (res.data.callStatus === 'SUCCEED') {
          this.addmerchantAlert = false
          global.success(this, '修改成功', '')
          this.getGlobalLists(this.globalInfo)
        } else {
          global.error(this, res.data.data, '')
          if (res.data.data == '用户未登录') {
            this.$router.push('/admin')
          }
        }
      })
    },
    // 删除
    deleteuser (userid) {
      var merchantMsg = {
        envId: userid
      }
      this.$confirm('是否删除该全局变量?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        global.axiosPostReq('env/delete', merchantMsg)
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            global.success(this, '删除成功', '')
            this.getGlobalLists(this.globalInfo)
          } else {
            global.error(this, res.data.data, '')
            if (res.data.data == '用户未登录') {
              this.$router.push('/admin')
            }
          }
        })
      }).catch(() => {})
    },
    // 清空数据
    emptyData (data) {
      for (let i in data) {
        data[i] = null
      }
      return data
    },
    uploadFile (file, response) {
      var obj = {
        name: response.name,
        url: global.qiniuShUrl + file.key
      }
      this.fileList.push(obj)
      this.addGlobalMsg.appName = response.name
      this.addGlobalMsg.appUrl = global.qiniuShUrl + file.key
    },
    removeFile () {
      this.fileList = []
      this.addGlobalMsg.appName = null
      this.addGlobalMsg.appUrl = null
    },
  },
  watch: {
    addmerchantAlert () {
      if (!this.addmerchantAlert) {
        this.emptyData(this.addGlobalMsg)
        this.$refs['addGlobalMsg'].resetFields()
      }
    }
  }
}
</script>

<style lang="css">
@import url(../global/style.css);
.m20{
  margin: 20px 0;
}
.m20 .equipmentRight{
  float: right;
}
.maxAndMin{
  max-width: 100px;
  max-height: 100px;
}
</style>
