// pages/jingxuan/jingxuan.js
const app = getApp()
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    menuCategories: [
      { category_name: '教材', category_type: 1 },
      { category_name: '教辅', category_type: 2 },
      { category_name: '课外读物', category_type: 3 },
      { category_name: '专业书籍', category_type: 4 },
    ],
    menuSelect:app.globalData.menuSelect
  },

  // 选择分类
  choosecategory(e){
    // console.log(e.currentTarget.dataset.cat)
    app.globalData.menuSelect=e.currentTarget.dataset.cat
    this.setData({
      menuSelect:e.currentTarget.dataset.cat
    })
    const db = wx.cloud.database()
    db.collection('book').where({
      category:this.data.menuSelect
    }).get()
    .then(res => {
      this.setData({
        categoryBook:res.data
       })
        // console.log("输出",res.data)
      })
      .catch(err => {
        console.log(err)
      })
  },

  // 搜索
  getname(e){
    this.setData({
      userinput:e.detail.value
    })
  },
  searchbook(e){
    // console.log(this.data.userinput)
    wx.navigateTo({
      url: '/pages/sousuo/sousuo?name='+this.data.userinput+"&oldbook=",
    })
  },

  // 精选图书->界面跳转
  gotoxiangqing(e){
      // console.log(e.currentTarget.dataset.bookname)
      wx.navigateTo({
        url: '/pages/xiangqing/xiangqing?name='+e.currentTarget.dataset.bookname,
      })
  },

  // 加入购物车
  goshop(e){
    // console.log(app.globalData.userInfo)
    this.setData({
      bookname:e.currentTarget.dataset.bookname,
      bookcover:e.currentTarget.dataset.bookcover,
      bookprice:e.currentTarget.dataset.bookprice,
    })
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

  // 购物车->页面跳转
  gotogouwuche(e){
    wx.navigateTo({
      url: '/pages/gouwuche/gouwuche'
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
    // this.data.menuSelect=app.globalData.menuSelect
    this.setData({
      menuSelect:app.globalData.menuSelect
    })
    // console.log("onload",app.globalData.menuSelect,this.data.menuSelect)
    db.collection('book').where({
      category:this.data.menuSelect
    }).get()
    .then(res => {
      this.setData({
        categoryBook:res.data
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
    // app.globalData.menuSelect=1
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