Component({
  lifetimes: {
    attached() {
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
            creationList: list
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