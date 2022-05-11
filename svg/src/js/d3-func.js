let d3 = {};
if (window.require) {
  d3 = require('../../node_modules/d3/dist/d3.js');
}

const initD3Root = ({selector, width, height}) => {
  return d3.select(selector).attr('width', width).attr('height', height);
};

const d3Mouse = (selector) => {
  return d3.mouse(d3.select(selector).node())
    .map(d => d + 10)
};

export {
  d3,
  initD3Root,
  d3Mouse,
}