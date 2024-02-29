import { Card, Button, Checkbox, Form, Input, Space } from 'antd'
//引函数
import { useNavigate } from 'react-router-dom'
//引样式
import './SignUpCard.css'
//注册页面
export function SignUp () {
  //表单
  const [form] = Form.useForm()
  //点击“注册”时console显示成功或错误内容
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
      className="signUpContainer"
    >
      <SignUpForm form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} onReset={onReset} />
    </Card>
  )
}
//注册表单
function SignUpForm ({ form, onFinish, onFinishFailed, onReset }) {
  //跳转
  const navigate = useNavigate()
  function goLoginPage () {
    navigate('/login')
  }
  return (
    <Form
      name="signUp"
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
        label="账户名"
        name="usernameS"
        rules={[{
          required: true,
          message: '账户名',

        }]}
      >
        <Input placeholder='请输入账户名' />
      </Form.Item>

      <Form.Item
        label="用户密码"
        name="passwordS"

        rules={[{
          required: true,
          message: '请输入正确格式的密码！',
          //设定密码格式 pattern:使用正则表达式
          // pattern: '^[A-Z][a-zA-Z0-9]{1,18}$'
        }]}
      >
        <Input.Password></Input.Password>
      </Form.Item>
      {/* 保存用户名密码 */}
      <Form.Item
        label="确认密码"
        name="passwordC"

        rules={[{
          required: true,
          message: '两次密码不一致',

        }]}
      >
        <Input></Input>
      </Form.Item>
      {/* 登录，重置按钮 */}
      <Form.Item
        wrapperCol={{
          offset: 6,
          span: 16,
        }}
      >
        <Space>
          <Button type="primary" id="signUp" htmlType="submit" onClick={goLoginPage}>注册</Button>
          <Button htmlType="button" id="reset" onClick={onReset}>重置</Button>
        </Space>
      </Form.Item>
    </Form>
  )
}