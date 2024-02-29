//首页渲染
//引入antd Layout布局组件
import { Layout, Flex, Button, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


//引入文件
import { ContentText } from './Layout/Content/ContentText'
import { HeaderText } from './Layout/Header/HeaderText'

//首页的布局是在原型图未出之前做的，具体修改根据原型图


//定义上中下三部分
const { Header, Content, Footer } = Layout


//layout布局中各部分的style定义
//style属性大全：https://www.w3school.com.cn/jsref/dom_obj_style.asp
//直接在标签中引入style属性避免权重问题
//style中语法还需研究：1、不带单位的数据和px的换算
//                   2、单引号带单位的写法好像并没有实际渲染，但也未报错

const layoutStyle = {
  //元素边框变为圆角：px
  borderRadius: 8,
  //设置元素框外内容
  overflow: 'hidden',
  //calc函数
  width: 'calc(100%)',
  maxWidth: 'calc(100%)',
  height: 600,
}
const headerStyle = {
  //文本对齐方式
  textAlign: 'left',
  //字体颜色
  color: '#fff',
  //上下宽度
  height: 80,
  //内边距
  paddingInline: 48,
  //行间距  
  lineHeight: '40px',
  //背景颜色
  backgroundColor: '#6AACFF',
}
const contentStyle = {
  textAlign: 'left',
  minHeight: 120,
  lineHeight: '20px',
  color: '#000',
  backgroundColor: '#FFF',

}
const footerStyle = {
  textAlign: 'center',
  minHeight: 160,
  color: '#000',
  backgroundColor: '#FFF',
}

//首页
export function HomePage () {
  //跳转
  const navigate = useNavigate()
  //登陆状态
  const [loginState, setLoginState] = useState(false)
  //跳转到主页面
  function goLogin () {
    navigate('/login')
  }
  //跳转到登录页
  function goMainPage () {
    navigate('/mainpage')
  }
  return (
    <div>
      <Layout
        style={layoutStyle}
      >
        <Flex gap="middle" vertical>
          <Header
            style={headerStyle}
          >
            <HeaderText />
          </Header>
        </Flex>

        <Content
          style={contentStyle}
        >
          <ContentText />
        </Content>
        <Footer
          style={footerStyle}
        >
          <Space>
            <Button type='primary' onClick={goMainPage}>立即使用</Button>
            <Button type='primary' onClick={goLogin}>登录</Button>
          </Space>
        </Footer>
      </Layout>
    </div >
  )
}