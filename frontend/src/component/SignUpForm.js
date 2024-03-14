import { Button, Form, Space } from 'antd'
import React, { useEffect } from "react"
import { useState } from "react"
import Link from "antd/es/typography/Link"
import './login.signup.from.css'
import { signup } from "../apis/signup"
import { setAccessToken, setRefreshToken } from "../config/storage"


export function SignUpForm (props) {
    const [isreg, setisreg] = useState(true)
    //装获取的rescode的值
    const [rescode, setRescode] = useState(600)

    useEffect(() => {
        setisreg(true)
    }, [isreg])

    function onClickToreg () {
        setisreg(false)
        props.getisreg(false)
    }


    const onFinish = (values) => {
        console.log("完成注册表单：", values)

        signup(values.usernameS, values.passwordS).then(res => {
            console.log('注册请求成功：', res)
            //获取rescode
            setRescode(res.code)
            // if (res.code === 603) {
            //     alert("用户名被占用！")
            // } 
            if (res.code === 600) {
                setAccessToken(res.data.accessToken)
                setRefreshToken(res.data.refreshToken)
            } else {
                console.log("未知登录失败：", res)
            }
        })
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }

    return (
        <Form
            name="signUpForm"
            className='signUpForm'
            initialValues={{ remember: true }}
            style={{ maxWidth: 400 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                name="usernameS"
                rules={[
                    //用户名注册校验
                    () => ({
                        validator () {
                            if (rescode === 603) {
                                return Promise.reject('用户名已被占用')
                            }
                            return Promise.resolve()
                        }
                    }),
                    {
                        required: true,
                        message: '用户名不能为空'
                    }

                ]}
            >
                <div className='full-width col-center'>
                    <input type='text' className='form-item-input' placeholder='用户名' />
                </div>
            </Form.Item>


            <Form.Item
                name="passwordS"
                rules={[
                    {
                        required: true,
                        message: '密码格式不符合要求！',
                    },
                ]}
            >
                <div className='full-width col-center'>
                    <input type='password' className='form-item-input' placeholder='用户密码' />
                </div>
            </Form.Item>

            <Form.Item
                name="passwordC"
                rules={[
                    ({ getFieldValue }) => ({
                        validator (rule, value) {
                            if (!value || getFieldValue('passwordS') === value) {
                                return Promise.resolve()
                            }
                            return Promise.reject('两次密码不一致！')
                        }
                    })
                ]}
            >
                <div className='full-width col-center'>
                    <input type='password' className='form-item-input' placeholder='确认密码' />
                </div>
            </Form.Item>

            <Form.Item name='signup'>
                <div className='full-width row-center'>
                    <Space>
                        <Button type="primary" htmlType="signup" className='signup-form-button'>
                            立即注册
                        </Button>
                        <Link className='form-item-link' onClick={onClickToreg}>返回登陆页</Link>
                    </Space>
                </div>
            </Form.Item>
        </Form>
    )
}