'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

// 扩展canvas方法
// 将子类方法，赋值给父类
function inherit(subClass, superClass) {
    Object.getOwnPropertyNames(subClass.__proto__).forEach(function (v) {
        if (v !== 'constructor') {
            superClass.__proto__[v] = subClass.__proto__[v];
        }
    });
    return superClass;
}
var CanvasExtensions = /** @class */ (function () {
    function CanvasExtensions() {
    }
    CanvasExtensions.prototype.testLog = function () {
        console.log('CanvasExtensions');
    };
    return CanvasExtensions;
}());
var ContexExtensions = /** @class */ (function () {
    function ContexExtensions() {
    }
    ContexExtensions.prototype.view = function (_a) {
        var _b = _a.color, color = _b === void 0 ? '#000' : _b, _c = _a.w, w = _c === void 0 ? 10 : _c, _d = _a.h, h = _d === void 0 ? 10 : _d, _e = _a.x, x = _e === void 0 ? 0 : _e, _f = _a.y, y = _f === void 0 ? 0 : _f, _g = _a.r, r = _g === void 0 ? 0 : _g, _h = _a.cb, cb = _h === void 0 ? function () { } : _h;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
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
                        return [4 /*yield*/, cb.call(this)];
                    case 1:
                        // 剪切
                        // this.clip() ??
                        _j.sent();
                        return [2 /*return*/, 'success'];
                }
            });
        });
    };
    ContexExtensions.prototype.image = function (_a) {
        var _this = this;
        var _b = _a.image, image = _b === void 0 ? '' : _b, _c = _a.color, color = _c === void 0 ? '#fff' : _c, _d = _a.x, x = _d === void 0 ? 0 : _d, _e = _a.y, y = _e === void 0 ? 0 : _e, _f = _a.w, w = _f === void 0 ? 10 : _f, _g = _a.h, h = _g === void 0 ? 10 : _g, _h = _a.r, r = _h === void 0 ? 10 : _h;
        this.view({
            color: color,
            x: x,
            y: y,
            w: w,
            h: h,
            r: r,
            cb: function () {
                _this.drawImage(image, x, y, w, h);
            }
        });
    };
    ContexExtensions.prototype.text = function (_a) {
        var _b = _a.context, context = _b === void 0 ? '默认文字' : _b, _c = _a.x, x = _c === void 0 ? 0 : _c, _d = _a.y, y = _d === void 0 ? 0 : _d, _e = _a.size, size = _e === void 0 ? 12 : _e, _f = _a.color, color = _f === void 0 ? '#fff' : _f;
        var fontWeight = 400;
        var textAlign = 'left';
        this.font = fontWeight + " " + size + "px -apple-system-font, Helvetica Neue, Helvetica, sans-serif";
        this.fillStyle = color;
        this.textBaseline = 'top';
        this.textAlign = textAlign;
        this.fillText(context, x, y);
    };
    return ContexExtensions;
}());
var CanvasExtension = function (canvas) {
    var subClass = new CanvasExtensions();
    return inherit(subClass, canvas);
};
var ContexExtension = function (ctx) {
    var subClass = new ContexExtensions();
    return inherit(subClass, ctx);
};

function flattenFnArray(fns, canvas, customProps) {
    fns = Array.isArray(fns) ? fns : [fns];
    canvas = Array.isArray(canvas) ? canvas : [canvas];
    customProps = Array.isArray(customProps) ? customProps : [customProps];
    return function (props) {
        return fns.reduce(function (resultPromise, fn, i) { return (resultPromise.then(function () { return fn(canvas[i], customProps[i], props); })); }, Promise.resolve());
    };
}
function createCanvas(width, height) {
    var el = wx.createOffscreenCanvas({ type: '2d', width: width, height: height });
    return {
        canvas: CanvasExtension(el),
        ctx: ContexExtension(el.getContext('2d'))
    };
}
// 初始设置
function settingCanvas(vm) {
    vm.posterStatus = BOOTSTRAP;
    var canvas = vm.onBootstrap.map(function (v) { return (createCanvas(v.customProp.width, v.customProp.height)); });
    var customProps = vm.onBootstrap.map(function (v) { return v.customProp; });
    var Bootstrap = vm.onBootstrap.map(function (v) { return v.app; });
    // 只执行对应的Bootstrap
    if (INDEX !== undefined) {
        canvas = canvas[INDEX];
        customProps = customProps[INDEX];
        Bootstrap = Bootstrap[INDEX];
    }
    flattenFnArray(Bootstrap, canvas, customProps)().then(function () {
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
            break;
        case NOT_MOUNT:
            renderCanvas(vm);
            break;
        case NOT_UNMOUNT:
            destroyCanvas(vm);
            break;
    }
}

var NOT_BOOTSTRAP = 'NOT_BOOTSTRAP'; // 未准备
var BOOTSTRAP = 'BOOTSTRAP'; // 已准备
var NOT_MOUNT = 'NOT_MOUNT'; // 未运行
var MOUNT = 'MOUNT'; // 已运行
var NOT_UNMOUNT = 'NOT_UNMOUNT'; // 未卸载
var UNMOUNT = 'UNMOUNT'; // 已卸载
var INDEX = undefined;
/**
 * 扩展原生对象人
 * @param {Object} Page 原生page对象
 * @returns 构造完之后的新对象
 */
var register = function (Page) { return (function (vm) {
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
            if (i !== undefined)
                INDEX = i;
            else
                INDEX = undefined;
            start(vm);
        };
    }
    // 挂载canvas渲染方法
    // onBootstrap() // 准备渲染，初始化数据
    // onMount()     // 渲染完成
    // onUnmount()   // 销毁渲染
    // onStart()     // 启动渲染方法
    return Page(vm);
}); };

Page = register(Page);
