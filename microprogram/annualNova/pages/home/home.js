Page({
  data: {
    todaydate: '',
    lastdate: '',
    annuallist: [],
    todayannullist: [],
    lastannallist: [],
    isuploaderr: false,
    status1: {
      msg1: "尚无结果",
      msg2: "上传年报，",
      msg3: "立即查看得分与文件摘要！",
      msg4: "上传年报",
      uploadimg: "../../images/upload.png",
      upload_button_img: "../../images/upload-button.png"
    },
    status2: {
      msg1: "文件上传错误",
      msg2: "上传年报文件格式有误，",
      msg3: "请重新上传！",
      msg4: "重新上传",
      uploadimg: "../../images/uploadfail.png",
      upload_button_img: "../../images/refresh.png"
    },
    curstatus: {
      msg1: "尚无结果",
      msg2: "上传年报，",
      msg3: "立即查看得分与文件摘要！",
      msg4: "上传年报",
      uploadimg: "../../images/upload.png",
      upload_button_img: "../../images/upload-button.png"
    },
  },
  onLoad() {
    this.getannuallist()
    // this.getTodayAnnualList()
    // this.getLastAnnualList()
    // this.normTodayData()
    // this.normLastDayData()
  },
  getannuallist(getTodayAnnualList) {
    var that = this
    wx.request({
      url: 'http://112.74.176.236:9300/annual/v1/annual-report/get-report-list',
      method: "GET",
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'codespace-annual-report-system': '9hP&5rL@7jS!2gW*3tY',
      },
      success(res) {
        if (res.data.code == 200) {
          that.setData({
            annuallist: res.data.data
          })
          // console.log(that.data.annuallist);
          that.getTodayAnnualList()
          that.getLastAnnualList()
        }
      }
    })
  },
  isToday(backendDataTime) {
    // 将字符串转换为Date对象
    let backendDate = new Date(backendDataTime);
    // console.log(backendDate);

    // 获取当前日期的年月日部分
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // 设置小时、分钟、秒和毫秒为0，以便只比较日期部分

    // 比较年月日是否相同
    if (backendDate.getFullYear() === currentDate.getFullYear() &&
      backendDate.getMonth() === currentDate.getMonth() &&
      backendDate.getDate() === currentDate.getDate()) {
      return true
    } else {
      return false
    }
  },
  getTodayAnnualList() {
    let annuallist = this.data.annuallist
    var todaylist = []
    var that = this
    // 直接在遍历中利用isToday就好啦
    annuallist.forEach(function (item, index) {
      if (that.isToday(item.createTime)) {
        todaylist.push(item)
      }
      // console.log(index);
    })
    this.setData({
      todayannullist: todaylist
    })

    this.normTodayData()
  },
  getLastAnnualList() {
    var annuallist = this.data.annuallist
    // console.log(annuallist);
    let lastdate = null
    var lastlist = []
    // 获取最近一天的年报
    var i = annuallist.length - 1
    for (; i >= 0; --i) {
      if (!this.isToday(annuallist[i].createTime)) {
        lastdate = annuallist[i].createTime
        // console.log(annuallist[i],"index为:",i);
        break
      }
    }
    // 在该坐标下往回遍历 能提高程序性能
    for (; i >= 0; --i) {
      if (annuallist[i].createTime.split('T')[0] == lastdate.split('T')[0]) {
        lastlist.push(annuallist[i])
      } else {
        break
      }
    }
    this.setData({
      lastannallist: lastlist,
      lastdate: lastdate
    })

    // console.log(lastdate);
    // 与获取当日年报不用 这里为了保证异步执行
    this.normLastDayData()

  },
  normDayData(date) {
    var ddm = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)
    var ddd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
    var dd = date.getFullYear() + '/' + ddm + '/' + ddd
    return dd
  },
  normTodayData() {
    var date = new Date
    var dd = this.normDayData(date)
    this.setData({
      todaydate: dd
    })
  },
  normLastDayData() {
    var lastdate = this.data.lastdate
    let date = new Date(lastdate);
    var dd = this.normDayData(date)
    this.setData({
      lastdate: dd
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
        console.log("上传年报成功：", responseData);
        if (responseData.code === 200) {
          // TODO 
          that.navigateTochat(responseData.data)
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
  navigateTochat(reportId) {
    wx.navigateTo({
      url: '../show/show',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          data: reportId
        })
      }
    })
  },
  chicktochat(e) {
    // console.log(e.currentTarget.dataset);
    this.navigateTochat(e.currentTarget.dataset.annual.id)
  }
})