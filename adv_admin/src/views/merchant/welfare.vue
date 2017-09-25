<template>
  <div>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" @click="addAdv">添加福利</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <div class="clearfix"></div>
    <el-table :data="allAdverLists" border style="width: 100%">
      <el-table-column prop="id" label="广告id">
      </el-table-column>
      <el-table-column label="名称" prop="name">
      </el-table-column>
      <el-table-column label="描述" prop="description">
      </el-table-column>
      <el-table-column label="链接地址" >
        <template scope="scope">
          <a :href="scope.row.webUrl" target="_blank">{{scope.row.webUrl}}</a>
        </template>
      </el-table-column>
      <el-table-column label="开始有效日期" >
        <template scope="scope">
          <span>{{scope.row.validStartDate | date}}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束有效日期" >
        <template scope="scope">
          <span>{{scope.row.validEndDate | date}}</span>
        </template>
      </el-table-column>

      <el-table-column label="福利图片">
        <template scope="scope">
          <img :src="scope.row.bigImgSrc" alt="" class="width60">
        </template>
      </el-table-column>
      <el-table-column label="缩略图">
        <template scope="scope">
          <img :src="scope.row.smallImgSrc" alt="" class="width60">
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.row)">修改</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          <!-- <el-button size="small" type="success" @click="preview(scope.row)">预览</el-button> -->
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
            <el-input v-model="addAdverMsg.description" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="链接地址" :label-width="formLabelWidth" prop="webUrl">
            <el-input v-model="addAdverMsg.webUrl" type="url" auto-complete="off"></el-input>
          </el-form-item>
           <el-form-item label="有效开始日期" :label-width="formLabelWidth" prop="validStartDateStr">
             <el-date-picker type="date" placeholder="选择日期" v-model="addAdverMsg.validStartDateStr" ></el-date-picker>
           </el-form-item>
           <el-form-item label="有效结束日期" :label-width="formLabelWidth" prop="validEndDateStr">
             <el-date-picker type="date" placeholder="选择日期" v-model="addAdverMsg.validEndDateStr" ></el-date-picker>
           </el-form-item>
          <el-form-item label="福利图片" :label-width="formLabelWidth" prop="bigImgSrc">
            <el-upload class="upload-demo"
            :action=qiNiuUrl
            :on-success="bigUploadFile"
            :on-remove="bigremoveFile"
            :data="qiNiuToken"
            :file-list="bigfileList"
            :disabled="bigfileList.length !== 0">
              <el-button size="small" type="primary" :disabled="bigfileList.length !== 0">点击上传</el-button>
            </el-upload>
          </el-form-item>

          <el-form-item label="缩略图" :label-width="formLabelWidth" prop="smallImgSrc">
            <el-upload class="upload-demo"
            :action=qiNiuUrl
            :on-success="smallUploadFile"
            :on-remove="smallremoveFile"
            :data="qiNiuToken"
            :file-list="smallfileList"
            :disabled="smallfileList.length !== 0">
              <el-button size="small" type="primary" :disabled="smallfileList.length !== 0">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addAdverAlert = false">取 消</el-button>
        <el-button type="primary" @click="addAdverPost('add')" v-if="addAdverShow" >保 存</el-button>
        <el-button type="primary" @click="addAdverPost('edit')" v-if="editAdverShow" >修 改</el-button>
      </div>
    </el-dialog>
    <!-- 弹出窗结束 -->

    <!-- <el-dialog
      :visible.sync="previewAlert" class="w12h600">
      <img :src="previewInfo.src" alt="" v-if="previewInfo.type == 0" class="maxWidth1200">
      <video :src="previewInfo.src" v-if="previewInfo.type == 1" autoplay class="width1200"></video>
    </el-dialog> -->
  </div>
</template>

