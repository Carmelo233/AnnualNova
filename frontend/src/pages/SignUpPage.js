import React from "react";
import './Login.SignUp.Page.css'
import {SignUpForm} from "../component/SignUpForm";
import {Tool} from "../component/tool";

export function SignUpPage() {
    return (
        <div className="fullpage">
            <div className="gradient filter"></div>
            <div className="background-image filter"></div>
            <div className='tool'><Tool/></div>
            <div className='loginform col-center'><SignUpForm/></div>
        </div>
    )
}