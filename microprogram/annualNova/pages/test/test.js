// pages/test/test.js
Page({
  get() {
    var that = this
    wx.request({
      url: 'http://112.74.176.236:9300/annual/v1/annual-report/get-analysis-result',
      method: "GET",
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'codespace-annual-report-system': '9hP&5rL@7jS!2gW*3tY',
      },
      data: {
        // message:that.data.msg,
        reportId: 15
      },
      success(res) {
        console.log(res);
      }
    })
  },
})