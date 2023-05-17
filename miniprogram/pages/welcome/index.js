// pages/welcome/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    steps: [
      {
        text: '选择身份',
      },
      {
        text: '输入信息',
      },
      {
        text: '选择主题',
      }

    ],
    active: 0,
    radio: '1',
    chooseStatue: false,
    name: '',
    userInfo: null,
    theme: 0,
  },


  onChange(event) {
    this.setData({
      radio: event.detail,
    })
  },

  onClick(event) {
    const { name } = event.currentTarget.dataset
    this.setData({
      radio: name,
    })
  },
  nextStep() {
    const reg = /^[\u4e00-\u9fa5]{2,4}$/
    if (this.data.active === 1) {
      if (!reg.test(this.data.name)) {
        wx.showToast({
          title: '请输入2-5位中文真实姓名',
          icon: 'none',
          duration: 1000
        })
        return
      }
      if (this.data.userInfo === null) {
        wx.showToast({
          title: '请输入获取头像和昵称',
          icon: 'none',
          duration: 1000
        })
        return
      }
    }
    if (this.data.active === 2) {
      try {
        wx.setStorageSync('role', this.data.radio)
        wx.setStorageSync('userInfo', this.data.userInfo)
        wx.setStorageSync('name', this.data.name)
        wx.setStorageSync('themeIndex', this.data.theme)
        wx.setStorageSync('themeArray', [
            {
              colors: ['#F6F5CD80', '#FFD5C080', '#EE9BA680', '#6555A080', '#554D4B80', '#8F9E6680'],
              bg: 'http://www.huangjinyu.xyz/imgTemp/1_r.png'
            },
            {
              colors: ['#EEF3F980', '#DFEAF580', '#C5D9EF80', '#A69B9580', '#CD73B080', '#F6D3E980'],
              bg: 'http://www.huangjinyu.xyz/imgTemp/2_r.png'
            },
            {
              colors: ['#EDECEE80', '#F1DCE480', '#EECCD380', '#836D6E80', '#5972A480', '#C4D6D280'],
              bg: 'http://www.huangjinyu.xyz/imgTemp/3_r.png'
            },
            {
              colors: ['#C9D7B980', '#84759480', '#8192B180', '#A0B6CF80', '#B7CAD980', '#D7DCE180'],
              bg: 'http://www.huangjinyu.xyz/imgTemp/4_r.png'
            },
            {
              colors: ['#E5E4DD80', '#CDD8D280', '#A7B18D80', '#79575980', '#F2949C80', '#F8E2DC80'],
              bg: 'http://www.huangjinyu.xyz/imgTemp/5_r.png'
            },
            {
              colors: ['#F8F8E680', '#E0DAF080', '#C4BFE380', '#9985B280', '#6D5B7480', '#97709580'],
              bg: 'http://www.huangjinyu.xyz/imgTemp/6_r.png'
            },
            {
              colors: ['#D6B3A680', '#735E5380', '#554D4B80', '#718F8E80', '#9CB8BC80', '#DCE9EA80'],
              bg: 'http://www.huangjinyu.xyz/imgTemp/7_r.png'
            },
            {
              colors: ['#E8EDEC80', '#D7D4F480', '#C5B5E480', '#8E6CA880', '#758C7180', '#F2D5A480'],
              bg: 'http://www.huangjinyu.xyz/imgTemp/8_r.png'
            },
            {
              colors: ['#C9D19E80', '#8A7B8680', '#AFB3B980', '#CDE0DF80', '#DAE9E780', '#ECEBE780'],
              bg: 'http://www.huangjinyu.xyz/imgTemp/9_r.png'
            },
            {
              colors: ['#FBEBEA80', '#FAE4D980', '#FBD7AC80', '#F1AF7980', '#48565080', '#ADBF7380'],
              bg: 'http://www.huangjinyu.xyz/imgTemp/10_r.png'
            },

          ]
        )
        const that = this
        wx.login({
          success(res) {
            wx.showLoading({
              title: '加载中',
            })
            if (res.code) {
              wx.request({
                url: `https://wx.request.huangjinyu.xyz:8100/wx_login/login`,
                data: {
                  role: that.data.radio,
                  name: that.data.name,
                  themeIndex: that.data.theme,
                  code: res.code,
                  avatarUrl: that.data.userInfo.avatarUrl
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                },
                method: 'POST',
                success(res) {
                  try {
                    wx.setStorageSync('openid', res.data.openid)
                  } catch (err) {
                  }
                }
              })
              wx.reLaunch({
                url: '../front-page/front-page'
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })


      } catch (e) {
      }
    }
    this.setData({
      active: this.data.active + 1
    })

  },

  getUserIcon(e) {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        this.setData({
          userInfo: {
            avatarUrl: res.userInfo.avatarUrl,
            nickName: res.userInfo.nickName
          },
        })
      }
    })
  },

  chooseTheme(e) {
    const dataset = e.currentTarget.dataset
    const id = dataset.id
    this.setData({
      theme: id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
