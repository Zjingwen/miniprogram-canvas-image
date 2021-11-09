/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/valid-params */
/* eslint-disable no-debugger */
/* eslint-disable import/no-cycle */
/* eslint-disable no-use-before-define */
// eslint-disable-next-line import/no-cycle
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

function flattenFnArray(fns) {
  fns = Array.isArray(fns) ? fns : [fns]

  return function (vm) {
    return fns.reduce((resultPromise, fn) => resultPromise.then(() => (fn(vm))), Promise.resolve())
  }
}

// const apps = []

// 设置
export function settingCanvas(vm) {
  console.log('settingCanvas', vm)
  vm.posterStatus = BOOTSTRAP
  flattenFnArray(vm.onBootstrap)(vm).then(() => {
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
