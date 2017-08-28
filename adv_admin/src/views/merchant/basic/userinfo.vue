<template>
  <div>

    <el-table :data="userInfo" border style="width: 100%">
      <el-table-column prop="id" label="用户id">
      </el-table-column>
      <el-table-column prop="userName" label="商户账号">
      </el-table-column>
      <el-table-column prop="realName" label="商户简称">
      </el-table-column>
			<el-table-column prop="allName" label="全称">
      </el-table-column>
			<el-table-column label="logo">
				<template scope="scope">
				  <img :src="scope.row.logo" alt="" class="max100">
				</template>
      </el-table-column>
			<el-table-column prop="userGroup" label="面向用户">
      </el-table-column>
			<el-table-column prop="region" label="合作地区">
      </el-table-column>
			<el-table-column prop="intro" label="简介">
      </el-table-column>
			<el-table-column prop="content" label="需求">
      </el-table-column>
			<el-table-column prop="address" label="地址">
      </el-table-column>
			<el-table-column prop="phone" label="电话">
      </el-table-column>
      <el-table-column label="注册时间">
				<template scope="scope">
				  <span>{{scope.row.registerTime | date}}</span>
				</template>
      </el-table-column>
      <el-table-column label="操作" width="230">
        <template scope="scope">
          <el-button size="small" @click="editChildren">修改信息</el-button>
          <el-button size="small" @click="editPasswordAlert = true">修改密码</el-button>
          <!-- <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>


    <!-- 弹出窗开始 -->
		<el-dialog
      title="修改信息"
      :visible.sync="addEmployeeAlert">
      <el-form ref="updateUserInfo" :model="updateUserInfo" label-position="left" label-width="80px" :rules="rules">
        <el-form-item label="店铺名称">
          <el-input v-model="updateUserInfo.realName"></el-input>
        </el-form-item>
        <el-form-item label="全称">
          <el-input v-model="updateUserInfo.allName"></el-input>
        </el-form-item>
				<el-form-item label="面向用户">
					<el-select v-model="updateUserInfo.userGroup" multiple placeholder="请选择活动区域">
			      <el-option
						:key="userGroup"
						v-for="userGroup in userGroups"
						:label="userGroup"
						:value="userGroup"></el-option>
			    </el-select>
        </el-form-item>
        <el-form-item label="上传照片">
            <el-upload
              class="upload-demo"
              ref="upload"
              :action="uploadUrl"
              :on-remove="handleRemove"
              :on-success="uploadSuccess"
              :data="qiNiuToken"
              list-type="picture"
              :file-list="fileList"
              :disabled="fileList.length !== 0">
              <el-button slot="trigger" size="small" type="primary" :disabled="fileList.length !== 0">选取文件</el-button>
            </el-upload>
          </el-form-item>
        <el-form-item label="简介">
          <el-input type="textarea" v-model="updateUserInfo.intro"></el-input>
        </el-form-item>
        <el-form-item label="需求内容">
          <el-input type="textarea" v-model="updateUserInfo.content"></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="updateUserInfo.contact" :maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="updateUserInfo.phone" :maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="updateUserInfo.department" :maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="职位">
          <el-input v-model="updateUserInfo.position" :maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="updateUserInfo.email" :maxlength="11"></el-input>
        </el-form-item>
				<el-form-item label="合作地区">
          <el-input v-model="updateUserInfo.region"></el-input>
        </el-form-item>
				<el-form-item label="详细地址">
          <el-input v-model="updateUserInfo.address"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="editProjectClick">修改</el-button>
          <el-button v-on:click="addEmployeeAlert = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 弹出窗结束 -->

    <!-- 修改密码 -->
    <el-dialog
      title="修改密码"
      :visible.sync="editPasswordAlert"
      size="tiny"
      :before-close="handleCloseEditPassword">
      <el-form :model="editPassword" label-width="80px" :rules="rules2" ref="editPassword">
        <el-form-item label="旧密码" prop="oldPWD">
          <el-input v-model="editPassword.oldPWD" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPWD">
          <el-input v-model="editPassword.newPWD" type="password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input v-model="editPassword.checkPass" type="password" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editPasswordAlert = false">取 消</el-button>
        <el-button type="primary" @click="editPasswordClick">确 定</el-button>
      </div>
    </el-dialog>

    <!-- <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" v-on:click="addPhotoAlert = true">添加图片</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <div class="clearfix"></div>
    <div class="pop_up">
      <div class="wait_word">公司相册</div>
    </div>

    <el-table :data="photos" border style="width: 100%">
      <el-table-column prop="fileName" label="图片名">
      </el-table-column>
      <el-table-column label="图片">
        <template scope="scope">
          <img :src="scope.row.fileSrc" alt="" class="max100">
        </template>
      </el-table-column>
      <el-table-column label="上传时间">
				<template scope="scope">
				  <span>{{scope.row.uploadDate}}</span>
				</template>
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button size="small" v-on:click="deletePhoto(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加图片" :visible.sync="addPhotoAlert">
      <el-form ref="updateUserInfo" :model="addPhotoInfo" label-width="80px">
        <el-form-item label="上传图片">
          <el-upload
            class="upload-demo"
            :action="uploadUrl"
            :on-remove="removePhoto"
            :on-success="successPhoto"
            :file-list="fileList"
            :data="qiNiuToken"
            :disabled="uploadPhotoList.length !== 0">
            <el-button size="small" type="primary" :disabled="uploadPhotoList.length !== 0">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addPhotoClick">添加</el-button>
          <el-button v-on:click="addPhotoAlert = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog> -->
  </div>
