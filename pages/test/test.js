// pages/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: "邵励治喜欢陈邱爽",
    fuck_array: [{
      name: "邵励治"
    }, {
      name: "陈邱爽"
    }]
  },
  like: function() {
    this.setData({
      text: "Yeah!!!"
    })
    console.log("yeah!!!")
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
    return {
      title: "我爱你，亲爱的大邱",
      path: "/pages/test/test"
    }
  }
})