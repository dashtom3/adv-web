<template lang="html">
  <div class="selectEquipment">
    <el-row class="m20">
      <el-radio-group v-model="merchantArgs.type" v-on:change="selectEquipment">
        <el-radio :label="null">全部</el-radio>
        <el-radio :label="1">有设备商户</el-radio>
        <el-radio :label="2">无设备商户</el-radio>
      </el-radio-group>
      <div class="equipmentRight">
        <el-button type="primary" v-on:click="addmerchantAlert = true">添加商户</el-button>
      </div>
    </el-row>

    <!-- 商户列表 -->
    <div class="lists">
      <el-table
        :data="merchantLists"
        border
        style="width: 100%">
        <el-table-column
          prop="id"
          label="商户ID">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="商户账号">
        </el-table-column>
        <!-- <el-table-column
          prop="password"
          label="密码">
        </el-table-column> -->
        <el-table-column
          prop="allName"
          label="店铺名称">
        </el-table-column>
        <!-- <el-table-column
          prop="allname"
          label="全称">
        </el-table-column> -->
        <el-table-column
          label="类型">
          <template scope="scope">
            <span>{{type[scope.row.type-1]}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="logo">
          <template scope="scope">
            <img :src=scope.row.logo alt="" style="max-width:100px;max-height:100px;">
          </template>
        </el-table-column>
        <el-table-column
          prop="industryId"
          label="行业编号">
        </el-table-column>
        <el-table-column
          prop="intro"
          label="简介">
        </el-table-column>
        <el-table-column
          prop="content"
          label="需求内容">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系方式">
        </el-table-column>
        <el-table-column
          label="注册时间">
          <template scope="scope">
            <span>{{scope.row.registerTime | date}}</span>
          </template>
        </el-table-column>
        <el-table-column
         label="红外线"
         width="120">
         <template scope="scope">
           <el-select v-model="scope.row.infraredState" size="mini" placeholder="请选择" @change="changeInfrare(scope.row)">
             <el-option label="开启" :value=1></el-option>
             <el-option label="关闭" :value=0></el-option>
           </el-select>
         </template>
        </el-table-column>
        <el-table-column
         label="操作"
         width="100">
         <template scope="scope">
           <el-button type="danger" size="small" v-on:click.native.prevent="editUserType(scope.row.id)">修改类型</el-button>
         </template>
       </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <div class="block" v-if="merchantArgs.totalPage > 1">
      <el-pagination
        layout="prev, pager, next"
        :current-page.sync="merchantArgs.currentPage"
        @current-change="changePage"
        :page-count="merchantArgs.totalPage">
      </el-pagination>
    </div>

    <!-- 添加商户 -->
    <el-dialog
      title="添加商户"
      :visible.sync="addmerchantAlert">
      <el-form ref="addmerchantMsg" :model="addmerchantMsg" label-position="left" label-width="80px" :rules="rules">
        <el-form-item label="商户账号" prop="userName">
          <el-input v-model="addmerchantMsg.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="addmerchantMsg.password" readonly></el-input>
        </el-form-item>
        <!-- <el-form-item label="确认密码" prop="repassword">
          <el-input type="password" v-model="addmerchantMsg.repassword"></el-input>
        </el-form-item> -->
        <el-form-item label="店铺简称">
          <el-input v-model="addmerchantMsg.realName"></el-input>
        </el-form-item>
        <el-form-item label="商铺全称">
          <el-input v-model="addmerchantMsg.allName"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="addmerchantMsg.type">
            <!-- <el-radio label="0">管理员</el-radio> -->
            <el-radio label="1">有设备商铺</el-radio>
            <el-radio label="2">无设备商铺</el-radio>
            <!-- <el-radio label="3">子账号</el-radio> -->
          </el-radio-group>
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
              <div slot="tip" class="el-upload__tip">只能上传图片文件，且不超过10000kb</div>
            </el-upload>
          </el-form-item>
        <el-form-item label="行业编号">
          <el-select v-model="addmerchantMsg.industryId" placeholder="请选择">
            <el-option
              v-for="item in allIndustryLists"
              :key="item"
              :label="item.name"
              :value="item.industryId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="简介">
          <el-input type="textarea" v-model="addmerchantMsg.intro"></el-input>
        </el-form-item>
        <el-form-item label="需求内容">
          <el-input type="textarea" v-model="addmerchantMsg.content"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="addmerchantMsg.phone" :maxlength="11"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="addmerchantpost('addmerchantMsg')">添加</el-button>
          <el-button v-on:click="addmerchantAlert = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 修改类型 -->
    <el-dialog title="修改商铺类型" :visible.sync="editUserTypeAlert">
      <el-form :model="editUserTypeInfo">
        <el-form-item label="商铺类型" label-width="80px">
          <el-select v-model="editUserTypeInfo.type" placeholder="请选择商铺类型">
            <el-option label="有设备账号" value=1></el-option>
            <el-option label="无设备账号" value=2></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editUserTypeAlert = false">取 消</el-button>
        <el-button type="primary" @click="editUserTypeClick">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import global from '../global/global'
import axios from 'axios'
export default {
  data () {
    // var validatePass = (rule, value, callback) => {
    //     if (!value) {
    //       callback(new Error('请输入密码'));
    //     } else {
    //       if (this.addmerchantMsg.repassword !== '') {
    //         this.$refs.addmerchantMsg.validateField('repassword');
    //       }
    //       callback();
    //     }
    //   };
    // var validatePass2 = (rule, value, callback) => {
    //   if (!value) {
    //     callback(new Error('请再次输入密码'));
    //   } else if (value !== this.addmerchantMsg.password) {
    //     callback(new Error('两次输入密码不一致!'));
    //   } else {
    //     callback();
    //   }
    // }
    return {
      addmerchantAlert: false,
      editUserTypeAlert: false,
      merchantArgs: {
        currentPage: 1,
        numberPerPage: 10,
        totalPage: -1,
        type: null
      },
      fileList: [],
      addmerchantMsg: {
        userName: null,
        password: '12345',
        repassword: null,
        realName: null,
        allName: null,
        parentid: null,
        type: null,
        logo: null,
        logoName: null,
        industryId: null,
        intro: null,
        content: null,
        phone: null
      },
      editUserTypeInfo: {
        userId: null,
        type: null
      },
      rules: {
        userName: [
          { required: true, message: '请输入商户名称', trigger: 'blur' }
        ],
        // password: [
        //   { required: true, validator: validatePass, trigger: 'blur' }
        // ],
        // repassword: [
        //   { required: true, validator: validatePass2, trigger: 'blur' }
        // ],
        type: [{ required: true, message: '请选择类型', trigger: 'blur' }]
      },
      merchantLists: [],
      allIndustryLists: [],
      type: ['有设备账号', '无设备账号', '子账号'],
      uploadUrl: global.qiNiuUrl,
      qiNiuToken: null
    }
  },
  created () {
    this.getmerchantList(this.merchantArgs)
    this.getAllindustryLists()
    // 获取七牛token
    global.getQiNiuToken()
    .then((res) => {
      this.qiNiuToken = {token: res.data.data}
    })
  },
  methods: {
    addmerchantpost (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          global.axiosPostReq('user/register', this.addmerchantMsg)
          .then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              global.success(this, '添加成功', '')
              this.addmerchantAlert = false
              this.getmerchantList(this.merchantArgs)
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
    changeInfrare(item){
      console.log(item)
      var temp = {state:item.infraredState,userId:item.id}
      global.axiosPostReq('infrared/control?', temp)
      .then((res) => {
        if (res.data.callStatus === 'SUCCEED') {

        }
      }).catch((res)=>{
        global.error(this, '修改失败', '')
      })
    },
    getAllindustryLists () {
      global.axiosGetReq('exclude/getIndustryList')
      .then((res) => {
          this.allIndustryLists = res.data.data
      })
    },
    getmerchantList (args) {
      global.axiosGetReq('user/admin/getUserList?', args)
      .then((res) => {
        if (res.data.callStatus === 'SUCCEED') {
          this.merchantLists = res.data.data
          this.merchantArgs.currentPage = res.data.currentPage
          this.merchantArgs.totalPage = res.data.totalPage
        } else {
          global.error(this, res.data.data, '')
          if (res.data.data == '用户未登录') {
            this.$router.push('/admin')
          }
        }
      })
    },
    // 上传logo
    uploadSuccess (file, response) {
      if (response.raw.type == 'image/png' || response.raw.type === 'image/jpeg' || response.raw.type == 'image/gif') {
        if (response.size > 10000000) {
          global.error(this, '上传文件过大', '')
          this.fileList = []
          return false
        } else {
          this.addmerchantMsg.logo = global.qiniuShUrl + file.key
          this.addmerchantMsg.logoName = response.name
          this.fileList.push({ name: response.name, url: global.qiniuShUrl + file.key })
        }
      } else {
        global.error(this, '上传的文件必须是图片', '')
        this.fileList = []
        return false
      }
    },
    handleRemove () {
      this.fileList = []
      this.addmerchantMsg.logo = null
      this.addmerchantMsg.logoName = null
    },
    // 分页
    changePage (value) {
      this.merchantArgs.currentPage = value
      this.getmerchantList(this.merchantArgs)
    },
    // 选择设备
    selectEquipment () {
      this.merchantArgs.currentPage = 1
      this.getmerchantList(this.merchantArgs)
    },
    editUserType (id) {
      var obj = {
        userId: id
      }
      global.axiosGetReq('user/admin/getUserDetails?', obj)
      .then((res) => {
        // console.log(res)
        if (res.data.callStatus === 'SUCCEED') {
          this.editUserTypeAlert = true
          this.editUserTypeInfo.userId = res.data.data.id
          this.editUserTypeInfo.type = res.data.data.type.toString()
          // console.log(typeof(this.editUserTypeInfo.type), typeof(2), typeof('2'))
        } else {
          global.error(this, res.data.data, '')
          if (res.data.data == '用户未登录') {
            this.$router.push('/admin')
          }
        }
      })
    },
    editUserTypeClick () {
      global.axiosPostReq('user/changeTypeByAdmin', this.editUserTypeInfo)
      .then((res) => {
        if (res.data.callStatus === 'SUCCEED') {
          global.success(this, '修改成功', '')
          this.editUserTypeAlert = false
          this.getmerchantList(this.merchantArgs)
        } else {
          global.error(this, res.data.data, '')
          if (res.data.data == '用户未登录') {
            this.$router.push('/admin')
          }
        }
      })
    },
    // 删除
    deleteuser (userid) {
      var merchantMsg = {
        userid: userid
      }
      this.$confirm('是否删除该商户?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        console.log('删除成功')
        // var self = this
        // axios.post(global.baseUrl + '', global.postHttpDataWithToken(merchantMsg))
        // .then((res) => {
        //   if (res.data.callStatus === 'SUCCEED') {
        //     self.$message({
        //       type: 'success',
        //       message: '删除成功!',
        //       onClose: function () {
        //         self.getmerchantList(this.merchantArgs)
        //       }
        //     });
        //   }
        // })
      }).catch(() => {})
    },
    // 清空数据
    emptyData (data) {
      for (let i in data) {
        data[i] = null
      }
      return data
    }
  },
  watch: {
    addmerchantAlert () {
      if (!this.addmerchantAlert) {
        this.emptyData(this.addmerchantMsg)
        this.fileList = []
        this.$refs['addmerchantMsg'].resetFields()
        this.addmerchantMsg.password = '12345'
      }
    }
  }
}
</script>

<style lang="css">
@import url(../global/style.css);
.m20{
  margin: 20px 0;
}
.m20 .equipmentRight{
  float: right;
}
</style>
