const select = d3.select
const arc = d3.arc

let percentage = 40


const CANVAS_SIZE = 600
const CANVAS_GAP = CANVAS_SIZE / 10
const START_RADIAN = -110
const CIRCLE_OFFSET_TOP = CANVAS_SIZE / 10
const WIDTH = CANVAS_SIZE - CANVAS_GAP
const ARC_THICKNESS = WIDTH / 40
const END_RADIAN = -START_RADIAN
const END_PERCENT_RADIAN = (Math.abs(START_RADIAN) + Math.abs(END_RADIAN)) * (percentage / 100) - Math.abs(START_RADIAN)
const HEAD_RADIUS = WIDTH / 25;

let getColor = function (percentage) {

  return {
    full: '#84C400',
    hollow: '#B4BBC5'
  }
}

let toRadians = function (deg){
  return deg * (Math.PI / 180);
};

var svgContainer = d3.select("body").append("svg")
  .attr("width", CANVAS_SIZE)
  .attr("height", CANVAS_SIZE)
  .append("g")
  .attr("transform", `translate(${ CANVAS_SIZE / 2 }, ${ CANVAS_SIZE / 2 + CIRCLE_OFFSET_TOP })`);

var outerRadius = 40;
var stroke = 5;


var outerArc = d3.arc()
.innerRadius(WIDTH / 2)
.outerRadius(WIDTH / 2)
.startAngle(toRadians(END_PERCENT_RADIAN)) //treba videti tacno gde mi pocinje ali to je to!
.endAngle(toRadians(END_RADIAN));

var path = svgContainer.append("path")
.style("fill", "none")
.style("stroke", 'grey')
.style("stroke-width", ARC_THICKNESS)
.attr('stroke-linejoin', 'round')
.attr("d", outerArc());


var innerArc = d3.arc()
  .innerRadius(WIDTH / 2)
  .outerRadius(WIDTH / 2)
  .startAngle(toRadians(START_RADIAN))
  .endAngle(toRadians(END_PERCENT_RADIAN));



  var path = svgContainer.append("path")
.style("fill", "none")
.style("stroke", getColor().full)
.style("stroke-width", ARC_THICKNESS)
.attr('stroke-linejoin', 'round')
.attr("d", innerArc());

var point = path.node().getPointAtLength(path.node().getTotalLength() / 2);

var crc = svgContainer.append("circle")
  .attr("fill", getColor().full)
  .attr("cx", point.x)
  .attr("cy", point.y)
  .attr("r", HEAD_RADIUS);

var crc = svgContainer.append("circle")
.attr("fill", "#ffffff")
.attr("cx", point.x)
.attr("cy", point.y)
.attr("r", HEAD_RADIUS - ARC_THICKNESS);
