// pages/shouye/shouye.js
const app = getApp()
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 主题栏
    themes: [
      { themePic: '../../image/jiaocai.png', themeName: '教材', theme_type: 1 },
      { themePic: '../../image/jiaofu.png', themeName: '教辅', theme_type: 2 },
      { themePic: '../../image/kewai.png', themeName: '课外读物', theme_type: 3 },
      { themePic: '../../image/zhuanye.png', themeName: '专业书籍', theme_type: 4 },
    ],
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取用户缓存
    app.globalData.userInfo=wx.getStorageSync('user')
    // console.log("打印用户缓存",app.globalData.userInfo)
    // 轮播图
    db.collection('banner') .get()
    .then(res => {
         this.setData({
          bannerPic:res.data
         })
        //  console.log(res)
      })
      .catch(err => {
        console.log(err)
     }),

    //  公告栏
    db.collection('notice').get()
    .then(res => {
         this.setData({
          noticeList:res.data
         })
        // console.log("输出",res)
      })
      .catch(err => {
        console.log(err)
      })

      //  今日推荐
    db.collection('book').where({
      today:true
    }).get()
    .then(res => {
      this.setData({
        commendCover:res.data[0].cover,
        commendName:res.data[0].name,
        commendPrice:res.data[0].price
       })
        // console.log("输出",res.data)
      })
      .catch(err => {
        console.log(err)
      })

      // 新书上架
      db.collection('book').where({
        newbook:true
      }).get()
      .then(res => {
        this.setData({
          newBook:res.data
         })
          // console.log("输出",res.data)
        })
        .catch(err => {
          console.log(err)
        })

        // 团购优惠
        db.collection('book').where({
          group:true
        }).get()
        .then(res => {
          this.setData({
            togetherBook:res.data
           })
            // console.log("输出",res.data)
          })
          .catch(err => {
            console.log(err)
          })
  },

  // 主题栏->界面跳转
  gotojingxuan(e){
    // console.log(e)
    app.globalData.menuSelect=e.currentTarget.dataset.themetype
    wx.switchTab({
      url: '/pages/jingxuan/jingxuan',
    })
  },

  // 今日推荐->界面跳转
  gotoxiangqing(e){
    // console.log(e)
    // console.log(this.data.commendName)
    wx.navigateTo({
      url: '/pages/xiangqing/xiangqing?name='+this.data.commendName,
    })
  },

  // 新书上架->界面跳转
  newbookgotoxiangqing(e){
    // console.log(e.currentTarget.dataset.bookname)
    wx.navigateTo({
      url: '/pages/xiangqing/xiangqing?name='+e.currentTarget.dataset.bookname,
    })
  },

  // 团购立即购买
  togetherbuy(e){
    // console.log(e.currentTarget.dataset)
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
          // console.log(e.currentTarget.dataset)
          db.collection('purchase').add({
            data:{
              bookname:this.data.bookname,
              username:app.globalData.userInfo.nickName,
              cover:this.data.bookcover,
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
      db.collection('purchase').where({
        username:app.globalData.userInfo.nickName,
        bookname:this.data.bookname,
        price:this.data.bookprice
      }).get()
      .then(res => {
        if(res.data.length==0){
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
         else{
          wx.showToast({
            title: '只可购买一次',
            icon: "none",
          })
         }
        })
        .catch(err => {
          console.log(err)
       })

       





      
    }
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