import httpAxios from '@/http/axios';
import qs from 'qs';
let Loginhttp = {
// 登录
postLogin:function(params) {      
    return httpAxios.post(`/carrots-admin-ajax/a/login`, qs.stringify(params))
},
// 登出
postLogout:function() {
    return httpAxios.post(`/carrots-admin-ajax/a/logout`)  
}
}
export {               
   Loginhttp
}