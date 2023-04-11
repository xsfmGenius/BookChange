const db = wx.cloud.database()
// pages/ershouxiangqing/ershouxiangqing.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(options.id)
    db.collection('secondhand').where({
      _id:options.id
    }).get()
    .then(res => {
      this.setData({
        book:res.data[0],
        // detail:res.data[0].bookdetail.replace(/<br\/>/g,'\r\n')
       })
      //  console.log("输出",this.data.detail)
      // console.log("输出",this.data.book)
      })
      .catch(err => {
        console.log(err)
      })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})