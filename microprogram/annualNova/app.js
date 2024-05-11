// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.getSystemInfo({
      　　success: res => {
      　　　　this.globalData.bottomHeight = res.screenHeight - res.safeArea.bottom;
      　　},
      　　fail(err) {
      　　　　console.log(err);
      　　}
      })
  },
  globalData: {
    userInfo: null,
    bottomHeight:null
  }
  
})
