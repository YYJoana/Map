// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canToDeng: false,
    DengLu: false,
    userInfo: {},
    messageArrLen: 0,
    role: 0
  },
  ToDdeng: function () {
    try{
      const userInfo= wx.getStorageSync('userInfo')
      this.setData({
        userInfo
      })
    }catch (err){}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: false
      })
    }
  },
  handleContact(e) {
    console.log(e.detail.path)
    console.log(e.detail.query)
  },
  linkToMyMessage(){
    wx.navigateTo({
      url: '../myMessage/index'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {


    },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    try{
      const userInfo= wx.getStorageSync('userInfo')
      const role= wx.getStorageSync('role')
      const that = this
      const openid = wx.getStorageSync('openid')
      this.setData({
        userInfo,role
      })
      wx.request({
        url: 'https://wx.request.huangjinyu.xyz:8100/wx_login/get_appointment',
        data: {
          openid
        },
        success(res) {
          let messageArr = res.data.data
          if (messageArr.length > 0) {
            that.setData({
              messageArrLen: messageArr.filter(it => it['预约状态'] === '未读').length,
            })
          }
        }
      })
    }catch (err){}
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
