Page({
  data: {
    todaydate: '',
    lastdate: '2024/04/30',
    annuallist: [{
      id: 1,
      reportName: "一种综合性年报信息提取和评价系统及方法.doc",
      createTime: "2024-05-02T15:35:34.000+08:00"
    },{
      id: 2,
      reportName: "一种综合性年报信息提取和评价系统及方法.doc",
      createTime: "2024-05-02T15:35:34.000+08:00"
    }],
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
        console.log(res);
        if(res.statusCode === 200){
          console.log(res.data.data);
          // TODO 
          // 带年报完整信息传过去
          that.navigateTochat(res.data.data)
        }
        else{
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
  navigateTochat(aAnnual){
    wx.navigateTo({
      url: '../chat/chat',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: aAnnual })
      }
    })
  },
  chicktochat(e){
    // console.log(e.currentTarget.dataset);
    this.navigateTochat(e.currentTarget.dataset)
  }
})