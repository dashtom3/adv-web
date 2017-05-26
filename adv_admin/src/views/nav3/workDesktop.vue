<template>
    <el-table class="wait" :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="待办任务">
      </el-table-column>
    </el-table>
</template>

<script>
  export default {
    data() {
      return {
          tableData: [{
            date: '2016-05-02',
            name: '广告订单',
            address: '上海市普陀区金沙江路 1518 弄'
          }]
      }
    }
  }
</script>

<style scoped>
.wait {
	margin-top: 20px;
}
</style>