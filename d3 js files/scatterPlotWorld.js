

function scatterPlotWorld(){

    // new graph
	// Set the dimensions of the canvas / graph
	var margin = {top: 20, right: 20, bottom: 20, left: 40},
	    width = 940 - margin.left - margin.right,
	    height = 500 - margin.top - margin.bottom;

	// append the svg object to the body of the page
	var svg = d3.select("#scatterplotDiv")
  	.append("svg")
    	.attr("width", width + margin.left + margin.right)
    	.attr("height", height + margin.top + margin.bottom)
  	.append("g")
    	.attr("transform","translate(" + margin.left + "," + margin.top + ")");
	
	var color = d3.scaleOrdinal(d3.schemeCategory10);	

	// Read the data from csv
	d3.csv("https://raw.githubusercontent.com/tirbhakta/Narrative_Viz_Project/e31a339a05e4eb3ea739d72847a70238aab8a0d1/World_Covid_Data.csv", function(error, data) {
	  if (error) throw error;

		  // Add X axis
	  	var x = d3.scaleLinear()
	    	.domain([0, 4000])
	    	.range([ 0, width ]);
	  	svg.append("g")
	    	.attr("transform", "translate(0," + height + ")")
	    	.call(d3.axisBottom(x));

	  	// Add Y axis
	  	var y = d3.scaleLinear()
	    	.domain([0, 500000])
	    	.range([ height, 0]);
	  	svg.append("g")
	    	.call(d3.axisLeft(y));
		
		// Add dots
  		svg.append('g')
    		.selectAll("dot")
	    	.data(data)
	    	.enter()
	    	.append("circle")
	      	.attr("cx", function (d) { return x(d.total_recovered); } )
	      	.attr("cy", function (d) { return y(d.total_confirmed); } )
	      	.attr("r", 2.5)
	      	.style("fill", function(d) { return color(d.type); })
		
	  });

}
