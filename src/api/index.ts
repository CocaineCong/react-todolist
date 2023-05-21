import axios from 'axios'

// 配置项
const axiosOption = {
    baseURL: 'http://localhost:3000',
    timeout: 5000
}

// 创建一个单例
const instance = axios.create(axiosOption);

// 添加请求拦截器
instance.interceptors.request.use(function (config){
    let token = localStorage.getItem('token')

    if (token){
        config.headers.setAuthorization(token)
    }

    return config;
}, function (error){
    // 对请求错误做些什么
    return Promise.reject(error);
})

// 添加相应拦截器
instance.interceptors.response.use(function (response){
    // 对响应头的数据做处理
    return response.data;
}, function (error){
    return Promise.reject(error)
});

export default instance;