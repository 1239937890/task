import httpAxios from '@/http/axios';
import qs from 'qs';
let article= {
// 列表数据
getArticleList:function (data) {
    return httpAxios.get(`/carrots-admin-ajax/a/article/search`,{
        params: data
    })
},
// connData : (method,url,data) =>{
//     return httpAxios({
//       methods:method,
//       url:'/carrots-admin-ajax' + url+"?"+data});
//   },

//更新上下架
putStatus:function(params){
    return httpAxios.put(`/carrots-admin-ajax/a/u/article/status`,qs.stringify(params))
},
//删除
deleteData:function(id){
    return httpAxios.delete(`/carrots-admin-ajax/a/u/article/${id}`)
},
//获取单个列表数据
getarticle:function(id){
    return httpAxios.get(`/carrots-admin-ajax/a/article/${id}`)
},
//上传图片
uploadImg:function(params,config){
    return httpAxios.post(`/carrots-admin-ajax/a/u/img/task`,params,config)
},
//编辑
editarticle:function(id,params){
    return httpAxios.put(`/carrots-admin-ajax/a/u/article/${id}`,qs.stringify(params))
},
//新增
addArticle:function(params){
    return httpAxios.post(`/carrots-admin-ajax/a/u/article`,qs.stringify(params))
}
};
let typeList = [
    {
        id: "",
        label : "全部"
    },
    {
        id: 0,
        label : "首页banner"
    },
    {
        id: 1,
        label : "找职位banner"
    },
    {
        id: 2,
        label : "找精英banner"
    },
    {
        id: 3,
        label : "行业大图"
    }
];
let jobList = [
    {
        id: "",
        label : "全部"
    },
    {
        id: 0,
        label : "移动互联网"
    },
    {
        id: 1,
        label : "电子商务"
    },
    {
        id: 2,
        label : "企业服务"
    },
    {
        id: 3,
        label : "O2O"
    },
    {
        id: 4,
        label : "教育 "
    },
    {
        id: 5,
        label : "金融 "
    },
    {
        id: 6,
        label : "游戏 "
    }
];
let statusList = [ 
    {
      id: "",
      label: "全部"
    },
    {
      id: 1,
      label: "草稿"
    },
    {
      id: 2,
      label: "上线"
    }
  ]
export {
    article,
    typeList,
    jobList,
    statusList
}