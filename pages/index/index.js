// pages/pre-publish/pre-publish.js
Page({
  data: {
    currentTab: "photographer",
    startX: 0,
    startY: 0,
    slipDirection: "",
    photographerCreationList: [],
    modelCreationList: []
  },
  // 点击事件：TAB - 摄影师
  clickTabPhotographer(event) {
    this.setData({
      currentTab: "photographer"
    })
  },
  // 点击事件：TAB - 模特
  clickTabModel(event) {
    this.setData({
      currentTab: "model"
    })
  },
  // 滑动事件：起始
  touchStartEvent(event) {
    this.setData({
      startX: event.changedTouches[0].clientX,
      startY: event.changedTouches[0].clientY
    })
  },
  // 滑动事件：结束
  touchEndEvent(event) {
    let endX = event.changedTouches[0].clientX;
    let endY = event.changedTouches[0].clientY;
    const getSlipDirection = (endX, endY, startX, startY) => {
      let slipDirection = "";
      if (endX - startX > 50 && Math.abs(endY - startY) < 50) {
        // 右滑
        slipDirection = "right";
      } else if (endX - startX < -50 && Math.abs(endY - startY) < 50) {
        // 左滑
        slipDirection = "left";
      }
      return slipDirection;
    }
    this.setData({
      slipDirection: getSlipDirection(endX, endY, this.data.startX, this.data.startY)
    })
    if (this.data.slipDirection === "right") {
      this.setData({
        currentTab: "photographer"
      })
    } else if (this.data.slipDirection === "left") {
      this.setData({
        currentTab: "model"
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    wx.request({
      url: 'https://yuepai.leanapp.cn/graphql',
      data: "{ Creation(containedIn: {publisherRole: [\"photographer\"]}) {objectId likedNumber createdAt creationOfPhoto(limit: 1) { objectId file { objectId url } } user { objectId nickName avatarUrl schoolName } } }",
      header: {
        'Content-Type': 'application/graphql'
      },
      method: "POST",
      success: response => {
        console.log(response.data)
        let list = response.data.data.Creation
        list.forEach((item) => {
          item.createdAt = item.createdAt.substring(0, 10)
        })
        this.setData({
          photographerCreationList: list
        })
      }
    })


    wx.request({
      url: 'https://yuepai.leanapp.cn/graphql',
      data: "{ Creation(containedIn: {publisherRole: [\"model\"]}) {objectId likedNumber createdAt creationOfPhoto(limit: 1) { objectId file { objectId url } } user { objectId nickName avatarUrl schoolName } } }",
      header: {
        'Content-Type': 'application/graphql'
      },
      method: "POST",
      success: response => {
        console.log(response.data)
        let list = response.data.data.Creation
        list.forEach((item) => {
          item.createdAt = item.createdAt.substring(0, 10)
        })
        this.setData({
          modelCreationList: list
        })
      }
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