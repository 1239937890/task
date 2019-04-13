import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
     component:resolve=>require(["@/views/login/login.vue"],resolve)
    },
    {
      path: '/login',
      name: 'login',
      component:resolve=>require(["@/views/login/login.vue"],resolve)
    },
    {
      path: '/Home',
      redirect:'/Home/holle',
      component:resolve=>require(["@/views/Home.vue"],resolve),
      children: [{
        path: "hello", //@欢迎页
        component: () => import("./views/hello.vue")
      },
      {
        path: "article", //@列表
        component: () => import("./views/article/article.vue")
      },
      {
        path: "articleAdd",//新增
        component: () => import("./views/article/articleAdd.vue")
      },
      {
        path: "anniu",//新增
        component: () => import("./views/article/anniu.vue")
      }
      ]
    }
  ]
});
