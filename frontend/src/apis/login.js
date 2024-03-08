import server from "../utils/server";
/*登录*/
export const login = () => {
    return server({
        url: '/login',
        method: 'get'
    })
}
/*请求数据*/
export const getData = () => {
    return server({
        url: '/getList',
        method: 'get'
    })
}
