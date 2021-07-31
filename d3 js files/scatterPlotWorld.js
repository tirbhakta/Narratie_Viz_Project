

function scatterPlotWorld(){

    // new graph
	// Set the dimensions of the canvas / graph
	var margin = {top: 50, right: 20, bottom: 30, left: 80},
	    width = 940 - margin.left - margin.right,
	    height = 500 - margin.top - margin.bottom;

	// Set the ranges
	var x = d3.scaleLinear()
	    .range([0, width]);
	var y = d3.scaleLinear()
	    .range([height, 0]);

	var color = d3.scaleOrdinal(d3.schemeCategory10);

	// Define the axes
	var xa = d3.axisBottom(x);

	var ya = d3.axisLeft(y);

	// Add the svg canvas
	var svg = d3.select("#scatterplotDiv").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
		.append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// Read the data from csv
	d3.csv("https://raw.githubusercontent.com/tirbhakta/Narrative_Viz_Project/e31a339a05e4eb3ea739d72847a70238aab8a0d1/World_Covid_Data.csv", function(error, data) {
	  if (error) throw error;

	  data.forEach(function(d) {
	    d.total_confirmed = +d.total_confirmed;
	    d.location = +d.location;
	  });

	// Scale the range of the data
	  x.domain(d3.extent(data, function(d) { return d.location; })).nice();
	  y.domain(d3.extent(data, function(d) { return d.total_confirmed; })).nice();

	// Add the X-Axis
	  svg.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + height + ")")
	      .call(xa)
		  .append("text")
	      .attr("class", "label")
	      .attr("x", width)
	      .attr("y", -6)
	      .style("text-anchor", "end")
	      .text("Country");

	// Add the Y-Axis
	  svg.append("g")
	      .attr("class", "y axis")
	      .call(ya)
	    .append("text")
	      .attr("class", "label")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 6)
	      .attr("dy", ".71em")
	      .style("text-anchor", "end")
	      .text("Total Confirmed Cases")

	// Add the Scatterplot
	  svg.selectAll(".dot")
	      .data(data)
	    .enter().append("circle")
	      .attr("class", "dot")
	      .attr("r", 3.5)
	      .attr("cx", function(d) { return x(d.location); })
	      .attr("cy", function(d) { return y(d.total_confirmed); })
	      .style("fill", function(d) { return color(d.type); })
	      .on("mouseover", function(d){
        	  d3.selectAll('.dot')
            	   .filter(function(dot){ 
                    return (dot.type != d.type) 
                   })
                   .transition()
                   .style("opacity", 0.01)
          })
              .on("mouseout", function(d){
               d3.selectAll('.dot')
                .filter(function(dot){ 
                 return (dot.type != d.type) 
                })
                .transition()
                .style("opacity", 1)
          });	

	});
}
