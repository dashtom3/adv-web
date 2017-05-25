<template lang="html">
  <div class="selectEquipment">
    <el-row>
      <el-radio-group v-model="equipment" v-on:change="selectEquipment">
        <el-radio label="0">全部</el-radio>
        <el-radio :label="1">有设备商户</el-radio>
        <el-radio :label="2">无设备商户</el-radio>
      </el-radio-group>
      <div class="equipmentRight">
        <el-button type="primary" v-on:click="addmerchantAlert = true">添加商户</el-button>
      </div>
    </el-row>

    <!-- 商户列表 -->
    <div class="">
      <el-table
        :data="merchantLists"
        height="250"
        border
        style="width: 100%">
        <el-table-column
          prop="userid"
          label="商户ID">
        </el-table-column>
        <el-table-column
          prop="username"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="password"
          label="密码">
        </el-table-column>
        <el-table-column
          prop="realname"
          label="店铺名称">
        </el-table-column>
        <el-table-column
          prop="allname"
          label="全称">
        </el-table-column>
        <el-table-column
          prop="parentid"
          label="店铺主账号id">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型">
        </el-table-column>
        <el-table-column
          label="图片">
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
          prop="regtime"
          label="注册时间">
        </el-table-column>
        <el-table-column
         label="操作"
         width="100">
         <template scope="scope">
           <el-button type="danger" size="small" v-on:click.native.prevent="deleteuser(scope.row.userid)">删除</el-button>
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
      <el-form ref="addmerchantMsg" :model="addmerchantMsg" label-width="80px">
        <el-form-item label="商户名称">
          <el-input v-model="addmerchantMsg.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="addmerchantMsg.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="addmerchantMsg.repassword"></el-input>
        </el-form-item>
        <el-form-item label="店铺名称">
          <el-input v-model="addmerchantMsg.realname"></el-input>
        </el-form-item>
        <el-form-item label="全称">
          <el-input v-model="addmerchantMsg.allname"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="addmerchantMsg.type">
            <el-radio label="0">管理员</el-radio>
            <el-radio label="1">有设备商铺</el-radio>
            <el-radio label="2">有设备商铺</el-radio>
            <el-radio label="3">子账号</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传照片">
            <el-upload
              class="upload-demo"
              ref="upload"
              :action="uploadUrl"
              :on-success="uploadSuccess"
              :data="qiNiuToken"
              list-type="picture">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload>
          </el-form-item>
        <el-form-item label="行业编号">
          <el-input v-model="addmerchantMsg.industryId"></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input type="textarea" v-model="addmerchantMsg.intro"></el-input>
        </el-form-item>
        <el-form-item label="需求内容">
          <el-input type="textarea" v-model="addmerchantMsg.content"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="addmerchantMsg.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="addmerchantpost">立即创建</el-button>
          <el-button v-on:click="addmerchantAlert = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import global from '../../global/global'
import axios from 'axios'
export default {
  data () {
    return {
      addmerchantAlert: false,
      equipment: '0',
      merchantArgs: {
        currentPage: 1,
        numberPage: 10,
        totalPage: -1,
        equipment: null
      },
      addmerchantMsg: {
        username: null,
        password: null,
        repassword: null,
        realname: null,
        allname: null,
        parentid: null,
        type: null,
        logo: null,
        industryId: null,
        intro: null,
        content: null,
        phone: null
      },
      merchantLists: [
        { userid: '1', username: '测试', password: '123456', realname: '店铺名称', allname: '全称', parentid: '2', type: '管理员', logo: '1', industryId: '234', intro: '简介', content: '需求内容', phone: '电话', regtime: '注册时间' }
      ],
      uploadUrl: global.qiniuUrl,
      qiNiuToken: null
    }
  },
  created () {
    // this.getmerchantList(this.merchantArgs)
    // 获取七牛token
    // axios.get(global.baseUrl + '?token=' + global.getToken())
    // .then((res) => {
    //   console.log(res)
    //   // self.qiNiuToken =
    // })
  },
  methods: {
    addmerchantpost () {
      var self = this
      axios.post(global.baseUrl + '', global.postHttpData(this.addmerchantMsg)).
      then((res) => {
        if (res.data.callStatus === 'SUCCEED') {
          global.success(self, '添加成功', '')
          self.getmerchantList(self.merchantArgs)
        }
      })
    },
    getmerchantList (args) {
      var self = this
      axios.get(global.baseUrl + '?' + global.getHttpData(args))
      .then((res) => {
        if (res.data.callStatus === 'SUCCEED') {
          self.merchantLists = res.data.data
          self.merchantArgs.currentPage = res.data.currentPage
          self.merchantArgs.totalPage = res.data.totalPage
        }
      })
    },
    // 上传logo
    uploadSuccess (file, response) {
      console.log(file, response)
    },
    // 分页
    changePage (value) {
      this.merchantArgs.currentPage = value
      this.getmerchantList(this.merchantArgs)
    },
    // 选择设备
    selectEquipment () {
      if (this.equipment !== '0') {
        this.merchantArgs.equipment = this.equipment
      } else {
        this.merchantArgs.equipment = null
      }
      // this.getmerchantList(this.merchantArgs)
      console.log(this.merchantArgs.equipment)
    },
    // 删除
    deleteuser (userid) {
      var merchantMsg = {
        userid: userid
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var self = this
        axios.post(global.baseUrl + '', global.postHttpDataWithToken(merchantMsg))
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            self.$message({
              type: 'success',
              message: '删除成功!',
              onClose: function () {
                self.getmerchantList(this.merchantArgs)
              }
            });
          }
        })
      });
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
      }
    }
  }
}
</script>

<style lang="css">
.selectEquipment{
  text-align: left;
}
.equipmentRight{
  float: right;
}
.block{
  text-align: right;
}
</style>
