function createElement(tagName) {
  return document.createElement(tagName);
}


function append(parentElement, childElements) {
  if (childElements.length) {
    childElements.forEach(childElement => {
      parentElement.appendChild(childElement);
    });
  } else {
    parentElement.appendChild(childElements);
  }
}

function select(selector) {
  return document.querySelector(selector);
}

class CanvasCtx {
  constructor(selector) {
    let me = this;
    me._initCanvas(selector);
  }

  get ctx() {
    return this._ctx
  }

  get context() {
    return this._ctx
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  _initCanvas(selector) {
    let me = this;
    let wrap = document.querySelector(selector);
    let canvas = createElement('canvas');

    let width = wrap.clientWidth;
    let height = wrap.clientHeight;

    canvas.width = width;
    canvas.height = height;

    append(wrap, canvas);

    if (canvas.getContext) {
      me._ctx = canvas.getContext('2d');
      me._width = width;
      me._height = height;
    } else {
      console.error('canvas-unsupported !!!!')
    }
  }
}

