// pages/pre-publish/pre-publish.js
Page({
  data: {
    currentTab: "photographer",
    startX: 0,
    startY: 0,
    slipDirection: ""
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
        currentTab:"model"
      })
   }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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