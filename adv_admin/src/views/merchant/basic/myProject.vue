<template>
  <div>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" @click="addAdv">添加项目</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <div class="clearfix"></div>


    <el-table :data="projectLists" border style="width: 100%">
      <el-table-column prop="id" label="项目id">
      </el-table-column>
      <el-table-column prop="userId" label="用户id">
      </el-table-column>
      <el-table-column prop="name" label="项目名称">
      </el-table-column>
      <el-table-column prop="content" label="内容">
      </el-table-column>
			<el-table-column prop="type" label="项目类型">
      </el-table-column>
			<el-table-column prop="userGroup" label="面向用户">
      </el-table-column>
      <el-table-column label="截止时间">
				<template scope="scope">
				  <span>{{scope.row.endDate | time}}</span>
				</template>
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button size="small" @click="editChildren(scope.row.index)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block" v-if="projectArgs.totalPag > 1">
      <el-pagination
        layout="prev, pager, next"
        :current-page.sync="projectArgs.currentPage"
        @current-change="changePage"
        :page-count="projectArgs.totalPage">
      </el-pagination>
    </div>

    <!-- 弹出窗开始 -->
    <el-dialog :title="title" :visible.sync="addEmployeeAlert">
      <el-form :model="addProjectInfo" label-position="left" label-width="80px" ref="addProjectInfo" :rules="rules">
        <el-form-item label="项目名" prop="name">
          <el-input v-model="addProjectInfo.name" auto-complete="off"></el-input>
        </el-form-item>
				<el-form-item label="项目内容" prop="content">
          <el-input type="textarea" v-model="addProjectInfo.content"></el-input>
        </el-form-item>
        <el-form-item label="上传照片">
            <el-upload
              class="upload-demo"
              :action="uploadUrl"
              :on-success="uploadSuccess"
              :on-remove="removeFile"
              :data="qiNiuToken"
              :file-list="fileList"
              :disabled="fileList.length !== 0">
              <el-button slot="trigger" size="small" type="primary"
              :disabled="fileList.length !== 0">选取文件</el-button>
            </el-upload>
          </el-form-item>
        <el-form-item label="项目类型" prop="type">
          <el-select v-model="addProjectInfo.type" placeholder="请选择">
            <el-option
              v-for="item in types"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
				<el-form-item label="用户群体" prop="userGroup">
          <el-select v-model="addProjectInfo.userGroup" placeholder="请选择">
            <el-option
              v-for="item in userGroups"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="截止日期" prop="endDateStr">
					<el-date-picker
			      v-model="addProjectInfo.endDateStr"
			      type="date"
			      placeholder="选择日期"
			      :picker-options="pickerOptions">
			    </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addEmployeeAlert = false">取 消</el-button>
        <el-button type="primary" v-if="addProjectShow" @click="addProjectClick">保 存</el-button>
        <el-button type="primary" v-if="editProjectShow" @click="editProjectClick">保 存</el-button>
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
        addEmployeeAlert: false,
        addProjectShow: false,
        editProjectShow: false,
        title: null,
				pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        addProjectInfo: {
          name: null,
          fileName: null,
          fileSrc: null,
          content: null,
					type: null,
					userGroup: null,
					endDateStr: null
        },
				types: ['不限', '品牌联合', '提供免费福利', '发放卡券', '线下渠道合作', '线上流量互换', '线上活动联合', '线下活动合作', '活动招商', '积分兑换', '产品置换', '媒体广告置换', '微信互推', '平台招商', 'CPS', '其他'],
				userGroups: ['不限', '男性', '女性', '母婴', '青少年', '中老年', '职场白领', '大学生', '高净值白领', '企业用户', '其他'],
        fileList: [],
        projectLists: [],
        allIndustry: [],
        projectArgs: {
          currentPage: 1,
          totalPage: -1,
          numberPerPage: 10
        },
        uploadUrl: global.qiNiuUrl,
        qiNiuToken: null,
        rules: {
          name: [{ required: 'true', message: '请输入项目名字', trigger: 'blur' }],
					content: [{ required: 'true', message: '请输入项目内容', trigger: 'blur' }],
					type: [{ required: 'true', message: '请选择项目类型', trigger: 'change' }],
					userGroup: [{ required: 'true', message: '请选择用户群体', trigger: 'change' }],
					endDateStr: [{ required: 'true', type: 'date', message: '请选择截止日期', trigger: 'change' }]
        }
      }
    },
    created: function() {
      // this.getAllIndustry()
			this.getProjectList(this.projectArgs)
      global.getQiNiuToken().then((res) => {
        this.qiNiuToken = {token: res.data.data}
      })
    },
    methods: {
      addAdv() {
        var that = this;
        this.title = '添加账号'
        this.addProjectShow = true
        this.editProjectShow = false
        that.addEmployeeAlert = true;
      },
      getProjectList (args) {
        global.axiosGetReq('project/getMyProjectList?', args)
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            if (res.data.data.length > 0) {
              for (let i in res.data.data) {
                res.data.data[i].index = i
              }
              this.projectLists = res.data.data
              this.projectArgs.currentPage = res.data.currentPage
              this.projectArgs.totalPage = res.data.totalPage
            } else if (this.projectArgs.currentPage !==1 ) {
              this.projectArgs.currentPage --
              this.getProjectList(this.projectArgs)
            }
          }
        })
      },
      uploadSuccess (file, response) {
        // console.log(response.name)
        var obj = {
          name: response.name,
          url: global.qiniuShUrl + file.key
        }
        this.fileList.push(obj)
        this.addProjectInfo.fileName = response.name
        this.addProjectInfo.fileSrc = global.qiniuShUrl + file.key
      },
      // 删除文件
      removeFile () {
        this.fileList = []
        this.addProjectInfo.logoName = null
        this.addProjectInfo.logo = null
      },
      // 添加项目
      addProjectClick () {
        this.$refs['addProjectInfo'].validate((valid) => {
          if (valid) {
						this.addProjectInfo.endDateStr = this.filterTime(this.addProjectInfo.endDateStr)
            global.axiosPostReq('project/add', this.addProjectInfo)
            .then((res) => {
              if (res.data.callStatus === 'SUCCEED') {
                global.success(this, '添加成功', '')
                this.addEmployeeAlert = false
                this.getProjectList(this.projectArgs)
              } else {
                global.error(this, res.data.data, '')
              }
            })
          } else {
            return false
          }
        })
      },
			filterTime (data) {
				if (data) {
					var month = data.getMonth() + 1
					if (month < 10) {
						month = '0' + month
					}
					var day = data.getDate()
					if (day < 10) {
						day = '0' + day
					}
					return data.getFullYear() + '-' + month + '-' + day
				}
			},
      editChildren (index) {
        this.title = '修改项目'
        this.addProjectShow = false
        this.editProjectShow = true
        this.addEmployeeAlert = true
        this.fileList.push({
          name: this.projectLists[index].fileName,
          url: this.projectLists[index].fileSrc
        })
        this.addProjectInfo.name = this.projectLists[index].name
        this.addProjectInfo.type = this.projectLists[index].type
        this.addProjectInfo.userGroup = this.projectLists[index].userGroup
        this.addProjectInfo.fileSrc = this.projectLists[index].fileSrc
        this.addProjectInfo.fileName = this.projectLists[index].fileName
        this.addProjectInfo.content = this.projectLists[index].content
        this.addProjectInfo.projectId = this.projectLists[index].id
				this.addProjectInfo.endDateStr = new Date(this.projectLists[index].endDate)
        // console.log(this.addProjectInfo)
      },
      editProjectClick () {
        this.$refs['addProjectInfo'].validate((valid) => {
          if (valid) {
            global.axiosPostReq('project/update', this.addProjectInfo)
            .then((res) => {
              if (res.data.callStatus === 'SUCCEED') {
                global.success(this, '修改成功', '')
                this.addEmployeeAlert = false
                this.getProjectList(this.projectArgs)
              } else {
                global.error(this, res.data.data, '')
              }
            })
          } else {
            return false
          }
        })
      },
      // 删除
      handleDelete (id) {
        var adverMsg = {
          projectId: id
        }
        var self = this
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          global.axiosPostReq('project/delete', adverMsg)
          .then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              self.$message({
                type: 'success',
                message: '删除成功!',
                duration: '800',
                onClose: function () {
                  self.getProjectList(self.projectArgs)
                }
              });
            } else {
            	global.error(this, res.data.data, '')
            }
          })
        }).catch(() => {});
      },
      // 分页
      changePage (value) {
        this.changePage.currentPage = value
        this.getProjectList(this.projectArgs)
      }
    },
    watch: {
      addEmployeeAlert () {
        if (this.addEmployeeAlert === false) {
          for (let i in this.addProjectInfo) {
            this.addProjectInfo[i] = null
          }
          this.fileList = []
          this.$refs['addProjectInfo'].resetFields()
          // console.log(this.addProjectInfo)
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
