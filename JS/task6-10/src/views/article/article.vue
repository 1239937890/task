<template>
    <div class="artcle">
        <header>
            <div class="row">
                <div>
                    <span>标题</span>
                    <input type="text" v-model="title">
                </div>
                <div>
                    <span>创建者</span>
                    <input type="text" v-model="author">
                </div>
                <div>
                    <span>创建时间</span>
                    <input type="date" 
                    v-model="sendTimeFrom"
                    >
                </div>
                <div>
                    <span>-</span>
                    <input type="date"
                    v-model="sendTimeTo">
                </div>
            </div>
            <div class="row">
                <div>
                    <span>状态</span>
                    <select class="in" v-model="statusValue"> 
                        <option class="ooption" v-for="item in statusList"
                        :key="item.id"
                        :value="item.id"
                        :label="item.label"
                        ></option>
                    </select>
                </div>
                <div>
                    <span>类型</span>
                    <select class="in" v-model="typeValue">
                        <option v-for="item in typeList"
                        :key="item.id"
                        :value="item.id"
                        >
                        {{item.label}}
                        </option>
                    </select>
                </div>
            </div>
            <div>
                <button @click="empty">清空</button>
                <button @click="search">搜索</button>
            </div>
        </header>
        <main>
            <div class="container">
                <div class="strong">Article管理</div>
                <div>
                    <button @click="oooo">保存排序</button>
                    <button v-on:click="add">+新增</button>
                </div>
            </div>
            <div class="list-table">
                <table class="list-box">
                    <tr class="table-header">
                        <th class="width1">序号</th>
                        <th class="width1">图片</th>
                        <th class="width1">标题</th>
                        <th class="width1">类型</th>
                        <th class="width1">创建者</th>
                        <th class="width1">创建时间</th>
                        <th class="width1">修改时间</th>
                        <th class="width1">状态</th>
                        <th class="width2">操作</th>
                    </tr>
                    <tr v-if="tableData==undefined">
                        <th class="noData">暂无数据</th>
                    </tr>
                    <tr class="table-content" v-for="(item, index) in tableData" :key="index">
                            <td class="width1">{{index|indexFilter}}</td>
                            <td class="width1 img-box">
                                <img class="img" :src="item.img">
                            </td>
                            <td class="width1">{{item.title}}</td>
                            <td class="width1">{{item.type|typeFilter}}</td>
                            <td class="width1">{{item.author}}</td>
                            <td class="width1">{{item.createAt|timeFilter}}</td>
                            <td class="width1">{{item.updateAt|timeFilter}}</td>
                            <td class="width1">{{item.status|statusFilter}}</td>
                            <td class="width2">
                                <button class="bnt" type="success" @click="updateState(item.id,item.status)">{{item.status|updateStatus}}</button>
                                <button class="bnt" @click="edit(item.id)">编辑</button>
                                <button class="bnt" @click="Delete(item.id)">删除</button>
                            </td>
                        </tr>
                </table>
            </div>
        </main>
        <footer>
            <div class="containerr">
                <span>共{{pageCount}}页</span>
                <button :disabled="this.nowPage == 1" @click="goPage(1)">首页</button>
                <button :disabled="this.nowPage == 1" @click="goPage(nowPage-1)">
                    <i class="left"></i>
                </button>
                <div v-for="item in pageCount" :key = "item">
                     <button v-if="item==1" @click="goPage(item)">{{item}}</button>
                     <button v-if="item==1&&item<showPagesStart-1" disabled>...</button>
                     <button v-if="item>1&&item<=pageCount-1&&item>=showPagesStart&&item<=showPageEnd" @click="goPage(item)">{{item}}</button>
                     <button v-if="item==pageCount&&item>showPageEnd+1" disabled>...</button>
                     <button v-if="item==pageCount" @click="goPage(item)">{{item}}</button>
                </div>
                <button :disabled="this.nowPage == this.pageCount" @click="goPage(nowPage+1)">
                    <i class="right"></i>
                </button>
                <button :disabled="this.nowPage == this.pageCount" @click="goPage(pageCount)">末页</button>
                <span>去第</span>
                <input class="y" type="text" maxlength="2" v-model="_skipPage"/>
                <span>页</span>
                <button @click="skip">确定</button>
            </div>
        </footer>
    </div>
