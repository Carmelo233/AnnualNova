// pages/chat/chat.js
var app = getApp()
Page({
  data: {
    annual: {
      createTime: "2024-05-10T09:54:12.000+08:00",
      id: 31,
      reportName: "比亚迪：2022年度报告"
    },
    annualtitle: "",
    chatlist: "",
    inputMsg: "",
    bottomHeight: null,
    toView: ""
  },
  onLoad: function (option) {
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    var that = this
    let eventChannel = this.getOpenerEventChannel();
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      // console.log(data);
      that.setData({
        annual: data.data
      })
    })
    this.getannualtitle()
    this.getchatlist()
    this.setData({
      bottomHeight: app.globalData.bottomHeight
    })
    // console.log(this.data);
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
        reportId: that.data.annual.id
      },
      success(res) {
        console.log("get-chat-list success:", res);
        if (res.data.code == 200) {
          that.setData({
            chatlist: res.data.data
          })
        }
        that.scrollToBottomSmoothly()
      }
    })
  },
  inputClick: function (event) {
    this.setData({
      inputMsg: event.detail.value
    });
  },
  tapSendMsg() {
    const text = this.data.inputMsg;
    if (text != "") {
      this.sendMsg(text)
      this.setData({
        inputMsg: ""
      })
      console.log('发送的文本内容：', text);
    } else {
      // 提示用户输入不能为空
      wx.showToast({
        title: '请输入文字',
        icon: 'none',
        duration: 2000
      });
    }
  },
  sendMsg(msg) {
    var that = this
    wx.request({
      url: 'http://112.74.176.236:9300/annual/v1/annual-report/chat',
      method: "POST",
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'codespace-annual-report-system': '9hP&5rL@7jS!2gW*3tY',
      },
      data: {
        message: msg,
        reportId: that.data.annual.id
      },
      success(res) {
        console.log("sendMsg success:", res);

        let timerId;
        timerId = setTimeout(() => {
          that.getchatlist()
          clearTimeout(timerId); // 在操作结束后，如果适用，可以立即清除
        }, 1000);
      },
      fail(err) {
        console.log("sendMsg fail:", err);
      }
    })
  },
  scrollToBottomSmoothly() {
    // 获取最后一个item的id
    const lastItemId = `item-${this.data.chatlist.length - 1}`;
    console.log(lastItemId);
    this.setData({
      toView: lastItemId
    })
  },
  backtoshow() {
    wx.navigateBack({
      delta: 1,
    })
  }
})