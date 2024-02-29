//登录页面
//引组件
import { Card, Button, Checkbox, Form, Input, Space } from 'antd'
//引函数
import { useNavigate } from 'react-router-dom'
//引样式
import './LoginCard.css'
//登录页面
export function Login () {
  //表单
  const [form] = Form.useForm()
  //点击“登录”时console显示成功或错误内容
  function onFinish (values) {
    console.log('success', values)
  }
  function onFinishFailed (errorInfo) {
    console.log('Failed', errorInfo)
  }
  //重置
  function onReset () {
    //表单重置
    form.resetFields()
  }

  return (
    //card插件，装载登录表单填写
    <Card
      className="logonContainer"
    >
      <LoginForm form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} onReset={onReset} />
    </Card>
  )
}
//登录表单
function LoginForm ({ form, onFinish, onFinishFailed, onReset }) {
  //跳转
  const navigate = useNavigate()
  function goMainPage () {
    navigate('/mainpage')
  }
  function goSignUp () {
    navigate('/signup')
  }
  return (
    <Form
      name="login"
      form={form}
      /*关于Col：将所在组件（Card）分为24份（24为定值），span为占用份数，
      label是标签，wrapper是输入框，offset可以设定初始位置
      */
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
        height: 300,
      }}

      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="用户账号"
        name="username"
        rules={[{
          required: true,
          message: '请输入用户账号',

        }]}
      >
        <Input placeholder='请输入账号' />
      </Form.Item>

      <Form.Item
        label="用户密码"
        name="password"

        rules={[{
          required: true,
          message: '请输入正确密码！',
          //设定密码格式 pattern:使用正则表达式
          // pattern: '^[A-Z][a-zA-Z0-9]{1,18}$'
        }]}
      >
        <Input.Password></Input.Password>
      </Form.Item>
      {/* 保存用户名密码 */}
      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 6,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
      {/* 登录，重置按钮 */}
      <Form.Item
        wrapperCol={{
          offset: 6,
          span: 16,
        }}
      >
        <Space>
          <Button type="primary" id="login" htmlType="submit" onClick={goMainPage}>登录</Button>
          <Button htmlType="button" id="reset" onClick={onReset}>重置</Button>
          <Button type="primary" id="goSignUp" onClick={goSignUp}>立即注册</Button>
        </Space>
      </Form.Item>
    </Form>
  )
}


