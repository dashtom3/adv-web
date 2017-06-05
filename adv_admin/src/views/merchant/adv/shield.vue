<template>
  <div>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" @click="addIndustryAlert = true">添加行业</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <div class="clearfix"></div>

    <!-- 行业列表 -->
    <el-table :data="industry" border style="width: 100%">
      <el-table-column prop="id" label="行业id">
      </el-table-column>
      <el-table-column prop="name" label="行业名称">
      </el-table-column>
      <el-table-column label="所属行业" prop="kindName">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block" v-if="industryArg.totalPage > 1">
      <el-pagination
        layout="prev, pager, next"
        :current-page.sync="industryArg.currentPage"
        @current-change="changePage"
        :page-count="industryArg.totalPage">
      </el-pagination>
    </div>


    <!-- 添加行业 -->
    <el-dialog title="添加行业" :visible.sync="addIndustryAlert">
      <el-form :model="addIndustryInfo">
        <el-form-item label="分类" :label-width="formLabelWidth">
          <el-select v-model="subIndustry" placeholder="请选择"
          @change="selectKind">
            <el-option
            :key="industry"
            v-for="industry in allIndustry"
            :label="industry.name"
            :value="industry.subIndusrty"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="行业" :label-width="formLabelWidth">
          <el-select v-model="addIndustryInfo.industryId" placeholder="请选择">
            <el-option
            :key="item"
            v-for="item in subIndustry"
            :label="item.name"
            :value="item.industryId"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addIndustryAlert = false">取 消</el-button>
        <el-button type="primary" @click="addPostClick">保 存</el-button>
      </div>
    </el-dialog>
    <!-- 弹出窗结束 -->
  </div>
</template>

<script>
  import axios from 'axios';
  import global from '../../global/global'
  export default {
    data() {
      return {
        addIndustryAlert: false,
        formLabelWidth: '120px',
        fileList: [],
        industry: [],
        industryArg: {
          userId: global.getUser().id,
          numberPerpage: 10,
          currentPage: 1,
          totalPage: -1
        },
        allIndustry: [],
        subIndustry: [],
        addIndustryInfo: {
          industryId: null
        }
      }
    },
    created () {
      this.getIndustryList(this.industryArg)
      // setTimeout(this.getAllIndustry, 300)
      this.getAllIndustry()
    },
    watch: {
      addIndustryAlert () {
        if (this.addIndustryAlert) {
          this.subIndustry = []
          this.addIndustryInfo.industryId = null
        }
      }
    },
    methods: {
      // 获取屏蔽行业列表
      getIndustryList (args) {
        var self = this
        // console.log('hhh')
        global.axiosGetReq('exclude/getExcludeList?', args).then((res) => {
          // console.log(res)
          if (res.data.callStatus === 'SUCCEED') {
            self.industry = res.data.data
            self.industryArg.currentPage = res.data.currentPage
            self.industryArg.totalPage = res.data.totalPage
            self.setKind(res.data.data)
          }
        })
      },
      // 获取所有行业
      getAllIndustry () {
        global.axiosGetReq('exclude/getIndustryList')
        .then((res) => {
          this.allIndustry = res.data.data
        })
      },
      selectKind () {
        this.addIndustryInfo.industryId = null
      },
      // 添加屏蔽行业
      addPostClick () {
        global.axiosPostReq('exclude/add', this.addIndustryInfo)
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            global.success(this, '添加成功', '')
            this.addIndustryAlert = false
            this.getIndustryList(this.industryArg)
          }
        })
      },
      // 删除
      handleDelete (id) {
        var adverMsg = {
          excludeId: id
        }
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var self = this
          global.axiosPostReq('exclude/delete', adverMsg)
          .then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              self.getIndustryList(self.industryArg)
              self.$message({
                type: 'success',
                message: '删除成功!',
                duration: '800'
              });
            }
          })
        }).catch(() => {});
      },
      // 分类
      setKind (value) {
        for (let i in this.allIndustry) {
          for (let j in value) {
            for (let m in this.allIndustry[i].subIndusrty) {
              if (this.allIndustry[i].subIndusrty[m].industryId === value[j].industryId) {
                // console.log(value[j],this.allIndustry[i])
                value[j].name = this.allIndustry[i].subIndusrty[m].name
                value[j].kindName = this.allIndustry[i].name
              }
            }
          }
        }
      },
      // 分页
      changePage (value) {
        this.industryArg.currentPage = value
        this.getIndustryList(this.industryArg)
      }
    }
  }
</script>

<style scoped>
@import "../../global/style.css"
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
