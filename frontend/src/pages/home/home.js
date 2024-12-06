import React, {useEffect} from "react";
import {Route, Routes} from "react-router-dom";

import {getdataTest} from "../../apis/getdata-test";

// 样式插入
import styles from "./home.module.css";

// 组件插入
import {NewUpload} from "../../component/NewUpload";
import {Chat} from "../../component/Chat";
import {FailedUpload} from "../../component/FailedUpload";
import {SideBar} from "../../component/SideBar";

// 使用枚举
const Path = {
    Home: "/",
    Chat: "/chat",
    Settings: "/settings",
    NewUpload: "/new-upload",
    FailedUpload: "/fail-upload"
}

export function Home() {

    function test() {
        getdataTest().then(res => {
            console.log(res)
        })
    }

    useEffect(() => {
        // 添加类到 body 元素
        document.body.classList.add(styles["home-body"]);

        return () => {
            // 可选地在组件卸载时移除样式
            document.body.classList.remove(styles["home-body"]);
        };
    }, []);

    return (
            <div
                className={
                    styles["container"]
                }
            >
                <SideBar className={styles["container"]}/>

                <div className={styles["window-content"]}>
                    <Routes>
                        <Route path={Path.Home} element={<Chat/>}/>
                        <Route path={Path.NewUpload} element={<NewUpload/>}/>
                        <Route path={Path.Chat} element={<Chat/>}/>
                        <Route path={Path.FailedUpload} element={<FailedUpload/>}/>
                    </Routes>
                </div>
            </div>
    )
}
