// packageA/pages/message/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sizeObj: {
      maxHeight: 150, minHeight: 100
    },
    teacher: {},
    message:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try{
      const role = wx.getStorageSync('role')
      if(role === 2){
        wx.showModal({
          title: '提示',
          content: '你的角色是老师，暂不需要此功能',
          success (res) {
            if (res.confirm) {
              wx.navigateBack()
            } else if (res.cancel) {
              wx.navigateBack()
            }
          }
        })
      }
    }catch (e) {

    }
    const that = this
    const name = options.name
    wx.request({
      url: `https://wx.request.huangjinyu.xyz:8100/学院信息查询/姓名查询/${name}`, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          teacher: res.data[0],
        })
      }
    })
  },
  onChange(e) {
    this.setData({
      message: e.detail
    })

  },
  submit(){
    try{
      const openid = wx.getStorageSync('openid')
      const name = wx.getStorageSync('name')
      wx.request({
        url: `https://wx.request.huangjinyu.xyz:8100/wx_login/submit_appointment`,
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        method: 'POST',
        data:{
          openid,
          student_name: name,
          appointment:this.data.message,
          teacher_name: this.data.teacher['姓名']
        },
        success(res) {
          wx.reLaunch({
            url:'../index/index'
          })
        }
      })
    }catch (e){}

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
