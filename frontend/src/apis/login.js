import server from "../utils/server";
/*登录*/
export const login = (username, password) => {
    return server({
        url: '/login',
        method: 'POST',
        data: {
            username: username,
            password: password
        }
    })
}