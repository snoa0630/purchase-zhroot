<template>
  <div class="login">
    <div class="container">
      <div class="logo">智能采购平台</div>
      <el-card class="box-card">
        <el-form :model="loginFormData">
          <el-form-item>
            <el-input
              v-model="loginFormData.username"
              suffix-icon="el-icon-user-solid"
              placeholder="用户名/手机号/邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="loginFormData.password"
              suffix-icon="el-icon-key"
              type="password"
              placeholder="登录密码"
            ></el-input>
          </el-form-item>
          <el-form-item style="margin-bottom:0">
            <el-button type="primary" style="width:100%" @click="login"
              >登 录</el-button
            >
          </el-form-item>
        </el-form>
        <div class="warn_msg" v-if="warn_msg">
            <i class="el-icon-edit"></i>
            <span v-text="warn_msg"></span>
          </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      loginFormData: {
        username: "",
        password: "",
      },
      warn_msg: "",
    };
  },
  methods: {
    login() {
      this.$api.login(this.loginFormData)
      .then(res=>{
          console.log("res",res)
          this.$router.replace({name:"Home"})
          this.$store.commit('set_info',{
              username:this.loginFormData.username,
              token:res.Data.Token
          })
      })
      .catch(err=>{
          console.log("err",err)
          this.warn_msg=err.Info;
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to bottom right, #1abc9c 0%, #53e3a6 100%);
  display: flex;
  .container {
    margin: 220px auto 0;
    width: 400px;
    .logo {
      color: #fff;
      text-align: center;
      font-size: 22px;
    }
    .box-card {
      margin-top: 10px;
      width: 100%;
      background-color: #ebeff0;
      box-sizing: border-box;
      padding: 30px;
      position: relative;
    .warn_msg {
      height: 30px;
      line-height: 30px;
      color: red;
      font-size: 14px;
      text-align: center;
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 10px;
    }
    }
  }
}
</style>
