<template>
  <div class="home">
    <header>
      <b>萝卜多后台管理系统</b>
      <div>
        <span>管理员</span>
        <span class="vertical">丨</span>
        <span>{{user}}</span>
        <span class="vertical">丨</span>
        <button v-on:click="logout">退出</button>
      </div>
    </header>
    <main>
      <div class="nav">
             <div  class="l" @click="hello">欢迎页</div>
             <ul>
                <li class="l" @click="showToggle(index,item)"
                    v-for="(item,index) in nav"
                    :key="index"
                    >{{item.title}}
                     <ul v-show="item.show">
                         <li class="ll"
                         @click.stop="kk"
                          v-for="(item,index) in item.content"
                         :key="index"
                         >{{item.title}}</li>
                     </ul>
                 </li>
             </ul>
      </div>
      <div style="background:#fff;height: calc(100vh - 60px);overflow: scroll;">
        <router-view style="background:#fff"></router-view>
      </div>
    </main>
  </div>
</template>

<script>
import { Loginhttp } from "@/http/login/login.js"; //登出接口
  export default {
    name: 'home',
    data(){
      return {
        user:"",
        indexxx: "",
        nav: [
           {
              title:"后台管理",
              show: false,
              content: [
                  {title:"账号管理"},
                  {title:"角色管理"},
                  {title:"修改密码"},
                  {title:"模块管理"}
              ]
          },
          {
            title: "信息管理",
            show: false,
            content: [
                {title: "公司信息" },
                {title: "职位信息"}
            ]
          },
          {
              title: "内容管理",
              show: false,
              content: [
                  {title: "Article管理"}
              ]
          }
        ]
      }
    },
    methods:{
      showToggle(index,item){
        console.log(index)
        this.indexxx = index;
        this.nav.forEach(i => {
           if(i.show !== this.nav[index].show){
             i.show = false;
           }
        });
        // 取反(true或false)
        item.show = !item.show;
      },
      kk(){
        console.log(this.indexxx)
        if(this.indexxx === 2){
          this.$router.push({ path: "/home/article" }); 
        }
      },
      logout(){
        Loginhttp.postLogout()
        .then(response => {
          let user = {
            user: "", //删除登录用户名
            status: false //注销状态
          };
          alert("账号登出成功");
          sessionStorage.clear(); //清除所有数据
          this.$router.push({ path: "/login" });
        })
        .catch(error => {
          alert("账号登出失败");
        });
      },
      hello(){
        this.$router.push({ path: "/home/hello" }); //跳转欢迎页
      }
    },
   mounted(){
     //提取用户名
     let username = JSON.parse(localStorage.getItem("user"));
     console.log(username);
     //渲染用户名
     this.user = username.user;
   }
  }
</script>
<style lang="scss" scoped>
  @import "@/assets/scss/commingler.scss";
  ::-webkit-scrollbar {
    display: none;
  }
  ul,li{
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .l{
    font-size: 21px;
    line-height: 36px;
    letter-spacing: 3px;
  }
  .ll{
    color: deeppink;
    font-size: 15px;
  }
  .ll:hover{
    background-color: #feae45;
  }
  .home {
    @include w-h(100%, 100vh);
    background-color: white;
  }
  header {
    @include flex(space-between, center);
    height: 60px;
    background-color: yellowgreen;
  }
  .nav{
    display: inline-block;
    float: left;
    width: 20%;
    height: calc(100vh - 60px);
    color: white;
    background-color: orange;
  }
</style>
