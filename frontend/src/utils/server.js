import axios from "axios";
import * as storage from "../config/storage"
import * as constants from '../config/constants'
import {addRequest, refreshToken} from "./refresh";


const server = axios.create({
    baseURL: 'http://112.74.176.236:9300/annual',
    timeout: 1000 * 10,
    headers: {
        "Content-type": "application/x-www-form-urlencoded"
    }
})

export default server;

// 请求拦截器
server.interceptors.request.use(config => {
    // 获取短token 携带到header 服务端校检
    config.headers[constants.AUTH] = storage.getAccessToken()
    return config
})

// 响应拦截器
server.interceptors.response.use(
    async response => {
        // 获取到配置和后端响应的数据
        let {config, data} = response
        console.log('响应提示信息：', data.msg)
        return new Promise((resolve, reject) => {
            // 短token失效
            if (data.code === 601) {
                // 移除失效的短token
                storage.removeAccessToken(constants.ACCESS_TOKEN)
                // 把过期请求存储起来，用于请求到新的短token，再次请求，达到无感刷新
                addRequest(() => resolve(server(config)))
                // 携带长token去请求新的token
                refreshToken()
            } else if (data.code === 610) {
                alert(data || '未知错误');
            } else {
                // 有效返回相应的数据
                resolve(data)
            }
        })
    },
    error => {
        console.log("axios中response报错", error);
        return Promise.reject(error)
    }
)