// offset
const offset = (d, i, nodes) => {
  if (d.offset !== undefined) {
    return d.offset;
  } else {
    return `${(i / (nodes.length - 1)) * 100}%`;
  }
};

// color
const color = d => {
  return d.color !== undefined ? d.color : d;
};

// stopOpacity
const stopOpacity = d => {
  return d.opacity !== undefined ? d.opacity : 1;
};

/**
 * 基于d3的svg径向渐变色
 * @param d3Defs
 * @param id
 * @param x 百分比 渐变中心x
 * @param y 百分比 渐变中心y
 * @param r 百分比 渐变半径
 * @param focusPoint={fx,fy,fr}
 * @param colors [{color,offset}] or [color]
 */
const d3RadialGradient = ({d3Defs, id, x = '50%', y = '50%', r = '100%', focusPoint = {}, colors = []}) => {
  let d3Gradient = d3Defs.select(`radialGradient#${id}`);
  if (d3Gradient.size() > 0) d3Gradient.remove();

  const {
    fx = '50%',
    fy = '50%',
    fr = '0%',
  } = focusPoint;

  // 径向渐变容器
  d3Gradient = d3Defs.append('radialGradient')
    .attr('id', id)
    .attr('fx', fx) // 焦点中心x
    .attr('fy', fy) // 焦点中心y
    .attr('fr', fr) // 焦点半径 测试发现应该是百分比
    .attr('cx', x) // 径向渐变中心x
    .attr('cy', y) // 径向渐变中心y
    .attr('r', r); // 径向渐变半径r 测试发现应该是百分比

  // stop
  const stops = d3Gradient.selectAll('stop').data(colors);
  stops.enter()
    .append('stop')
    .merge(stops)
    .attr('offset', offset)
    .style('stop-color', color)
    .style('stop-opacity', stopOpacity);

  stops.exit().remove();

};

const d3LinearGradient = ({d3Defs, id, x1 = '50%', y1 = '0%', x2 = '50%', y2 = '100%', colors = []}) => {
  let d3Gradient = d3Defs.select(`linearGradient#${id}`);
  if (d3Gradient.size() > 0) d3Gradient.remove();

  // 线性渐变
  d3Gradient = d3Defs.append('linearGradient')
    .attr('id', id)
    .attr('x1', x1)
    .attr('y1', y1)
    .attr('x2', x2)
    .attr('y2', y2);

  // stop
  const stops = d3Gradient.selectAll('stop').data(colors);
  stops.enter()
    .append('stop')
    .merge(stops)
    .attr('offset', offset)
    .style('stop-color', color)
    .style('stop-opacity', stopOpacity);

  stops.exit().remove();

};

export {
  d3RadialGradient,
  d3LinearGradient,
}
