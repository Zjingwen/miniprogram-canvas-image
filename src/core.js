/* eslint-disable no-const-assign */
/* eslint-disable max-len */
/* eslint-disable prefer-rest-params */
/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/valid-params */
/* eslint-disable no-debugger */
/* eslint-disable import/no-cycle */
/* eslint-disable no-use-before-define */
// eslint-disable-next-line import/no-cycle
// import {$wx} from '.'
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

function flattenFnArray(fns, canvas, customProps) {
  fns = Array.isArray(fns) ? fns : [fns]
  canvas = Array.isArray(canvas) ? canvas : [canvas]
  customProps = Array.isArray(customProps) ? customProps : [customProps]

  return function (props) {
    return fns.reduce((resultPromise, fn, i) => (resultPromise.then(() => fn(canvas[i], customProps[i], props))), Promise.resolve())
  }
}

function createCanvas(width, height) {
  const el = wx.createOffscreenCanvas({type: '2d', width, height})
  return {
    canvas: el,
    ctx: el.getContext('2d')
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
