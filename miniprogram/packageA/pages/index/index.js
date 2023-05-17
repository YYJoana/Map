// index.js
// const app = getApp()
// const { envList } = require('../../envList.js');
const deepBlue = '../assets/辅导员deepBlue.png'
const lv = '../assets/辅导员lv.png'
const park = '../assets/辅导员park.png'
const orange = '../assets/辅导员orange.png'
const loutiImg = '../assets/楼梯 (2).png'
const girlWc = '../assets/女厕所 (1).png'
const manWc = '../assets/男厕所 (1).png'
const drink = '../assets/热水壶.png'
const electron = '../assets/微电子.png'
const computerImg1 = '../assets/物理图_计算机.png'
const computerImg2 = '../assets/台式机，计算机，电脑.png'
const information = '../assets/信息.png'
const position = '../assets/定位.png'

const positionArr = [

]



function alignTest(str, begX, begY, ctx) {
  ctx.font = '18px bold Arial'
  ctx.fillStyle = '#fdfdfd'
  let arr = str.slice('')
  for (let i = 0; i < arr.length; i++) {
    if (i === 1) {
      ctx.fillText('|', begX + 2, begY + (i * 15))
    } else {
      ctx.fillText(arr[i], begX, begY + (i * 15 + 1))
    }
  }
  ctx.beginPath()
  ctx.strokeStyle = 'black'
}

function drawImage (image , x  , y , alpha, ctx)
{
  // 绘制图片
  ctx.drawImage(image , x , y);
  // 获取从x、y开始，宽为image.width、高为image.height的图片数据
  // 也就是获取绘制的图片数据
  var imgData = ctx.getImageData(x , y , image.width , image.height);
  for (var i = 0 , len = imgData.data.length ; i < len ; i += 4 )
  {
    // 改变每个像素的透明度
    imgData.data[i + 3] = imgData.data[i + 3] * alpha;
  }
  // 将获取的图片数据放回去。
  ctx.putImageData(imgData , x , y);

}

function fillText(str, begX, begY, ctx) {
  ctx.font = '18px Sans bold'
  ctx.fillStyle = '#fdfdfd'
  ctx.fillText(str, begX, begY)
  ctx.beginPath()
  ctx.strokeStyle = 'black'
}
function fillText2(str, begX, begY, ctx) {
  ctx.font = '14px Sans'
  ctx.fillStyle = '#fdfdfd'
  ctx.fillText(str, begX, begY)
  ctx.beginPath()
  ctx.strokeStyle = 'black'
}






