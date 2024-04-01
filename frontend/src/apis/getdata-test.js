import server from "../utils/server";

export const getdataTest = () => {
    return server({
        url: '/test',
        method: 'POST',
    })
}