<template>
  <div>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;"   v-if="userInfo.type === 0">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" @click="addGame">添加游戏</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <div class="clearfix"></div>

    <el-table :data="gameLists" border style="margin-top: 20px; width: 100%">
      <el-table-column prop="id" label="游戏Id">
      </el-table-column>
      <el-table-column prop="name" label="游戏名称">
      </el-table-column>
      <el-table-column prop="src" label="游戏地址">
      </el-table-column>
      <el-table-column label="游戏图片">
        <template scope="scope">
          <img :src="scope.row.smallPic" alt="">
        </template>
      </el-table-column>
      <el-table-column label="操作" v-if="userInfo.type === 0">
        <template scope="scope">
          <el-button size="small" @click="editGame(scope.row.index)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block" v-if="gameListArgs.totalPag > 1">
      <el-pagination
        layout="prev, pager, next"
        :current-page.sync="gameListArgs.currentPage"
        @current-change="changePage"
        :page-count="gameListArgs.totalPage">
      </el-pagination>
    </div>

    <!-- 弹出窗开始 -->
    <el-dialog :title="title" :visible.sync="addGameAlert">
      <el-form :model="gameInfo" label-position="left" label-width="80px">
        <el-form-item label="游戏名称">
          <el-input v-model="gameInfo.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="游戏地址">
          <el-input v-model="gameInfo.src" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="游戏海报">
            <el-upload
              class="upload-demo"
              :action="qiNiuUrl"
              :on-success="uploadBigpicSuccess"
              :on-remove="removeBigpic"
              :data="qiNiuToken"
              :file-list="gamePoster"
              :disabled="gamePoster.length !== 0">
              <el-button slot="trigger" size="small" type="primary"
              :disabled="gamePoster.length !== 0">选取文件</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="游戏图片">
              <el-upload
                class="upload-demo"
                :action="qiNiuUrl"
                :on-success="uploadSmallpicSuccess"
                :on-remove="removeSmallPic"
                :data="qiNiuToken"
                :file-list="gamePhoto"
                :disabled="gamePhoto.length !== 0">
                <el-button slot="trigger" size="small" type="primary"
                :disabled="gamePhoto.length !== 0">选取文件</el-button>
              </el-upload>
            </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addGameAlert = false">取 消</el-button>
        <el-button type="primary"
        @click="addGamePostClick" v-if="addGamePostShow">保 存</el-button>
        <el-button type="primary"
        @click="editGamePostClick" v-if="editGamePostShow">保 存</el-button>
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
        addGameAlert: false,
        editBaseAlert: false,
        addGamePostShow: false,
        editGamePostShow: false,
        title: null,
        gameInfo: {
          name: null,
          label: null,
          src: null,
          bigPic: null,
          bigPicName: null,
          smallPic: null,
          smallPicName: null
        },
        gameListArgs: {
          numberPerPage: 10,
          currentPage: 1,
          totalPage: -1
        },
        gamePoster: [],
        gamePhoto: [],
        gameLists: [],
        title: null,
        userInfo: global.getUser(),
        qiNiuToken: null,
        qiNiuUrl: global.qiNiuUrl
      }
    },
    created () {
      global.getQiNiuToken().then((res) => {
        this.qiNiuToken = {token: res.data.data}
      })
      this.getgameLists(this.gameListArgs)
    },
    methods: {
      getgameLists (args) {
        global.axiosGetReq('game/getGameList?', args)
        .then((res) => {
          // console.log(res)
          if (res.data.callStatus === 'SUCCEED') {
            for (let i in res.data.data) {
              res.data.data[i].index = i
            }
            this.gameLists = res.data.data
            this.gameListArgs.currentPage = res.data.currentPage
            this.gameListArgs.totalPage = res.data.totalPage
          } else {
            global.error(this, res.data.data, '')
            if (res.data.data == '用户未登录') {
              this.$router.push('/login')
            }
          }
        })
      },
      uploadBigpicSuccess (file, response) {
        this.gamePoster.push({ name: response.name, url: global.qiniuShUrl + file.key })
        this.gameInfo.bigPicName = response.name
        this.gameInfo.bigPic = global.qiniuShUrl + file.key
      },
      removeBigpic () {
        this.gamePoster = []
        this.gameInfo.bigPicName = null
        this.gameInfo.bigPic = null
      },
      uploadSmallpicSuccess (file, response) {
        this.gamePhoto.push({ name: response.name, url: global.qiniuShUrl + file.key })
        this.gameInfo.smallPic = global.qiniuShUrl + file.key
        this.gameInfo.smallPicName = response.name
      },
      removeSmallPic () {
        this.gamePhoto = []
        this.gameInfo.smallPic = null
        this.gameInfo.smallPicName = null
      },
      addGame () {
        this.title = '添加游戏'
        this.editGamePostShow = false
        this.addGamePostShow = true
        this.addGameAlert = true
      },
      // 添加游戏
      addGamePostClick () {
        var self = this
        global.axiosPostReq('game/add', this.gameInfo)
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            global.success(self, '添加成功', '')
            self.addGameAlert = false
            self.getgameLists(self.gameListArgs)
          } else {
            global.error(self, res.data.data, '')
            if (res.data.data == '用户未登录') {
              this.$router.push('/login')
            }
          }
        })
      },
      // 编辑设备
      editGame (index) {
        this.title = '修改游戏'
        this.addGamePostShow = false
        this.editGamePostShow = true
        this.gameInfo.gameId = this.gameLists[index].id
        this.gameInfo.name = this.gameLists[index].name
        this.gameInfo.src = this.gameLists[index].src
        this.gameInfo.bigPic = this.gameLists[index].bigPic
        this.gameInfo.bigPicName = this.gameLists[index].bigPicName
        this.gameInfo.smallPic = this.gameLists[index].smallPic
        this.gameInfo.smallPicName = this.gameLists[index].smallPicName
        this.gamePoster.push({ name: this.gameLists[index].bigPicName, url: this.gameLists[index].bigPic })
        this.gamePhoto.push({ name: this.gameLists[index].smallPicName, url: this.gameLists[index].smallPic })
        this.addGameAlert = true
      },
      editGamePostClick () {
        // console.log(this.gameInfo)
        global.axiosPostReq('game/update', this.gameInfo)
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            global.success(this, '修改成功', '')
            this.editBaseAlert = false
            this.getgameLists(this.gameListArgs)
          } else {
            global.error(this, res.data.data, '')
            if (res.data.data == '用户未登录') {
              this.$router.push('/login')
            }
          }
        })
      },
      // 删除设备
      handleDelete (id) {
        var adverMsg = {
          gameId: id
        }
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var self = this
          global.axiosPostReq('game/delete', adverMsg)
          .then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              self.getgameLists(self.gameListArgs)
              self.$message({
                type: 'success',
                message: '删除成功!',
                duration: '800'
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
        this.gameListArgs.currentPage = value
        this.getgameLists(this.gameListArgs)
      }
    },
    watch: {
      addGameAlert () {
        if (this.addGameAlert === false) {
          for (let i in this.gameInfo) {
            this.gameInfo[i] = null
          }
          this.gamePoster = []
          this.gamePhoto = []
        }
      }
    }
  }
</script>

<style scoped>
  .el-dialog__header {
    text-align: center;
  }
</style>
