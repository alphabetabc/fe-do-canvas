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

class CanvasCtx{
  constructor(selector) {
    let me = this;
    me._initCanvas(selector);
  }

  get ctx() {
    return this._ctx
  }

  _initCanvas(selector) {
    let me = this;
    let wrap = document.querySelector(selector);
    let canvas = createElement('canvas');

    canvas.width = wrap.clientWidth;
    canvas.height = wrap.clientHeight;

    append(wrap, canvas);

    if (canvas.getContext) {
      me._ctx = canvas.getContext('2d');
    } else {
      console.error('canvas-unsupported !!!!')
    }
  }
}

