import { Layout, Flex, Button, Card } from "antd"
import { PlusCircleOutlined } from "@ant-design/icons"
import { UpLoad } from "./UpLoad"
import { useState } from "react"
import { AIChat } from "./Chat/AIChat"

//定义左右两部分
const { Sider, Content } = Layout


//定义样式
//和首页一样标签内定样式
const layoutStyle = {
  //元素边框变为圆角：px
  borderRadius: 8,
  //设置元素框外内容
  overflow: 'hidden',
  //calc函数
  width: 'calc(100%)',
  maxWidth: 'calc(100%)',
  height: '996 px',
  top: '40 px',
  bottom: '984 px',
}
const leftSiderStyle = {
  overflow: 'auto',
  height: '100vh',
  // position: 'fixed',
  left: '26 px',
  top: '40 px',
  bottom: '984 px',
  width: '27.5vh',
  //首页homepage中headerStyle中使用的：backgroundColor: '#6AACFF'在此处不生效？
  backgroundColor: '#FFF',
  color: '#000',
  textAlign: 'left',
  lineHeight: '20px',
}
const rightSiderStyle = {
  overflow: 'auto',
  height: '100vh',

  left: '1081 px',
  top: '40 px',
  bottom: '984 px',
  width: '27.5vh',
  backgroundColor: '#FFF',
  color: '#000',
  textAlign: 'center',
  lineHeight: '20px',
}
const contentStyle = {
  width: '45vh',
  height: '100vh',
  top: '40 px',
  bottom: '996 px',
  left: '276 px',
  borderRadius: 24,
  color: '#000',
  textAlign: 'left',
  lineHeight: '20px',
}
//主页面渲染
export function MainPage () {
  //中间部分 部分渲染 目前写了3中页面状态：新建对话 上传；评分摘要信息；对话；还要加上传失败页面状态

  //状态
  const [contentState, setContentState] = useState(0)
  //新建对话状态
  function createNew () {
    setContentState(0)
  }
  //评分摘要
  function reportInfo () {
    setContentState(1)
  }
  //聊天
  function chat () {
    setContentState(2)
  }
  //定义组件
  let contentRender
  //条件渲染
  if (contentState === 0) {
    contentRender = <UpLoad />
  }
  if (contentState === 1) {
    contentRender = <div>
      Info
      <Button onClick={chat}>聊天</Button>
    </div>
  }
  if (contentState === 2) {
    contentRender = <div><AIChat /></div>
  }
  return (
    <Layout hasSider >
      <Sider style={leftSiderStyle}>
        <Button type="primary" icon={<PlusCircleOutlined />} onClick={createNew}>新的聊天</Button>
        <Button onClick={reportInfo}>Info</Button>
        <Button onClick={chat}>chat</Button>
        <Card></Card>
      </Sider>
      <Layout style={layoutStyle}>
        <Content style={contentStyle}>
          {/* 组件条件渲染 */}
          {contentRender}
        </Content>
        <Sider style={rightSiderStyle}>
          sider2
        </Sider>
      </Layout>

    </Layout >
  )
}