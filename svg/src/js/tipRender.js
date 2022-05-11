const tipRender = (selector) => {
  const tipDom = document.querySelector(selector);
  tipDom.style.position = "absolute";
  tipDom.style.display = 'none';
  return {
    show(x = 0, y = 0, content = '') {
      tipDom.style.display = 'block';
      tipDom.style.left = x + 'px';
      tipDom.style.top = y + 'px';
      tipDom.innerHTML = content;
    },
    hide() {
      tipDom.style.display = 'none';
      tipDom.style.left = 0;
      tipDom.style.top = 0;
      tipDom.innerHTML = '';
    },
    domElement() {
      return tipDom;
    }
  }
};

export {tipRender};