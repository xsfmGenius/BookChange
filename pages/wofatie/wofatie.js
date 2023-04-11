// pages/wofatie/wofatie.js
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
  onLoad(options) {
    db.collection('view').where({
      username:app.globalData.userInfo.nickName,
    }).orderBy('time', 'desc')
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

  showImg(e) {
    // console.log(e.currentTarget.dataset)
    wx.previewImage({
      urls: this.data.view[e.currentTarget.dataset.index].image,
      current: this.data.view[e.currentTarget.dataset.index].image[e.currentTarget.dataset.key]
    })
  },

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
              db.collection('view').where({
                _id:e.currentTarget.dataset.id
              }).orderBy('time', 'desc')
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

  delete(e){
    db.collection('view').where({
      _id:e.currentTarget.dataset.id
    }).remove()
    .then(res => {
      var newview= this.data.view
      newview.splice(e.currentTarget.dataset.index,1)
      this.setData({
        view:newview
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