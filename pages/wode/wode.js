// pages/wode/wode.js
const db = wx.cloud.database()
const app = getApp()
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    username:""
  },

  // 登录
  login(e){
    wx.getUserProfile({
      desc: '请授权登录',
      success:res=>{
        // console.log(res)
        app.globalData.userInfo=res.userInfo
        wx.setStorageSync('user', app.globalData.userInfo)
        this.setData({
          userprofile:app.globalData.userInfo.avatarUrl,
          username:app.globalData.userInfo.nickName
        })
      },
      fail:res=>{
          wx.showToast({
            title: '授权失败',
            icon: "none",
          })
      }
    })
  },

  // 退出
  logout(e){
    wx.showModal({
      title: '',
      content: '确认退出',
      success:res=>{
        if (res.confirm) {
          wx.removeStorageSync('user')
          app.globalData.userInfo=null
          console.log("aaa")
          this.setData({
            userprofile:"",
            username:""
          })
        }
        else if (res.cancel) {
        }
      }
    })
  },

  // 个人信息
  setinform(e){
    // console.log(e.currentTarget.dataset.bookname)
    wx.navigateTo({
      url: '/pages/xinxi/xinxi'
    })
  },

  // 页面跳转
  gotowodingdan(e){
    wx.navigateTo({
      url: '/pages/wodingdan/wodingdan'
    })
  },
  gotowofabu(e){
    wx.navigateTo({
      url: '/pages/wofabu/wofabu'
    })
  },
  gotowofatie(e){
    wx.navigateTo({
      url: '/pages/wofatie/wofatie'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    // console.log(app.globalData.userInfo)
    this.setData({
      userprofile:app.globalData.userInfo.avatarUrl,
      username:app.globalData.userInfo.nickName
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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