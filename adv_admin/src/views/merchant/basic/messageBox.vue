<template>
  <div>

    <el-table :data="messageLists" border style="width: 100%">
      <el-table-column prop="id" label="id">
      </el-table-column>
      <el-table-column label="留言类型">
        <template scope="scope">
          <span>{{types[scope.row.type-1]}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="projectName" label="名称">
      </el-table-column>
			<el-table-column prop="fromUserId" label="留言人id">
      </el-table-column>
			<el-table-column prop="fromUserName" label="留言人">
      </el-table-column>
			<el-table-column prop="content" label="留言内容">
      </el-table-column>
      <el-table-column label="留言时间">
				<template scope="scope">
				  <span>{{scope.row.replyDate | time}}</span>
				</template>
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block" v-if="messageArgs.totalPag > 1">
      <el-pagination
        layout="prev, pager, next"
        :current-page.sync="messageArgs.currentPage"
        @current-change="changePage"
        :page-count="messageArgs.totalPage">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  import global from '../../global/global'
  export default {
    data() {
      return {
        messageLists: [],
        messageArgs: {
          currentPage: 1,
          totalPage: -1,
          numberPerPage: 10
        },
        types: ['公司', '项目', '资源']
      }
    },
    created: function() {
      // this.getAllIndustry()
			this.getMessageList(this.messageArgs)
    },
    methods: {
      getMessageList (args) {
        global.axiosGetReq('message/getToMe?', args)
        .then((res) => {
					// console.log(res)
          if (res.data.callStatus === 'SUCCEED') {
            this.messageLists = res.data.data
            this.messageArgs.currentPage = res.data.currentPage
            this.messageArgs.totalPage = res.data.totalPage
          } else {
            global.error(this, res.data.data, '')
            if (res.data.data == '用户未登录') {
              this.$router.push('/login')
            }
          }
        })
      },
      // 删除
      handleDelete (id) {
        var adverMsg = {
          messageId: id
        }
        var self = this
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          global.axiosPostReq('message/delete', adverMsg)
          .then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              self.$message({
                type: 'success',
                message: '删除成功!',
                duration: '800',
                onClose: function () {
                  self.getMessageList(self.messageArgs)
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
      // 分页
      changePage (value) {
        this.changePage.currentPage = value
        this.getMessageList(this.messageArgs)
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
