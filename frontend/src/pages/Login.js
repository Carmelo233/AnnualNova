import React from "react";
import './Login.css'
import {LoginForm} from '../component/LoginForm'
import {Tool} from "../component/tool";

export function Login() {
    return (
        <>
            <div className="gradient"></div>
            <div className="background-image"></div>
            <div className="App">
                <div className='loginform col-center'><LoginForm/></div>
                <div className='tool'><Tool/></div>
            </div>
        </>
    )
}