// pages/detail/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    activeNames: [],
    array: undefined,
    show: false,
    actions: [
      {
        name: '留言',
      },
    ],
    currentTeacher: ''
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    const roomId = options.key
    wx.setNavigationBarTitle({
      title: roomId  //修改title
    })
    wx.request({
      url: `https://wx.request.huangjinyu.xyz:8100/学院信息查询/办公室查询/${roomId}`, //仅为示例，并非真实的接口地址

      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        const data  = res.data[0]
        if(data.教师信息){
          that.setData({
            array: data.教师信息
          })
        }else {
          that.setData({
            array: []
          })
        }

      }
    })
  }
  ,
  showButton(e){
    const dataset = e.currentTarget.dataset
    this.setData({show: true,currentTeacher: dataset.id})
  },
  onClose() {
    this.setData({ show: false });
  },
  selectRead(e) {
    const name = this.data.currentTeacher
    wx.navigateTo({
      url:`../message/index?name=${name}`
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  }
  ,

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  }
  ,

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  }
  ,

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  }
  ,

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  }
  ,

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
  ,

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
