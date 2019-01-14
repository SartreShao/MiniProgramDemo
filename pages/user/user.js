// pages/user/user.js
// Get App's Instance
const app = getApp();
const AV = require('../../libs/av-weapp-min.js');

function getUserInfo() {
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
        app.globalData.userInfo = res.userInfo;
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  }
}

function saveUserInfoToLeanCloud() {
  console.log(AV.User.current().toJSON().nickName);
  if (app.globalData.userInfo) {
    //LeanCloud 中用户名为空？
    if (AV.User.current().toJSON().nickName === "" || AV.User.current().toJSON().nickName == null) {
      console.log("LeanCloud's nickName is null, put wechat's nickName in it");
      const currentUser = AV.User.current();
      currentUser.set("nickName", app.globalData.userInfo.nickName);
      currentUser.save();
      app.globalData.leanCloudUser = currentUser.toJSON()
    }
    //LeanCloud 中头像为空？
    if (AV.User.current().toJSON().avatarUrl === "" || AV.User.current().toJSON().avatarUrl == null) {
      console.log("LeanCloud's avatar is null, put wechat's avatar in it");
      const currentUser = AV.User.current();
      currentUser.set("avatarUrl", app.globalData.userInfo.avatarUrl);
      currentUser.save();
      app.globalData.leanCloudUser = currentUser.toJSON()
    }
    if (AV.User.current().toJSON().sex === "" || AV.User.current().toJSON().sex == null) {
      console.log("LeanCloud's sex is null, put wechat's avatar in it");
      const currentUser = AV.User.current();
      if (app.globalData.userInfo.gender === 1) {
        currentUser.set("sex", "男");
        currentUser.save()
      } else {
        currentUser.set("sex", "女");
        currentUser.save()
      }
    }
  }
}

function getHasRoleAndSchool() {
  wx.request({
    url: 'https://yuepai.leanapp.cn/graphql',
    data: "{\n" +
      "  _User(objectId:\"" + AV.User.current().toJSON().objectId + "\") {\n" +
      "    objectId\n" +
      "    likedNumber\n" +
      "    nickName\n" +
      "    schoolName\n" +
      "    usersOf_Role {\n" +
      "      objectId\n" +
      "      name\n" +
      "    }\n" +
      "  }\n" +
      "}\n",
    header: {
      'Content-Type': 'application/graphql'
    },
    method: "POST",
    success: response => {
      console.log("fuck");
      console.log(response.data);
      if (response.data.data._User[0].schoolName == null || response.data.data._User[0].schoolName === "") {
        //学校为空
        this.setData({
          hasRoleAndSchool: false
        })
      } else if (response.data.data._User[0].usersOf_Role.length === 0) {
        //角色为空
        this.setData({
          hasRoleAndSchool: false
        })
      } else {
        //二者皆不为空
        const role = [];
        response.data.data._User[0].usersOf_Role.forEach(function(element, index, array) {
          if (element.name === "photographer") {
            role.push("摄影师")
          }
          if (element.name === "model") {
            role.push("模特")
          }
        });
        this.setData({
          roleList: role
        });
        this.setData({
          hasRoleAndSchool: true,
          schoolName: response.data.data._User[0].schoolName
        })
      }
      this.setData({
        likedNumber: response.data.data._User[0].likedNumber
      });
      console.log("hasRoleAndSchool: " + this.data.hasRoleAndSchool)
    }
  });
}

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    hasRoleAndSchool: true,
    schoolName: "",
    roleList: [],
    likedNumber: 0,
    userCreationList: [],
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  // 点击「设置」按钮
  clickSettingIcon: function(event) {
    wx.navigateTo({
      url:"../setting/setting"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    /*
     一：判断用户是否登录。
        登录-> userInfo!=null；
        未登录-> userInfo==null；
        视图根据 userInfo 渲染不同的界面：
        （1）登录->用户信息界面
        （2）未登录->登录界面
    */

    // 获取全局变量中是否有 UserInfo，如果有意味着其已登录
    getUserInfo.call(this);

    /*
      二：判断 LeanCloud 中是否有「用户身份」与「学校」
        如果有的话，hasRoleAndSchool=true;
        如果没有的话，hasRoleAndSchool=false;
        根据 hasRoleAndSchool 的值，进行条件渲染：
        true-> 显示学校与用户角色
        false-> 显示“这里什么都没有”与“请完善个人信息”
    */
    getHasRoleAndSchool.call(this);

    /*
      三：向 LeanCloud 存用户头像、昵称、性别
    */

    //获取 LeanCloud 中的数据
    saveUserInfoToLeanCloud();

    /*
        四：获取 该用户的 CreationList
     */
    wx.request({
      url: 'https://yuepai.leanapp.cn/graphql',
      data: "{\n" +
        "  _User(objectId:\"" + AV.User.current().toJSON().objectId + "\") {\n" +
        "    objectId\n" +
        "    userOfCreation {\n" +
        "      objectId\n" +
        "      likedNumber\n" +
        "      createdAt\n" +
        "      creationOfPhoto(limit: 2) {\n" +
        "        objectId\n" +
        "        file {\n" +
        "          objectId\n" +
        "          url\n" +
        "        }\n" +
        "      }\n" +
        "    }\n" +
        "  }\n" +
        "}\n",
      header: {
        'Content-Type': 'application/graphql'
      },
      method: "POST",
      success: response => {
        let list = response.data.data._User[0].userOfCreation
        list.forEach((item) => {
          item.createdAt = item.createdAt.substring(0, 10)
        })
        this.setData({
          userCreationList: list
        })
        console.log(this.data.userCreationList)
      }
    });
  },

  // 获取微信用户信息成功回调
  getUserInfoSuccessCallback: function(e) {
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo;
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
});