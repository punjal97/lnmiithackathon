var w = 400;
var h = 400;
var r = h/2;
var color = d3.scale.ordinal()
    .range(["#FFCC00","#FF3300","#229DD4","#333333","#00e500"]);

var data = [{"label":"Asia", "value":48.4}, 
		          {"label":"Americas (North and South)", "value":21.8},  
              {"label":"Europe",
"value":19},  
							{"label":"Africa", 
"value":9.8},
		          {"label":"Oceania", "value":1}];


var vis = d3.select('#chart-02').append("svg:svg").data([data]).attr("width", "100%")
    .attr("height", "100%")
	.attr("preserveAspectRatio", "xMinYMin meet")
	.attr("viewBox", "0 0 500 400")
	.append("svg:g")
	.attr("transform", "translate(" + r + "," + r + ")");
var pie = d3.layout.pie().value(function(d){return d.value;});

// declare an arc generator function
var arc = d3.svg.arc().outerRadius(r);

// select paths, use arc generator to draw
var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
arcs.append("svg:path")
    .attr("fill", function(d, i){
        return color(i);
    })
    .attr("d", function (d) {return arc(d);});

// add the text
arcs.append("svg:text").attr("transform", function(d){
			d.innerRadius = 0;
			d.outerRadius = r;
    return "translate(" + arc.centroid(d) + ")";}).attr("text-anchor", "middle").text( function(d, i) {
    return data[i].value;}
		).attr("fill","white");