<template>
   <div class="tTable container body-content">
        <div class="form-group">
            <div class="form-group">
                <div class="page-header">
                    表格
                </div>
                <table class="table table-bordered table-responsive table-striped">
                    <thead>
                    <tr>
                    <th>时间</th>
                    <th>点击数</th>
                    <th>点击数</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in arrayData" :key="index">
                        <td>{{item.timestamp}}</td>
                        <td>{{item.count}}</td>
                        <td>{{item.count}}</td>
                    </tr>
                    </tbody>
                </table>
                <div class="pager" id="pager">
                    <span class="form-inline">
                        <select class="form-control" v-model="pagesize" v-on:change="showPage(pageCurrent,true)" number>
                            <option value="10">10</option>
                            <option value="20">20</option>                     
                            <option value="30">30</option>
                            <option value="40">40</option>
                        </select>
                    </span>
                    <span v-for="(item,index) in pageCount+1" :key="index">
                        <span v-if="item==1" class="btn btn-default" v-on:click="showPage(1)" :class="{'disabled':fDisabled}">
                            首页
                        </span>
                        <span v-if="item==1" class="btn btn-default" v-on:click="showPage(pageCurrent-1)" :class="{'disabled':fDisabled}">
                            上一页
                        </span>
                        <span v-if="item==1" class="btn btn-default" v-on:click="showPage(item)">
                            {{item}}
                        </span>
                        <span v-if="item==1&&item<showPagesStart-1" class="btn btn-default disabled">
                            ...
                        </span>
                        <span v-if="item>1&&item<=pageCount-1&&item>=showPagesStart&&item<=showPageEnd" class="btn btn-default" v-on:click="showPage(item)">
                            {{item}}
                        </span>
                        <span v-if="item==pageCount&&item>showPageEnd+1" class="btn btn-default disabled">
                            ...
                        </span>
                        <span v-if="item==pageCount" class="btn btn-default" v-on:click="showPage(item)"  >
                            {{item}}
                        </span>
                        <span v-if="item==pageCount" class="btn btn-default" v-on:click="showPage(pageCurrent+1)" :class="{'disabled':lDisabled}">
                            下一页
                        </span>
                        <span v-if="item==pageCount" class="btn btn-default" v-on:click="showPage(pageCount)" :class="{'disabled':lDisabled}">
                            尾页
                        </span>
                    </span>
                    <span>{{pageCurrent}}/{{pageCount}}</span>
                </div>
            </div>
        </div>
    </div>
 </template>
 <script >
 export default {
   
    data(){
        return{
                 //为第一页或者最后一页时，首页，尾页不能点击
               fDisabled:false,
               lDisabled:false,
                  //总项目数
                totalCount: 200,
                //分页数
                pageCount: 12,
                //当前页面
                pageCurrent: 1,
                //分页大小
                pagesize: 10,
                //显示分页按钮数
                showPages: 11,
                //开始显示的分页按钮
                showPagesStart: 1,
                //结束显示的分页按钮/
                showPageEnd: 100,
                //分页数据
                arrayData: []
        }
    },
    methods:{
        showPage(pageIndex,forceRefresh){
            if (pageIndex > 0) {
                if (pageIndex > this.pageCount) {
                    pageIndex = this.pageCount;
                }
                console.log(pageIndex)
                //判断数据是否需要更新
                var currentPageCount = Math.ceil(this.totalCount / this.pagesize);
                if (currentPageCount != this.pageCount) {
                    pageIndex = 1;
                    this.pageCount = currentPageCount;
                }
                else if (this.pageCurrent == pageIndex && currentPageCount == this.pageCount && typeof (forceRefresh) == "undefined") {
                    console.log("not refresh");
                    return;
                }
 
                // //处理分页点中样式
                // var buttons = $("#pager").find("span");
                // for (var i = 0; i < buttons.length; i++) {
                //     if (buttons.eq(i).html() != pageIndex) {
                //         buttons.eq(i).removeClass("active");
                //     }
                //     else {
                //         buttons.eq(i).addClass("active");
                //     }
                // }
 
                //测试数据 随机生成的
                var newPageInfo = [];
                var time=new Date();
                for (var i = 0; i < this.pagesize; i++) {
                    newPageInfo[newPageInfo.length] = {
                        timestamp: time,
                        count: (i + (pageIndex - 1) * 20)
                    };
                }
                this.pageCurrent = pageIndex;
                this.arrayData = newPageInfo;
                //如果当前页首页或者尾页，则上一页首页就不能点击，下一页尾页就不能点击
                 if(this.pageCurrent===1){
                        this.fDisabled=true;
                    }else if(this.pageCurrent===this.pageCount){
                        this.lDisabled=true;
                    }else{
                         this.fDisabled=false;
                         this.lDisabled=false;
                    }
              
                //计算分页按钮数据
                if (this.pageCount > this.showPages) {
                    if (pageIndex <= 5) {
                        this.showPagesStart = 1;
                        this.showPageEnd = 5;
                        console.log("showPage1")
                    }
                    else if (pageIndex >= 16) {
                        this.showPagesStart = 11;
                        this.showPageEnd = 20;
                        console.log("showPage2")
                    }
                    else {
                        console.log("showPage3")
                        this.showPagesStart = pageIndex - 3;
                        this.showPageEnd = pageIndex + 4;
                    }
                }
                console.log("showPagesStart:" + this.showPagesStart + ",showPageEnd:" + this.showPageEnd + ",pageIndex:" + pageIndex);
            }
        }
    },
    mounted(){
        this.showPage(this.pageCurrent, null, true);
        console.log(this.pageCount)
    },
    computed:{
    }
}
 </script>