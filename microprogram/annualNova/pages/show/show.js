var app = getApp()
Page({
  data: {
    annual: {
      reportName: "未获取.pdf",
      createTime: "2024-05-09T15:10:28.000+08:00",
      id: 29
    },
    reportId: null,
    bottomHeight: null,
    reportdata: null,
  },
  onLoad() {
    var that = this
    let eventChannel = this.getOpenerEventChannel();
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      that.setData({
        // annual: data.data.annual,
        reportId: data.data
      })
    })
    this.setData({
      bottomHeight: app.globalData.bottomHeight
    })
    // console.log("show");
    wx.showLoading({
      title: '对年报分析中',
    })
    setTimeout(() => {
      this.getansres()
    }, 3000);
    setTimeout(function () {
      wx.hideLoading()
    }, 3000)
    console.log(this.data);
  },
  onShow() {

  },
  getansres() {
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
        reportId: that.data.reportId
      },
      success(res) {
        // console.log(res);
        if (res.data.code == 200) {
          that.setData({
            reportdata: res.data.data.analysisResultVO,
            annual: res.data.data.annualReportVO
          })
        }
        // console.log(that.data);
      }
    })
  },
  uploadannual() {
    var that = this
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success(res) {
        const tempFilePath = res.tempFiles[0].path;
        // console.log(tempFilePath);
        that.uploadFile(tempFilePath); // 调用上传函数
      },
    })
  },
  uploadFile(tempFilePath) {
    var that = this
    wx.uploadFile({
      url: 'http://112.74.176.236:9300/annual/v1/file/upload',
      header: {
        "Content-Type": "multipart/form-data",
        'codespace-annual-report-system': '9hP&5rL@7jS!2gW*3tY',
      },
      name: "file",
      filePath: tempFilePath,
      success(res) {
        var responseData = JSON.parse(res.data);
        console.log("上传年报成功：", res);
        if (responseData.code === 200) {
          // TODO 获取年报标题
          that.setData({
            reportId: responseData.data
          })
          console.log(that.data);
          // console.log("show");
          
          // 年报分析
          wx.showLoading({
            title: '对年报分析中',
          })
          setTimeout(() => {
            that.getansres()
          }, 3000);
          setTimeout(function () {
            wx.hideLoading()
          }, 3000)
        } else {
          that.setData({
            curstatus: that.data.status2
          })
        }
      },
      fail(err) {
        console.log(err);
      }
    })
  },
  toChat() {
    var that = this
    wx.navigateTo({
      url: '../chat/chat',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          data: that.data.annual
        })
      }
    })
  },
  backtohome() {
    wx.navigateBack({
      delta: 1, // 返回的页面数，如果delta大于现有页面数，则返回到首页
    })
  }
})