// pages/index/photographer/photographer.js
Component({
  lifetimes: {
    attached() {
      wx.request({
        url: 'https://yuepai.leanapp.cn/graphql',
        data: "{ Creation(containedIn: {publisherRole: [\"photographer\"]}) {objectId likedNumber createdAt creationOfPhoto(limit: 1) { objectId file { objectId url } } user { objectId nickName avatarUrl schoolName } } }",
        header: {
          'Content-Type': 'application/graphql'
        },
        method: "POST",
        success: response => {
          console.log(response.data)
          this.setData({
            creationList: JSON.stringify(response.data.data.Creation)
          })
        }
      })
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    creationList: []
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})