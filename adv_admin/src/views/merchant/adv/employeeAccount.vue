<template>
  <div>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" @click="addAdv">添加账号</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <div class="clearfix"></div>
    <el-table :data="employeeLists" border style="width: 100%">
      <el-table-column prop="userName" label="账号">
      </el-table-column>
      <el-table-column prop="password" label="密码">
      </el-table-column>
      <el-table-column prop="realName" label="姓名">
      </el-table-column>
      <el-table-column label="所属行业">
        <template scope="scope">
          <span>{{allIndustry[scope.row.industryId].name}}</span>
          <!-- <span>{{scope.row.industryId}}</span> -->
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="联系方式">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button size="small" @click="editChildren(scope.row.index)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block" v-if="employeeArgs.totalPag > 1">
      <el-pagination
        layout="prev, pager, next"
        :current-page.sync="employeeArgs.currentPage"
        @current-change="changePage"
        :page-count="employeeArgs.totalPage">
      </el-pagination>
    </div>

    <!-- 弹出窗开始 -->
    <el-dialog :title="title" :visible.sync="addEmployeeAlert">
      <el-form :model="addEmployeeInfo" label-position="left" label-width="80px" :rules="rules" ref="addEmployeeInfo">
        <el-form-item label="账号" prop="userName">
          <el-input v-model="addEmployeeInfo.userName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addEmployeeInfo.password" type="password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="addEmployeeInfo.realName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="全称">
          <el-input v-model="addEmployeeInfo.allName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="上传照片">
            <el-upload
              class="upload-demo"
              :action="uploadUrl"
              :on-success="uploadSuccess"
              :on-remove="removeFile"
              :data="qiNiuToken"
              :file-list="fileList"
              :disabled="fileList.length !== 0">
              <el-button slot="trigger" size="small" type="primary"
              :disabled="fileList.length !== 0">选取文件</el-button>
            </el-upload>
          </el-form-item>
        <el-form-item label="所属行业">
          <el-select v-model="addEmployeeInfo.industryId" placeholder="请选择">
            <el-option
              v-for="item in allIndustry"
              :key="item"
              :label="item.name"
              :value="item.industryId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="简介">
          <el-input type="textarea" v-model="addEmployeeInfo.intro"></el-input>
        </el-form-item>
        <el-form-item label="需求内容">
          <el-input type="textarea" v-model="addEmployeeInfo.content"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="addEmployeeInfo.phone" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addEmployeeAlert = false">取 消</el-button>
        <el-button type="primary" v-if="addEmployeeShow" @click="addEmployeeClick">保 存</el-button>
        <el-button type="primary" v-if="editEmployeeShow" @click="editEmployeeClick">保 存</el-button>
      </div>
    </el-dialog>
    <!-- 弹出窗结束 -->
  </div>
</template>

<script>
  import axios from 'axios'
  import global from '../../global/global'
  export default {
    data() {
      return {
        addEmployeeAlert: false,
        addEmployeeShow: false,
        editEmployeeShow: false,
        title: null,
        addEmployeeInfo: {
          userName: null,
          password: null,
          realName: null,
          allName: null,
          fileName: null,
          logo: null,
          industryId: null,
          intro: null,
          content: null,
          phone: null
        },
        fileList: [],
        employeeLists: [],
        allIndustry: [],
        employeeArgs: {
          currentPage: 1,
          totalPage: -1,
          numberPerPage: 10
        },
        uploadUrl: global.qiNiuUrl,
        qiNiuToken: null,
        rules: {
          userName: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ],
          password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
        }
      }
    },
    created: function() {
      this.getAllIndustry()
      global.getQiNiuToken().then((res) => {
        this.qiNiuToken = {token: res.data.data}
      })
    },
    methods: {
      addAdv() {
        var that = this;
        this.title = '添加账号'
        this.addEmployeeShow = true
        this.editEmployeeShow = false
        that.addEmployeeAlert = true;
      },
      getEmployeeList (args) {
        global.axiosGetReq('user/getChildAccountList?', args)
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            for (let i in res.data.data) {
              res.data.data[i].index = i
            }
            this.employeeLists = res.data.data
            this.employeeArgs.currentPage = res.data.currentPage
            this.employeeArgs.totalPage = res.data.totalPage
          } else {
            global.error(this, res.data.data, '')
          }
        })
      },
      // 获取所有行业
      getAllIndustry () {
        global.axiosGetReq('exclude/getIndustryList')
        .then((res) => {
          this.allIndustry = res.data.data
          this.getEmployeeList(this.employeeArgs)
        })
      },
      uploadSuccess (file, response) {
        // console.log(file, response)
        var obj = {
          name: response.name,
          url: global.qiniuShUrl + file.key
        }
        this.fileList.push(obj)
        this.addEmployeeInfo.fileName = response.name
        this.addEmployeeInfo.logo = global.qiniuShUrl + file.key
      },
      // 删除文件
      removeFile () {
        this.fileList = []
      },
      // 添加子账号
      addEmployeeClick () {
        this.$refs['addEmployeeInfo'].validate((valid) => {
          if (valid) {
            global.axiosPostReq('user/createChildAccount', this.addEmployeeInfo)
            .then((res) => {
              if (res.data.callStatus === 'SUCCEED') {
                global.success(this, '添加成功', '')
                this.addEmployeeAlert = false
                this.getEmployeeList(this.employeeArgs)
              } else {
                global.error(this, res.data.data, '')
              }
            })
          } else {
            return false
          }
        })
      },
      editChildren (index) {
        this.title = '修改账号'
        this.addEmployeeShow = false
        this.editEmployeeShow = true
        this.addEmployeeAlert = true
        this.addEmployeeInfo = this.employeeLists[index]
      },
      editEmployeeClick () {
        this.$refs['addEmployeeInfo'].validate((valid) => {
          if (valid) {
            global.axiosPostReq('user/updateChildAccount', this.addEmployeeInfo)
            .then((res) => {
              if (res.data.callStatus === 'SUCCEED') {
                global.success(this, '修改成功', '')
                this.addEmployeeAlert = false
                this.getEmployeeList(this.employeeArgs)
              }
            })
          } else {
            return false
          }
        })
      },
      // 删除子账号
      handleDelete (id) {
        var adverMsg = {
          childAccountId: id
        }
        var self = this
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          global.axiosPostReq('user/deleteChildAccount', adverMsg)
          .then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              self.$message({
                type: 'success',
                message: '删除成功!',
                duration: '800',
                onClose: function () {
                  self.getEmployeeList(self.employeeArgs)
                }
              });
            }
          })
        }).catch(() => {});
      },
      // 分页
      changePage (value) {
        this.changePage.currentPage = value
        this.getEmployeeList(this.employeeArgs)
      }
    },
    watch: {
      addEmployeeAlert () {
        if (this.addEmployeeAlert === false) {
          for (let i in this.addEmployeeInfo) {
            this.addEmployeeInfo[i] = null
          }
          this.fileList = []
          this.$refs['addEmployeeInfo'].resetFields()
          console.log(this.employeeLists)
        }
      }
    }
  }
</script>

<style scoped>
  .el-dialog__header {
    text-align: center;
  }
  .pop_up {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    background-color: #eaeaea;
    margin-top: 20px;
    font-size: 15px;
  }
  .wait_word {
    margin-left: 20px;
  }
</style>
