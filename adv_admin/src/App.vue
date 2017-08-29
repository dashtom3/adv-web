<template>
	<div id="app">
		<transition name="fade"
		            mode="out-in">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
export default {
	name: 'app',
	components: {
	}
}

</script>

<style lang="scss">
body {
	margin: 0px;
	padding: 0px;
	/*background: url(assets/bg1.jpg) center !important;
		background-size: cover;*/
	// background: #1F2D3D;
	font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
	font-size: 14px;
	-webkit-font-smoothing: antialiased;
}
#app {
	position: absolute;
	top: 0px;
	bottom: 0px;
	width: 100%;
}
.clearfix {
	clear: both;
}
.block{
	text-align: right;
	margin-top: 20px;
}
.el-submenu [class^=fa] {
	vertical-align: baseline;
	margin-right: 10px;
}

.el-menu-item [class^=fa] {
	vertical-align: baseline;
	margin-right: 10px;
}

.toolbar {
	background: #f2f2f2;
	padding: 10px;
	//border:1px solid #dfe6ec;
	margin: 10px 0px;
	.el-form-item {
		margin-bottom: 10px;
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: all .2s ease;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}

.el-dialog__header {
    text-align: center !important;
}
.w12h600 .el-dialog{
	width: 1024px!important;
	height: 600px!important;
	text-align: center;
}
.w12h600 .el-dialog__header,.w12h600 .el-dialog__body{
	padding: 0!important;
	position: absolute;
}
.w12h600 .el-dialog__body{
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	overflow: hidden;
}
.w12h600 .el-icon-close{
	position: relative;
	top: 10px;
	left: 1000px;
	z-index: 9999;
}
.background_opacity .el-dialog{
	background-color: rgba(0,0,0,0)!important;
}
</style>
