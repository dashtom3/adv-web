<template>
    <div class="workDesktop">
		<div class="wait">
			<div class="wait_word">待办任务</div>
		</div>
		<div class="item">
      <a href="/merchant/advlist">
        <img src="../../../images/mer-order.jpg">
  			<p class="item_word">现场订单({{unacknowledged}})</p>
      </a>
		</div>
	</div>
</template>

<script>
    import axios from 'axios'
    import global from '../../global/global'
	export default {
		data() {
			return {
        unacknowledged: null
			}
		},
    created () {
      global.axiosGetReq('advOrder/getAdvOrderList', '')
      .then((res) => {
        if (res.data.callStatus === 'SUCCEED') {
          this.unacknowledged = res.data.unacknowledged
        } else {
          global.error(this, res.data.data, '')
          if (res.data.data == '用户未登录') {
            this.$router.push('/login')
          }
        }
      })
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
		/*background-color: #EECE7C;*/
	}
	.item .item_word {
		text-align: center;
		font-size: 16px;
	}
</style>
