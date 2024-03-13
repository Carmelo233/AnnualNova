import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {LoginSignUpPage} from "../pages/Login.SignUp.Page";

export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" Component={LoginSignUpPage}></Route>
            </Routes>
        </BrowserRouter>
    )
}