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
  testLog() {
    console.log('ContexExtensions')
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
