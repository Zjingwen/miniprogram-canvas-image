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
        height: 300, // 底图高
        width: 150 // 底图宽
      },
      app: async (canvas, prop) => {
        // 用来绘制初始化的图片
        console.log('onBootstrap-1-canvas', canvas)
        console.log('onBootstrap-1-prop', prop)

        await new Promise((resolve) => {
          setTimeout(() => {
            console.log('onBootstrap-1-1-promise-canvas', canvas)
            console.log('onBootstrap-1-1-promise-prop', prop)
            resolve()
          }, 5000)
        })

        await new Promise((resolve) => {
          setTimeout(() => {
            console.log('onBootstrap-1-2-promise-canvas', canvas)
            console.log('onBootstrap-1-2-promise-prop', prop)
            resolve()
          }, 5000)
        })
        canvas.drow()
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve()
          }, 5000)
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
  onBut() {
    console.group('onBut')
    this.onStart()
    console.groupEnd()
  }
})
