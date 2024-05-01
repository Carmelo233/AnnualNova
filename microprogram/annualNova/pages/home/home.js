Page ({
  data:{
    todaydate:'',
    lastdate:'2024/04/30',
    annuallist:[
      {
        title:"广东省广州市某县市场监管局部署年报公示工作",
        date:"2024/05/01"
      },
      {
        title:"广东省广州市某县市场监管局部署年报公示工作",
        date:"2024/05/01"
      }
    ]

  },
  onLoad(){
    var date = new Date
   this.normTodayData(date)
   console.log(this.data.todaydate == this.data.annuallist[0].date);
  },
  normTodayData(date) {
    var ddm = (date.getMonth() + 1) <10 ? "0"+ (date.getMonth() + 1):(date.getMonth() + 1)
    var ddd = date.getDate()<10 ? "0"+ date.getDate():date.getDate()
    var dd = date.getFullYear() + '/' + ddm + '/' + ddd
    this.setData({
      todaydate:dd
    })
  }
})