/* eslint-disable no-debugger */
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
          image.src = 'http://qnoss.lanlanlife.com/a3638e139cce2c20c33a887195ca447e_300x300.jpg' // 要加载的图片 url
        })
        ctx.image({
          image,
          x: 12,
          y: 12,
          w: 306,
          h: 306,
          r: 4
        })

        ctx.view({
          color: '#FF0000',
          w: 37,
          h: 14,
          x: 12,
          y: 328,
          r: 1
        })

        ctx.text({
          context: '拼多多',
          x: 14,
          y: 330,
          size: 11,
          color: '#FFF'
        })

        ctx.text({
          context: '收纳筐日系草编收纳箱整理箱桌面衣…',
          x: 52,
          y: 328.5,
          size: 15,
          color: '#000'
        })

        ctx.text({
          context: '劵后¥',
          x: 12,
          y: 359,
          size: 15,
          color: '#D31F1F'
        })

        ctx.text({
          context: '59',
          x: 55,
          y: 351,
          size: 26,
          color: '#D31F1F'
        })

        ctx.text({
          context: '¥2919',
          x: 95,
          y: 361,
          size: 13,
          color: '#BEBEBE'
        })

        const imageQuan = canvas.createImage()
        await new Promise(resolve => {
          imageQuan.onload = resolve
          imageQuan.src = 'http://qnoss.lanlanlife.com/2b2d1c7d480d7d04c8e53698e252a1b2_22x80.png'
        })
        ctx.image({
          color: '#fff',
          image: imageQuan,
          x: 12,
          y: 390,
          w: 80,
          h: 22,
          r: 0
        })

        ctx.text({
          context: '1000元',
          x: 42,
          y: 394,
          size: 15,
          color: '#FFF'
        })

        ctx.text({
          context: '已售1000件',
          x: 12,
          y: 422,
          size: 13,
          color: '#BEBEBE'
        })

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