</template>

<script>
  import axios from 'axios'
  import global from '../../global/global'
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value == null) {
          callback(new Error('请输入密码'));
        } else {
          if (this.editPassword.checkPass != null) {
            this.$refs.editPassword.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value == null) {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.editPassword.newPWD) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        addEmployeeAlert: false,
        addPhotoAlert: false,
        updateUserInfo: {
          realName: null,
					allName: null,
          logoName: null,
          logo: null,
					intro: null,
          content: null,
					phone: null,
					userGroup: [],
					region: null,
					address: null,
					type: null,
          email: null,
          position: null,
          department: null,
          contact: null
        },
				userGroups: ['不限', '男性', '女性', '母婴', '青少年', '中老年', '职场白领', '大学生', '高净值白领', '企业用户', '其他'],
        fileList: [],
				userInfo: [],
        uploadUrl: global.qiNiuUrl,
        qiNiuToken: null,
        rules: {
          name: [{ required: 'true', message: '请输入项目名字', trigger: 'blur' }],
					content: [{ required: 'true', message: '请输入项目内容', trigger: 'blur' }],
					type: [{ required: 'true', message: '请选择项目类型', trigger: 'change' }],
					userGroup: [{ required: 'true', message: '请选择用户群体', trigger: 'change' }],
					endDateStr: [{ required: 'true', type: 'date', message: '请选择截止日期', trigger: 'change' }]
        },
        editPasswordAlert: false,
        editPassword: {
          oldPWD: null,
          newPWD: null,
          checkPass: null
        },
        rules2: {
          oldPWD: [{ required: 'true', message: '请输入旧密码', trigger: 'blur' }],
          newPWD: [{ validator: validatePass, trigger: 'blur' }],
          checkPass: [{ validator: validatePass2, trigger: 'blur' }]
        },
        photos: [],
        photosArgs: {
          userId: global.getUser().id,
          numberPerPage: 10,
          currentPage: 1,
          totalPage: -1
        },
        uploadPhotoList: [],
        addPhotoInfo: {
          fileSrc: null,
          fileName: null
        }
      }
    },
    created: function() {
      // this.getAllIndustry()
			this.getUserInfo(this.projectArgs)
      this.getPhotos(this.photosArgs)
      global.getQiNiuToken().then((res) => {
        this.qiNiuToken = {token: res.data.data}
      })
    },
    methods: {
      handleCloseEditPassword () {
        this.$refs['editPassword'].resetFields()
        this.editPassword = {
          oldPWD: null,
          newPWD: null,
          checkPass: null
        }
        this.editPasswordAlert = false
      },
      // 修改密码
      editPasswordClick () {
        this.$refs.editPassword.validate((valid) => {
          if (valid) {
            global.axiosPostReq('user/changePWD', this.editPassword)
            .then((res) => {
              if (res.data.callStatus === 'SUCCEED') {
                global.success(this, '修改成功', '')
                this.editPasswordAlert = false
              } else {
                global.error(this, res.data.data, '')
              }
            })
          } else {
            return false
          }
        })
      },
      getUserInfo (args) {
        global.axiosGetReq('user/getUserDetails')
        .then((res) => {
					this.userInfo = []
          if (res.data.callStatus === 'SUCCEED') {
            this.userInfo.push(res.data.data)
          } else {
            global.error(this, res.data.data, '')
            if (res.data.data == '用户未登录') {
              this.$router.push('/login')
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
        this.updateUserInfo.logoName = response.name
        this.updateUserInfo.logo = global.qiniuShUrl + file.key
      },
      successPhoto (file, response) {
        var obj = {
          name: response.name,
          url: global.qiniuShUrl + file.key
        }
        this.uploadPhotoList.push(obj)
        this.addPhotoInfo.fileName = obj.name
        this.addPhotoInfo.fileSrc = obj.url
      },
      // 删除文件
      handleRemove () {
        this.fileList = []
        this.updateUserInfo.logoName = null
        this.updateUserInfo.logo = null
      },
      removePhoto () {
        this.uploadPhotoList = []
        this.addPhotoInfo.fileName = null
        this.addPhotoInfo.fileSrc = null
      },
      editChildren () {
        this.addEmployeeAlert = true
        this.fileList.push({
          name: this.userInfo[0].logoName,
          url: this.userInfo[0].logo
        })
        this.updateUserInfo.realName = this.userInfo[0].realName
        this.updateUserInfo.allName = this.userInfo[0].allName
        this.updateUserInfo.logo = this.userInfo[0].logo
        this.updateUserInfo.logoName = this.userInfo[0].logoName
        if (this.userInfo[0].userGroup !== null) {
          this.updateUserInfo.userGroup = this.userInfo[0].userGroup.split(',')
        }
        this.updateUserInfo.projectId = this.userInfo[0].id
				this.updateUserInfo.phone = this.userInfo[0].phone
        this.updateUserInfo.department = this.userInfo[0].department
        this.updateUserInfo.email = this.userInfo[0].email
        this.updateUserInfo.contact = this.userInfo[0].contact
        this.updateUserInfo.position = this.userInfo[0].position
      },
      editProjectClick () {
				global.axiosPostReq('user/update', this.updateUserInfo)
				.then((res) => {
					if (res.data.callStatus === 'SUCCEED') {
						global.success(this, '修改成功', '')
						this.addEmployeeAlert = false
						this.getUserInfo(this.projectArgs)
					} else {
						global.error(this, res.data.data, '')
            if (res.data.data == '用户未登录') {
              this.$router.push('/login')
            }
					}
				})
      },
      getPhotos (args) {
        global.axiosGetReq('photo/getPhotoList?', args)
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            if (res.data.data.length > 0) {
              this.photos = res.data.data
              this.photosArgs.currentPage = res.data.currentPage
              this.photosArgs.totalPage = res.data.totalPage
            } else if (this.photosArgs.currentPage !== 1) {
              this.photosArgs.currentPage --
              this.getPhotos(this.photosArgs)
            }
          }
        })
      },
      // 添加图片
      addPhotoClick () {
        global.axiosPostReq('photo/add', this.addPhotoInfo)
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            global.success(this, '添加成功', '')
            this.addPhotoAlert = false
            this.getPhotos(this.photosArgs)
          } else {
            global.error(this, res.data.data, '')
            if (res.data.data == '用户未登录') {
              this.$router.push('/login')
            }
          }
        })
      },
      deletePhoto (id) {
        var adverMsg = {
          photoId: id
        }
        var self = this
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          global.axiosPostReq('photo/delete', adverMsg)
          .then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              self.$message({
                type: 'success',
                message: '删除成功!',
                duration: '800',
                onClose: function () {
                  self.getPhotos(self.photosArgs)
                }
              });
            } else {
              global.error(this, res.data.data, '')
              if (res.data.data == '用户未登录') {
                this.$router.push('/login')
              }
            }
          })
        }).catch(() => {});
      },
    },
    watch: {
      addPhotoAlert () {
        if (this.addPhotoAlert === false) {
          for (let i in this.addPhotoInfo) {
            // console.log(123)
            this.addPhotoInfo[i] = null
          }
          this.uploadPhotoList = []
        }
        // console.log(this.uploadPhotoList)
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
  .max100{
    max-width: 100px;
    max-height: 100px;
  }
</style>
