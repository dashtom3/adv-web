<template>
  <div>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" @click="addAdv">添加广告</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!-- 弹出窗开始 -->
    <el-dialog title="添加广告" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="商铺类型" :label-width="formLabelWidth">
          <el-select v-model="form.type" placeholder="请选择商铺类型">
            <el-option label="自家商铺广告" value="my"></el-option>
            <el-option label="其他店铺广告" value="other"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="form.des" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="广告类型" :label-width="formLabelWidth">
          <el-select v-model="form.adtype" placeholder="请选择广告类型">
            <el-option label="滚动广告" value="scroll"></el-option>
            <el-option label="弹出广告" value="tanchu"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否下单" :label-width="formLabelWidth">
          <el-select v-model="form.list" placeholder="请选择">
            <el-option label="是" value="scroll"></el-option>
            <el-option label="否" value="tanchu"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文件" :label-width="formLabelWidth">
        <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        </el-form-item>
        <el-form-item label="时长(仅上传文件时图片时显示)" :label-width="formLabelWidth">
          <el-input v-model="form.time" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">保 存</el-button>
      </div>
    </el-dialog>
    <!-- 弹出窗结束 -->
    <el-table :data="tableData" border style="margin-top: 20px; width: 100%">
      <el-table-column prop="advid" label="广告id" width="150">
      </el-table-column>
      <el-table-column prop="name" label="名称" width="150">
      </el-table-column>
      <el-table-column prop="des" label="描述" width="180">
      </el-table-column>
      <el-table-column prop="business" label="所属商铺" width="150">
      </el-table-column>
      <el-table-column prop="Aorder" label="是否下单" width="120">
      </el-table-column>
      <el-table-column prop="file" label="文件" width="150">
      </el-table-column>
      <el-table-column prop="time" label="时长" width="150">
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template scope="scope">
          <el-button @click="handleClick" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
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
          type: '',
          name: '',
          des: '',
          adtype: '',
          list: '',
          time: '',
        },
        fileList: [],
        tableData: [{
          advid: '123',
          name: '衣服优惠',
          des: '无',
          business: '小酱软件',
          Aorder: '是',
          file: 'hahahah',
          time: '20s',
        },
        {
          advid: '123',
          name: '衣服优惠',
          des: '无',
          business: '小酱软件',
          Aorder: '是',
          file: 'hahahah',
          time: '20s',
        },
        {
          advid: '123',
          name: '衣服优惠',
          des: '无',
          business: '小酱软件',
          Aorder: '是',
          file: 'hahahah',
          time: '20s',
        }]
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

<style>
  .el-dialog__header {
    text-align: center;
  }
</style>