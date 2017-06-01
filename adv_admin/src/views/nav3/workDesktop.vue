<template>
    <div class="workDesktop">
		<div class="wait">
			<div class="wait_word">待办任务</div>
		</div>
		<div class="item" @click="adminLogin">
			<img src="" alt="img">
			<p class="item_word">广告订单(5)</p>
		</div>
	</div>
</template>

<script>
    import axios from 'axios'
    import global from '../global/global'
	export default {
		data() {
			return {
			    adminMsg: {
                     userName: 'dapan123',
                     password: '123'
                }
			}
		},
		methods: {
            adminLogin () {
              var self = this
              if (this.adminMsg.userName && this.adminMsg.password) {
                //global.success(self, '登录成功', '/admin/merchant')
                axios.post(global.baseUrl + 'Advertisement/api/user/login', global.postHttpData(this.adminMsg))
                .then((res) => {
                	console.log(res);
                  if (res.data.callStatus === 'SUCCEED') {
                    global.setToken(res.data.token)
                    global.setUser(res.data.data)
                    global.success(self, '登录成功', '')
                  } else {
                    global.error(self, '账号或者密码错误', '')
                  }
                })
              } else {
                global.error(self, '账号或者密码不能为空', '')
              }
            }
		}
	}
</script>

<style scoped>
    * {
    	padding: 0;
    	margin: 0;
    }
	.wait {
		width: 100%;
		height: 50px;
		line-height: 50px;
		font-size: 18px;
		background-color: #eaeaea;
		margin-top: 20px;
	}
	.wait_word {
		margin-left: 20px;
	}
	.item {
		width: 130px;
		height: 150px;
		margin-top: 15px;
	}
	.item:hover {
		cursor: pointer;
		opacity: 0.8;
	}
	.item img {
		width: 130px;
		height: 130px;
		border-radius: 50%;
		background-color: #EECE7C;
	}
	.item .item_word {
		text-align: center;
		font-size: 16px;
	}
</style>