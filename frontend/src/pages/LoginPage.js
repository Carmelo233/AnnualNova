import React from "react";
import './Login.SignUp.Page.css'
import {LoginForm} from '../component/LoginForm'
import {Tool} from "../component/tool";

export function LoginPage() {
    return (
        <div className='fullpage'>
            <div className="gradient"></div>
            <div className="background-image"></div>
            <div className='tool'><Tool/></div>
            {/*<div className="fullpage">*/}
                <div className='loginform col-center'><LoginForm/></div>
            {/*</div>*/}
        </div>
    )
}