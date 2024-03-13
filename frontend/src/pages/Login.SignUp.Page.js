import React from "react";
import {useState} from "react";

import './Login.SignUp.Page.css'

import {LoginForm} from '../component/LoginForm'
import {SignUpForm} from "../component/SignUpForm";
import {Tool} from "../component/tool";

export function LoginSignUpPage() {
    const [isreg, setisreg] = useState(false)

    function getisreg(_isreg) {
        setisreg(_isreg)
    }

    return (<div className='fullpage'>
        <div className={isreg ? "gradient" : "gradient filter"}></div>
        <div className={isreg ? "background-image filter" : "background-image"}></div>
        <div className='tool'><Tool/></div>
        <div className={isreg ? 'login-signup-form fadein' : 'login-signup-form'}>
            {isreg ? <SignUpForm /> : <LoginForm getisreg={getisreg} />}
        </div>
    </div>)
}