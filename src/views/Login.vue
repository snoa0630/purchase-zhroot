<template>
  <div class="login">
    <div class="container">
      <div class="logo">智能采购平台</div>
      <el-card class="box-card">
        <el-form :model="loginFormData">
          <el-form-item>
            <el-input
              v-model.trim="loginFormData.username"
              suffix-icon="el-icon-user-solid"
              placeholder="用户名/手机号/邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model.trim="loginFormData.password"
              suffix-icon="el-icon-key"
              type="password"
              placeholder="登录密码"
            ></el-input>
          </el-form-item>
          <el-form-item class="code">
            <el-input v-model="loginFormData.code" placeholder="验证码">
            </el-input>
            <img
              :src="
                'http://purchase.zhroot.com/Login/GetAuthCode?time=' + codeSrc
              "
              alt=""
            />
            <span>
              看不清？
              <a
                href=""
                @click.prevent="handleChange"
                style="text-decoration:none"
                >换一张</a
              >
            </span>
          </el-form-item>
          <el-form-item style="margin-bottom:0">
            <el-button
              type="primary"
              style="width:100%;background-color:#1ABC9C;border:1px solid #1ABC9C"
              @click="login"
              >{{ loginBtnWord }}</el-button
            >
          </el-form-item>
        </el-form>
        <div class="warn_msg" v-if="warn_msg">
          <i class="el-icon-warning-outline"></i>
          <span v-text="warn_msg"></span>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginFormData: {
        username: "",
        password: "",
        code: "",
      },
      warn_msg: "",
      codeSrc: Math.random(),
      loginBtnWord: "登录",
    };
  },
  methods: {
    login() {
      if (this.loginFormData.username == "") {
        this.warn_msg = "请输入用户名/手机号/邮箱";
      } else if (this.loginFormData.password == "") {
        this.warn_msg = "请输入登录密码";
      } else {
        this.loginBtnWord = "loading";
        this.$api
          .login(this.loginFormData)
          .then((res) => {
            console.log("res", res);
            this.$router.replace({ name: "Home" });
            this.$store.commit("set_info", {
              username: this.loginFormData.username,
              token: res.Data.Token,
            });
          })
          .catch((err) => {
            this.loginBtnWord = "登录";
            console.log("err", err);
            this.warn_msg = err.Info.slice(5);
          });
      }
    },
    handleChange() {
      this.codeSrc = Math.random();
    },
  },
  beforeRouteLeave(to, from, next) {
    this.loginBtnWord = "登陆成功，正在跳转...";
    setTimeout(() => {
      next();
    }, 300);
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
      ::v-deep .el-input__inner {
        outline: none;
        border: none;
      }
      .code {
        ::v-deep .el-form-item__content {
          display: flex;
          height: 40px;
          justify-content: space-between;
          align-items: center;
          position: relative;
          img {
            position: absolute;
            width: 80px;
            height: 25px;
            left: 110px;
            top: 50%;
            transform: translate(0, -50%);
          }
          .el-input {
            flex: 0 0 auto;
            width: 190px;
          }
          > span {
            flex: 0 0 auto;
            margin-left: 14px;
            font-size: 12px;
            font-weight: 300;
            a {
              color: blue;
            }
          }
        }
      }
    }
  }
}
</style>
