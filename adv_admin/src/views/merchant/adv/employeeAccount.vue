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
      <el-form :model="addEmployeeInfo">
        <el-form-item label="账号">
          <el-input v-model="addEmployeeInfo.userName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="addEmployeeInfo.password" type="password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="addEmployeeInfo.realName" auto-complete="off"></el-input>
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
        my: true,
        other: false,
        addEmployeeAlert: false,
        addEmployeeInfo: {
          userName: null,
          password: null,
          realName: null,
          phone: null
        },
        type: '',
        fileList: [],
        employeeLists: [],
        employeeArgs: {
          type: 3,
          currentPage: 1,
          totalPage: -1,
          numberPerpage: 10
        }
      }
    },
    watch: {
      type: function() {
        var that = this;
        //console.log(that.type,'22');
        if (that.type == 'other') {
          that.my = false;
          that.other = true;
          return false
        }
        if (that.type == 'my') {
          that.my = true;
          that.other = false;
          return false;
        }
      }
    },
    created: function() {
      var that = this;
      let adverUser = global.getUser();
      this.getEmployeeList(this.employeeArgs)
      //console.log(adverUser);
    },
    methods: {
      addAdv() {
        var that = this;
        that.addEmployeeAlert = true;
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleClick() {
        console.log(1);
      },
      getEmployeeList (args) {
        global.axiosGetReq('user/admin/getUserList?', args)
        .then((res) => {
          console.log(res)
          if (res.data.callStatus === 'SUCCEED') {
            this.employeeLists = res.data.data
            this.employeeArgs.currentPage = res.data.currentPage
            this.employeeArgs.totalPage = res.data.totalPage
          } else {
            global.error(this, res.data.data, '')
          }
        })
      },
      // 添加子账号
      addEmployeeClick () {
        global.axiosPostReq('user/createChildAccount', this.addEmployeeInfo)
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            global.success(this, '添加成功', '')
            this.getEmployeeList(this.employeeArgs)
          }
        })
      },
      // 分页
      changePage (value) {
        this.changePage.currentPage = value
        this.getEmployeeList(this.employeeArgs)
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
