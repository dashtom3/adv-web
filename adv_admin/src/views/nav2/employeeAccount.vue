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
    <el-table :data="industry" border style="width: 100%">
      <el-table-column prop="advid" label="账号">
      </el-table-column>
      <el-table-column prop="name" label="密码">
      </el-table-column>
      <el-table-column prop="des" label="姓名">
      </el-table-column>
      <el-table-column prop="contact" label="联系方式">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button size="small" @click="addAdv">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹出窗开始 -->
    <el-dialog title="添加账号" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="账号">
          <el-input v-model="form.account" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.pwd" type="password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="form.contact" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">保 存</el-button>
      </div>
    </el-dialog>
    <!-- 弹出窗结束 -->
  </div>
</template>

<script>
  import axios from 'axios'
  import global from '../global/global'
  export default {
    data() {
      return {
        my: true,
        other: false,
        dialogFormVisible: false,
        tableData: [],
        form: {
          account: '',
          pwd: '',
          name: '',
          contact: '',
        },
        type: '',
        fileList: [],
        industry: [{
          advid: '123',
          name: '123',
          des: '田',
          contact: '15900901007'
        },{
          advid: '222',
          name: '222',
          des: '田',
          contact: '15900901007'
        }],
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
      //console.log(adverUser);
    },
    methods: {
      addAdv() {
        var that = this;
        that.dialogFormVisible = true;
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleClick() {
        console.log(1);
      }
    },
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