</template>
<script>
import {article,typeList,statusList,timeFilter} from "@/http/article/article.js"; //接口
    export default {
    name: "articlee",
    data() {
    return {
        // timeFilter: "",
      showPagesStart: 1, //开始显示的分页按钮
      showPageEnd: 1,
      statusList: "",    //状态列表
      typeList: "",     //类型列表
      tableData: 'undefined', //数据列表
      sendTimeFrom: null,//从
      sendTimeTo: null,//到
      fTime: "",
      tTime: "",
      pageCount: "", //总页数
      nowPage: 1, //当前的页数
      skipPage: '',//跳转的页数
      typeValue: "",
      statusValue: "", //状态值
      title: "",
      author: "",
       fff : 11405,
       ttt : 2,
       test: 1
    };
  },
    computed:{
      _skipPage:{
      get: function() {
          return this.skipPage;
      },
          set: function(value) {
              console.log(value)
              this.skipPage = value.replace(/[^0-9]+/g,' ');
      }
      }
  },
  methods:{
      oooo(){
          this.$router.push({
        path: "/Home/anniu",
      }) 
      },
      articleList(page,size,type,status,startAt,endAt){
          let params = {
              page,
              size : 10,
              type,
              status,
              startAt,
              endAt
          }
       article.getArticleList(params)
        .then(res => {
            let list = res.data.data.articleList; //数据列表
            if (list.length == 0) {
            this.tableData = undefined;
          }else{
              this.tableData = list;
          }
          let page = Math.ceil(res.data.data.total/10); //页数
          this.pageCount = page;   //赋值给总页数 
          if(params.page == undefined){
              params.page = 1
          }
          this.nowPage = params.page;
          console.log(params.page)
         console.log("当前页数" + this.nowPage)
        })
        .catch(error => {
            alert("获取数据失败，服务器出错")
        })
    },
    // 上下线请求
    st(id,status){
        console.log(status)
      status = (status == 1)? 2 : 1
        let params = {
            id ,
            status
        };
        console.log(params)
        article.putStatus(params)
        .then(res =>{
            if(params.status == 2){
                alert("上线操作成功")
            }else if(params.status == 1){
                alert("下线操作成功")
            }
            this.articleList(1, 10,this.typeValue,this.statusValue,this.fTime,this.tTime);
        })
        .catch(error => {
            if(params.status == 2){
                alert("上线操作失败，服务器爆炸")
            }else if(params.status == 1){
                alert("下线操作失败，服务器爆炸")
            }
        })
    },
    // 上下线修改
    updateState(id,status){   
        if(status == 1){
            if(confirm("是否执行上线操作")){
                this.st(id,status)
            }
        }else if(status == 2){
            if(confirm("是否执行下线操作")){
                this.st(id,status)
            }
        }
    },
    //编辑
    edit(id){
        sessionStorage.clear(); //清除所有数据
        this.$router.push({
        path: "/Home/articleAdd",
        query: {
          status: "edit",
          id: id
        }
      }) 
    },
    // 删除
    Delete(id){
        if(confirm("确认删除么")){
            article.deleteData(id)
            .then(res => {
                alert("删除成功")
                this.articleList(1, 10,this.typeValue,this.statusValue,this.fTime,this.tTime);
            })
            .catch(error => {
                alert("删除失败，服务器爆炸")
            })
        }
    },
    search(){    //搜索
        if(this.sendTimeFrom != undefined || this.sendTimeFrom != null){
            let b = new Date(this.sendTimeFrom);
            // let t = dd.valueOf(dd) 
            // let t = Date.parse(dd) // 方法3
            this.fTime  = b.getTime(b);
        }
        if(this.sendTimeTo != undefined || this.sendTimeTo != null){
            let b = new Date(this.sendTimeTo);
            this.tTime = b.getTime(b);
        }
        let searchStatus = {
            typeId : this.typeValue,
            stateId : this.statusValue,
            startDate : this.fTime,
            endDate : this.tTime,
            sendTimeFrom: this.sendTimeFrom,
            sendTimeTo: this.sendTimeTo
        };
        console.log(searchStatus)
        sessionStorage.setItem("searchStatus",JSON.stringify(searchStatus));
        this.articleList(1, 10,this.typeValue,this.statusValue,this.fTime,this.tTime);
    },
    empty(){   //清空
        this.typeValue = "";
        this.statusValue = "";
        this.sendTimeFrom = null,//从
        this.sendTimeTo = null,//到
        sessionStorage.clear("searchStatus");
        this.articleList(1, 10);
    },
    jisuan(page){   //计算分页按钮
        if (page <= 5) {
        this.showPagesStart = 1;
        this.showPageEnd = 5;
    }else if (page >= 16) {
         this.showPagesStart = 11;
         this.showPageEnd = this.pageCount;
    }else {
        this.showPagesStart = page - 3;
        this.showPageEnd = page + 4;
    }
    },
    //分页按钮
    goPage(page){
      this.jisuan(page)
      sessionStorage.setItem("currenPage", page); //保存单前页数
      this.articleList(page, 10,this.typeValue,this.statusValue,this.fTime,this.tTime);
    },
    // 跳转页数确定按钮
    skip() {
      sessionStorage.setItem("currenPage", this.skipPage); //保存单前页数
      this.articleList(this.skipPage, 10,this.typeValue,this.statusValue,this.fTime,this.tTime);
    },
     //新增按钮
    add(){
      sessionStorage.clear(); //清除所有数据
      this.$router.push({
        path: "/Home/articleAdd",
        query: {
          status: "add"
        }
      }) 
    }
  },
  created(){
    //   this.timeFilter = timeFilter;
    this.statusList = statusList;
    this.typeList = typeList;
    let searchStatus = JSON.parse(sessionStorage.getItem("searchStatus"));//获取搜索的值
   console.log(searchStatus)
   if(searchStatus != null){
       this.typeValue = searchStatus.typeId;
       this.statusValue = searchStatus.stateId;
       this.fTime = searchStatus.startDate;
       this.tTime = searchStatus.endDate;
       this.sendTimeTo = searchStatus.sendTimeTo;
       this.sendTimeFrom = searchStatus.sendTimeFrom
   }
  let page = sessionStorage.getItem("currenPage"); //获取保存的页数
  let x;
  if (page !== null) {
      x = Number(page);
  }
    console.log(x)
    this.jisuan(page)
    this.articleList(x, 10,this.typeValue,this.statusValue,this.fTime,this.tTime); //数据列表请求
  },
  filters: {
    indexFilter: function(index) {
      return index + 1;
    },
    typeFilter: function(type) {
      if (type == 0) {
        return "首页banner";
      } else if (type == 1) {
        return "找职位banner";
      } else if (type == 2) {
        return "找精英banner";
      } else if (type == 3) {
        return "行业大图";
      }
    },
    statusFilter: function(status) {
      if (status == 1) {
        return "草稿";
      } else if (status == 2) {
        return "上线";
      }
    },
    updateStatus: function(status) {
      if (status == 1) {
        return "上线";
      } else if (status == 2) {
        return "下线";
      }
    }
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

    header {
        margin: 15px;
        padding: 15px;
        border: 1px solid black;
    }

    .row {
        @include flex(flex-start, center);
    }

    input {
        width: 100px;
    }
    .in{
        width: 100px;
    }
    main {
        margin: 15px;
        border: 1px solid black;
        .container{
            @include flex(space-between,center);
            background-color: yellowgreen;
        }
    }
    button{
        margin: 0 3px 0 3px;
        height: 26px;
        border-radius: 3px;
        border: none;
        outline: none;
        color: white;
        background-color: orange;
    }
    .anniuu{

    }
    .anniu{

    }
    .strong {
        text-align: left;
        font-weight: 700;
    }
    .width1{
        width: 10%;
    }
    .img{
        height: 100px;
        width: 100px;
    }
    .width2{
        width: 20%;
    }
    .containerr{
        display: flex;
        justify-content: flex-end;
        margin-right: 15px;
        margin-bottom: 15px;
    }
    li{
        margin-right: 15px;
    }
    .left{
        display: inline-block;
        border-top: 2px solid white;
        border-left: 2px solid white;
        height: 6px;
        width: 6px;
        transform: rotate(-45deg);
    }
    .right{
         display: inline-block;
        border-top: 2px solid white;
        border-left: 2px solid white;
        height: 6px;
        width: 6px;
        transform: rotate(135deg);
    }
    .y{
        width: 30px;
    }
</style>