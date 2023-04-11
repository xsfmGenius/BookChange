// pages/fabu/fabu.js
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgsrc:"",
    bookname:"",
    bookprice:0,
    bookdetail:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(this.data.imgsrc.length)
  },

  // 上传封面
  uploadcover(e){
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      camera: 'back',
      success: res=>{
        // console.log(res)
        var path='secondhand/'+app.globalData.userInfo.nickName+this.data.bookname+'.jpg'
        // console.log(path)
        wx.cloud.uploadFile({
          cloudPath: path,
          filePath: res.tempFiles[0].tempFilePath,
          success: res=>{
            // console.log(res)
            this.setData({
              imgsrc:res.fileID
            })
          }
        })
      }
    })
  },

  // 删除图片
  clearimg(e){
    wx.cloud.deleteFile({
      fileList:[this.data.imgsrc],
      success: res=>{
        // wx.showToast({title: '删除成功',})
        this.setData({
          imgsrc:""
        })
      },
      fail: res=>{
        // wx.showToast({title: '删除失败',})
      },
  })
},

  // 发布图书
  getname(e){
    this.setData({
      bookname:e.detail.value
    })
  },
  getprice(e){
    this.setData({
      bookprice:e.detail.value
    })
  },
  getdetail(e){
    this.setData({
      bookdetail:e.detail.value
    })
  },
  up(e){
    // var detail= this.data.bookdetail.replace(/\r\n/g,'<br/>').replace(/\n/g,'<br/>').replace(/\s/g,' ');
    // console.log(detail)
    // console.log(this.data.bookdetail)
    // console.log(app.globalData.userInfo)
    if(!app.globalData.userInfo){
      wx.getUserProfile({
        desc: '请授权登录',
        success:res=>{
          // console.log(res)
          app.globalData.userInfo=res.userInfo
          wx.setStorageSync('user', app.globalData.userInfo)

          if(this.data.bookname.length!==0&&this.data.bookdetail.length!==0&&this.data.imgsrc.length!==0&&this.data.bookprice>0){
            db.collection('secondhand').add({
              data:{
                bookname:this.data.bookname,
                bookprice:this.data.bookprice,
                bookcover:this.data.imgsrc,
                bookdetail:this.data.bookdetail,
                username:app.globalData.userInfo.nickName,
                userprofile:app.globalData.userInfo.avatarUrl,
              }
            }).then(res => {
              wx.showToast({
                title: '发布成功',
              })
              setTimeout(function () {
                wx.switchTab({
                  url: '/pages/ershou/ershou',
                })
              }, 1500)
            })
              .catch(err => {
                console.log(err)
              })
          }
          else{
            wx.showToast({
              title: '输入有误',
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
      if(this.data.bookname.length!==0&&this.data.bookdetail.length!==0&&this.data.imgsrc.length!==0&&this.data.bookprice>0){
        db.collection('secondhand').add({
          data:{
            bookname:this.data.bookname,
            bookprice:this.data.bookprice,
            bookcover:this.data.imgsrc,
            bookdetail:this.data.bookdetail,
            username:app.globalData.userInfo.nickName,
            userprofile:app.globalData.userInfo.avatarUrl,
          }
        }).then(res => {
          wx.showToast({
            title: '发布成功',
          })
          setTimeout(function () {
            wx.switchTab({
              url: '/pages/ershou/ershou',
            })
          }, 1500)
        })
          .catch(err => {
            console.log(err)
          })
      }
      else{
        // console.log(this.data.bookname.length)
        // console.log(this.data.bookdetail.length)
        // console.log(this.data.imgsrc.length)
        // console.log(this.data.bookprice)
        wx.showToast({
          title: '输入有误',
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