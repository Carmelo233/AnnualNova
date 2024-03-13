import {REFRESH_TOKEN, PASS} from '../config/constants.js'
import {getRefreshToken, removeRefreshToken, setAccessToken, setRefreshToken} from '../config/storage'
import server from "./server";

let subsequent = []
let flag = false // 设置开关，保证一次只能请求一次短token，防止客户多此操作，多次请求

/*把过期请求添加在数组中*/
export const addRequest = (request) => {
    subsequent.push(request)
}

/*调用过期请求*/
export const retryRequest = () => {
    console.log('重新请求上次中断的数据')
    subsequent.forEach(request => request())
    subsequent = []
}

/*短token过期，携带token去重新请求token*/
export const refreshToken = () => {
    if (!flag) {
        flag = true
        let r_tk = getRefreshToken() // 获取长token
        if (r_tk) {
            server.get('/refresh', Object.assign({}, {
                headers: {[PASS]: r_tk}
            })).then((res) => {
                //长token失效，退出登录
                if (res.code === 602) {
                    flag = false
                    removeRefreshToken(REFRESH_TOKEN)
                } else if (res.code === 600) {
                    // 存储新的token
                    setAccessToken(res.data.accessToken)
                    setRefreshToken(res.data.refreshToken)
                    flag = false
                    // 重新请求数据
                    retryRequest()
                }
            })
        }
    }
}
