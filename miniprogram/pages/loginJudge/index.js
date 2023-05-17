// pages/loginJudge/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      wx.showLoading({
        title: '加载中',
      })
      wx.login({
        success(res) {
          if (res.code) {
            //发起网络请求
            wx.request({
              url: 'https://wx.request.huangjinyu.xyz:8100/wx_login/judge_login',
              data: {
                code: res.code
              },

              success(res) {
                if (res.data.code === 200) {
                  const {avatarUrl, colors_list, img, openid, theme, 姓名, 类别} = res.data.data[0]
                  try {
                    const role = 类别 === '教师' ? 2 : 1
                    const userInfo = {
                      avatarUrl,
                      nickName: 姓名
                    }
                    wx.setStorageSync('role', role)
                    wx.setStorageSync('userInfo', userInfo)
                    wx.setStorageSync('openid', openid)
                    wx.setStorageSync('name', 姓名)
                    wx.setStorageSync('themeIndex', +theme)
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
                      {
                        colors: colors_list,
                        bg: img
                      }
                    ])
                  } catch (e) {

                  }
                  wx.reLaunch({
                    url: '../front-page/front-page'
                  })
                } else {
                  wx.redirectTo({
                    url: '../welcome/index'
                  })
                }
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
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
