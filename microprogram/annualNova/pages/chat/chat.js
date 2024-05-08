// pages/chat/chat.js
var app = getApp()
Page({
  data: {
    annual: "",
    annualtitle: "",
    chatlist: "",
    inputMsg: '',
    bottomHeight: null
  },
  onLoad: function (option) {
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    var that = this
    let eventChannel = this.getOpenerEventChannel();
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      that.setData({
        annual: data.data.annual
      })
    })
    this.getannualtitle()
    this.getchatlist()
    this.setData({
      bottomHeight: app.globalData.bottomHeight
    }) 
    console.log(this.data);
  },
  getannualtitle() {
    var title = this.data.annual.reportName.split('.')[0]
    this.setData({
      annualtitle: title
    })
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
  handleInput: function (event) {
    this.setData({
      inputText: event.detail.value
    });
  },
  sendMsg: function () {
    const text = this.data.inputText;
    if (text.trim()) {
      // 发送文本内容到服务器或其他操作
      console.log('发送的文本内容：', text);
    } else {
      // 提示用户输入不能为空
      wx.showToast({
        title: '请输入文字',
        icon: 'none',
        duration: 2000
      });
    }
  }
})