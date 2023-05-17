// pages/help/help.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeName: '1',
    array:[],
    currentPage: 1
  },
  onChange(event) {
    this.setData({
      activeName: event.detail,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const that = this
    wx.request({url: `https://wx.request.huangjinyu.xyz:8100/学院信息查询/问题查询?page=${that.data.currentPage}` ,   header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        const data  = res.data.data
        that.setData({
          array: [...that.data.array, ...data.question_list],
          currentPage: that.data.currentPage + 1
        })
      }})
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  loadMore:function (){
    const that = this
    wx.request({url: `https://wx.request.huangjinyu.xyz:8100/学院信息查询/问题查询?page=${that.data.currentPage}&limit=10` ,   header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        const data  = res.data.data
        that.setData({
          array: [...that.data.array, ...data.question_list],
          currentPage: that.data.currentPage + 1
        })
      }})
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  linkToComplaint(){
    wx.navigateTo({
      url: '../complaint/complaint'
    })
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
