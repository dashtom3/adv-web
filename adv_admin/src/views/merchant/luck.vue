<template lang="html">
  <div class="selectEquipment">
    <el-row class="m20">
      <!-- <el-radio-group v-model="merchantArgs.type" v-on:change="selectEquipment">
        <el-radio :label="null">全部</el-radio>
        <el-radio :label="1">有设备商户</el-radio>
        <el-radio :label="2">无设备商户</el-radio>
      </el-radio-group> -->
      <div class="equipmentRight" style="text-align:center;">
        <span>是否开启抽奖：</span><el-switch on-text="开启" off-text="关闭" v-model="isOpen" on-color="#13ce66"
        off-color="#ff4949">></el-switch>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button type="primary" v-on:click="showAlert" :disabled="isOpen">设置奖项</el-button>
      </div>
    </el-row>

    <!-- 商户列表 -->
    <div class="lists">
      <el-table
        :data="fucklist"
        border
        style="width: 100%">
        <el-table-column
          prop="name"
          label="奖项名称">
        </el-table-column>
        <el-table-column
          label="抽中概率">
          <template scope="scope">
            <span>{{scope.row.probability}}%</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
         label="操作"
        >
         <template scope="scope">
           <el-button type="danger" :disabled="isOpen" size="small" v-on:click.native.prevent="editLuck(luckId)">设置</el-button>
         </template>
       </el-table-column> -->
      </el-table>
    </div>


    <!-- 设置 -->
    <el-dialog :title="title" :visible.sync="addFuckAlert">
      <el-table
      :data="tableDate"
      border
      >
        <el-table-column label="奖项名称">
          <template scope="scope">
            <el-input v-model="scope.row.name"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="概率(%)">
          <template scope="scope">
            <el-input v-model="scope.row.probability"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" @click="addrow(tableDate.indexOf(scope.row))">添 加</el-button>
            <el-button type="primary" size="small" @click="deleterow(tableDate.indexOf(scope.row))">删 除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addPostClick" v-if="isAdd">确 定</el-button>
        <el-button type="primary" @click="editPostClick" v-if="!isAdd">修 改</el-button>
        <el-button @click="addFuckAlert = false">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import global from '../global/global'
import axios from 'axios'
export default {
  data () {
    return {
      isOpen: false, // 是否开启抽奖
      addFuckAlert: false, // 添加福利弹出框
      isAdd: true, // 是否添加
      title: '设置奖项',
      userInfo: global.getUser(), // 用户信息
      fucklist: [],
      tableDate: [],
      luckId: null,
      url: null
    }
  },
  created () {
    this.getFuckList()
  },
  methods: {
    showAlert () {
      this.addFuckAlert = true
      this.isAdd = true
    },
    filterDate (value) {
      var arr = value.split(',')
      var newArr = []
      for (var i = 0; i < arr.length; i+=2) {
        newArr.push({name:arr[i],probability:arr[i+1]})
      }
      return newArr
    },
    reverseData (arr) {
      var newArray = []
      for (let i in arr) {
        for (let j in arr[i]) {
          newArray.push(arr[i][j])
        }
      }
      return newArray.join(',')
    },
    getFuckList () {
      axios.get(global.baseUrl + 'draw/getByUserId?userId=' + this.userInfo.id)
      .then((res) => {
        if (res.data.callStatus == 'SUCCEED') {
          this.luckId = res.data.data.id
          if (res.data.data == null) {
            this.fucklist = []
            this.url = 'draw/add'
          } else {
            this.fucklist = this.filterDate(res.data.data.content)
            this.luckId = res.data.data.id
            this.url = 'draw/update'
          }
        } else {
          global.error(this, res.data.data)
          return false
        }
      })
    },
    addrow (index) {
      this.tableDate.splice(index+1,0,{name: null, probability: null})
    },
    deleterow (index) {
      this.tableDate.splice(index,1)
    },
    addPostClick () {
      var allProbability = 0
      for (let i in this.tableDate) {
        if (this.tableDate[i].name == null) {
          global.error(this, `第${Number(i) + 1}行奖项名称不能为空`)
          return false
        }
        if (this.tableDate[i].probability == null) {
          global.error(this, `第${Number(i) + 1}行概率不能为空`)
          return false
        }
        allProbability+=Number(this.tableDate[i].probability)
      }
      if (allProbability != 100) {
        global.error(this, '所以奖项概率相加不等于100')
        return false
      }
      var form = {
        drawId: this.luckId,
        content: this.reverseData(this.tableDate)
      }
      global.axiosPostReq(this.url, form)
      .then((res) => {
        if (res.data.callStatus == 'SUCCEED') {
          // this.fucklist = this.filterDate(res.data.data.content
          this.getFuckList()
          this.addFuckAlert = false
        } else {
          global.error(this, res.data.data)
        }
      })
    },
    editLuck (id) {
      this.addFuckAlert = true
      this.luckId = id
      this.isAdd = false
      this.title = '修改奖项'
    },
    editPostClick () {
      var form = {
        drawId: this.luckId,
        content: this.reverseData(this.tableDate)
      }
      global.axiosPostReq('draw/update', form)
      .then((res) => {
        if (res.data.callStatus == 'SUCCEED') {
          this.fucklist = this.filterDate(res.data.data.content)
          this.addFuckAlert = false
        } else {
          global.error(this, res.data.data)
          if (res.data.data == '用户未登录') {
            this.$router.push('/login')
          }
          return
        }
      })
    }
  },
  watch: {
    addFuckAlert () {
      this.tableDate = []
      if (!this.fucklist.length) {
        this.tableDate.push({name: null, probability: null})
      } else {
        this.fucklist.map((item) => {
          this.tableDate.push(item)
        })
      }
    },
    isOpen () {
      if (this.luckId == null) {
        global.error(this, '请先添加奖项')
        this.isOpen = false
        return false
      } else {
        var form = {
          drawId: this.luckId,
          state: this.isOpen == true ? 1 : 0
        }
        global.axiosPostReq('draw/changeState', form)
        .then((res) => {
          res.data.callStatus == 'SUCCEED' ? global.success(this, '操作成功') : global.error(this, res.data.data)
        })
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
