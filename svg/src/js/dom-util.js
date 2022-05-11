const select = selector => document.querySelector(selector);
const createElement = (tagName, NS) => {
  if (NS) {
    return document.createElementNS(NS, tagName);
  } else {
    return document.createElement(tagName);
  }
};

const NS_SVG = 'http://www.w3.org/2000/svg';

export {
  NS_SVG,

  select,
  createElement,
}