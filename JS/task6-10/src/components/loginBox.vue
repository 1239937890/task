<template>
  <div id="bg">
    <div class="container">
      <h3 id="k">后台登录系统</h3>
      <form>
        <div class="form-group">
          <input v-model="user" type="text" placeholder="用户名" v-on:input="value" /></div>
        <div class="form-group">
          <input v-model="password" type="password" placeholder="密码" v-on:input="value" /></div>
      </form>
      <p class="hint">{{hint}}</p>
      <button v-on:click="login">登录</button>
    </div>
  </div>
</template>

<script>
import { Loginhttp } from "@/http/login/login.js"; //登录接口
  export default {
    name: "loginBox",
    data() {
      return {
        user: "",
        password: "", 
        hint: ""
      };
    },
    methods: {
      value() {
        this.hint = "";
      },
      login() {
        if (this.user == "" || this.password == "" || this.user == undefined || this.password == undefined) {
          this.hint = "请输入账号密码";
          // console.log(this.hint)
        }
         let params = {
         name: this.user,
         pwd: this.password
      };
      Loginhttp.postLogin(params)
      .then(res => {
          let code = res.data.code;
          let message = res.data.message;
          // console.log("code", code, "message", message);
          if (code == -5003) {
             this.hint = "用户不存在";
            // messageHint("Message-Box", message, "warning", 3000); //调用消息提示框
          } else if(code == -5004){
            this.hint = "密码错误";
          }else if (code == 0) {
            //登录成功
            let user = {
              user: res.data.data.manager.name, //获取登录用户名
              id: res.data.data.manager.id, //用户id
              status: true //登录状态
            };
            console.log(user)
            localStorage.setItem("user", JSON.stringify(user)); //用户信息存储
            // messageHint("Message-Box", message, "success", 3000); //调用消息提示框
            this.hint = "登录成功";
            this.$router.push({ path: "/Home/hello"}); //跳转主页
          }
        })
      }
    }
  }

</script>

<style scoped>
  #bg {
    position: absolute;
    font-size: initial;
    width: 100%;
    height: 100vh;
    background: url(../assets/534115.jpg) no-repeat center/cover;
  }

  .container {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    padding: 46px 0;
    text-align: center;
    border-radius: .2rem;
    background: rgba(255, 255, 0, 0.5);
  }
  body .container h3 {
    margin: 0;
    color: red;
    letter-spacing: .06rem;
  }
  body .container form {
    padding: 0 .7rem;
  }
  body .container form .form-group {
    margin: .3rem 0;
  }

  body .container form .form-group .form-control {
    padding: .2rem .2rem .2rem 1rem;
    outline: none;
    color: red;
    border-radius: .2rem;
    border: .01rem solid red;
  }
  body .container button {
    margin-top: .2rem;
    width: 78%;
    line-height: .7rem;
    border-radius: .2rem;
    border: none;
    outline: none;
    color: white;
    background-color: red;
  }
  /*# sourceMappingURL=task5.css.map */
</style>