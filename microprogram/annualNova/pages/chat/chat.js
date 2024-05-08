// pages/chat/chat.js
Page({
  data: {
    annual: {
      id: 1,
      reportName: "一种综合性年报信息提取和评价系统及方法.doc",
      createTime: "2024-05-02T15:35:34.000+08:00"
    },
    chatlist: "",
    msg: "请分析一下比亚迪2022年的营收情况。"
  },
  onLoad: function (option) {
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    var that = this
    let eventChannel = this.getOpenerEventChannel();
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      that.setData({
        annual: data.annual.data.annual
      })
    })
    that.getchatlist()
    // console.log(that.data);
  },
  getchatlist() {
    var that = this
    wx.request({
      url: 'http://112.74.176.236:9300/annual/v1/annual-report/get-chat-list',
      method: "GET",
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'codespace-annual-report-system': '9hP&5rL@7jS!2gW*3tY',
      },
      data: {
        // message:that.data.msg,
        reportId: 2
      },
      success(res) {
        // console.log(res);
        if (res.data.code == 200) {
          that.setData({
            chatlist: res.data.data
          })
        }
      }
    })
  },
  
})