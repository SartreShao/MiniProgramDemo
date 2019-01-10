// pages/user/user.js
// Get App's Instance
const app = getApp()

Page({
  data: {
    // 微信用户信息：微信名、性别、头像
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取全局变量中是否有 UserInfo，如果有意味着其已登录
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page。onLoad 之后才返回
      // 所以在此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      // 直接弹窗要求授权
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    const AV = require('../../libs/av-weapp-min.js');

    //获取 LeanCloud 中的数据
    //LeanCloud 中用户名为空？
    if (AV.User.current().toJSON().nickName == "") {
      console.log("LeanCloud's nickName is null, put wechat's nickName in it")
      const currentUser = AV.User.current()
      currentUser.set("nickName", app.globalData.userInfo.nickName)
      currentUser.save()
      app.globalData.leanCloudUser = currentUser.toJSON()
    }
    //LeanCloud 中头像为空？
    if (AV.User.current().toJSON().avatarUrl == "") {
      console.log("LeanCloud's avatar is null, put wechat's avatar in it")
      const currentUser = AV.User.current()
      currentUser.set("avatarUrl", app.globalData.userInfo.avatarUrl)
      currentUser.save()
      app.globalData.leanCloudUser = currentUser.toJSON()
    }
    if (AV.User.current().toJSON().sex == "") {
      console.log("LeanCloud's sex is null, put wechat's avatar in it")
      const currentUser = AV.User.current()
      if (app.globalData.userInfo.gender == 1) {
        currentUser.set("sex", "男")
        currentUser.save()
      } else {
        currentUser.set("sex", "女")
        currentUser.save()
      }
    }
  },

  // 获取微信用户信息成功回调
  getUserInfoSuccessCallback: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})