import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {App} from "../pages/App";
import {SignUpPage} from '../pages/SignUpPage'

export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" Component={App}></Route>
                <Route path="/sign" Component={SignUpPage}></Route>
            </Routes>
        </BrowserRouter>
    )
}