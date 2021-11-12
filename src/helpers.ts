import { start } from './start';

export const NOT_BOOTSTRAP = 'NOT_BOOTSTRAP'; // 未准备
export const BOOTSTRAP = 'BOOTSTRAP'; // 已准备

export const NOT_MOUNT = 'NOT_MOUNT'; // 未运行
export const MOUNT = 'MOUNT'; // 已运行

export const NOT_UNMOUNT = 'NOT_UNMOUNT'; // 未卸载
export const UNMOUNT = 'UNMOUNT'; // 已卸载

export let INDEX = undefined;

// 当前应用是否被注册
export function isBootstarp({ posterStatus }) {
  return posterStatus === BOOTSTRAP;
}

// 当前应用是否被挂载
export function isMount({ posterStatus }): boolean {
  return posterStatus === MOUNT;
}

// 是否被卸载
export function isUnmount({ posterStatus }): boolean {
  return posterStatus === UNMOUNT;
}

/**
 * 扩展原生对象人
 * @param {Object} Page 原生page对象
 * @returns 构造完之后的新对象
 */
export const register = (Page) => (vm) => {
  // 挂载canvas渲染方法
  // onBootstrap() // 准备渲染，初始化数据
  // onMount()     // 渲染完成
  // onUnmount()   // 销毁渲染
  // onStart()     // 启动渲染方法

  vm.posterStatus = NOT_BOOTSTRAP;
  // 挂载生命周期
  if (!Object.prototype.hasOwnProperty.call(vm, 'onBootstrap')) {
    vm.onBootstrap = [];
  }
  if (!Array.isArray(vm.onBootstrap)) {
    vm.onBootstrap = [vm.onBootstrap];
  }
  if (!Object.prototype.hasOwnProperty.call(vm, 'onMount')) {
    vm.onMount = function () {};
  }
  if (!Object.prototype.hasOwnProperty.call(vm, 'onUnmount')) {
    vm.onUnmount = function () {};
  }

  // 挂载方法
  if (!Object.prototype.hasOwnProperty.call(vm, 'onStart')) {
    vm.onStart = function (i) {
      if (i !== undefined) INDEX = i;
      else INDEX = undefined;
      start(vm);
    };
  }

  return Page(vm);
};
