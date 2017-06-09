<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">商户注册</h3>
    <el-form-item prop="userName">
      <label for="confirmpwd">账号：</label>
      <el-input type="text" v-model="ruleForm2.userName" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="pass">
      <label for="confirmpwd">设置密码：</label>
      <el-input type="password" v-model="ruleForm2.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <label for="confirmpwd">确认密码：</label>
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item>
      <label style="display:block;" for="confirmpwd">商户类型：</label>
      <el-select v-model="ruleForm2.type" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
  </el-form-item>
  <el-form-item style="width:100%;">
    <el-button type="primary" style="width:100%;" :loading="loading" @click="regUser">注册</el-button>
  </el-form-item>
  <div class="alreadyHave" @click="login()">已有账号</div>
</el-form>
</template>

<script>
  import axios from 'axios'
  import global from './global/global'
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        loading: false,
        options: [{
          value: '1',
          label: '有设备商铺',
        }, {
          value: '2',
          label: '无设备商铺',
        }],
        ruleForm2: {
          userName: null,
          password: null,
          checkPass: null,
          type: null
        },
        rules2: {
          userName: [
          { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
            ],
            password: [
            { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
            { validator: validatePass2, trigger: 'blur' }
            ],
          }
        };
      },
      methods: {
        regUser() {
          var that = this;
          that.$refs.ruleForm2.validate((valid) => {
            if (valid && that.value!=='') {
              // that.loading = true;
              global.axiosPostReq('user/register', this.ruleForm2)
              .then((res) => {
                if (res.data.callStatus === 'SUCCEED') {
                  global.success(this, '注册成功', '/login')
                } else {
                  global.error(this, res.data.data, '')
                }
                // ths.loading = false;
              })
            } else {
              return false;
            }
          });
        },
        login: function() {
          var that = this;
          that.$router.push({ path: '/login'});
        }
      }
    }

  </script>

  <style lang="scss" scoped>
    .login-container {
      /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
      -webkit-border-radius: 5px;
      border-radius: 5px;
      -moz-border-radius: 5px;
      background-clip: padding-box;
      margin: 180px auto;
      width: 350px;
      padding: 35px 35px 15px 35px;
      background: #fff;
      border: 1px solid #eaeaea;
      box-shadow: 0 0 25px #cac6c6;
      .title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
      }
      .remember {
        margin: 0px 0px 35px 0px;
      }
      .alreadyHave {
        color: #83868E;
        cursor: pointer;
      }
    }
  </style>
