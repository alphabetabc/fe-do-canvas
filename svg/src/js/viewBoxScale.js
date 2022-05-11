const viewBoxScale = (o = {}) => {
  const {
    svgSize = [],
    viewBoxConfig = [],
  } = o;

  const [svgWidth, svgHeight] = svgSize;
  const [x, y, width, height] = viewBoxConfig;

  let scale = 1;

  const vw = width - x;
  const vh = height - y;

  if (vw / vh >= svgWidth / svgHeight) {
    scale = svgWidth / vw;
  } else {
    scale = svgHeight / vh;
  }

  return scale;

};


export {
  viewBoxScale,
}