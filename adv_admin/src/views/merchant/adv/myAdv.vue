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
    <el-table :data="scrollAvder" border style="width: 100%">
      <el-table-column prop="id" label="广告id">
      </el-table-column>
      <el-table-column label="名称">
        <template scope="scope">
          <span>{{scope.row.advertisement.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述">
        <template scope="scope">
          <span>{{scope.row.advertisement.content}}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属商铺">
        <template scope="scope">
          <span>{{scope.row.advertisement.realName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否下单">
        <template scope="scope">
          <span v-if="scope.row.isOrder == 1">是</span>
          <span v-if="scope.row.isOrder == 0">否</span>
        </template>
      </el-table-column>
      <el-table-column label="文件">
        <template scope="scope">
          <span>{{scope.row.advertisement.fileSrc}}</span>
        </template>
      </el-table-column>
      <el-table-column label="时长">
        <template scope="scope">
          <span>{{scope.row.advertisement.time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.row.userId, scope.row.id)" v-if="scope.row.userId != adverInfo.userId">修改</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
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
        <template scope="scope">
          <span>{{scope.row.advertisement.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述">
        <template scope="scope">
          <span>{{scope.row.advertisement.content}}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属商铺">
        <template scope="scope">
          <span>{{scope.row.advertisement.realName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否下单">
        <template scope="scope">
          <span v-if="scope.row.isOrder == 1">是</span>
          <span v-if="scope.row.isOrder == 0">否</span>
        </template>
      </el-table-column>
      <el-table-column label="文件">
        <template scope="scope">
          <span>{{scope.row.advertisement.fileSrc}}</span>
        </template>
      </el-table-column>
      <el-table-column label="时长">
        <template scope="scope">
          <span>{{scope.row.advertisement.time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.row.id)" v-if="scope.row.userId === adverInfo.userId">修改</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block" v-if="adverInfo.totalPage > 1">
      <el-pagination
        layout="prev, pager, next"
        :current-page.sync="adverInfo.currentPage"
        @current-change="changePage"
        :page-count="adverInfo.totalPage">
      </el-pagination>
    </div>

    <!-- 弹出窗开始 -->
    <el-dialog title="添加广告" :visible.sync="addAdverAlert">
      <el-form :model="addAdverMsg">
        <el-form-item label="商铺类型" :label-width="formLabelWidth">
          <el-select v-model="addAdverMsg.selectType" placeholder="请选择商铺类型" @change="selectAdverType">
            <el-option label="自家商铺广告" value=0></el-option>
            <el-option label="其他店铺广告" value=1></el-option>
          </el-select>
        </el-form-item>
        <div v-show="other">
          <el-form-item label="广告id" :label-width="formLabelWidth">
            <el-input v-model="addAdverMsg.advertisementId" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否下单" :label-width="formLabelWidth">
            <el-select v-model="addAdverMsg.list" placeholder="请选择">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="广告类型" :label-width="formLabelWidth">
            <el-select v-model="addAdverMsg.type" placeholder="请选择广告类型">
              <el-option label="滚动广告" value="1"></el-option>
              <el-option label="弹出广告" value="0"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div v-show="my">
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="addAdverMsg.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth">
            <el-input v-model="addAdverMsg.content" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="广告类型" :label-width="formLabelWidth">
            <el-select v-model="addAdverMsg.type" placeholder="请选择广告类型">
              <el-option label="滚动广告" value="1"></el-option>
              <el-option label="弹出广告" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否下单" :label-width="formLabelWidth">
            <el-select v-model="addAdverMsg.isOrder" placeholder="请选择">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="文件" :label-width="formLabelWidth">
            <el-upload class="upload-demo"
            :action=qiNiuUrl
            :on-success="uploadFile"
            :data="qiNiuToken"
            :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png/gif文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="时长(仅上传文件时图片时显示)" :label-width="formLabelWidth" v-if="uploadFileType">
            <el-input v-model="addAdverMsg.time" auto-complete="off"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addAdverAlert = false">取 消</el-button>
        <el-button type="primary" @click="addAdverPost">保 存</el-button>
      </div>
    </el-dialog>
    <!-- 弹出窗结束 -->
  </div>
</template>

<script>
import global from '../../global/global'
  export default {
    data() {
      return {
        my: false,
        other: false,
        addAdverAlert: false,
        uploadFileType: false,
        formLabelWidth: '120px',
        addAdverMsg: {
          selectType: null,
          type: null,
          name: null,
          content: null,
          fileSrc: null,
          time: null,
          isOrder: null
        },
        fileList: [],
        addAdverLists: [],
        scrollAvder: [],
        adverInfo: {
          userId: global.getUser().id,
          numberPerpage: 10,
          currentPage: 1,
          totalPage: -1
        },
        qiNiuUrl: global.qiNiuUrl,
        qiNiuToken: null
      }
    },
    created () {
      var self = this
      global.getQiNiuToken().then((res) => {
        self.qiNiuToken = {token: res.data.data}
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
      handleEdit (adverId) {
        console.log(adverId)
      },
      selectAdverType () {
        if (this.addAdverMsg.selectType === '0') {
          this.my = true
          this.other = false
          this.addAdverUrl = 'advertisement/add'
        } else {
          this.my = false
          this.other = true
          this.addAdverUrl = 'playAdv/add'
        }
      },
      getAdverList (args) {
        var self = this
        global.axiosGetReq('playAdv/getPlayAdvList?', args)
        .then((res) => {
          // console.log(res)
          self.adverInfo.currentPage = res.data.currentPage
          self.adverInfo.totalPage = res.data.totalPage
          self.addAdverLists = res.data.data
          for (let i in res.data.data) {
            if (res.data.data[i].type === '0') {
              self.scrollAvder.push(res.data.data[i])
            }
          }
        })
      },
      // 上传文件
      uploadFile (file, response) {
        if (response.raw.type == 'image/png' || response.raw.type === 'image/jpeg' || response.raw.type == 'image/gif') {
          this.uploadFileType = true
        }
        this.addAdverMsg.fileSrc = global.qiniuShUrl + file.key
      },
      // 添加广告
      addAdverPost () {
        var self = this
        global.axiosPostReq(this.addAdverUrl, this.addAdverMsg)
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            self.addAdverAlert = false
            global.success(self, '添加成功', '')
            self.getAdverList(self.adverInfo)
          }
        })
      },
      handleDelete (adverId) {
        var adverMsg = {
          playAdvId: adverId
        }
        var self = this
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          global.axiosPostReq('playAdv/delete', adverMsg)
          .then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              self.$message({
                type: 'success',
                message: '删除成功!',
                duration: '800',
                onClose: function () {
                  self.getAdverList(self.adverInfo)
                }
              });
            }
          })
        }).catch(() => {});
      }
    },
    watch: {
      addAdverAlert () {
        if (this.addAdverAlert === false) {
          for (let i in this.addAdverMsg) {
            this.addAdverMsg[i] = null
          }
        }
        this.my = false
        this.other = false
        this.uploadFileType = false
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
