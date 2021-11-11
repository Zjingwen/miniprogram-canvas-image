'use strict';

// 扩展canvas方法
// 扩展centext方法

// 将子类方法，赋值给父类
function inherit(subClass, superClass) {
  Object.getOwnPropertyNames(subClass.__proto__).forEach(v => {
    if (v !== 'constructor') {
      superClass.__proto__[v] = subClass.__proto__[v];
    }
  });
  return superClass
}

class CanvasExtensions {
  testLog() {
    console.log('CanvasExtensions');
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
    this.beginPath();
    this.fillStyle = color;
    this.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5);

    // border-top
    this.moveTo(x + r, y);
    this.lineTo(x + w - r, y);
    this.lineTo(x + w, y + r);
    // 右上角
    this.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2);

    // border-right
    this.lineTo(x + w, y + h - r);
    this.lineTo(x + w - r, y + h);
    // 右下角
    this.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5);

    // border-bottom
    this.lineTo(x + r, y + h);
    this.lineTo(x, y + h - r);
    // 左下角
    this.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI);

    // border-left
    this.lineTo(x, y + r);
    this.lineTo(x + r, y);

    // 这里是使用 fill 还是 stroke都可以，二选一即可，但是需要与上面对应
    this.fill();
    // this.stroke()
    this.closePath();
    // 剪切
    // this.clip() ??
    await cb.call(this);
    return 'success'
  }

  image({
    image = '',
    color = '#fff',
    x = 0,
    y = 0,
    w = 10,
    h = 10,
    r = 10
  }) {
    this.view({
      color,
      x,
      y,
      w,
      h,
      r,
      cb: () => {
        this.drawImage(image, x, y, w, h);
      }
    });
  }

  text({
    context = '默认文字', x = 0, y = 0, size = 12, color = '#fff'
  }) {
    const fontWeight = 400;
    const textAlign = 'left';
    this.font = `${fontWeight} ${size}px -apple-system-font, Helvetica Neue, Helvetica, sans-serif`;
    this.fillStyle = color;
    this.textBaseline = 'top';
    this.textAlign = textAlign;
    this.fillText(context, x, y);
  }
}

const CanvasExtension = function (canvas) {
  const subClass = new CanvasExtensions();
  return inherit(subClass, canvas)
};
const ContexExtension = function (ctx) {
  const subClass = new ContexExtensions();
  return inherit(subClass, ctx)
};

function flattenFnArray(fns, canvas, customProps) {
  fns = Array.isArray(fns) ? fns : [fns];
  canvas = Array.isArray(canvas) ? canvas : [canvas];
  customProps = Array.isArray(customProps) ? customProps : [customProps];

  return function (props) {
    return fns.reduce((resultPromise, fn, i) => (resultPromise.then(() => fn(canvas[i], customProps[i], props))), Promise.resolve())
  }
}

function createCanvas(width, height) {
  const el = wx.createOffscreenCanvas({type: '2d', width, height});
  return {
    canvas: CanvasExtension(el),
    ctx: ContexExtension(el.getContext('2d'))
  }
}

// 初始设置
function settingCanvas(vm) {
  vm.posterStatus = BOOTSTRAP;
  let canvas = vm.onBootstrap.map(v => (createCanvas(v.customProp.width, v.customProp.height)));
  let customProps = vm.onBootstrap.map(v => v.customProp);
  let Bootstrap = vm.onBootstrap.map(v => v.app);

  // 只执行对应的Bootstrap
  if (INDEX !== undefined) {
    canvas = canvas[INDEX];
    customProps = customProps[INDEX];
    Bootstrap = Bootstrap[INDEX];
  }

  flattenFnArray(Bootstrap, canvas, customProps)().then(() => {
    vm.posterStatus = NOT_MOUNT;
    start(vm);
  });
}

// 渲染 and 导出
function renderCanvas(vm) {
  console.log('renderCanvas', vm);
  // 执行
  vm.posterStatus = MOUNT;

  vm.onMount.call(vm, 'renderCanvas callback');
  vm.posterStatus = NOT_UNMOUNT;
  start(vm);
}

// 销毁
function destroyCanvas(vm) {
  console.log('destroyCanvas', vm);
  // 执行
  vm.onUnmount.call(vm);
  vm.posterStatus = UNMOUNT;
}

function start(vm) {
  switch (vm.posterStatus) {
    case NOT_BOOTSTRAP:
    case UNMOUNT:
      settingCanvas(vm);
      break
    case NOT_MOUNT:
      renderCanvas(vm);
      break
    case NOT_UNMOUNT:
      destroyCanvas(vm);
      break
  }
}

const NOT_BOOTSTRAP = 'NOT_BOOTSTRAP';// 未准备
const BOOTSTRAP = 'BOOTSTRAP';// 已准备

const NOT_MOUNT = 'NOT_MOUNT';// 未运行
const MOUNT = 'MOUNT';// 已运行

const NOT_UNMOUNT = 'NOT_UNMOUNT';// 未卸载
const UNMOUNT = 'UNMOUNT';// 已卸载

let INDEX = undefined;

/**
 * 扩展原生对象人
 * @param {Object} Page 原生page对象
 * @returns 构造完之后的新对象
 */
const register = (Page) => (
  vm => {
    vm.posterStatus = NOT_BOOTSTRAP;
    // 挂载生命周期
    if (!Object.prototype.hasOwnProperty.call(vm, 'onBootstrap')) {
      vm.onBootstrap = [];
    }
    if (!Array.isArray(vm.onBootstrap)) {
      vm.onBootstrap = [vm.onBootstrap];
    }
    if (!Object.prototype.hasOwnProperty.call(vm, 'onMount')) {
      vm.onMount = function () { };
    }
    if (!Object.prototype.hasOwnProperty.call(vm, 'onUnmount')) {
      vm.onUnmount = function () { };
    }

    // 挂载方法
    if (!Object.prototype.hasOwnProperty.call(vm, 'onStart')) {
      vm.onStart = function (i) {
        if (i !== undefined) INDEX = i;
        else INDEX = undefined;
        start(vm);
      };
    }

    // 挂载canvas渲染方法
    // onBootstrap() // 准备渲染，初始化数据
    // onMount()     // 渲染完成
    // onUnmount()   // 销毁渲染
    // onStart()     // 启动渲染方法
    return Page(vm)
  }
);

Page = register(Page);
