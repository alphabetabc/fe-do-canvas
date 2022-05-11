/**
 * 将返回画布上颜色（RGB格式）为r、g、b的像素数量
 * @param canvas
 * @param r
 * @param g
 * @param b
 * @returns {number}
 */
function getpixelamount(canvas, r, g, b) {
  let cx = canvas.getContext('2d');
  let pixels = cx.getImageData(0, 0, canvas.width, canvas.height);
  let all = pixels.data.length;
  let amount = 0;
  for (i = 0; i < all; i += 4) {
    if (pixels.data[i] === r &&
      pixels.data[i + 1] === g &&
      pixels.data[i + 2] === b) {
      amount++;
    }
  }
  return amount;
}


/**
 * 返回一个对象，该对象在画布的x和y的位置上具有RGBA值
 * @param canvas
 * @param x
 * @param y
 * @returns {{r: number, g: number, b: number, a: number}}
 */
function getpixelcolour(canvas, x, y) {
  let cx = canvas.getContext('2d');
  let pixel = cx.getImageData(x, y, 1, 1);
  return {
    r: pixel.data[0],
    g: pixel.data[1],
    b: pixel.data[2],
    a: pixel.data[3]
  };
}

/**
 * 像jQuery那样链式地访问 2D 渲染上下文的方法和属性
 * @param canvas
 * @returns {Canvas2DContext}
 * @constructor
 */
function Canvas2DContext(canvas) {
  if (typeof canvas === 'string') {
    canvas = document.getElementById(canvas);
  }
  if (!(this instanceof Canvas2DContext)) {
    return new Canvas2DContext(canvas);
  }
  this.context = this.ctx = canvas.getContext('2d');
  if (!Canvas2DContext.prototype.arc) {
    Canvas2DContext.setup.call(this, this.ctx);
  }
}
Canvas2DContext.setup = function() {
  let methods = ['arc', 'arcTo', 'beginPath', 'bezierCurveTo', 'clearRect', 'clip',
    'closePath', 'drawImage', 'fill', 'fillRect', 'fillText', 'lineTo', 'moveTo',
    'quadraticCurveTo', 'rect', 'restore', 'rotate', 'save', 'scale', 'setTransform',
    'stroke', 'strokeRect', 'strokeText', 'transform', 'translate'];

  let getterMethods = ['createPattern', 'drawFocusRing', 'isPointInPath', 'measureText', // drawFocusRing not currently supported
    // The following might instead be wrapped to be able to chain their child objects
    'createImageData', 'createLinearGradient',
    'createRadialGradient', 'getImageData', 'putImageData'
  ];

  let props = ['canvas', 'fillStyle', 'font', 'globalAlpha', 'globalCompositeOperation',
    'lineCap', 'lineJoin', 'lineWidth', 'miterLimit', 'shadowOffsetX', 'shadowOffsetY',
    'shadowBlur', 'shadowColor', 'strokeStyle', 'textAlign', 'textBaseline'];

  for (let m of methods) {
    let method = m;
    Canvas2DContext.prototype[method] = function() {
      this.ctx[method].apply(this.ctx, arguments);
      return this;
    };
  }

  for (let m of getterMethods) {
    let method = m;
    Canvas2DContext.prototype[method] = function() {
      return this.ctx[method].apply(this.ctx, arguments);
    };
  }

  for (let p of props) {
    let prop = p;
    Canvas2DContext.prototype[prop] = function(value) {
      if (value === undefined)
        return this.ctx[prop];
      this.ctx[prop] = value;
      return this;
    };
  }
};

// let canvas = document.getElementById('canvas');
//
// // Use context to get access to underlying context
// let ctx = Canvas2DContext(canvas)
//   .strokeStyle('rgb(30, 110, 210)')
//   .transform(10, 3, 4, 5, 1, 0)
//   .strokeRect(2, 10, 15, 20)
//   .context;
//
// // Use property name as a function (but without arguments) to get the value
// let strokeStyle = Canvas2DContext(canvas)
//   .strokeStyle('rgb(50, 110, 210)')
//   .strokeStyle();


/**
 * 将canvas图片保存到文件中
 * @param canvas
 * @param path
 * @param type
 * @param options
 * @returns {*}
 */
function saveCanvas(canvas, path, type, options) {
  return Task.spawn(function *() {
    let reader = new FileReader;
    let blob = yield new Promise(accept => canvas.toBlob(accept, type, options));
    reader.readAsArrayBuffer(blob);

    yield new Promise(accept => { reader.onloadend = accept });

    return yield OS.File.writeAtomic(path, new Uint8Array(reader.result),
      { tmpPath: path + '.tmp' });
  });
}

/**
 * 将一个远程页面加载到canvas元素上
 * @constructor
 */
RemoteCanvas = function() {
  this.url = 'http://developer.mozilla.org';
};

RemoteCanvas.CANVAS_WIDTH = 300;
RemoteCanvas.CANVAS_HEIGHT = 300;

RemoteCanvas.prototype.load = function() {
  let windowWidth = window.innerWidth - 25;
  let iframe;
  iframe = document.createElement('iframe');
  iframe.id = 'test-iframe';
  iframe.height = '10px';
  iframe.width = windowWidth + 'px';
  iframe.style.visibility = 'hidden';
  iframe.src = this.url;
  // Here is where the magic happens... add a listener to the
  // frame's onload event
  iframe.addEventListener('load', this.remotePageLoaded, true);
  //append to the end of the page
  window.document.body.appendChild(iframe);
  return;
};

RemoteCanvas.prototype.remotePageLoaded = function() {
  // Look back up the iframe by id
  let ldrFrame = document.getElementById('test-iframe');
  // Get a reference to the window object you need for the canvas
  // drawWindow method
  let remoteWindow = ldrFrame.contentWindow;

  //Draw canvas
  let canvas = document.createElement('canvas');
  canvas.style.width = RemoteCanvas.CANVAS_WIDTH + 'px';
  canvas.style.height = RemoteCanvas.CANVAS_HEIGHT + 'px';
  canvas.width = RemoteCanvas.CANVAS_WIDTH;
  canvas.height = RemoteCanvas.CANVAS_HEIGHT;
  let windowWidth = window.innerWidth - 25;
  let windowHeight = window.innerHeight;

  let ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0,
    RemoteCanvas.CANVAS_WIDTH,
    RemoteCanvas.CANVAS_HEIGHT);
  ctx.save();
  ctx.scale(RemoteCanvas.CANVAS_WIDTH / windowWidth,
    RemoteCanvas.CANVAS_HEIGHT / windowHeight);
  ctx.drawWindow(remoteWindow,
    0, 0,
    windowWidth, windowHeight,
    'rgb(255, 255, 255)');
  ctx.restore();
};

// let remoteCanvas = new RemoteCanvas();
// remoteCanvas.load();

/**
 * 将图像文件转换为base64字符串
 * 下面代码加载远程图片，并把它的内容转化为 Data URI scheme。
 */
{
  let canvas = document.createElement('canvas');
  let ctxt = canvas.getContext('2d');
  function loadImageFile(url, callback) {
    let image = new Image();
    image.src = url;
    return new Promise((accept, reject) => {
      image.onload = accept;
      image.onerror = reject;
    }).then(accept => {
      canvas.width = this.width;
      canvas.height = this.height;
      ctxt.clearRect(0, 0, this.width, this.height);
      ctxt.drawImage(this, 0, 0);
      accept(canvas.toDataURL());
    });
  }

  // loadImageFile('myimage.jpg').then(string64 => { alert(string64); });
}


