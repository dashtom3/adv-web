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
    <el-table :data="allAdverLists" border style="width: 100%">
      <el-table-column label="广告id">
        <template scope="scope">
          <span>{{scope.row.advertisement.id}}</span>
        </template>
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
      <el-table-column label="类型">
        <template scope="scope">
          <span v-if="scope.row.type==0">弹出广告</span>
          <span v-else>滚动广告</span>
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
      <el-table-column label="单价(元)">
        <template scope="scope">
          <span>{{scope.row.advertisement.price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="行业">
        <template scope="scope">
          <span>{{allSubject[scope.row.advertisement.industryId-1].name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="文件">
        <template scope="scope">
          <img :src="scope.row.advertisement.fileSrc" v-if="scope.row.advertisement.fileType === 0" alt="" class="maxAndMin">
          <video :src="scope.row.advertisement.fileSrc" controls v-if="scope.row.advertisement.fileType === 1" class="maxAndMin"></video>
          <!-- <img :src="scope.row.advertisement.imgSrc" controls v-if="scope.row.advertisement.fileType === 1" class="maxAndMin"> -->
        </template>
      </el-table-column>
      <el-table-column label="时长(s)">
        <template scope="scope">
          <span>{{scope.row.advertisement.time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.row.index)">修改</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          <el-button size="small" type="success" @click="preview(scope.row)">预览</el-button>
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
      <el-form :model="addAdverMsg" label-position="left" :rules="rules" ref="addAdverMsg">
        <div>
          <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="addAdverMsg.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth">
            <el-input v-model="addAdverMsg.content" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="广告显示名称" :label-width="formLabelWidth" prop="playAdvShowName">
            <el-input v-model="addAdverMsg.playAdvShowName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="广告类型" :label-width="formLabelWidth" prop="type">
            <el-select v-model="addAdverMsg.type" placeholder="请选择广告类型">
              <el-option
              :key="type"
              v-for="type in adverType"
              :label="type.name" :value="type.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否下单" :label-width="formLabelWidth" prop="isOrder">
            <el-select v-model="addAdverMsg.isOrder" placeholder="请选择">
              <el-option
              :key="orderType"
              v-for="orderType in isOrder"
              :label="orderType.name"
              :value="orderType.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单价" :label-width="formLabelWidth" v-if="advIsOrder">
            <el-input v-model="addAdverMsg.price" auto-complete="off" style="width:100px;"></el-input>&nbsp;元
          </el-form-item>
          <el-form-item label="行业选择" :label-width="formLabelWidth">
            <el-select v-model="addAdverMsg.industryId" placeholder="请选择">
              <el-option
              :key="subject"
              v-for="subject in allSubject"
              :label="subject.name"
              :value="subject.industryId"></el-option>
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
              <div slot="tip" class="el-upload__tip">(上传视频的最大播放时长为2分钟且不超过10M)</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="时长" :label-width="formLabelWidth" v-if="uploadFileType">
            <el-input v-model="addAdverMsg.time" type="number" auto-complete="off" style="width:100px;"></el-input>&nbsp;秒
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addAdverAlert = false">取 消</el-button>
        <el-button type="primary" @click="addAdverPost" v-if="addAdverShow" :disabled="addAdverMsg.fileSrc == null">保 存</el-button>
        <el-button type="primary" @click="editAdverPost" v-if="editAdverShow" :disabled="addAdverMsg.fileSrc == null">修 改</el-button>
      </div>
    </el-dialog>
    <!-- 弹出窗结束 -->

    <el-dialog
      :visible.sync="previewAlert" class="w12h600" ref="imgContent" :class="{'background_opacity': previewInfo.type == 1}">
      <span class="leftTop" :class="{'top20':previewInfo.type == 1}">{{previewInfo.playAdvShowName}}</span>
      <img :src="previewInfo.src" alt="" v-if="previewInfo.type == 0" class="maxWidth1200" ref="img">
      <video :src="previewInfo.src" v-if="previewInfo.type == 1" autoplay class="width1200"></video>
    </el-dialog>

    <!-- <el-dialog
      :visible.sync="previewAlert" class="w12h600">
      <img :src="previewInfo.src" alt="" v-if="previewInfo.type == 0" class="maxWidth1200">
      <video :src="previewInfo.src" v-if="previewInfo.type == 1" autoplay class="width1200"></video>
    </el-dialog> -->
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
        uploadFileType: false,
        previewAlert: false,
        title: null,
        addAdverShow: false,
        editAdverShow: false,
        formLabelWidth: '80px',
        previewInfo: {
          type: null,
          src: null,
          playAdvShowName: null
        },
        addAdverMsg: {
          selectType: null,
          type: null,
          name: null,
          content: null,
          price: null,
          fileSrc: null,
          fileName: null,
          fileType: null,
          time: null,
          isOrder: null,
          advertisementId: null,
          industryId: null,
          playAdvShowName: null
        },
        adverType: [
          { name: '滚动广告', value: '1' },
          { name: '弹出广告', value: '0' }
        ],
        isOrder: [
          { name: '是', value: '1' },
          { name: '否', value: '0' }
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
        editUrl: null,
        allSubject: [],
        rules:{
          name: [{ required: true, message: '请输入广告名称', trigger: 'blur' }],
          type: [{ required: true, message: '请选择广告类型', trigger: 'change' }],
          isOrder: [{ required: true, message: '请选择是否下单', trigger: 'change' }],
          playAdvShowName: [{ required: true, message: '请输入广告显示名称', trigger: 'blur' }]
        }
      }
    },
    created () {
      var self = this
      global.getQiNiuToken().then((res) => {
        self.qiNiuToken = {token: res.data.data}
      })
      this.getAllSubject()
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
      // 所以行业
      getAllSubject () {
        global.axiosGetReq('exclude/getIndustryList', '')
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            this.allSubject = res.data.data
          } else {
            global.error(this, res.data.data, '')
          }
        })
      },
      getAdverList (args) {
        var self = this
        global.axiosGetReq('playAdv/getPlayAdvListFromAdmin?', args)
        .then((res) => {
          // console.log(res)
          if (res.data.callStatus === 'SUCCEED') {
            if (res.data.data.length > 0) {
              for (var i in res.data.data) {
                res.data.data[i].index = i
              }
              self.allAdverLists = res.data.data
              self.adverInfo.currentPage = res.data.currentPage
              self.adverInfo.totalPage = res.data.totalPage
            } else if (this.adverInfo.currentPage !== 1) {
              this.adverInfo.currentPage --
              this.getAdverList(this.adverInfo)
            }
          } else {
            global.error(this, res.data.data, '')
            if (res.data.data == '用户未登录') {
              this.$router.push('/admin')
            }
          }
        })
      },
      // 上传文件
      uploadFile (file, response) {
        if (response.size > 20000000) {
          global.error(this, '上传文件过大', '')
          this.fileList = []
          return false
        }
        // console.log(response, file)
        if (response.raw.type == 'image/png' || response.raw.type === 'image/jpeg' || response.raw.type == 'image/gif') {
          this.uploadFileType = true
          this.addAdverMsg.fileType = '0'
        } else {
          this.addAdverMsg.fileType = '1'
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
        this.$refs['addAdverMsg'].validate((valid) => {
          if (valid) {
            if (this.addAdverMsg.isOrder == 0) {
              this.addAdverMsg.price = null
            }
            this.addAdverMsg.fileType == 1 ? this.addAdverMsg.time = null : this.addAdverMsg.time = this.addAdverMsg.time
            var self = this
            if (this.uploadFileType) {
              if (this.addAdverMsg.time <= 0) {
                global.error(this, '播放广告要大于0')
                return false
              }
            }
            global.axiosPostReq('advertisement/add', this.addAdverMsg)
            .then((res) => {
              if (res.data.callStatus === 'SUCCEED') {
                self.addAdverAlert = false
                global.success(self, '添加成功', '')
                self.getAdverList(self.adverInfo)
              } else {
                global.error(self, res.data.data, '')
                if (res.data.data == '用户未登录') {
                  this.$router.push('/admin')
                }
              }
            })
          } else {
            return false
          }
        })
      },
      // 修改广告
      handleEdit (index) {
        this.title = '修改广告'
        this.isEdit = false
        this.addAdverAlert = true
        this.addAdverShow = false
        this.editAdverShow = true
        // console.log(this.allAdverLists[index])
        this.addAdverMsg.advertisementId = this.allAdverLists[index].advertisement.id.toString()
        this.addAdverMsg.name = this.allAdverLists[index].advertisement.name
        this.addAdverMsg.playAdvShowName = this.allAdverLists[index].playAdvShowName
        this.addAdverMsg.industryId = this.allAdverLists[index].advertisement.industryId
        this.addAdverMsg.price = this.allAdverLists[index].advertisement.price
        this.addAdverMsg.content = this.allAdverLists[index].advertisement.content
        this.addAdverMsg.playAdvId = this.allAdverLists[index].id.toString()
        if (this.allAdverLists[index].advertisement.fileName || this.allAdverLists[index].advertisement.fileSrc) {
            var newObj = {
              name: this.allAdverLists[index].advertisement.fileName,
              url: this.allAdverLists[index].advertisement.fileSrc
            }
            this.fileList.push(newObj)
            if (newObj.name.indexOf('jpeg') > -1 || newObj.name.indexOf('png') > -1 || newObj.name.indexOf('jpg') > -1) {
              this.uploadFileType = true
            } else {
              this.uploadFileType = false
            }
            this.addAdverMsg.time = this.allAdverLists[index].advertisement.time
          }
          this.addAdverMsg.fileSrc = this.allAdverLists[index].advertisement.fileSrc
          this.addAdverMsg.fileName = this.allAdverLists[index].advertisement.fileName
          this.addAdverMsg.isOrder = this.allAdverLists[index].isOrder.toString()
          this.addAdverMsg.type = this.allAdverLists[index].type.toString()
      },
      editAdverPost () {
        this.$refs['addAdverMsg'].validate((valid) => {
          if (valid) {
            this.addAdverMsg.fileType == 1 ? this.addAdverMsg.time = null : this.addAdverMsg.time = this.addAdverMsg.time
            if (this.uploadFileType) {
              if (this.addAdverMsg.time <= 0) {
                global.error(this, '播放广告要大于0')
                return false
              }
            }
            global.axiosPostReq('playAdv/update', this.addAdverMsg)
            .then((response) => {
              if (response.data.callStatus === 'SUCCEED') {
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
              } else {
                global.error(this, res.data.data, '')
                if (res.data.data == '用户未登录') {
                  this.$router.push('/admin')
                }
              }
            })
          } else {
            return false
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
            } else {
              global.error(this, res.data.data, '')
              if (res.data.data == '用户未登录') {
                this.$router.push('/admin')
              }
            }
          })
        }).catch(() => {});
      },
      // 分页
      changePage (value) {
        this.adverInfo.currentPage = value
        this.getAdverList(this.adverInfo)
      },
      // 预览
      preview (obj) {
        this.previewInfo = {
          type: obj.advertisement.fileType,
          src: obj.advertisement.fileSrc,
          playAdvShowName: obj.playAdvShowName
        },
        this.previewAlert = true
      }
    },
    computed: {
      advIsOrder () {
        if (this.addAdverMsg.isOrder == '0' || this.addAdverMsg.isOrder == null) {
          this.addAdverMsg.price = null
          return false
        } else {
          return true
        }
      },
      fileSuccess () {
        if (!this.addAdverMsg.fileSrc) {
          return true
        } else {
          return false
        }
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
          this.addAdverMsg.isOrder = 0
          this.$refs['addAdverMsg'].resetFields()
        }
      },
      previewAlert () {
        if (this.previewAlert == false) {
          this.previewInfo = {
            type: null,
            src: null,
            playAdvShowName: null
          }
        }
      }
      // previewAlert () {
      //   if (this.previewAlert == true) {
      //     console.log(document.querySelector('.maxImg1200'))
      //     // console.log(this.$refs.imgContent.$el.childNodes[0].childNodes[1])
      //     // console.log(this.$refs.imgContent.$refs.dialog.children.div.el-dialog__body.children.img.width)
      //     // console.log(this.$refs.imgContent)
      //   }
      // }
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
  .maxWidth1200{
    max-width: 100%;
    max-height: 100%;
    height: 100%;
  }
  .width1200{
    width: 1024px;
    height: 600px;
  }
  .leftTop{
    position: absolute;
    left: 10px;
    top: 10px;
    z-index: 999;
    font-size: 18px;
  }
  .top20{
    top: 20px;
  }
</style>
