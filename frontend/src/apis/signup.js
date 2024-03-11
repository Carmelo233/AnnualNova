import server from "../utils/server";
/*注册*/
export const signup = (username, password) => {
    return server({
        url: '/register',
        method: 'POST',
        data: {
            username: username,
            password: password
        }
    })
}