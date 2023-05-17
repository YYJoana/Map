// pages/front-page/front-page.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        message1:true,
        message2:false,
        timer: '',
        timerMessage: '',
        array:[],
        currentPage: 1,
        dataSum: 0,
        limit: 10,
        showEmpty: true,
      scrollTop: 0,
      offsetTop: 0,
      searchResArr: []

    },
    Liu1:function(){
        this.setData({
            message1:true,
            message2:false
        })

    },
    Read:function(){
        this.setData({
            message1:false,
            message2:true
        })

    },
  onLinkIndex:function (){
    wx.navigateTo({
      url: "../../packageA/pages/index/index"
    })
  },
  onLinkVr:function (){
    wx.navigateTo({
      url: "/pages/vrPage/index"
    })
  },
  onLinkThreeD:function (){
    wx.navigateTo({
      url: "/pages/threeMap/index"
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
      this.setData({
        container: () => wx.createSelectorQuery().select('#container'),
      })
      const now = Date.now()
      const Hours = new Date().getHours(now)
      if( Hours >=18){
        this.setData({
          timer: '晚上好',
          timerMessage: '今天学习任务完成的怎么样了？'
        })
      }else if(4 > Hours && Hours>=0){
        this.setData({
          timer: '夜深了',
          timerMessage: '早点休息'
        })
      }else if(11>Hours && Hours>=4){
        this.setData({
          timer: '早上好',
          timerMessage: '一日之计在于晨，让我们一起学习吧。'
        })
      }else if(14>Hours && Hours>=11){
        this.setData({
          timer: '中午好',
          timerMessage: '午后时光，需要脑休，洗洗眼睛，来点放松。'
        })
      }else {
        this.setData({
          timer: '下午好',
          timerMessage: '下午了，每天都要进步哦'
        })
      }
      const that = this
      wx.request({url: `https://wx.request.huangjinyu.xyz:8100/学院信息查询/问题查询?page=${that.data.currentPage}&limit=10` ,   header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          const total = res.question_sum
          const data  = res.data.data
          that.setData({
            dataSum: total,
            array: data.question_list,
            currentPage: that.data.currentPage + 1
          })
        }})
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },
  loadMore:function (){
    if(this.data.currentPage * this.data.limit >= this.data.dataSum){
      return
    }

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
  onScroll(event) {
    wx.createSelectorQuery()
      .select('#scroller')
      .boundingClientRect((res) => {
        this.setData({
          scrollTop: event.detail.scrollTop,
          offsetTop: res.top,
        });
      })
      .exec();
  },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },
  onSearch(e){
    console.log(e.detail)
    const that = this
    if(e.detail.length > 0){
      wx.request({url: `https://wx.request.huangjinyu.xyz:8100/学院信息查询/问题查询?question=${e.detail}&limit=10`,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          const data  = res.data
          if(data.answer.length > 0 && Array.isArray(data.answer)){
            that.setData({
              showEmpty:  false,
              searchResArr:  data.answer,
            })
          }else {
            that.setData({
              showEmpty:  true,
              searchResArr:  [],
            })
          }

        }})
     }
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
