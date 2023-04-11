// pages/shequ/shequ.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  // 发动态
  gotofabu(e){
    wx.navigateTo({
      url: '/pages/shequfabu/shequfabu'
    })
  },

  // 显示图片
  showImg(e) {
    // console.log(e.currentTarget.dataset)
    wx.previewImage({
      urls: this.data.view[e.currentTarget.dataset.index].image,
      current: this.data.view[e.currentTarget.dataset.index].image[e.currentTarget.dataset.key]
    })
  },

  // 发评论
  getreview(e){
    this.setData({
      detail:e.detail.value
    })
  },
  sendreview(e){
    var oldreview=this.data.view[e.currentTarget.dataset.index].review
    // console.log(oldreview)
    var thisreview=app.globalData.userInfo.nickName+'：'+this.data.detail
    // console.log(thisreview)
    oldreview.push(thisreview)
    db.collection('view').where({
      _id:this.data.view[e.currentTarget.dataset.index]._id
    }).update({
      data:{
        review:oldreview
      }
    })
    .then(res => {
      db.collection('view').orderBy('time', 'desc')
      .get()
      .then(res => {
        this.setData({
          view:res.data,
        })
        })
      .catch(err => {
        console.log(err)
      })
      this.setData({
        inputValue:""
      })
    })
    .catch(err => {
      console.log(err)
    })
    // this.data.view[e.currentTarget.dataset.index]
  },

  // 删评论
  deletereview(e){
    // console.log(e.currentTarget.dataset)
    var thisview=this.data.view[e.currentTarget.dataset.index]
    var reviewuser=e.currentTarget.dataset.item.split('：')[0]
    // console.log(reviewuser)
    if(thisview.username==app.globalData.userInfo.nickName||reviewuser==app.globalData.userInfo.nickName){
      wx.showModal({
        title: '',
        content: '是否确认删除',
        success:res=>{
          if (res.confirm) {
            var newreview=thisview.review
            newreview.splice(e.currentTarget.dataset.key,1)
            db.collection('view').where({
              _id:this.data.view[e.currentTarget.dataset.index]._id
            }).update({
              data:{
                review:newreview
              }
            })
            .then(res => {
              db.collection('view').orderBy('time', 'desc')
              .get()
              .then(res => {
                this.setData({
                  view:res.data,
                })
              })
             .catch(err => {
                console.log(err)
              })
            })
           .catch(err => {
            console.log(err)
           })
          }
          else if (res.cancel) {
          }
        }  
       })
      // console.log(thisview.username)
      // console.log(reviewuser)
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
    db.collection('view').orderBy('time', 'desc')
    .get()
    .then(res => {
      this.setData({
        view:res.data,
       })
      //  console.log("输出",this.data.view)
      })
      .catch(err => {
        console.log(err)
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