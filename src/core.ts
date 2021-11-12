import {
  BOOTSTRAP,
  NOT_MOUNT,
  NOT_UNMOUNT,
  UNMOUNT,
  MOUNT,
  INDEX,
} from './helpers'
import {
  start
} from './start'

import { ContexExtension, CanvasExtension } from './extension'

function flattenFnArray(fns, canvas, customProps) {
  fns = Array.isArray(fns) ? fns : [fns]
  canvas = Array.isArray(canvas) ? canvas : [canvas]
  customProps = Array.isArray(customProps) ? customProps : [customProps]

  return function (props?: any) {
    return fns.reduce((resultPromise, fn, i) => (resultPromise.then(() => fn(canvas[i], customProps[i], props))), Promise.resolve())
  }
}

function createCanvas(width, height) {
  const el = wx.createOffscreenCanvas({ type: '2d', width, height })
  return {
    canvas: CanvasExtension(el),
    ctx: ContexExtension(el.getContext('2d'))
  }
}

// 初始设置
export function settingCanvas(vm) {
  vm.posterStatus = BOOTSTRAP
  let canvas = vm.onBootstrap.map(v => (createCanvas(v.customProp.width, v.customProp.height)))
  let customProps = vm.onBootstrap.map(v => v.customProp)
  let Bootstrap = vm.onBootstrap.map(v => v.app)

  // 只执行对应的Bootstrap
  if (INDEX !== undefined) {
    canvas = canvas[INDEX]
    customProps = customProps[INDEX]
    Bootstrap = Bootstrap[INDEX]
  }

  flattenFnArray(Bootstrap, canvas, customProps)().then(() => {
    vm.posterStatus = NOT_MOUNT
    start(vm)
  })
}

// 渲染 and 导出
export function renderCanvas(vm) {
  console.log('renderCanvas', vm)
  // 执行
  vm.posterStatus = MOUNT

  vm.onMount.call(vm, 'renderCanvas callback')
  vm.posterStatus = NOT_UNMOUNT
  start(vm)
}

// 销毁
export function destroyCanvas(vm) {
  console.log('destroyCanvas', vm)
  // 执行
  vm.onUnmount.call(vm)
  vm.posterStatus = UNMOUNT
}
