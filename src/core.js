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
  MOUNT
} from './helpers'
import {
  start
} from './start'

function flattenFnArray(fns, canvas, customProps) {
  fns = Array.isArray(fns) ? fns : [fns]

  return function (props) {
    return fns.reduce((resultPromise, fn, i) => (resultPromise.then(() => fn(canvas[i], customProps[i], props))), Promise.resolve())
  }
}

function createCanvas(width, height) {
  return wx.createOffscreenCanvas({type: '2d', width, height})
}

// 初始设置
export function settingCanvas(vm) {
  console.log('settingCanvas', vm)
  vm.posterStatus = BOOTSTRAP
  const canvas = vm.onBootstrap.map(v => (createCanvas(...v.customProp)))
  const customProps = vm.onBootstrap.map(v => v.customProp)

  flattenFnArray(vm.onBootstrap.map(v => v.app), canvas, customProps)().then(() => {
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
