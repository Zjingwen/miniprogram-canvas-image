/* eslint-disable no-use-before-define */
// eslint-disable-next-line import/no-cycle
import {
  BOOTSTRAP,
  NOT_BOOTSTRAP,
  NOT_MOUNT,
  NOT_UNMOUNT,
  UNMOUNT,
  MOUNT
} from './helpers'

export function start(vm) {
  console.log('start', vm)
  switch (vm.posterStatus) {
    case NOT_BOOTSTRAP:
    case UNMOUNT:
      settingCanvas(vm)
      break
    case NOT_MOUNT:
      renderCanvas(vm)
      break
    case NOT_UNMOUNT:
      destroyCanvas(vm)
      break
    default:
      Error('corejs: posterStatus try')
  }
}

// 设置
export function settingCanvas(vm) {
  console.log('settingCanvas', vm)
  vm.posterStatus = BOOTSTRAP
  // TODO 设置过程
  // 执行 vm.onBootstrap
  vm.posterStatus = NOT_MOUNT
  start(vm)
}

// 渲染 and 导出
export function renderCanvas(vm) {
  console.log('renderCanvas', vm)
  // 执行
  vm.posterStatus = MOUNT
  // TODO 渲染and 导出功能
  vm.onMount.call(vm, 'callback')
  vm.posterStatus = NOT_UNMOUNT
  start(vm)
}

// 销毁
export function destroyCanvas(vm) {
  console.log('destroyCanvas', vm)
  // 执行
  vm.onUnmount.call(vm)
  vm.posterStatus = UNMOUNT
  // start(vm)
}
