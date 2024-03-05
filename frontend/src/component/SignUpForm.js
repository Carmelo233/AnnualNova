import {Button, Form} from 'antd'

import './SignUpForm.css'

const onFinish = (values) => {
    console.log('Success:', values)
}

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
}

export function SignUpForm() {
    return (
        <Form
            name="signUpForm"
            className='signUpForm'
            labelCol={{
                span: 0,
            }}
            wrapperCol={{
                span: 24,
            }}
            style={{
                maxWidth: 477,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
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
                on
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

            <Form.Item
                name='signup'
            >
                <div className='full-width row-center'>
                    <Button type="primary" htmlType="signup" className='signup-form-button'>
                        立即注册
                    </Button>
                </div>
            </Form.Item>
        </Form>
    )
}