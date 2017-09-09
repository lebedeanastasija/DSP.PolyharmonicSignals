var colors = ["red", "brown", "blue", "purple", "yellow", "orange", "gray", "green", "crimson", "lavender", "indigo",
            "moccasin", "orchid", "plum", "silver", "tan", "red", "brown", "blue", "purple", "yellow", "orange",
            "gray", "green", "crimson", "lavender", "indigo", "moccasin", "orchid", "plum", "silver", "tan"];

var svgContainer,
    svgWidth = 600,
    svgHeight = 500,
    svgMargin = {
        top: 20,
        right: 50,
        bottom: 20,
        left: 50
    },
    startPoint = {
        x: svgMargin.left,
        y: Math.round((svgMargin.top + svgHeight)/2)
    },
    xAxisLength = 550,
    yAxisLength = 450,
    scale = 20,

    A1 = 10,
    A2 = 3,
    A3 = 1,
    N = 512,
    f1 = 2,
    f2 = 1,
    initialPhase = Math.PI / 2,
    initialPhases = [0, Math.PI / 6, Math.PI / 4, Math.PI / 2, Math.PI],
    f_s_1 = [5,4,2,6,3],
    f_s_2 = [1,2,3,4,5],
    k = 5,
    A_s = [2, 3, 6, 5, 1];

function init() {
    drawSvgContainer(svgWidth, svgHeight, svgMargin);
    drawAxes(xAxisLength, yAxisLength, startPoint, scale);
    // a
    //initialPhases.forEach((phase, i) => { drawPoints( variablePhaseHarmonicSignalVector(phase)(A1, N, f1), colors[i] ) });
    // b
    //f_s_1.forEach((oscillation, i) => { drawPoints( variableOscillationHarmonicSignalVector(oscillation)(A2, N, initialPhase), colors[i] ) });
    // c
    //A_s.forEach((amplitude, i) => { drawPoints( variableAmplitudeHarmonicSignalVector(amplitude)(f2, N, initialPhase), colors[i] ) });
    // d
    drawPoints(polyharmonicSignalVector(k, 256)([A3, A3, A3, A3, A3], f_s_2, initialPhases));
}

function polyharmonicSignalVector(harmonicsNumber, period) {
    return (amplitudes, oscillations, initPhases) => {
        let result = [];
        for(var n = 0; n < period*2; n++) {
            let y = 0;
            for (var k = 0; k < harmonicsNumber; k++) {
                y += harmonicSignal(initPhases[k], amplitudes[k], period, oscillations[k], n);
            }
            result.push({y: y, x: n})
        }
        return result;
    };
}

function harmonicSignal(initPhase, amplitude, period, oscillation, n) {
    return amplitude * Math.sin((2 * Math.PI * oscillation * n) / period + initPhase);
}

function variablePhaseHarmonicSignalVector(initPhase) {
    return (amplitude, period, oscillation) => {
        var result = [];
        for(var n = 0; n < period; n++) {
            var y = amplitude * Math.sin((2 * Math.PI * oscillation * n) / period + initPhase);
            result.push({y: y, x: n});
        }
        return result;
    }
}

function variableOscillationHarmonicSignalVector(oscillation) {
    return (amplitude, period, initPhase) => {
        var result = [];
        for(var n = 0; n < period; n++) {
            var y = amplitude * Math.sin((2 * Math.PI * oscillation * n) / period + initPhase);
            result.push({y: y, x: n});
        }
        return result;
    }
}

function variableAmplitudeHarmonicSignalVector(amplitude) {
    return (oscillation, period, initPhase) => {
        var result = [];
        for(var n = 0; n < period; n++) {
            var y = amplitude * Math.sin((2 * Math.PI * oscillation * n) / period + initPhase);
            result.push({y: y, x: n});
        }
        return result;
    }
}

function drawSvgContainer(width, height, margin) {
    svgContainer = d3.select("body").append("svg")
        .attr("width", margin.left + width + margin.right)
        .attr("height", margin.top + height + margin.bottom);
}

function drawAxes(xLength, yLength, startPoint, scale) {
    var xScale = d3.scaleLinear().domain([0, xLength]).range([0, xLength]);
    var yScale = d3.scaleLinear().domain([-1 * yAxisLength / scale / 2, yAxisLength / scale / 2]).range([yLength, 0]);
    var xAxis = d3.axisBottom().scale(xScale);
    var yAxis = d3.axisLeft().scale(yScale);
    var yAxisGroup = svgContainer
        .append("g")
        .attr('class', 'axis')
        .attr('transform', 'translate(' + startPoint.x + ',' + Math.round(svgMargin.top * 1.75) + ')')
        .call(yAxis);

    var xAxisGroup = svgContainer
        .append("g")
        .attr('class', 'axis')
        .attr('transform', 'translate(' + startPoint.x + ',' + startPoint.y + ')')
        .call(xAxis);
}

function drawPoints(functionResults, color) {
    functionResults.forEach( point => {
        drawPoint(point, color);
    });
}

function drawPoint(point, color, size) {
    svgContainer.append("circle")
        .attr("cx", point.x + startPoint.x)
        .attr("cy", startPoint.y - (point.y * scale))
        .attr("r", size || 1)
        .style("fill", color);
}