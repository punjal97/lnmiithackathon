{% block content %}
// Various accessors that specify the four dimensions of data to visualize.
	function x1(d) { return d.users; }
	function y1(d) { return d.lifeExpectancy; }
	function radius(d) { return d.population; }
	function color2(d) { return d.name; }
	function key(d) { return d.name; }

	// Chart dimensions.
	var margin1 = {top: 19.5, right: 19.5, bottom: 19.5, left: 39.5},
		width = 960 - margin1.right,
		height = 450 - margin1.top - margin1.bottom;

	// Various scales. These domains make assumptions of data, naturally.
	var xScale1 = d3.scale.log().domain([50000, 5000000000]).range([0, width]),
		yScale1 = d3.scale.linear().domain([44, 85]).range([height, 0]),
		radiusScale = d3.scale.sqrt().domain([50, 5e8]).range([0, 40]),
		colorScale = d3.scale.category20();

	// The x & y axes.
	var xAxis1 = d3.svg.axis().orient("bottom").scale(xScale1).ticks(6, d3.format(",d")),
		yAxis1 = d3.svg.axis().scale(yScale1).orient("left");

	// Create the SVG container and set the origin.
	var svg1 = d3.select("#chart-01").append("svg")
		.attr("width", "100%")
		.attr("height", "100%")
		.attr("preserveAspectRatio", "xMinYMin meet")
		.attr("viewBox", "0 0 1300 500")
	  .append("g")
		.attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");

	// Add the x-axis.
	svg1.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis1);

	// Add the y-axis.
	svg1.append("g")
		.attr("class", "y axis")
		.call(yAxis1);

	// Add an x-axis label.
	svg1.append("text")
		.attr("class", "x label")
		.attr("text-anchor", "end")
		.attr("x", width)
		.attr("y", height - 6)
		.text("Internet Users");

	// Add a y-axis label.
	svg1.append("text")
		.attr("class", "y label")
		.attr("text-anchor", "end")
		.attr("y", 6)
		.attr("dy", ".75em")
		.attr("transform", "rotate(-90)")
		.text("life expectancy (years)");

	// Add the year label; the value is set on transition.
	var label = svg1.append("text")
		.attr("class", "year label")
		.attr("text-anchor", "end")
		.attr("y", height - 24)
		.attr("x", width)
		.text(2000);

	// Load the data.
	d3.json("/static/geojson/nations.json", function(nations) {

	  // A bisector since many nation's data is sparsely-defined.
	  var bisect = d3.bisector(function(d) { return d[0]; });

	  // Add a dot per nation. Initialize the data at 1800, and set the colors.
	  var dot = svg1.append("g")
		  .attr("class", "dots")
		.selectAll(".dot")
		  .data(interpolateData(2000))
		.enter().append("circle")
		  .attr("class", "dot")
		  .style("fill", function(d) { return colorScale(color2(d)); })
		  .call(position)
		  .sort(order);

	  // Add a title.
	  dot.append("title")
		  .text(function(d) { return d.name; });

	  // Add an overlay for the year label.
	  var box = label.node().getBBox();

	  var overlay = svg1.append("rect")
			.attr("class", "overlay")
			.attr("x", box.x)
			.attr("y", box.y)
			.attr("width", box.width)
			.attr("height", box.height)
			.on("mouseover", enableInteraction);

	  // Start a transition that interpolates the data based on year.
	  svg1.transition()
		  .duration(30000)
		  .ease("linear")
		  .tween("year", tweenYear)
		  .each("end", enableInteraction);

	  // Positions the dots based on data.
	  function position(dot) {
		dot .attr("cx", function(d) { return xScale1(x1(d)); })
			.attr("cy", function(d) { return yScale1(y1(d)); })
			.attr("r", function(d) { return radiusScale(radius(d)); });
	  }

	  // Defines a sort order so that the smallest dots are drawn on top.
	  function order(a, b) {
		return radius(b) - radius(a);
	  }

	  // After the transition finishes, you can mouseover to change the year.
	  function enableInteraction() {
		var yearScale = d3.scale.linear()
			.domain([2000, 2015])
			.range([box.x + 10, box.x + box.width - 10])
			.clamp(true);

		// Cancel the current transition, if any.
		svg1.transition().duration(0);

		overlay
			.on("mouseover", mouseover)
			.on("mouseout", mouseout)
			.on("mousemove", mousemove)
			.on("touchmove", mousemove);

		function mouseover() {
		  label.classed("active", true);
		}

		function mouseout() {
		  label.classed("active", false);
		}

		function mousemove() {
		  displayYear(yearScale.invert(d3.mouse(this)[0]));
		}
	  }

	  // Tweens the entire chart by first tweening the year, and then the data.
	  // For the interpolated data, the dots and label are redrawn.
	  function tweenYear() {
		var year = d3.interpolateNumber(2000, 2015);
		return function(t) { displayYear(year(t)); };
	  }

	  // Updates the display to show the specified year.
	  function displayYear(year) {
		dot.data(interpolateData(year), key).call(position).sort(order);
		label.text(Math.round(year));
	  }

	  // Interpolates the dataset for the given (fractional) year.
	  function interpolateData(year) {
		return nations.map(function(d) {
		  return {
			name: d.name,
			region: d.region,
			users: interpolateValues(d.users, year),
			population: interpolateValues(d.population, year),
			lifeExpectancy: interpolateValues(d.lifeExpectancy, year)
		  };
		});
	  }

	  // Finds (and possibly interpolates) the value for the specified year.
	  function interpolateValues(values, year) {
		var i = bisect.left(values, year, 0, values.length - 1),
			a = values[i];
		if (i > 0) {
		  var b = values[i - 1],
			  t = (year - a[0]) / (b[0] - a[0]);
		  return a[1] * (1 - t) + b[1] * t;
		}
		return a[1];
	  }
	  
	  var legen1 = sc.selectAll(".legend")
      .data(colorScale.domain())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  // draw legend colored rectangles
  legen1.append("rect")
      .attr("x", width1 - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", colorScale);

  // draw legend text
  legen1.append("text")
      .attr("x", width1 - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d.name;})
	});
{% endblock %}
