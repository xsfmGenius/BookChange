// pages/xiangqing/xiangqing.js
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 首页->页面跳转
  gotoshouye(e){
    wx.switchTab({
      url: '/pages/shouye/shouye'
    })
  },

  // 购物车->页面跳转
  gotogouwuche(e){
    wx.navigateTo({
      url: '/pages/gouwuche/gouwuche',
    })
  },

  // 加入购物车
  addbook(e){
    // console.log(app.globalData.userInfo)
    if(!app.globalData.userInfo){
      wx.getUserProfile({
        desc: '请授权登录',
        success:res=>{
          // console.log(res)
          app.globalData.userInfo=res.userInfo
          wx.setStorageSync('user', app.globalData.userInfo)

          db.collection('cart').where({
            username:app.globalData.userInfo.nickName,
            bookname:this.data.bookname,
          }).get()
          .then(res => {
            // console.log(res)
            if(res.data.length!=0){
              this.setData({
                cartbooknum:res.data[0].num
              })
              db.collection('cart').where({
                username:app.globalData.userInfo.nickName,
                bookname:this.data.bookname,
              }).update({
                data:{
                  // bookname:this.data.bookname,
                  // username:app.globalData.userInfo.nickName,
                  num:this.data.cartbooknum+parseInt(1)
                }
              }).then(res => {
                wx.showToast({
                  title: '已加入购物车',
                })
              })
                .catch(err => {
                  console.log(err)
                })
            }
            else{
              db.collection('cart').add({
                data:{
                  bookname:this.data.bookname,
                  username:app.globalData.userInfo.nickName,
                  bookcover:this.data.bookcover,
                  num:parseInt(1),
                  price:this.data.bookprice
                }
              }).then(res => {
                wx.showToast({
                  title: '已加入购物车',
                })
              })
                .catch(err => {
                  console.log(err)
                })

            }
              // console.log("输出",res)
            })
            .catch(err => {
              console.log(err)
            })

          
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
      db.collection('cart').where({
        username:app.globalData.userInfo.nickName,
        bookname:this.data.bookname,
      }).get()
      .then(res => {
        // console.log(res)
        if(res.data.length!=0){
          this.setData({
            cartbooknum:res.data[0].num
          })
          db.collection('cart').where({
            username:app.globalData.userInfo.nickName,
            bookname:this.data.bookname,
          }).update({
            data:{
              // bookname:this.data.bookname,
              // username:app.globalData.userInfo.nickName,
              num:this.data.cartbooknum+parseInt(1)
            }
          }).then(res => {
            wx.showToast({
              title: '已加入购物车',
            })
          })
            .catch(err => {
              console.log(err)
            })
        }
        else{
          db.collection('cart').add({
            data:{
              bookname:this.data.bookname,
              username:app.globalData.userInfo.nickName,
              bookcover:this.data.bookcover,
              num:parseInt(1),
              price:this.data.bookprice
            }
          }).then(res => {
            wx.showToast({
              title: '已加入购物车',
            })
          })
            .catch(err => {
              console.log(err)
            })
      }
      })
    }
  },
  // 立即购买
  buybook(e){
    // console.log(app.globalData.userInfo)
    if(!app.globalData.userInfo){
      wx.getUserProfile({
        desc: '请授权登录',
        success:res=>{
          // console.log(res)
          app.globalData.userInfo=res.userInfo
          wx.setStorageSync('user', app.globalData.userInfo)

          db.collection('purchase').add({
            data:{
              bookname:this.data.bookname,
              username:app.globalData.userInfo.nickName,
              bookcover:this.data.bookcover,
              num:parseInt(1),
              price:this.data.bookprice
            }
          }).then(res => {
            wx.showToast({
              title: '购买成功',
            })
          })
            .catch(err => {
              console.log(err)
            })
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
      db.collection('purchase').add({
        data:{
          bookname:this.data.bookname,
          username:app.globalData.userInfo.nickName,
          bookcover:this.data.bookcover,
          num:parseInt(1),
          price:this.data.bookprice
        }
      }).then(res => {
        wx.showToast({
          title: '购买成功',
        })
      })
        .catch(err => {
          console.log(err)
        })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(options)
    this.setData({
      bookname:options.name
    })
    db.collection('book').where({
      name:options.name
    }).get()
    .then(res => {
      this.setData({
        bookname:res.data[0].name,
        bookcover:res.data[0].cover,
        bookprice:res.data[0].price
       })
        // console.log("输出",res)
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