Page({
  data: {
      resetShow: false,
      inputValue: '',
      imgSrc: '',
      lightArray: [],
      bg:'',
      role: 0
  },

  onLoad(){
    try{
      this.setData({
        role: wx.getStorageSync('role')
      })
    }catch (e) {

    }
  },

  onReady() {
    const query = wx.createSelectorQuery()
    query.select('#can')
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node
        this.canvas = canvas
        const ctx = canvas.getContext('2d')
        this.ctx = ctx
        ctx.strokeRectPro = function(name,begX,begY,w,h,color){
          positionArr.push({
            name,
            begX,
            begY,
            endX:begX+w,
            endY:begY+h
          })
          ctx.shadowBlur=10;
          ctx.shadowColor='#999';
          ctx.shadowOffsetX = 15
          ctx.shadowOffsetY = 15

          ctx.strokeRect(begX,begY,w,h)
          ctx.fillStyle = color
          ctx.fillRect(begX,begY,w,h)
        }
        const dpr = wx.getSystemInfoSync().pixelRatio
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        ctx.scale(dpr, dpr)
        try {
          const arr  = wx.getStorageSync('themeArray')
          const index  = wx.getStorageSync('themeIndex')
          let { colors,bg } = arr[index]
          colors.push('transparent')
          this.setData({
            bg
          })

          if (colors) {
            ctx.strokeRectPro("3-211",0, 0, 65, 50,colors[0])
            fillText('3-211', 11, 32, ctx)
            ctx.clearRect(58,49,7,2)


            ctx.strokeRectPro("3-212",0, 50, 50, 60,colors[1])
            fillText2('3-212', 8, 82, ctx)
            ctx.clearRect(49,93,2,10)
            ctx.clearRect(49,56,2,10)

            ctx.strokeRectPro("3-213",0, 110, 50, 50,colors[3])
            fillText2('3-213', 8, 140, ctx)
            ctx.clearRect(49,140,2,15)

            ctx.strokeRectPro("3-210",65, 0, 70, 75,colors[5])
            fillText('3-210', 77, 45, ctx)

            ctx.strokeRectPro("3-209",65, 75, 70, 60,colors[4])
            fillText('3-209', 77, 112, ctx)
            ctx.clearRect(64,95,2,20)

            ctx.strokeRectPro("3-208",135, 0, 30, 135,colors[3])
            alignTest('3-208', 147, 40, ctx)
            ctx.clearRect(141,134,10,2)

            ctx.strokeRectPro("3-207",165, 0, 30, 135,colors[2])
            alignTest('3-207', 177, 40, ctx)
            ctx.clearRect(180,134,10,2)

            ctx.strokeRectPro("3-206",195, 0, 30, 135,colors[1])
            alignTest('3-206', 207, 40, ctx)
            ctx.clearRect(200,134,10,2)

            ctx.strokeRectPro("3-205",225, 0, 30, 135,colors[4])
            alignTest('3-205', 236, 40, ctx)
            ctx.clearRect(240,134,10,2)


            ctx.strokeRectPro("3-204",255, 0, 45, 75,colors[5])
// fillText('3-204', 258, 40)
            fillText2('3-204', 259, 40, ctx)
            ctx.clearRect(256,74,15,2)


            ctx.strokeRectPro("3-203",300, 0, 45, 105,colors[1])
            fillText2('3-203', 306, 50, ctx)


            ctx.clearRect(256,74,15,2)


            ctx.clearRect(299,90,2,20)


            ctx.strokeRectPro("3-202",285, 105, 60, 52,colors[3])
            fillText('3-202', 293, 126, ctx)

            ctx.strokeRectPro("3-201",285, 157, 60, 52,colors[1])

            const fudaoyuan = canvas.createImage()
            const fudaoyuanlv = canvas.createImage()
            const fudaoyuanPark = canvas.createImage()
            const fudaoyuanOrange = canvas.createImage()
            fudaoyuan.src=deepBlue
            fudaoyuanlv.src=lv
            fudaoyuanPark.src=park
            fudaoyuanOrange.src=orange
            fudaoyuanlv.onload = function (){
              ctx.shadowBlur=10;
              ctx.drawImage(fudaoyuanlv,303,182,28,28)
            }
            fudaoyuanPark.onload = function (){
              ctx.shadowBlur=10;
              ctx.drawImage(fudaoyuanPark,303,282,28,28)

            }
            fudaoyuanOrange.onload = function (){
              ctx.shadowBlur=10;
              ctx.drawImage(fudaoyuanOrange,303,335,28,28)

            }
            fudaoyuan.onload = function (){
              ctx.shadowBlur=10;
              ctx.drawImage(fudaoyuan,303,130,28,28)

              ctx.drawImage(fudaoyuan,302,475,32,32)
            }
            fillText('3-201', 293, 178,ctx)

            ctx.clearRect(284,111,2,20)
            ctx.clearRect(284,182,2,20)
// 楼梯
            const louti = canvas.createImage()
            louti.src=loutiImg
            louti.onload = function (){
              ctx.shadowBlur=10;
              ctx.drawImage(louti,283,202,64,64);
            }


            ctx.strokeRectPro("4-201",285, 260, 60, 53,colors[4])
            fillText('4-201', 293, 280, ctx)
            ctx.strokeRectPro("4-202",285, 313,60,52,colors[2])
            fillText('4-202', 293, 333, ctx)


            ctx.clearRect(284,265,2,20)
            ctx.clearRect(284,338,2,20)

// 中间广场
            ctx.strokeRectPro("",0, 160, 255, 170,colors[6])
            ctx.strokeRectPro("",0, 165, 250, 160,colors[6])
            ctx.clearRect(0, 166,6,158)

//厕所
            ctx.strokeRectPro("",285, 365, 60, 35,colors[1])
// fillText('厕所(女)', 290, 388)
            const img = canvas.createImage()
            img.src=girlWc
            img.onload = function (){
              ctx.shadowBlur=10;
              ctx.drawImage(img,296,362,40,40);
            }
            ctx.clearRect(284,375,2,10)

//饮水机
            ctx.strokeRectPro("",285, 400, 60, 35,colors[0])
            const img11 = canvas.createImage()
            img11.src=drink
            img11.onload = function (){
              ctx.shadowBlur=10;
              ctx.drawImage(img11,300,402,30,30);
            }
// ctx.clearRect(284,375,2,10)

            ctx.strokeRectPro("4-203",285, 435, 60, 87,colors[3])
            fillText('4-203', 293, 470, ctx)
            ctx.clearRect(284,410,2,11)
            ctx.clearRect(284,483,2,20)


            ctx.strokeRectPro("4-204",285, 522, 60, 87,colors[4])
            fillText('4-204', 293, 570, ctx)
// ctx.clearRect(284,514,2,20)
            ctx.clearRect(284,575,2,20)

//厕所
            ctx.strokeRectPro("",285, 610, 60, 35,colors[1])
            const img2 = canvas.createImage()
            img2.src=manWc
            img2.onload = function (){
              ctx.shadowBlur=10;
              ctx.drawImage(img2,296,606,40,40);
            }
            ctx.clearRect(284,620,2,10)


            ctx.strokeRectPro("4-205",285, 645, 60, 35,colors[5])
            fillText('4-205', 293, 670, ctx)
            ctx.clearRect(284,655,2,10)

            ctx.strokeRectPro("4-206",285, 680, 60, 35,colors[2])
            fillText('4-206', 293, 704, ctx)
            ctx.clearRect(284,690,2,10)

// 大办公区
//左侧
            ctx.strokeRectPro("4-207",0, 365, 120, 90,colors[1])
            fillText('4-207', 36, 398, ctx)
            const dianzi = canvas.createImage()
            dianzi.src=electron
            dianzi.onload = function (){
              ctx.shadowBlur=10;
              ctx.drawImage(dianzi,40,405,40,40);
            }
            ctx.clearRect(119,426,2,20)

            ctx.strokeRectPro("4-208",0, 455, 120, 100,colors[3])
            fillText('4-208', 36, 513, ctx)
            ctx.clearRect(119,500,2,20)

            ctx.strokeRectPro("4-209",0, 555, 120, 90,colors[4])
            fillText('4-209', 36, 584, ctx)
            const computer = canvas.createImage()
            const computer2 = canvas.createImage()
            computer.src=computerImg1
            computer2.src=computerImg2
            computer.onload = function (){
              ctx.shadowBlur=10;
              ctx.drawImage(computer,40,594,40,40);
            }
            computer2.onload = function (){
              ctx.shadowBlur=10;
              ctx.drawImage(computer2,190,568,40,40);
            }
            ctx.clearRect(119,565,2,20)
// 右侧
            ctx.strokeRectPro("4-210",160, 365, 95, 140,colors[5])
            fillText('4-210', 186, 425, ctx)
            const xinxi = canvas.createImage()
            xinxi.src=information
            xinxi.onload = function (){
              ctx.shadowBlur=10;
              ctx.drawImage(xinxi,190,433,40,40);
            }
            ctx.clearRect(159,474,2,20)

            ctx.strokeRectPro("4-211",160, 505, 95, 140,colors[1])
            fillText('4-211', 186, 557, ctx)
            ctx.clearRect(159,518,2,20)
            setTimeout(()=>{
              this.canvasImg= ctx.getImageData(0, 0, 345 * dpr, 716* dpr)
              this.canvasImg= ctx.getImageData(0, 0, 345 * dpr, 716* dpr)
            },800)
          }
        } catch (e) {
          // Do something when catch error
        }

      })

  },
  focusHandle(e){
    if(e.detail.value.length>0){
      this.setData({
        resetShow: true,
        inputValue: e.detail.value
      })
    }else {
      this.setData({
        resetShow: false,
      })
    }
  },


  onTap: function (e) {
    // 获取按钮元素的坐标信息
    const that = this
    this.ctx.putImageData(this.canvasImg, 0, 0)
    that.setData({
      lightArray: [],
    })
    if(this.data.inputValue){
      wx.request({
        url: `https://wx.request.huangjinyu.xyz:8100/学院信息查询/姓名查询/${this.data.inputValue}`, //仅为示例，并非真实的接口地址

        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
            that.setData({
              lightArray: res.data,
            })
          that.drawLight()
        }
      })
    }

  },
  drawLight(){
    this.data.lightArray.forEach(it=>{
      const res = positionArr.find(item=>{
        return item.name === it['办公室']
      })

      const positionImg = this.canvas.createImage()

      positionImg.src=position
      const that = this
      positionImg.onload = function (){
        const posX = res.begX + (res.endX - res.begX)/2 - 14
        const posY = res.begY + (res.endY - res.begY)/2 - 14
        that.ctx.shadowBlur=0;
        that.ctx.shadowColor='#999';
        that.ctx.shadowOffsetX = 0
        that.ctx.shadowOffsetY = 0
        that.ctx.drawImage(positionImg,posX,posY,28,28)
      }
    })
  },

  resetClick(){
    this.setData({
      inputValue: '',
      resetShow: false
    })
  },

  getDetail(e){
    const touchPosition = e.touches[0]
    const touchX = touchPosition.x
    const touchY = touchPosition.y
    const res = positionArr.find(item => {
      if (item.name) {
        if (touchX > item.begX && touchX < item.endX && touchY > item.begY && touchY < item.endY)
          return true
      }
      return false
    })
    if (res) {
      wx.navigateTo({
        url: "../detail/index?key="+ res.name
      })
    }
  }
});
