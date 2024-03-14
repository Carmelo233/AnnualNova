import React, { useEffect } from "react"
import { Button, Form } from 'antd'
import { useState } from "react"
import './login.signup.from.css'
import Link from "antd/es/typography/Link"
import { login } from "../apis/login"
import { setAccessToken, setRefreshToken } from "../config/storage"

export function LoginForm (props) {
    const [isreg, setisreg] = useState(false) //虽然写了状态但暂时没用
    //装获取的rescode值
    const [rescode, setRescode] = useState(600)
    useEffect(() => {
        setisreg(false)
    }, [isreg])

    function onFinish (e) {
        console.log("完成登录表单：", e)

        login(e.username, e.password).then(res => {
            console.log('登录请求成功：', res)
            //获取rescode
            setRescode(res.code)

            // if (res.code === 605) {
            //     alert("密码错误!")
            // } else if (res.code === 604) {
            //     alert("用户不存在！")
            // } 
            if (res.code === 600) {
                setAccessToken(res.data.accessToken)
                setRefreshToken(res.data.refreshToken)
            } else {
                console.log("未知登录失败：", res)
            }
        })
    }

    function onClickToreg () {
        setisreg(true)
        props.getisreg(true)
    }

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            style={{ maxWidth: 400 }}
            onFinish={onFinish}
        >
            {/* 用户名输入 */}
            <Form.Item
                name="username"
                rules={[
                    // 用户名校验
                    () => ({
                        validator () {
                            if (rescode === 604) {
                                return Promise.reject('用户名不存在')
                            }
                            return Promise.resolve()
                        }
                    }),
                    {
                        required: true,
                        message: '请输入用户名！',
                    },
                ]}>
                <div className='full-width col-center'>
                    <input type='text' className='form-item-input' placeholder='用户名' />
                    {/* TODO */}
                    <Link className='form-item-link' onClick={onClickToreg}>立即注册</Link>
                </div>
            </Form.Item>

            {/* 用户密码输入 */}
            <Form.Item
                name="password"
                rules={[
                    // 密码校验
                    () => ({
                        validator () {
                            if (rescode === 605) {
                                return Promise.reject('密码不正确')
                            }
                            return Promise.resolve()
                        }
                    }),
                    {
                        required: true,
                        message: '请输入密码！',
                    },
                ]}>
                <div className='full-width col-center'>
                    <input type='password' className='form-item-input' placeholder='密码' />
                    {/* TODO */}
                    <Link className='form-item-link' style={{ color: '#999' }}>找回密码</Link>
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