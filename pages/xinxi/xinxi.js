// pages/xinxi/xinxi.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      username:app.globalData.userInfo.nickName
    })
    db.collection('user').where({
      name:this.data.username
    }).get()
    .then(res => {
      this.setData({
        user:res.data[0]
       })
        // console.log("输出",res.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  
  // 提交
  getreceiver(e){
    this.setData({
      receiver:e.detail.value
    })
  },
  getphone(e){
    this.setData({
      phone:e.detail.value
    })
  },
  getdorm(e){
    this.setData({
      dorm:e.detail.value
    })
  },
  up(e){
    if(this.data.user==null){
      db.collection('user').add({
        data:{
          name:app.globalData.userInfo.nickName,
          receiver:this.data.receiver,
          phone:this.data.phone,
          dorm:this.data.dorm
        }
      }).then(res => {
        wx.showToast({
          title: '已提交',
        })
        setTimeout(function () {
          wx.switchTab({
            url: '/pages/wode/wode',
          })
        }, 1500)
      })
        .catch(err => {
          console.log(err)
        })
    }
    else{
      db.collection('user').where({
        name:app.globalData.userInfo.nickName,
      }).update({
        data:{
          receiver:this.data.receiver,
          phone:this.data.phone,
          dorm:this.data.dorm
        }
      }).then(res => {
        wx.showToast({
          title: '已提交',
        })
        setTimeout(function () {
          wx.switchTab({
            url: '/pages/wode/wode',
          })
        }, 1500)
      })
        .catch(err => {
          console.log(err)
        })
    }
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