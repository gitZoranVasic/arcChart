const select = d3.select
const arc = d3.arc

let percentage = 50
const CANVAS_SIZE = 150

// TODO: Kad se poveca treba da se podeblja linija
// TODO: Videti kako da centriram bolje
const svg = select('svg')
  .attr('width', CANVAS_SIZE)
  .attr('height', CANVAS_SIZE);

const WIDTH = +svg.attr('width')
const HEIGHT = +svg.attr('height')
const ARC_THICKNESS = WIDTH / 40
const ARC_RADIUS = WIDTH / 2 - 10
const START_RADIAN = -110
const END_RADIAN = -START_RADIAN
const PERCENTAGE_GAP = (500 * 0.8) / WIDTH;
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

const g = svg.append('g')
  .attr('transform', `translate(${ WIDTH / 2 }, ${ HEIGHT / 2 * 1.2 })`)
  
const circleBackground = g.append('path')
  .attr('d', arc()
    .cornerRadius(20)
    .innerRadius(ARC_RADIUS - ARC_THICKNESS)
    .outerRadius(ARC_RADIUS)
    .startAngle(toRadians(END_PERCENT_RADIAN))
    .endAngle(toRadians(END_RADIAN)))
    .attr('fill', getColor().hollow)


const circle = g.append('path')
  .attr('d', arc()
    .cornerRadius(20)
    .innerRadius(ARC_RADIUS - ARC_THICKNESS)
    .outerRadius(ARC_RADIUS)
    .startAngle(toRadians(START_RADIAN))
    .endAngle(toRadians(END_PERCENT_RADIAN)))
  .attr('fill', getColor().full)

let circleEndPoint = circle.node().getPointAtLength((circle.node().getTotalLength()) / 2);

console.log((circle.node().getTotalLength()));

// I want a head to begin where the line ends so it`s hollow inside
let circle_head_x_offset = 1
let circle_head_y_offset = 2

var circle_head = g.append("circle")
  .attr("fill", getColor().full)
  .attr("cx", circleEndPoint.x)
  .attr("cy", circleEndPoint.y)
  .attr("r", HEAD_RADIUS);

var circle_head = g.append("circle")
  .attr("fill", "#ffff")
  .attr("cx", circleEndPoint.x)
  .attr("cy", circleEndPoint.y)
  .attr("r", HEAD_RADIUS - ARC_THICKNESS + 1);

//   var circle_head = g.append("circle")
//   .attr("fill", getColor().full)
//   .attr("cx", circleEndPoint.x)
//   .attr("cy", circleEndPoint.y)
//   .attr("r", HEAD_RADIUS);

// var circle_head = g.append("circle")
//   .attr("fill", "#ffff")
//   .attr("cx", circleEndPoint.x)
//   .attr("cy", circleEndPoint.y)
//   .attr("r", HEAD_RADIUS - ARC_THICKNESS + 1);


