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
          <span>{{allIndustry[scope.row.industryId]}}</span>
          <!-- <span>{{scope.row.industryId}}</span> -->
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="联系方式">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button size="small" @click="addAdv">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    <el-dialog title="添加账号" :visible.sync="addEmployeeAlert">
      <el-form :model="addEmployeeInfo" label-position="left" label-width="80px">
        <el-form-item label="账号">
          <el-input v-model="addEmployeeInfo.userName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
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
              :data="qiNiuToken"
              :file-list="fileList"
              list-type="picture">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
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
        <el-button type="primary" @click="addEmployeeClick">保 存</el-button>
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
        addEmployeeInfo: {
          userName: null,
          password: null,
          realName: null,
          allName: null,
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
          numberPerpage: 10
        },
        uploadUrl: global.qiNiuUrl,
        qiNiuToken: null,
        rules: {
          username: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ],
          password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
        }
      }
    },
    created: function() {
      this.getEmployeeList(this.employeeArgs)
      this.getAllIndustry()
      global.getQiNiuToken().then((res) => {
        this.qiNiuToken = {token: res.data.data}
      })
    },
    methods: {
      addAdv() {
        var that = this;
        that.addEmployeeAlert = true;
      },
      getEmployeeList (args) {
        global.axiosGetReq('user/getChildAccountList?', args)
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
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
        })
      },
      uploadSuccess (file, response) {
        // console.log(file, response)
        this.addEmployeeInfo.logo = global.qiniuShUrl + file.key
      },
      // 添加子账号
      addEmployeeClick () {
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
      },
      // 分页
      changePage (value) {
        this.changePage.currentPage = value
        this.getEmployeeList(this.employeeArgs)
      }
    },
    watch: {
      addEmployeeAlert () {
        if (this.addEmployeeAlert) {
          for (let i in this.addEmployeeInfo) {
            this.addEmployeeInfo[i] = null
          }
          this.fileList = []
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
