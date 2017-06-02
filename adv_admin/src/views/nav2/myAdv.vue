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
    <div class="clearfix"></div>
    <div class="pop_up">
      <div class="wait_word">弹出广告(仅能存一条)</div>
    </div>
    <el-table :data="tablePop" border style="width: 100%">
      <el-table-column prop="advid" label="广告id">
      </el-table-column>
      <el-table-column prop="name" label="名称">
      </el-table-column>
      <el-table-column prop="des" label="描述">
      </el-table-column>
      <el-table-column prop="business" label="所属商铺">
      </el-table-column>
      <el-table-column prop="Aorder" label="是否下单">
      </el-table-column>
      <el-table-column prop="file" label="文件">
      </el-table-column>
      <el-table-column prop="time" label="时长">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pop_up">
      <div class="wait_word">滚动广告</div>
    </div>
    <el-table :data="addAdverLists" border style="width: 100%">
      <el-table-column prop="id" label="广告id">
      </el-table-column>
      <el-table-column label="名称">
        <!-- <template scope="scope">
          <span></span>
        </template> -->
      </el-table-column>
      <el-table-column prop="des" label="描述">
      </el-table-column>
      <el-table-column prop="business" label="所属商铺">
      </el-table-column>
      <el-table-column prop="Aorder" label="是否下单">
      </el-table-column>
      <el-table-column prop="file" label="文件">
      </el-table-column>
      <el-table-column prop="time" label="时长">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出窗开始 -->
    <el-dialog title="添加广告" :visible.sync="addAdverAlert">
      <el-form :model="addAdverMsg">
        <el-form-item label="商铺类型" :label-width="formLabelWidth">
          <el-select v-model="addAdverMsg.type" placeholder="请选择商铺类型" @change="selectAdverType">
            <el-option label="自家商铺广告" value="0"></el-option>
            <el-option label="其他店铺广告" value="1"></el-option>
          </el-select>
        </el-form-item>
        <div v-show="other">
          <el-form-item label="广告id" :label-width="formLabelWidth">
            <el-input v-model="addAdverMsg.advidd" auto-complete="off"></el-input>
          </el-form-item>
        </div>
        <div v-show="my">
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="addAdverMsg.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth">
            <el-input v-model="addAdverMsg.des" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="广告类型" :label-width="formLabelWidth">
            <el-select v-model="addAdverMsg.adtype" placeholder="请选择广告类型">
              <el-option label="滚动广告" value="scroll"></el-option>
              <el-option label="弹出广告" value="tanchu"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否下单" :label-width="formLabelWidth">
            <el-select v-model="addAdverMsg.list" placeholder="请选择">
              <el-option label="是" value="scroll"></el-option>
              <el-option label="否" value="tanchu"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="文件" :label-width="formLabelWidth">
            <el-upload class="upload-demo"
            :action=qiNiuUrl :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="时长(仅上传文件时图片时显示)" :label-width="formLabelWidth">
            <el-input v-model="addAdverMsg.time" auto-complete="off"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addAdverAlert = false">取 消</el-button>
        <el-button type="primary" @click="addAdverAlert = false">保 存</el-button>
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
        my: false,
        other: false,
        addAdverAlert: false,
        formLabelWidth: '120px',
        addAdverMsg: {
          type: '',
          name: '',
          des: '',
          adtype: '',
          list: '',
          time: '',
        },
        type: '',
        fileList: [],
        addAdverLists: [],
        adverInfo: {
          userId: global.getUser().id,
          numberPerpage: 10,
          currentPage: 1,
          totalPage: -1
        },
        qiNiuUrl: null
      }
    },
    created () {
      var self = this
      global.getQiNiuToken().then((res) => {
        self.qiNiuUrl = global.baseUrl + res.data.data
      })
      this.getAdverList(this.adverInfo)
    },
    methods: {
      addAdv() {
        var that = this;
        that.addAdverAlert = true;
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
      selectAdverType () {
        if (this.addAdverMsg.type) {
          this.my = true
          this.other = false
        } else {
          this.my = false
          this.other = true
        }
      },
      getAdverList (args) {
        global.axiosGetReq('playAdv/getPlayAdvList?', args)
        .then((res) => {
          console.log(res)
        })
      }
    },
    watch: {
      addAdverAlert () {
        if (this.addAdverAlert) {
          for (let i in this.addAdverMsg) {
            this.addAdverMsg[i] = null
          }
          this.my = false
          this.other = false
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
