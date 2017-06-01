<template>
  <div>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" @click="addAdv">添加行业</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <div class="clearfix"></div>
    <el-table :data="industry" border style="width: 100%">
      <el-table-column prop="advid" label="行业id">
      </el-table-column>
      <el-table-column prop="name" label="行业名称">
      </el-table-column>
      <el-table-column prop="des" label="所属行业">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button size="small" @click="addAdv">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹出窗开始 -->
    <el-dialog title="添加行业" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="行业" :label-width="formLabelWidth">
          <el-select v-model="type" placeholder="请选择">
            <el-option label="衣服" value="my"></el-option>
            <el-option label="上衣" value="other"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="行业细分" :label-width="formLabelWidth">
          <el-select v-model="form.adtype" placeholder="请选择">
            <el-option label="衣服" value="scroll"></el-option>
            <el-option label="总行业" value="tanchu"></el-option>
          </el-select>
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
  import axios from 'axios';
  export default {
    data() {
      return {
        my: true,
        other: false,
        dialogFormVisible: false,
        formLabelWidth: '120px',
        tableData: [],
        form: {
          type: '',
          name: '',
          des: '',
          adtype: '',
          list: '',
          time: '',
        },
        type: '',
        fileList: [],
        industry: [{
          advid: '1',
          name: '上衣',
          des: '衣服',
        },{
          advid: '2',
          name: '衣服',
          des: '总行业',
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