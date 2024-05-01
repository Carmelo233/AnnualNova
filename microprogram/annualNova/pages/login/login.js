// index.js
Page({
  data: {
  },
  login() {
    wx.login({
      timeout: 2000,
      success: (res) => {
        if (res.code) {
          console.log("获取到的用户登录code：" + res.code);
          //发起网络请求
          wx.request({
            url: 'TODO',
            data: {
              code: res.code
            },
            success (res) {
              wx.navigateTo({
                url: '../home/home',
              })
            }
          })

          // TODO 
          // 待前后联调结束后删除
          wx.navigateTo({
            url: '../home/home',
          })
        
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
})