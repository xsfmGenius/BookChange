// app.js
App({
  onLaunch() {
    //初始化云开发环境
    wx.cloud.init({
      env:'book-9gq0qui6c5a2dd46'
    })
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    menuSelect:1
  }
})
