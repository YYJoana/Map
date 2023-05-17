// pages/myMessage/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    actions: [
      {
        name: '已读',
      }
    ],
    messageArr: [],
    isReadMessageArr: [],
    currentMessageId: 0,
    role: 0
  },
  init(){
    try {
      const that = this
      const openid = wx.getStorageSync('openid')
      const role = wx.getStorageSync('role')
      this.setData({
        role
      })
      wx.request({
        url: 'https://wx.request.huangjinyu.xyz:8100/wx_login/get_appointment',
        data: {
          openid
        },
        success(res) {
          let info = res.data
          let messageArr = res.data.data
          if (messageArr.length > 0) {
            messageArr.forEach(it => {
              it['预约时间'] = it['预约时间'].substring(0, 10)
            })
            that.setData({
              messageArr: messageArr.filter(it => it['预约状态'] === '未读'),
              isReadMessageArr: messageArr.filter(it => it['预约状态'] === '已读')
            })
          }
        }
      })
    } catch (e) {
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init()
  },

  onClose() {
    this.setData({show: false})
  },

  onSelect(e) {
    const dataset = e.currentTarget.dataset
    this.setData({show: true,currentMessageId: dataset.id})

  },
  selectRead(e) {
    const id = this.data.currentMessageId
    try {
      const that = this
      const openid = wx.getStorageSync('openid')
      wx.request({
        url: 'https://wx.request.huangjinyu.xyz:8100/wx_login/change_status',
        data: {
          openid,
          id
        },
        success(res) {
          if(res.data.code === 200){
            that.init()
          }
        }
      })
    } catch (e) {
    }
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
