var svgContainer,
    width = 600,
    height = 500,
    margin = {
        top: 20,
        right: 50,
        bottom: 20,
        left: 50
    },
    startPoint = {
        x: margin.left,
        y: margin.top + height
    },
    xAxisLength = 550,
    yAxisLength = 450,
    scale = 1;

function init() {
    svgContainer = d3.select("body").append("svg")
    .attr("width", margin.left + width + margin.right)
    .attr("height", margin.top + height + margin.bottom);

    drawAxes(xAxisLength, yAxisLength, startPoint, scale);
}

function drawAxes(xLength, yLength, startPoint, scale) {
    var xScale = d3.scaleLinear().domain([0, xLength]).range([0, xLength]);
    var yScale = d3.scaleLinear().domain([0, yAxisLength/scale]).range([yLength, 0]);
    var xAxis = d3.axisBottom().scale(xScale);
    var yAxis = d3.axisLeft().scale(yScale);

    var yAxisGroup = svgContainer
        .append("g")
        .attr('class', 'axis')
        .attr('transform', 'translate(' + startPoint.x + ',' + margin.top * 3.5 + ')')
        .call(yAxis);

    var xAxisGroup = svgContainer
        .append("g")
        .attr('class', 'axis')
        .attr('transform', 'translate(' + startPoint.x + ',' + startPoint.y + ')')
        .call(xAxis);
}