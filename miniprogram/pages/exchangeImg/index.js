// pages/exchangeImg/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    theme: 0,
    fileList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  nextStep() {
    try {
      wx.setStorageSync('themeIndex', this.data.theme)
      const openid = wx.getStorageSync('openid')
      wx.request({
        url:'https://wx.request.huangjinyu.xyz:8100/wx_login/change_theme',
        data:{
          openid,
          theme: this.data.theme
        },
        success(res) {
          if(res.data.code === 200){
            wx.reLaunch({
              url: '../my/my'
            })
          }

        }
      })

    } catch (err) {
    }
  },
  chooseTheme(e) {
    const dataset = e.currentTarget.dataset
    const id = dataset.id
    this.setData({
      theme: id
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    try {
      const that = this
      const active = wx.getStorageSync('themeIndex')
      const openid = wx.getStorageSync('openid')
      this.setData({
        theme: active
      })
      wx.request({
        url: `https://wx.request.huangjinyu.xyz:8100/wx_login/get_img?openid=${openid}`,
        success(res) {
          if(res.data.code === 100){
            return
          }else {
            that.setData({
              fileList: [{
                url:res.data[0].img
              }]
            })
          }

        }
      })
    } catch (e) {
    }
  },
  afterRead(event) {
    try {
      const openid = wx.getStorageSync('openid')
      const {file} = event.detail
      const that = this
      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
      wx.uploadFile({
        url: 'https://wx.request.huangjinyu.xyz:8100/wx_login/upload_img', // 仅为示例，非真实的接口地址
        filePath: file.url,
        name: 'img',
        formData: {openid},
        success(res) {
          const url = JSON.parse(res.data).img_url
          const colors = JSON.parse(res.data).colors_list
          const obj = {
            colors,
            bg: url
          }
          const themeArray = wx.getStorageSync('themeArray')
          themeArray[10] = obj
          wx.setStorageSync('themeArray', themeArray)
          // 上传完成需要更新 fileList
          const {fileList = []} = that.data
          fileList.push({...file, url})
          that.setData({fileList,theme:10})
        },
      })
    } catch (e) {}

  },
  deleteImg(e){
    const fileList = this.data.fileList.filter((it,index)=>index!==e.detail.index)
    this.setData({
      fileList
    })
  },
  preview(e){
    this.setData({theme:10})
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
