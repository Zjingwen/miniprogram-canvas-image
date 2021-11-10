/* eslint-disable lines-between-class-members */
/* eslint-disable no-proto */
/* eslint-disable class-methods-use-this */
// 扩展canvas方法
// 扩展centext方法

// 将子类方法，赋值给父类
function inherit(subClass, superClass) {
  Object.keys(subClass.__proto__).forEach(v => {
    superClass.__proto__[v] = subClass.__proto__[v]
  })
  return superClass
}

class CanvasExtensions {
  testLog() {
    console.log('CanvasExtensions')
  }
}
class ContexExtensions {
  async view({
    color = '#000',
    w = 10,
    h = 10,
    x = 0,
    y = 0,
    r = 0,
    cb = () => {}
  }) {
    // 开始绘制
    this.beginPath()
    this.fillStyle = color
    this.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)

    // border-top
    this.moveTo(x + r, y)
    this.lineTo(x + w - r, y)
    this.lineTo(x + w, y + r)
    // 右上角
    this.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)

    // border-right
    this.lineTo(x + w, y + h - r)
    this.lineTo(x + w - r, y + h)
    // 右下角
    this.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)

    // border-bottom
    this.lineTo(x + r, y + h)
    this.lineTo(x, y + h - r)
    // 左下角
    this.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)

    // border-left
    this.lineTo(x, y + r)
    this.lineTo(x + r, y)

    // 这里是使用 fill 还是 stroke都可以，二选一即可，但是需要与上面对应
    this.fill()
    // this.stroke()
    this.closePath()
    // 剪切
    this.clip()
    await cb()
    return 'success'
  }

  image({
    image = '',
    x = 0,
    y = 0,
    w = 10,
    h = 10,
    r = 10
  }) {
    this.view({
      color: '#000',
      x,
      y,
      w,
      h,
      r,
      cb: async () => {
        await new Promise(() => {
          this.drawImage(image, 12, 12, 306, 306)
        })
      }
    })
  }
}


export const CanvasExtension = function (canvas) {
  const subClass = new CanvasExtensions()
  return inherit(subClass, canvas)
}
export const ContexExtension = function (ctx) {
  const subClass = new ContexExtensions()
  return inherit(subClass, ctx)
}
