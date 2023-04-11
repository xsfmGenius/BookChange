// pages/wofabu/wofabu.js
const app = getApp()
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
  onLoad(options) {
    db.collection('secondhand').where({
      username:app.globalData.userInfo.nickName
    }).get()
    .then(res => {
      this.setData({
        book:res.data.reverse()
      })
    })
  },

  // 跳转详情
  gotoxiangqing(e){
    wx.navigateTo({
      url: '/pages/ershouxiangqing/ershouxiangqing?id='+e.currentTarget.dataset.id,
    })
  },

  // 删除
  delete(e){
    db.collection('secondhand').where({
      _id:e.currentTarget.dataset.id
    }).remove()
    .then(res => {
      var newbook= this.data.book
      newbook.splice(e.currentTarget.dataset.index,1)
      this.setData({
      book:newbook
      })
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