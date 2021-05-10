import http from './index'
let api={
    login(data){
        return http({
            url:"http://purchase.zhroot.com/WebApiInterface/ApiLogin/CheckLogin",
            method:"POST",
            data
        })
    }
}
export default api