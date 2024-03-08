import React, {useEffect} from "react";
import {Button, Form} from 'antd';
import {useState} from "react";
import './login.signup.from.css'
import Link from "antd/es/typography/Link";

export function LoginForm(props) {
    const [isreg,setisreg] = useState(false) //虽然写了状态但暂时没用

    useEffect(() => {
        setisreg(false)
    }, [isreg]);

    function onFinish(e) {
        console.log(e)
    }

    function onClickToreg(){
        setisreg(true)
        props.getisreg(true)
    }

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{remember: true}}
            style={{maxWidth: 400}}
            onFinish={onFinish}
        >
            {/* 用户名输入 */}
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: '请输入用户名！',
                    },
                ]}>
                <div className='full-width col-center'>
                    <input type='text' className='form-item-input' placeholder='用户名'/>
                    {/* TODO */}
                    <Link className='form-item-link' onClick={onClickToreg}>立即注册</Link>
                </div>
            </Form.Item>

            {/* 用户密码输入 */}
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: '请输入密码！',
                    },
                ]}>
                <div className='full-width col-center'>
                    <input type='password' className='form-item-input' placeholder='密码'/>
                    {/* TODO */}
                    <Link className='form-item-link' style={{color: '#999'}}>找回密码</Link>
                </div>
            </Form.Item>

            {/* 提交按钮 */}
            <Form.Item name="submit">
                <div className='full-width'>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录账号
                    </Button>
                </div>
            </Form.Item>
        </Form>

    )
}