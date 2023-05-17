let plugin = requirePlugin('routePlan');
let key = 'YNOBZ-SK46G-IHOQ2-IOCOY-GQBLQ-4XBMX';  //使用在腾讯位置服务申请的key
let referer = '首义Map';   //调用插件的app的名称
let endPoint = JSON.stringify({  //终点
  'name': '武昌首义学院信科院',
  longitude: 114.307885,
  latitude: 30.486634,
});
Page({
    data: {
      longitude: 114.307885,
      latitude: 30.486634,
      Height: 0,
      scale: 18,
      markers: [
        {
            id: "1",
            latitude:  30.486634,
            longitude:114.307885,
            width: 30,
            height: 30,
            iconPath: "../image/定位.png",
            title: "信科院"

          }
      ],
      controls: [{
        id: 1,
        iconPath: 'http://www.huangjinyu.xyz/imgTemp/%E5%8A%A0.png',
        position: {
          left: 320,
          top: 100 - 50,
          width: 20,
          height: 20
        },
        clickable: true
      },
      {
        id: 2,
        iconPath: 'http://www.huangjinyu.xyz/imgTemp/%E5%87%8F.png',
        position: {
          left: 340,
          top: 100 - 50,
          width: 20,
          height: 20
        },
        clickable: true
      }
      ],
      circles: [{
        latitude: 30.486634,
        longitude: 114.307885,
        color: '#FF0000DD',
        fillColor: '#7cb5ec88',
        radius: 25,
        strokeWidth: 1
      }]
    },

    onLoad: function () {
      var _this = this;

      wx.getSystemInfo({
        success: function (res) {
          //设置map高度，根据当前设备宽高满屏显示
          _this.setData({
            view: {
              Height: res.windowHeight
            }

          })

        }
      })



    },

    regionchange(e) {
      console.log("regionchange===" + e.type)
    },

    //点击merkers
    markertap(e) {
      console.log(e.markerId)

      wx.showActionSheet({
        itemList: ["信息科学与工程学院"],
        success: function (res) {
          console.log(res.tapIndex)
        },
        fail: function (res) {
          console.log(res.errMsg)
        }
      })
    },
    viewLine(){
      wx.navigateTo({
        url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
      });
    },
    //点击缩放按钮动态请求数据
    controltap(e) {
      var that = this;
      console.log("scale===" + this.data.scale)
      if (e.controlId === 1) {
        // if (this.data.scale === 13) {
        that.setData({
          scale: --this.data.scale
        })
        // }
      } else {
        //  if (this.data.scale !== 13) {
        that.setData({
          scale: ++this.data.scale
        })
        // }
      }

    },

  })
