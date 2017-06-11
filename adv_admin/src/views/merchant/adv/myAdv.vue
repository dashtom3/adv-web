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
          <img :src="scope.row.advertisement.fileSrc" v-if="scope.row.advertisement.fileType === 0" alt="" class="maxAndMin">
          <video :src="scope.row.advertisement.fileSrc" controls v-if="scope.row.advertisement.fileType === 1" class="maxAndMin"></video>
        </template>
      </el-table-column>
      <el-table-column label="时长">
        <template scope="scope">
          <span>{{scope.row.advertisement.time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.row)">修改</el-button>
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
          <img :src="scope.row.advertisement.fileSrc" v-if="scope.row.advertisement.fileType === 0" alt="" class="maxAndMin">
          <video :src="scope.row.advertisement.fileSrc" controls v-if="scope.row.advertisement.fileType === 1" class="maxAndMin"></video>
          <!-- <span>{{scope.row.advertisement.fileSrc}}</span> -->
        </template>
      </el-table-column>
      <el-table-column label="时长">
        <template scope="scope">
          <span>{{scope.row.advertisement.time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.row)">修改</el-button>
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
    <el-dialog :title="title" :visible.sync="addAdverAlert">
      <el-form :model="addAdverMsg" label-position="left">
        <el-form-item label="商铺类型" :label-width="formLabelWidth" v-if="isEdit">
          <el-select v-model="addAdverMsg.selectType" placeholder="请选择商铺类型" @change="selectAdverType">
            <el-option label="自家商铺广告" value=0></el-option>
            <el-option label="其他店铺广告" value=1></el-option>
          </el-select>
        </el-form-item>
        <div v-if="other">
          <el-form-item label="广告id" :label-width="formLabelWidth">
            <el-input v-model="addAdverMsg.advertisementId" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否下单" :label-width="formLabelWidth">
            <el-select v-model="addAdverMsg.isOrder" placeholder="请选择">
              <el-option
              :key="orderType"
              v-for="orderType in isOrder"
              :label="orderType.name"
              :value="orderType.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="广告类型" :label-width="formLabelWidth">
            <el-select v-model="addAdverMsg.type" placeholder="请选择广告类型">
              <el-option
              :key="type"
              v-for="type in adverType"
              :label="type.name" :value="type.value"></el-option>
            </el-select>
          </el-form-item>
        </div>

        <div v-if="my">
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="addAdverMsg.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth">
            <el-input v-model="addAdverMsg.content" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="广告类型" :label-width="formLabelWidth">
            <el-select v-model="addAdverMsg.type" placeholder="请选择广告类型">
              <el-option
              :key="type"
              v-for="type in adverType"
              :label="type.name" :value="type.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否下单" :label-width="formLabelWidth">
            <el-select v-model="addAdverMsg.isOrder" placeholder="请选择">
              <el-option
              :key="orderType"
              v-for="orderType in isOrder"
              :label="orderType.name"
              :value="orderType.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="文件" :label-width="formLabelWidth">
            <el-upload class="upload-demo"
            :action=qiNiuUrl
            :on-success="uploadFile"
            :on-remove="removeFile"
            :data="qiNiuToken"
            :file-list="fileList"
            :disabled="fileList.length !== 0">
              <el-button size="small" type="primary" :disabled="fileList.length !== 0">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="时长(仅上传文件时图片时显示)" :label-width="formLabelWidth" v-if="uploadFileType">
            <el-input v-model="addAdverMsg.time" auto-complete="off"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addAdverAlert = false">取 消</el-button>
        <el-button type="primary" @click="addAdverPost" v-if="addAdverShow">保 存</el-button>
        <el-button type="primary" @click="editAdverPost" v-if="editAdverShow">保 存</el-button>
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
        title: null,
        addAdverShow: false,
        editAdverShow: false,
        formLabelWidth: '80px',
        addAdverMsg: {
          selectType: null,
          type: null,
          name: null,
          content: null,
          fileSrc: null,
          fileName: null,
          fileType: null,
          time: null,
          isOrder: null,
          advertisementId: null
        },
        adverType: [
          { name: '滚动广告', value: 1 },
          { name: '弹出广告', value: 0 }
        ],
        isOrder: [
          { name: '是', value: 1 },
          { name: '否', value: 0 }
        ],
        isEdit: true,
        fileList: [],
        addAdverLists: [],
        scrollAvder: [],
        allAdverLists: [],
        adverInfo: {
          userId: global.getUser().id,
          numberPerPage: 10,
          currentPage: 1,
          totalPage: -1
        },
        editAdverInfo: {
          playAdvId: null,
          isOrder: null,
          type: null
        },
        qiNiuUrl: global.qiNiuUrl,
        qiNiuToken: null,
        editUrl: null
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
        this.isEdit = true
        this.title = '添加广告'
        this.addAdverShow = true
        this.editAdverShow = false
        this.my = false
        this.other = false
      },
      selectAdverType () {
        // console.log(this.addAdverMsg)
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
          self.allAdverLists = res.data.data
          self.scrollAvder = []
          self.addAdverLists = []
          for (let i in res.data.data) {
            res.data.data[i].index = i
            if (res.data.data[i].type === 0) {
              // console.log(res.data.data[i])
              self.scrollAvder.push(res.data.data[i])
            } else {
              self.addAdverLists.push(res.data.data[i])
            }
          }
          self.adverInfo.currentPage = res.data.currentPage
          self.adverInfo.totalPage = res.data.totalPage
        })
      },
      // 上传文件
      uploadFile (file, response) {
        // console.log(this.fileList, file, response)
        if (response.raw.type == 'image/png' || response.raw.type === 'image/jpeg' || response.raw.type == 'image/gif') {
          this.uploadFileType = true
          this.addAdverMsg.fileType = 0
        } else {
          this.addAdverMsg.fileType = 1
        }
        var obj = {
          name: response.name,
          url: global.qiniuShUrl + file.key
        }
        this.fileList.push(obj)
        this.addAdverMsg.fileName = response.name
        this.addAdverMsg.fileSrc = global.qiniuShUrl + file.key
      },
      removeFile () {
        this.fileList = []
        this.addAdverMsg.fileName = null
        this.addAdverMsg.fileSrc = null
        this.uploadFileType = false
        this.addAdverMsg.time = null
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
          } else {
            global.error(self, res.data.data, '')
          }
        })
      },
      // 修改广告
      handleEdit (obj) {
        this.title = '修改广告'
        this.isEdit = false
        this.addAdverAlert = true
        this.addAdverShow = false
        this.editAdverShow = true
        if (obj.advertisement.userId === this.adverInfo.userId) {
          if (this.allAdverLists[obj.index].advertisement.fileName) {
            var newObj = {
              name: this.allAdverLists[obj.index].advertisement.fileName,
              url: this.allAdverLists[obj.index].advertisement.fileSrc
            }
            this.fileList.push(newObj)
          }
          this.my = true
          this.other = false
          this.addAdverMsg.selectType = null
          this.addAdverMsg.name = this.allAdverLists[obj.index].advertisement.name
          this.addAdverMsg.content = this.allAdverLists[obj.index].advertisement.content
          // console.log(this.addAdverMsg)
        } else {
          this.other = true
          this.my = false
        }
        this.addAdverMsg.playAdvId = this.allAdverLists[obj.index].id
        this.addAdverMsg.isOrder = this.allAdverLists[obj.index].isOrder
        this.addAdverMsg.type = this.allAdverLists[obj.index].type
        this.addAdverMsg.advertisementId = this.allAdverLists[obj.index].advertisement.id
      },
      editAdverPost () {
        global.axiosPostReq('playAdv/update', this.addAdverMsg)
        .then((res) => {
          if (this.my) {
            global.axiosPostReq('advertisement/update', this.addAdverMsg)
            .then((res) => {
              if (res.data.callStatus === 'SUCCEED') {
                global.success(this, '修改成功', '')
                this.getAdverList(this.adverInfo)
                this.addAdverAlert = false
              } else {
                global.error(this, res.data.data, '')
              }
            })
          } else if (res.data.callStatus === 'SUCCEED') {
              global.success(this, '修改成功', '')
              this.getAdverList(this.adverInfo)
              this.addAdverAlert = false
            } else {
              global.error(this, res.data.data, '')
            }
        })
      },
      // 删除广告
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
      },
      // 分页
      changePage (value) {
        this.adverInfo.currentPage = value
        this.getAdverList(this.adverInfo)
      }
    },
    watch: {
      addAdverAlert () {
        if (this.addAdverAlert === false) {
          for (let i in this.addAdverMsg) {
            this.addAdverMsg[i] = null
          }
          this.uploadFileType = false
          this.fileList = []
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
  .maxAndMin{
    max-width: 100px;
    max-height: 100px;
  }
  .wait_word {
    margin-left: 20px;
  }
</style>
