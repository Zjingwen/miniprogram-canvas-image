/* eslint-disable object-shorthand */
/* eslint-disable promise/catch-or-return */
/* eslint-disable no-new */
import '../../components/index'


Page({
  onLoad() {
    // console.group('onLoad')
    // this.onStart()
    // console.groupEnd()
  },
  onShow() {
    // console.group('onShow')
    // this.onStart()
    // console.groupEnd()
  },
  onBootstrap: [
    {
      customProp: {
        width: 330, // 底图宽
        height: 518, // 底图高
      },
      app: async (el, prop) => {
        // 用来绘制初始化的图片
        console.log('onBootstrap-1-canvas', el)
        console.log('onBootstrap-1-prop', prop)

        const {canvas, ctx} = el
        console.log(canvas)
        console.log(ctx)

        ctx.view({
          color: '#FFFFFF',
          w: prop.width,
          h: prop.height,
          r: 8
        })

        // 创建一个图片
        const image = canvas.createImage()

        // 等待图片加载
        await new Promise(resolve => {
          image.onload = resolve
          image.src = 'http://pic.616pic.com/bg_w1180/00/11/34/vo5eyRAGS3.jpg' // 要加载的图片 url
        })

        ctx.image({
          image,
          x: 12,
          y: 12,
          w: 306,
          h: 306,
          r: 4
        })
        // // 把图片画到离屏 canvas 上
        // ctx.clearRect(12, 12, 306, 306)
        // ctx.drawImage(image, 12, 12, 306, 306)
        // 获取画完后的数据
        const {dataUnion} = ctx.getImageData(0, 0, prop.width, prop.height)

        wx.canvasPutImageData({
          canvasId: 'poster',
          x: 0,
          y: 0,
          width: prop.width,
          height: prop.height,
          data: dataUnion,
          success(res) {
            console.log('success canvasPutImageData', res)
          },
          fail(res) {
            console.log('fail canvasPutImageData', res)
          }
        })
      },
    },
    {
      customProp: {
        height: 100,
        width: 120
      },
      app: async (canvas, prop) => {
        console.log('onBootstrap-2-canvas', canvas)
        console.log('onBootstrap-2-prop', prop)
      },
    },
    {
      customProp: {
        height: 100,
        width: 100
      },
      app: async (canvas, prop) => {
        console.log('onBootstrap-3-canvas', canvas)
        console.log('onBootstrap-3-prop', prop)
      },
    },
  ],
  onButAll() {
    console.group('onBut')
    this.onStart()
    console.groupEnd()
  },
  onBut0() {
    console.group('onBut')
    this.onStart(0)
    console.groupEnd()
  },
  onBut1() {
    console.group('onBut')
    this.onStart(1)
    console.groupEnd()
  },
  onBut2() {
    console.group('onBut 2')
    this.onStart(2)
    console.groupEnd()
  }
})
