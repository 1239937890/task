<template>
    <div class="add">
        <div class="ad">
        <p>{{titleee}}</p>
        <div class="container">
            <div class="row">
                <span class="headerr">标题名称</span>
                <input type="text" v-model="xd.title"/>
            </div>
            <div class="row">
                <span class="headerr">类&emsp;&emsp;型</span>
                <select v-model="xd.type">
                    <option v-for="item in typeList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.label"
                    ></option>
                </select>
                <select v-if="jobShow" v-model="job">
                    <option v-for="item in jobList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.label"
                    ></option>
                </select>
            </div>
            <div class="row">
                <span class="headerr">说&emsp;&emsp;明</span>
                <input type="text" v-model="content"/>
            </div>
            <div class="row">
                <span class="headerr">跳转链接</span>
                <input type="text" v-model="xd.url"/>
            </div>
            <div class="row">
                <span class="headerr">配&emsp;&emsp;图</span>
                <div class="f">
                    <label class="uupfile" for="upfile" @click="upfileclear">选择文件</label>
                    <input type="file" id="upfile" style="display: none" @change="upfileFile">
                    
                </div>
                <img alt="图片预览" :src="xd.imgurl">
                <table class="aa">
                    <thead>
                        <tr>
                            <th>图片名</th>
                            <th>文件大小</th>
                            <th>进度</th>
                            <th>操作</th>
                            <th>操作</th>
                        </tr>
                        <tr v-if="imgData">
                            <td>{{imgName}}</td>
                            <td>{{imgSize}}</td>
                            <td class="con">
                                <span class="bar" 
                                :style="{width:proBar+'%'}">{{proBar}}%</span>
                            </td>
                            <td>{{imgStatus}}</td>
                            <td>
                                <button @click="upload">上传</button>
                                <button @click="deletee">删除</button>
                            </td>
                        </tr>
                    </thead>
                </table>
            </div>
            <div class="row rrr">
                <button :disabled="btn" @click="goOnline(2)">立即上线</button>
                <button :disabled="btn" @click="goOnline(1)">存为草稿</button>
                <button class="cancel" @click="cancell">取消</button>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
    import {article,typeList,jobList} from "@/http/article/article.js"; 
    export default {
        name: "articlee",
        data(){
            return{
                jobShow: false,
                job: "",
                proBar: 0,
                xd:{title:"",type:"",url:"",imgurl:""},
                titleee: "", //新增或编辑
                typeList: "", //类型列表
                jobList: "",//职业列表
                title: "",//标题名称
                type: "",//类型
                content: "",//说明
                url: "",//跳转链接
                imgurl: "",//图片链接
                newUrl: "", //新
                oldUrl: "",//旧
                imgData: false, //未上传图片隐藏图片属性
                imgName: "",//图片预览名称
                imgSize: "",//图片预览大小
                imgStatus: "",//图片预览状态
                fileDataa: "", //传参数据
                createAt: "",//创建时间
                uurl:"",
                id: "",
                reader: {}, 
                btn: true //按钮禁用
            }
        },
        methods:{
            clear(){
                this.imgName = "",
                this.imgSize = "",
                this.imgStatus = "",
                this.proBar = 0,
                this.imgStatus = "未选择图片"
            },
            upfileclear(){
                let kk = window.event;
                console.log(kk)
                this.clear()
            },
            upfileFile($event){
                    let kk = window.event;
                console.log(kk)
                console.log('666')
                console.log($event)
                console.log($event.target)
                console.log($event.target.files[0])
                let file = $event.target.files[0];
                this.imgData = true;  //显示
                this.imgName = file.name; //预览图片名字
                this.imgSize = (Math.round((file.size * 100) / 1024) / 100).toString() + "KB"; //图片大小
                this.imgStatus = "未上传"; //状态
                this.reader = new FileReader();
                let that = this;
                this.reader.readAsDataURL(file);  //异步读取文件内容，结果用data:url的字符串形式表示
                this.reader.onload = function($event){                        
                    console.log(this)    //指向reader
                    that.xd.imgurl = this.result; //改变预览图片url
                    // console.log(that.xd.imgurl)
                    let fileData =  new FormData();// 转换为表格数据，接口传参
                    fileData.append("file",file);
                    that.fileDataa = fileData;
                    console.log(that.fileDataa.get("file"))
                }
            },
            //上传
            upload(){
                this.imgStatus = "上传中";
                let config = {
               //动态改变上传进度条
               onUploadProgress(progressEvent){
                //    console.log(onUploadProgress)
               this.proBar =
               ((progressEvent.loaded / progressEvent.total) * 100) | 0;
              }
             };
                article.uploadImg(this.fileDataa,config)
                .then(res => {
                    this.imgStatus = "上传成功";
                    let url = res.data.data.url;
                    this.newUrl = url;
                })
                .catch(error =>  {
                    this.imgStatus = "上传失败";
                })
            },
            //删除
            deletee(){
                this.clear();
                this.imgData = false;
                this.xd.imgurl = this.oldUrl;
            },
            //上线 草稿确认按钮
            goOnline(status){
                if(this.newUrl == ""){
                    this.uurl = this.oldUrl;
                }else if(this.newUrl != ""){
                    this.uurl = this.newUrl;
                }
                console.log(this.uurl)
                if(this.uurl === ""){
                    alert("请上传图片");
                    return;
                }
                let params = {
                    content : this.content,
                    title : this.xd.title,
                    status : status,
                    img : this.uurl,
                    url : this.xd.url,
                    createAt : this.createAt,
                    type : this.xd.type,
                    industry:this.job
                }
                let paramss = {
                    content : this.content,
                    title : this.xd.title,
                    status : status,
                    img : this.uurl,
                    url : this.xd.url,
                    type : this.xd.type,
                    industry:this.job
                }
                //编辑
                if(this.status == "edit"){
                    article.editarticle(this.id,params)
                    .then(res => {
                    console.log(res)
                    this.$router.push({ path: "/home/article" });
                    // alert("编辑成功")
                   })
                }else if(this.status == "add"){    //新增
                    console.log(paramss)
                        article.addArticle(paramss)
                        .then(res => {
                        console.log(res)
                        this.$router.push({ path: "/home/article" });
                      // alert("新增成功")
                     })
                    console.log(this.btn)
                }
            },
             cancell(){
                this.$router.push({ path: "/home/article" });
            }
        },
        created(){
            this.typeList = typeList;
            this.jobList = jobList;
            let query = this.$route.query; //获取传参
            console.log(query);
            this.status = query.status;
            if(query.status == "edit"){
                this.titleee = "编辑Article"
            }else if(query.status == "add"){
                this.titleee = "新增Article"
            }
             if(query.id){
                article.getarticle(query.id).then(res =>{
                console.log(res)
                let article = res.data.data.article;
                this.xd.title = article.title;
                this.xd.type = article.type;
                if(this.xd.type === 3){
                    this.jobShow = true;
                }
                this.job = article.industry;
                this.content = article.content;
                this.xd.url = article.url;
                this.xd.imgurl = article.img;
                this.oldUrl = article.img;
                this.createAt = article.createAt;
                this.id = article.id;
            })
            }
            console.log(this.btn)
        },
        watch:{
            xd: {
                handler(xd){
                    if(xd.type === 3){
                        this.jobShow = true;
                    }else{
                        this.jobShow = false;
                    }
                    console.log(xd)
                 if(xd.title !== "" && xd.type !== "" && xd.url !== "" && xd.imgurl !== ""){
                       this.btn = false;
                       console.log(xd)
                }else{
                    this.btn = true;
                    console.log(xd)
                }
                },
                deep: true
                // immediate: true
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "@/assets/scss/commingler.scss";

    ::-webkit-scrollbar {
        display: none;
    }
    .con{
        padding: 0px;
        width: 60px;
        background-color: #aaa;
    }
    .bar{
        display: block;
        text-align: right;
        line-height: 27px;
        color: white;
        background-color: #5cb85c;
    }
    .add {
    padding: 30px 30px 30px 30px;
    .ad{
        box-shadow:  5px 8px 10px 5px #888888;
        padding-bottom: 1px;
        p {
            margin: 0;
            padding: 10px;
            text-align: left;
            font-weight: 600;
            border-bottom: 1px solid black;
            background-color: #f5f5f5;
        }

    }
    }
    .container{
        padding-top: 20px;
        color: black;
        text-align: left;
        font-weight: 600;
    }
    .row{
            margin-bottom: 20px;
            margin-left: 15px;
            .headerr{
                display: inline-block;
                width: 12%;
            }
            input{
                width: 75%;
            }
            select{
                width: 22%;
            }
    }
    .f{
        display: inline-block;
    }
    .uupfile{
        display: inline-block;
        width: 80px;
        line-height: 26px;
        border-radius: 6px;
        color: white;
        font-weight: 500;
        text-align: center;
        background: #337ab7;
    }
    img{
        display: block;
        margin-left: 12%;
        width: 75%;
    }
    .aa{
        margin-left: 12%;
        border-bottom: 2px solid #ddd;
    }
    th{
        padding: 8px;
    }
    .rrr{
        margin-left: 13%;
    }
    button{
        margin-right: 6px;
        padding: 3px;
        background: #5cb85c;
        font-size: 14px;
        color: white;
        border: none;
        border-radius: 7px;
        outline: none;
    }
    .cancel{
        margin-left: 200px;
        border: 1px solid black;
        color: black;
        background: white;
    }
</style>