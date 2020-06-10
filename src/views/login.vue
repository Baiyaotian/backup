<template>
  <!-- <div class="app"> -->
  <div class="bruce flex-ct-x">

    <div class="main">
      <el-card class="signup-content"
               shadow="hover">
        <div slot="header"
             class="clearfix noborder">
          <h2 style="font-size:20px">web登录页面</h2>

        </div>
        <!-- 注册表单 -->
        <div class="register"
             v-show=" nowStatus === 'register' ">

          <el-form ref="registerForm"
                   :model="registerForm"
                   :rules="registerRules"
                   label-width="0px">
            <el-form-item class="no-label"
                          prop="name">
              <el-input v-model="registerForm.name"
                        placeholder="请输入用户名"
                        prefix-icon="iconfont icon-user"></el-input>
            </el-form-item>
            <el-form-item class="no-label"
                          prop="email">
              <el-input v-model="registerForm.email"
                        placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item class="no-label"
                          prop="password">
              <el-input v-model="registerForm.password"
                        placeholder="请输入密码"
                        type="password"></el-input>
            </el-form-item>
            <el-form-item class="no-label"
                          prop="passwordEnsure">
              <el-input v-model="registerForm.passwordEnsure"
                        placeholder="请再次输入密码"
                        type="password"></el-input>
            </el-form-item>
            <el-form-item prop="submit">
              <el-button type="primary"
                         class="submit-btn"
                         @click="submit('registerForm')"></el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- 登录表单 -->
        <div class="login"
             v-show=" nowStatus === 'login' ">
          <el-form ref="loginForm"
                   :model="loginForm"
                   :rules="loginRules"
                   label-width="0px">
            <el-form-item class="no-label"
                          prop="userame">
              <el-input v-model="loginForm.username"
                        placeholder="请输入手机号或邮箱"></el-input>
            </el-form-item>
            <el-form-item class="no-label"
                          prop="password">
              <el-input v-model="loginForm.password"
                        placeholder="请输入密码"
                        type="password"></el-input>
            </el-form-item>
            <el-form-item prop="submit">
              <el-button type="primary"
                         size="medium"
                         class="submit-btn"
                         @click="submitForm('loginForm')">登录</el-button>
            </el-form-item>
          </el-form>
          <div class="switcher">
            {{ tips[nowStatus].base }}
            <span @click="nowStatus = nowStatus === 'register'?'login':'register'">{{ tips[nowStatus].link}}</span>
          </div>
        </div>
      </el-card>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
import { login } from '@/api/api'
import Cookies from 'js-cookie'
export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!this.pwdReg.test(value)) {
        callback(new Error("用户密码需要由数字/大写字母/小写字母组成"));
      } else {
        if (this.registerForm.passwordEnsure !== "") {
          this.$refs.registerForm.validateField("passwordEnsure");
        }
        callback();
      }
    };
    const validatePassEnsure = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入不一致"));
      } else {
        callback();
      }
    };
    return {
      nowStatus: "login",
      tips: {
        register: {
          base: "已有账户",
          link: "登录"
        },
        login: {
          base: "没有账号",
          link: "注册"
        }
      },
      registerForm: {
        email: "",
        password: "",
        passwordEnsure: ""
      },
      registerRules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { vaildator: validatePass, trigger: "blur" }
        ],
        passwordEnsure: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { vaildator: validatePass, trigger: "blur" }
        ]
      },
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名或邮箱", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm (formName) {
      let obj = {
        username: this.loginForm.username,
        password: this.$md5(this.loginForm.password)
      };
      //写死的情况下
      if (formName == "loginForm") {
        if (
          this.loginForm.username == "admin" &&
          this.loginForm.password == "admin"
        ) {


        } else {
          this.$message("用户名或者密码错误");
          this.$router.push("/");
        }
      }
      login(obj).then(res => {
        sessionStorage.setItem('token', res)
        sessionStorage.setItem("userinfo", JSON.stringify(obj));
        Cookies.set('access_token', res)
        this.$router.push({
          name: 'home'
        });
        this.$message("登录成功");

      })
    }
  },
  mounted () {

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import url("../assets/css/reset.css");
@import url("../assets/css/font-awesome.min.css");
h2 {
  font-size: 30px;
  color: rgb(84, 92, 100);
}
html,
body {
  width: 100%;
  height: 100%;
  margin: 0px;
}
.bruce {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background: linear-gradient(135deg, #f66, #f90, #3c9, #09f, #66f) left
    center/400% 400%;
  font-weight: bold;
  font-size: 100px;
  color: #fff;
  animation: move 10s infinite;
}
.main {
  width: 500px;
  .el-card__header {
    padding: 25px 20px;
    border-bottom: none;
  }
  .el-card {
    background-color: rgba(255, 255, 255, 0.5);
    border: 1px solid #d3dce6;
  }
}
.mask {
  background-color: rgba(0, 0, 0, 0.1);
  height: 100%;
  weight: 100%;
}
@keyframes move {
  0%,
  100% {
    background-position-x: left;
  }
  50% {
    background-position-x: right;
  }
}
.fault-text {
  position: relative;
  font-weight: bold;
  font-size: 100px;
  text-decoration: none;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  color: #ffffff;
  &::before,
  &::after {
    overflow: hidden;
    position: absolute;
    top: 0;
    // background-color: #000;
    clip: rect(0, 900px, 0, 0);
    color: #fff;
    content: attr(data-text);
    animation: shake 3s linear infinite alternate-reverse;
  }
  &::before {
    left: -1px;
    text-shadow: 1px 0 #f66;
    animation-duration: 2s;
  }
  &::after {
    left: 0px;
    text-shadow: 1px 0 #f66;
    animation-duration: 2s;
  }
}
@keyframes shake {
  $steps: 20;
  @for $i from 0 through $steps {
    #{percentage($i * (1 / $steps))} {
      clip: rect(random(100) + px, 9999px, random(100) + px, 0);
    }
  }
}
.switcher {
  font-size: 14px;
  color: rgba(84, 92, 100, 0.6);
  font-weight: 600;
}
</style>