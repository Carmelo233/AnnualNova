import axios from "axios";
import * as storage from "../config/storage"
import * as constants from '../config/constants'
import {addRequest, refreshToken} from "./refresh";
import {tansParams} from "./tools";

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

const server = axios.create({
    baseURL: 'http://112.74.176.236:9300/annual',
    timeout: 1000 * 10,
    headers: {
        "Content-type": "application/x-www-form-urlencoded"
    }
})

// 请求拦截器
server.interceptors.request.use(config => {
    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === true
    // 是否需要防止数据重复提交
    const isRepeatSubmit = (config.headers || {}).repeatSubmit === true
    // 获取短token 携带到header 服务端校检
    if(storage.getAccessToken()&&!isToken){
        config.headers[constants.AUTH] = storage.getAccessToken()
    }
    // get请求映射params参数
    if (config.method === 'get' && config.params) {
        let url = config.url + '?' + tansParams(config.params);
        url = url.slice(0, -1);
        config.params = {};
        config.url = url;
    }
    if (!isRepeatSubmit && (config.method === 'post' || config.method === 'put')) {
        const requestObj = {
            url: config.url,
            data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
            time: new Date().getTime()
        }
        const requestSize = Object.keys(JSON.stringify(requestObj)).length; // 请求数据大小
        const limitSize = 5 * 1024 * 1024; // 限制存放数据5M
        if (requestSize >= limitSize) {
            console.warn(`[${config.url}]: ` + '请求数据大小超出允许的5M限制，无法进行防重复提交验证。')
            return config;
        }
        const sessionObj = cache.session.getJSON('sessionObj')
        if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
            cache.session.setJSON('sessionObj', requestObj)
        } else {
            const s_url = sessionObj.url;                  // 请求地址
            const s_data = sessionObj.data;                // 请求数据
            const s_time = sessionObj.time;                // 请求时间
            const interval = 1000;                         // 间隔时间(ms)，小于此时间视为重复提交
            if (s_data === requestObj.data && requestObj.time - s_time < interval && s_url === requestObj.url) {
                const message = '数据正在处理，请勿重复提交';
                console.warn(`[${s_url}]: ` + message)
                return Promise.reject(new Error(message))
            } else {
                cache.session.setJSON('sessionObj', requestObj)
            }
        }
    }
    return config
}, error => {
    console.log(error)
    Promise.reject(error)
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

export default server;
