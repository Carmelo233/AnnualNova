import {Button, Form} from 'antd'

import './login.signup.from.css'
import {signup} from "../apis/signup";
import {setAccessToken, setRefreshToken} from "../config/storage";


export function SignUpForm(props) {

    const onFinish = (values) => {
        console.log("完成注册表单：", values)

        signup(values.usernameS, values.passwordS).then(res => {
            console.log('注册请求成功：', res)
            if (res.code === 603) {
                alert("用户名被占用！")
            } else if (res.code === 600) {
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
            initialValues={{remember: true}}
            style={{maxWidth: 400}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                name="usernameS"
                rules={[
                    {
                        required: true,
                        message: '用户名格式不符合要求!',
                    },
                ]}
            >
                <div className='full-width col-center'>
                    <input type='text' className='form-item-input' placeholder='用户名'/>
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
                    <input type='password' className='form-item-input' placeholder='用户密码'/>
                </div>
            </Form.Item>

            <Form.Item
                name="passwordC"
                rules={[
                    ({getFieldValue}) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('passwordS') === value) {
                                return Promise.resolve()
                            }
                            return Promise.reject('两次密码不一致！')
                        }
                    })
                ]}
            >
                <div className='full-width col-center'>
                    <input type='password' className='form-item-input' placeholder='确认密码'/>
                </div>
            </Form.Item>

            <Form.Item name='signup'>
                <div className='full-width row-center'>
                    <Button type="primary" htmlType="signup" className='signup-form-button'>
                        立即注册
                    </Button>
                </div>
            </Form.Item>
        </Form>
    )
}