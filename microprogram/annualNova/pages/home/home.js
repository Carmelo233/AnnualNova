Page({
  data: {
    todaydate: '',
    lastdate: '2024/04/30',
    annuallist: [{
        title: "广东省广州市某县市场监管局部署年报公示工作",
        date: "2024/05/01"
      }
    ],
    isuploaderr: false,
    uploadimg: "../../images/upload.png",
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
    var date = new Date
    this.normTodayData(date)
    console.log("该文件上传日期是否是当日：" + (String)(this.data.todaydate == this.data.annuallist[0].date));

    // 测试变换stats
    this.setData({
      curstatus: this.data.status2 
    })
  },
  normTodayData(date) {
    var ddm = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)
    var ddd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
    var dd = date.getFullYear() + '/' + ddm + '/' + ddd
    this.setData({
      todaydate: dd
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
    wx.uploadFile({
      url: 'http://112.74.176.236:9300/annual/v1/file/upload',
      header: {
        "Content-Type": "multipart/form-data",
        'codespace-annual-report-system': '9hP&5rL@7jS!2gW*3tY',
      },
      name: "file",
      filePath: tempFilePath,
      success(res) {
        const data = res.data
        console.log(res);
      },
      fail(err) {
        console.log(err);
      }
    })
  }
})