<script>
import global from '../global/global'
import axios from 'axios'
  export default {
    data() {
      var urlReg = (rule, value, callback) => {
        var reg = /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/
        if (value == null) {
          callback(new Error('请输入链接地址'))
        } else {
          if (!reg.test(value)) {
            callback(new Error('请输入正确的地址'))
          } else {
            callback()
          }
        }
      }
      return {
        my: false,
        other: false,
        addAdverAlert: false,
        uploadFileType: false,
        previewAlert: false,
        title: null,
        addAdverShow: false,
        editAdverShow: false,
        formLabelWidth: '110px',
        previewInfo: {
          type: null,
          src: null,
          playAdvShowName: null
        },
        addAdverMsg: {
          name: null,
          description: null,
          webUrl: null,
          smallImgSrc: null,
          bigImgSrc: null,
          validStartDateStr: null,
          validEndDateStr: null
        },
        isEdit: true,
        bigfileList: [],
        smallfileList: [],
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
          webUrl: [{ required: true, validator: urlReg, trigger: 'blur' }],
          validStartDateStr: [{ type: 'date', required: true, message: '请选择有效开始日期', trigger: 'change' }],
          validEndDateStr: [{ type: 'date', required: true, message: '请选择有效结束日期', trigger: 'change' }],
          isOrder: [{ required: true, message: '请选择是否下单', trigger: 'change' }],
          playAdvShowName: [{ required: true, message: '请输入广告显示名称', trigger: 'blur' }],
          bigImgSrc: [{ required: true, message: '请上传福利图片', trigger: 'change' }],
          smallImgSrc: [{ required: true, message: '请上传缩略图', trigger: 'change' }]
        }
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
        this.title = '添加福利'
        this.addAdverShow = true
        this.editAdverShow = false
      },
      getAdverList (args) {
        // var self = this
        global.axiosGetReq('newAdv/getNewAdvList?', args)
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            if (res.data.data.length > 0) {
              res.data.data.map((item) => {
                item.validStartDateStrStr = global.timeFilter(new Date(item.validStartDate))
                item.validEndDateStrStr = global.timeFilter(new Date(item.validEndDate))
              })
              this.allAdverLists = res.data.data
              this.adverInfo.currentPage = res.data.currentPage
              this.adverInfo.totalPage = res.data.totalPage
            } else if (this.adverInfo.currentPage !== 1) {
              this.adverInfo.currentPage --
              this.getAdverList(this.adverInfo)
            }
          } else {
            global.error(this, res.data.data, '')
            if (res.data.data == '用户未登录') {
              this.$router.push('/login')
            }
          }
        })
      },
      // 上传文件
      bigUploadFile (file, response) {
        if (response.size > 20000000) {
          global.error(this, '上传文件过大', '')
          this.bigfileList = []
          return false
        }
        var obj = {
          name: response.name,
          url: global.qiniuShUrl + file.key
        }
        this.bigfileList.push(obj)
        this.addAdverMsg.bigImgName = response.name
        this.addAdverMsg.bigImgSrc = global.qiniuShUrl + file.key
      },
      smallUploadFile (file, response) {
        if (response.size > 20000000) {
          global.error(this, '上传文件过大', '')
          this.bigfileList = []
          return false
        }
        var obj = {
          name: response.name,
          url: global.qiniuShUrl + file.key
        }
        this.smallfileList.push(obj)
        this.addAdverMsg.smallImgName = response.name
        this.addAdverMsg.smallImgSrc = global.qiniuShUrl + file.key
      },
      bigremoveFile () {
        this.bigfileList = []
        this.addAdverMsg.bigImgName = null
        this.addAdverMsg.bigImgSrc = null
      },
      smallremoveFile () {
        this.smallfileList = []
        this.addAdverMsg.smallImgName = null
        this.addAdverMsg.smallImgSrc = null
      },
      // 添加广告
      addAdverPost (type) {
        this.$refs['addAdverMsg'].validate((valid) => {
          if (valid) {
            var start = this.addAdverMsg.validStartDateStr
            var end = this.addAdverMsg.validEndDateStr
            this.addAdverMsg.validStartDateStr = start!= null&&start!=''&&start!=undefined ? global.timeFilter(start) : start
            this.addAdverMsg.validEndDateStr = end!= null&&end!=''&&start!=undefined ? end = global.timeFilter(end) : end
            if (type == 'add') {
              global.axiosPostReq('newAdv/add', this.addAdverMsg)
              .then((res) => {
                if (res.data.callStatus === 'SUCCEED') {
                  this.addAdverAlert = false
                  global.success(this, '添加成功', '')
                  this.getAdverList(this.adverInfo)
                } else {
                  global.error(this, res.data.data, '')
                  if (res.data.data == '用户未登录') {
                    this.$router.push('/admin')
                    return false
                  }
                }
              })
            } else {
              global.axiosPostReq('newAdv/update', this.addAdverMsg)
              .then((res) => {
                if (res.data.callStatus === 'SUCCEED') {
                  this.addAdverAlert = false
                  global.success(this, '修改成功', '')
                  this.getAdverList(this.adverInfo)
                  // self.getAdverList(self.adverInfo)
                } else {
                  global.error(this, res.data.data, '')
                  if (res.data.data == '用户未登录') {
                    this.$router.push('/login')
                    return false
                  }
                }
              })
            }
          } else {
            return false
          }
        })
      },
      // 修改广告
      handleEdit (item) {
        // console.log(item);
        this.smallfileList = []
        this.bigfileList = []
        this.title = '修改福利'
        this.isEdit = false
        this.addAdverAlert = true
        this.addAdverShow = false
        this.editAdverShow = true
        this.addAdverMsg = {
          newAdvId: item.id,
          name: item.name,
          description: item.description,
          webUrl: item.webUrl,
          smallImgSrc: item.smallImgSrc,
          bigImgSrc: item.bigImgSrc,
          validStartDateStr: new Date(item.validStartDate),
          validEndDateStr: new Date(item.validEndDate)
        }
        this.smallfileList.push({name:item.smallImgName,url:item.smallImgSrc})
        this.bigfileList.push({name:item.bigImgName,url:item.bigImgSrc})
      },
      // 删除广告
      handleDelete (adverId) {
        var self = this
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.defaults.headers['token'] = global.getToken()
          axios.delete(global.baseUrl+'newAdv/delete?newAdvId='+adverId)
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
          this.addAdverMsg = {
            name: null,
            description: null,
            webUrl: null,
            smallImgSrc: null,
            bigImgSrc: null,
            validStartDateStr: null,
            validEndDateStr: null
          }
          this.smallfileList = []
          this.bigfileList = []
          this.$refs['addAdverMsg'].resetFields()
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
  .width60{
    max-width: 60px!important;
    max-height: 60px!important;
  }
</style>
