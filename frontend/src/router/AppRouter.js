import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {LoginSignUpPage} from "../pages/Login.Sign/Login.SignUp.Page";
import {Home} from "../pages/home/home"

export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" Component={LoginSignUpPage}></Route>
                <Route path="/chat" Component={Home}></Route>
            </Routes>
        </BrowserRouter>
    )
}