// 扩展canvas方法
// 扩展centext方法

// 将子类方法，赋值给父类
function inherit(subClass, superClass) {
  Object.getOwnPropertyNames(subClass.__proto__).forEach((v) => {
    if (v !== 'constructor') {
      superClass.__proto__[v] = subClass.__proto__[v];
    }
  });
  return superClass;
}

class CanvasExtensions {
  testLog() {
    console.log('CanvasExtensions');
  }
}
class ContexExtensions {
  beginPath: any;
  fillStyle: any;
  arc: any;
  moveTo: any;
  lineTo: any;
  fill: any;
  closePath: any;
  font: any;
  textBaseline: any;
  textAlign: any;
  fillText: any;
  drawImage: any;
  async view({ color = '#000', w = 10, h = 10, x = 0, y = 0, r = 0, cb = () => {} }) {
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
    return 'success';
  }

  image({ image = '', color = '#fff', x = 0, y = 0, w = 10, h = 10, r = 10 }) {
    this.view({
      color,
      x,
      y,
      w,
      h,
      r,
      cb: () => {
        this.drawImage(image, x, y, w, h);
      },
    });
  }

  text({ context = '默认文字', x = 0, y = 0, size = 12, color = '#fff' }) {
    const fontWeight = 400;
    const textAlign = 'left';
    this.font = `${fontWeight} ${size}px -apple-system-font, Helvetica Neue, Helvetica, sans-serif`;
    this.fillStyle = color;
    this.textBaseline = 'top';
    this.textAlign = textAlign;
    this.fillText(context, x, y);
  }
}

export const CanvasExtension = function (canvas) {
  const subClass = new CanvasExtensions();
  return inherit(subClass, canvas);
};
export const ContexExtension = function (ctx) {
  const subClass = new ContexExtensions();
  return inherit(subClass, ctx);
};
