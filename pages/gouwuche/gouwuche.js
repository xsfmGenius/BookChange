// pages/gouwuche/gouwuche.js
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allprice:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(app.globalData.userInfo)
    db.collection('cart').where({
        username:app.globalData.userInfo.nickName
    }).get()
    .then(res => {
      this.setData({
        categoryBook:res.data
       })
       var all=0;
       var keys = Object.keys(this.data.categoryBook)
       keys.forEach((item)=> {
        //  console.log('ssssssssssssssssssss',item)
        //  console.log("参数名:" + item,"参数值:"+this.data.categoryBook[item])
         all+=this.data.categoryBook[item].num*this.data.categoryBook[item].price
       })
        // console.log("输出",all)
        this.setData({
          allprice:all
        })
        // console.log("输出",this.data.allprice)
      })
      .catch(err => {
        console.log(err)
      })
  },

  // 购物车->界面跳转
  gotoxiangqing(e){
    // console.log(e.currentTarget.dataset.bookname)
    wx.navigateTo({
      url: '/pages/xiangqing/xiangqing?name='+e.currentTarget.dataset.bookname,
    })
},

  // 删除图书
  delete(e){
    // console.log(e)
    var nowprice=this.data.allprice-e.currentTarget.dataset.num*e.currentTarget.dataset.price
    var nowcate= this.data.categoryBook
    nowcate.splice(e.currentTarget.dataset.index,1)
    this.setData({
      categoryBook:nowcate
    })
    // this.data.categoryBook.splice(this.data.allprice-e.currentTarget.dataset.key,1)
    this.setData({
      allprice:nowprice
    })
    db.collection('cart').where({
      username:app.globalData.userInfo.nickName,
      bookname:e.currentTarget.dataset.bookname
    }).remove()
    .then(res => {
    })
    .catch(err => {
      console.log(err)
    })
  },

  // 图书加一
  add(e){
    // console.log(e)
    var nowprice=this.data.allprice+e.currentTarget.dataset.price
    var nowcate= this.data.categoryBook
    nowcate[e.currentTarget.dataset.index].num++
    var newnum=nowcate[e.currentTarget.dataset.index].num
    this.setData({
      categoryBook:nowcate
    })
    // this.data.categoryBook.splice(this.data.allprice-e.currentTarget.dataset.key,1)
    this.setData({
      allprice:nowprice
    })
    db.collection('cart').where({
      username:app.globalData.userInfo.nickName,
      bookname:e.currentTarget.dataset.bookname
    }).update({
      data:{
        num:newnum
      }
    })
    .then(res => {
    })
    .catch(err => {
      console.log(err)
    })
  },

  // 图书减一
  minus(e){
    if(e.currentTarget.dataset.num>1){
      var nowprice=this.data.allprice-e.currentTarget.dataset.price
      var nowcate= this.data.categoryBook
      nowcate[e.currentTarget.dataset.index].num--
      var newnum=nowcate[e.currentTarget.dataset.index].num
      this.setData({
        categoryBook:nowcate
     })
      // this.data.categoryBook.splice(this.data.allprice-e.currentTarget.dataset.key,1)
      this.setData({
        allprice:nowprice
     })
      db.collection('cart').where({
       username:app.globalData.userInfo.nickName,
       bookname:e.currentTarget.dataset.bookname
     }).update({
        data:{
         num:newnum
       }
      })
      .then(res => {
     })
      .catch(err => {
       console.log(err)
      })
     }
    
  },

  // 立即购买
  buy(e){
    console.log(this.data.categoryBook)
    var keys = Object.keys(this.data.categoryBook)
    keys.forEach((item)=> {
      db.collection('purchase').add({
        data:{
          bookname:this.data.categoryBook[item].bookname,
          username:app.globalData.userInfo.nickName,
          bookcover:this.data.categoryBook[item].bookcover,
          num:this.data.categoryBook[item].num,
          price:this.data.categoryBook[item].price
        }
      }).then(res => {
      })
      .catch(err => {
        console.log(err)
      })

      db.collection('cart').where({
        username:app.globalData.userInfo.nickName,
        bookname:e.currentTarget.dataset.bookname
      }).remove()
      .then(res => {
      })
      .catch(err => {
        console.log(err)
      })
    })
    wx.showToast({
      title: '购买成功',
    })
    this.setData({
      categoryBook:[],
      allprice:0,
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