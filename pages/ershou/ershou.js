// pages/ershou/ershou.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    
  },

  // 搜索
  // getname(e){
  //   this.setData({
  //     userinput:e.detail.value
  //   })
  // },
  // searchbook(e){
  //   // console.log(this.data.userinput)
  //   wx.navigateTo({
  //     url: '/pages/sousuo/sousuo?name='+this.data.userinput+"&oldbook="+Boolean(1),
  //   })
  // },

    // 二手图书>界面跳转
  gotoershouxiangqing(e){
    // console.log(e.currentTarget.dataset.bookname)
    wx.navigateTo({
      url: '/pages/ershouxiangqing/ershouxiangqing?id='+e.currentTarget.dataset.id,
    })
  },

  // 发布图书
  gotofabu(e){
    wx.navigateTo({
      url: '/pages/fabu/fabu'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    db.collection('secondhand').get()
    .then(res => {
      this.setData({
        oldBook:res.data.reverse()
       })
        // console.log("输出",res.data)
      })
      .catch(err => {
        console.log(err)
      })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      inputValue:[],
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})