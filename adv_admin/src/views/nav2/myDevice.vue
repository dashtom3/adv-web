<template>
  <div>
    <!--工具条-->
    <el-table :data="industry" border style="margin-top: 20px; width: 100%">
      <el-table-column prop="advid" label="设备编号">
      </el-table-column>
      <el-table-column prop="name" label="设备mac地址">
      </el-table-column>
      <el-table-column prop="des" label="所在位置">
      </el-table-column>
      <el-table-column prop="time" label="注册时间">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button size="small" @click="addAdv">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹出窗开始 -->
    <el-dialog title="修改位置" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="位置信息" :label-width="formLabelWidth">
          <el-input v-model="form.des" auto-complete="off"></el-input>
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
  export default {
    data() {
      return {
        dialogFormVisible: false,
        formLabelWidth: '120px',
        tableData: [],
        form: {
          des: '',
        },
        industry: [{
          advid: 'A01',
          name: '6321djifsajkl12839012',
          des: '东南角',
          time: '2017-02-01 15:00:00'
        },{
          advid: 'A02',
          name: '6321djifsajkl12839012',
          des: '正门门前',
          time: '2017-02-01 15:00:00'
        }],
      }
    },
    watch: {
      // type: function() {
      //   var that = this;
      //   //console.log(that.type,'22');
      //   if (that.type == 'other') {
      //     that.my = false;
      //     that.other = true;
      //     return false
      //   }
      //   if (that.type == 'my') {
      //     that.my = true;
      //     that.other = false;
      //     return false;
      //   }
      // }
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
</style>