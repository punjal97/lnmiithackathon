var data = {
  labels: [
      'China','India', 'United States','Brazil', 'Japan',
      'Russia','Nigeria','Indonesia', 'Germany','UK',
	  'Mexico','France','Egypt','Phillipines',
	  'Iran','Turkey','Vietnam','Korea','Bangladesh','Italy'
  ],
  series: [
    {
      label: 'Internet Users',
      values: [674,354,280.74,117.65,114.96,103.14,92.69,73,71.72,59.33,59.20,55.42,48.30,47.13,46.80,46.28,45.57,45.31,44.62,37.66]
    },
    {
      label: 'Population',
      values: [1361.51,1251.69,321.36,204.25,126.91,146.26,181.56,255.99,81.17,64.76,121.73,66.13,88.48,109.61,81.82,77.69,94.34,49.11,168.95,60.79]
    }]
};

var chart2Width      = 600,
    bar2Height       = 12,
    groupHeight      = bar2Height * data.series.length,
    gapBetweenGroups = 10,
    spaceForLabels   = 150,
    spaceForLegend   = 150;

// Zip the series data together (first values, second values, etc.)
var zippedData = [];
for (var i=0; i<data.labels.length; i++) {
  for (var j=0; j<data.series.length; j++) {
    zippedData.push(data.series[j].values[i]);
  }
}

// Color scale
var color1 = d3.scale.ordinal()
    .range(["#59a5e5","#00e500"]);

var chart2Height = bar2Height * zippedData.length + gapBetweenGroups * data.labels.length;

var x2 = d3.scale.linear()
    .domain([0, d3.max(zippedData)])
    .range([0, chart2Width]);

var y2 = d3.scale.linear()
    .range([chart2Height + gapBetweenGroups, 0]);

var yAxis2 = d3.svg.axis()
    .scale(y2)
    .tickFormat('')
    .tickSize(0)
    .orient("left");

// Specify the chart area and dimensions
var chart2 = d3.select(".chart")
    .attr("width", "100%")
    .attr("height", "100%")
	.attr("preserveAspectRatio", "xMinYMin meet")
	.attr("viewBox", "0 0 900 700");

// Create bars
var bar2 = chart2.selectAll("g")
    .data(zippedData)
    .enter().append("g")
    .attr("transform", function(d, i) {
      return "translate(" + spaceForLabels + "," + (i * bar2Height + gapBetweenGroups * (0.5 + Math.floor(i/data.series.length))) + ")";
    });

// Create rectangles of the correct width
bar2.append("rect")
    .attr("fill", function(d,i) { return color1(i % data.series.length); })
    .attr("class", "bar")
    .attr("width", x2)
    .attr("height", bar2Height - 1);

// Add text label in bar
bar2.append("text")
    .attr("x", function(d) { return x2(d) - 3; })
    .attr("y", bar2Height / 2)
    .attr("fill", "red")
    .attr("dy", ".35em")
    .text(function(d) { return d; });

// Draw labels
bar2.append("text")
    .attr("class", "label")
    .attr("x", function(d) { return - 10; })
    .attr("y", groupHeight / 2)
    .attr("dy", ".35em")
    .text(function(d,i) {
      if (i % data.series.length === 0)
        return data.labels[Math.floor(i/data.series.length)];
      else
        return ""});

chart2.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + spaceForLabels + ", " + -gapBetweenGroups/2 + ")")
      .call(yAxis2);

// Draw legend
var legend2RectSize = 18,
    legend2Spacing  = 4;

var legend2 = chart2.selectAll('.legend')
    .data(data.series)
    .enter()
    .append('g')
    .attr('transform', function (d, i) {
        var height = legend2RectSize + legend2Spacing;
        var offset = -gapBetweenGroups/2;
        var horz = spaceForLabels + chart2Width + 40 - legend2RectSize;
        var vert = i * height - offset;
        return 'translate(' + horz + ',' + vert + ')';
    });

legend2.append('rect')
    .attr('width', legend2RectSize)
    .attr('height', legend2RectSize)
    .style('fill', function (d, i) { return color1(i); })
    .style('stroke', function (d, i) { return color1(i); });

legend2.append('text')
    .attr('class', 'legend')
    .attr('x', legend2RectSize + legend2Spacing)
    .attr('y', legend2RectSize - legend2Spacing)
    .text(function (d) { return d.label; });