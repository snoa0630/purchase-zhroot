import axios from 'axios'

function http({
    url,
    method,
    data,
    params
}) {
    return axios({
        url,
        method,
        data,
        params
    })
    .then(res=>{
        if(res.status>=200&&res.status<300||res.data==304){
            if(res.data.StatusCode==200){
                return res.data
            }else{
                return Promise.reject(res.data)
            }
        }else{
            return Promise.reject(res.status)
        }
    })
}
export default http