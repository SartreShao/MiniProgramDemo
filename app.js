App({
  onLaunch: function() {
    console.log("App onLaunch")
    //引入 LeanCloud SDK
    const AV = require('/libs/av-weapp-min.js');
    //设置LeanCloud 的 APP_ID 与 APP_KEY
    const APP_ID = 'Cl6VHv0UNhQORin9N54p0bzn-gzGzoHsz';
    const APP_KEY = 'e7XSPD0xM9BrE0Q5hngytKJg';
    //初始化 LeanCloud
    AV.init({
      appId: APP_ID,
      appKey: APP_KEY
    });
    //登录 LeanCloud
    AV.User.loginWithWeapp().then(user => {
      this.globalData.leanCloudUser = user.toJSON();
      console.log("leanCloudUser:")
      console.log(this.globalData.leanCloudUser)
    }).catch(console.error)
    //获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          //已授权
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
              console.log("userInfo:")
              console.log(this.globalData.userInfo)
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShow: function() {
    console.log("App onShow")
  },
  onHide: function() {
    console.log("App onHide")
  },
  onError: function() {
    console.log("App onError")
  },
  globalData: {
    userInfo: null,
    leanCloudUser: null
  }
})