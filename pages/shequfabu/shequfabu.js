// pages/shequfabu/shequfabu.js
var util = require('../../utils/util.js');
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgsrc:[],
    detail:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  // 上传图片
  uploadcover(e){
    wx.chooseMedia({
      count: 3-this.data.imgsrc.length,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      camera: 'back',
      success: res=>{
        // console.log(res)
        var time = Date.parse(new Date());
        var path='comment/'+app.globalData.userInfo.nickName+time+'.jpg'
        // console.log(path)
        wx.cloud.uploadFile({
          cloudPath: path,
          filePath: res.tempFiles[0].tempFilePath,
          success: res=>{
            var newimgsrc=this.data.imgsrc
            newimgsrc.push(res.fileID)
            this.setData({
              imgsrc:newimgsrc
            })
            // console.log(this.data.imgsrc)
          },
          fail:res=>{
            // console.log(res)
          }
        })
      }
    })
  },

  // 显示图片
  showImg(e) {
    wx.previewImage({
      urls: this.data.imgsrc,
      current: this.data.imgsrc[e.currentTarget.dataset.index]
    })
  },

  // 删除图片
  clearimg(e){
    // console.log(this.data.imgsrc)
    // console.log(e.currentTarget.dataset.index)
    // console.log(this.data.imgsrc[e.currentTarget.dataset.index])
    wx.cloud.deleteFile({
      fileList:[this.data.imgsrc[e.currentTarget.dataset.index]],
      success: res=>{
        var newimgsrc=this.data.imgsrc
        newimgsrc.splice(e.currentTarget.dataset.index,1)
        // console.log(newimgsrc)
        this.setData({
          imgsrc:newimgsrc
        })
        // wx.showToast({title: '删除成功',})
      },
      fail: res=>{
        // wx.showToast({title: '删除失败',})
      },
  })
},

  // 发布
  getdetail(e){
    this.setData({
      detail:e.detail.value
    })
  },
  up(e){
    var time = util.formatTime(new Date());
    console.log(time)
    if(!app.globalData.userInfo){
      wx.getUserProfile({
        desc: '请授权登录',
        success:res=>{
          // console.log(res)
          app.globalData.userInfo=res.userInfo
          wx.setStorageSync('user', app.globalData.userInfo)

          if(this.data.detail.length!==0){
            db.collection('view').add({
              data:{
                username:app.globalData.userInfo.nickName,
                userprofile:app.globalData.userInfo.avatarUrl,
                detail:this.data.detail,
                image:this.data.imgsrc,
                time:time,
                review:[]
              }
            }).then(res => {
              wx.showToast({
                title: '发布成功',
              })
              setTimeout(function () {
                wx.switchTab({
                  url: '/pages/shequ/shequ',
                })
              }, 1500)
            })
              .catch(err => {
                console.log(err)
              })
          }
          else{
            wx.showToast({
              title: '请输入内容',
              icon: "none",
            })
          }
        },
        fail:res=>{
            wx.showToast({
              title: '授权失败',
              icon: "none",
            })
        }
      })
    }
    else{
      if(this.data.detail.length!==0){
        db.collection('view').add({
          data:{
            username:app.globalData.userInfo.nickName,
            userprofile:app.globalData.userInfo.avatarUrl,
            detail:this.data.detail,
            image:this.data.imgsrc,
            time:time,
            review:[]
          }
        }).then(res => {
          wx.showToast({
            title: '发布成功',
          })
          setTimeout(function () {
            wx.switchTab({
              url: '/pages/shequ/shequ',
            })
          }, 1500)
        })
          .catch(err => {
            console.log(err)
          })
      }
      else{
        wx.showToast({
          title: '请输入内容',
          icon: "none",
        })
      }
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