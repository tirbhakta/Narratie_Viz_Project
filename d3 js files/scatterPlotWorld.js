// function to generate random colors
var randomColor = (function(){
  var golden_ratio = 0.618033988749895;
  var h = Math.random();

  var hslToRgb = function (h, s, l){
      var r, g, b;

      if(s == 0){
          r = g = b = l; // achromatic
      }else{
          function hue2rgb(p, q, t){
              if(t < 0) t += 1;
              if(t > 1) t -= 1;
              if(t < 1/6) return p + (q - p) * 6 * t;
              if(t < 1/2) return q;
              if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
              return p;
          }

          var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          var p = 2 * l - q;
          r = hue2rgb(p, q, h + 1/3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1/3);
      }

      return '#'+Math.round(r * 255).toString(16)+Math.round(g * 255).toString(16)+Math.round(b * 255).toString(16);
  };
  return function(){
    h += golden_ratio;
    h %= 1;
    return hslToRgb(h, 0.5, 0.60);
  };
})();

// function to generate the Scatterplot graph
function scatterPlotWorld(){

    // new graph
	// Set the dimensions of the canvas / graph
	var margin = {top: 20, right: 10, bottom: 40, left: 160},
	    width = 820 - margin.left - margin.right,
	    height = 420 - margin.top - margin.bottom;

	// append the svg object to the body of the page
	var svg = d3.select("#scatterplotDiv")
  	.append("svg")
    	.attr("width", width + margin.left + margin.right)
    	.attr("height", height + margin.top + margin.bottom)
  	.append("g")
    	.attr("transform","translate(" + margin.left + "," + margin.top + ")");	
	
	var div = d3.select("body").append("div")
     	.attr("class", "tooltip")
     	.style("opacity", 0);

	// Read the data from csv
	d3.csv("https://raw.githubusercontent.com/tirbhakta/Narrative_Viz_Project/e31a339a05e4eb3ea739d72847a70238aab8a0d1/World_Covid_Data.csv", function(data) {
	  
		  // Add X axis
	  	var x = d3.scaleLog()
	    	.domain([10, 100000000])
	    	.range([ 0, width ]);
	  	svg.append("g")
	    	.attr("transform", "translate(0," + height + ")")
	    	.call(d3.axisBottom(x))
			.select(".domain").remove();

	  	// Add Y axis
	  	var y = d3.scaleLog()
	    	.domain([10, 100000000])
	    	.range([ height, 0]);
	  	svg.append("g")
	    	.call(d3.axisLeft(y))
		.select(".domain").remove();
		
		// Add X axis label:
  		svg.append("text")
      		.attr("text-anchor", "end")
	      	.attr("x", width/2 + margin.left)
	      	.attr("y", height + margin.top + 20)
	      	.text("Total Recovered");

	  	// Y axis label:
	  	svg.append("text")
	      	.attr("text-anchor", "end")
	      	.attr("transform", "rotate(-90)")
	      	.attr("y", -margin.left + 20)
	      	.attr("x", -margin.top - height/2 + 5)
	      	.text("Total Affected");
			
		// set color scale
		//var color = d3.scaleOrdinal(d3.schemeCategory40);
		//var color = d3.scaleOrdinal().domain(data).range(d3.schemeSet3);
		
		// Add dots
  		svg.append('g')
    		.selectAll("dot")
	    	.data(data)
	    	.enter()
	    	.append("circle")
	      	.attr("cx", function (d) { return x(d.total_recovered); } )
	      	.attr("cy", function (d) { return y(d.total_confirmed); } )
	      	.attr("r", 5)
	      	.style("fill", function(d) { return randomColor(); })		
		// Add label on mouse-hover
		.on('mouseover', function (d, i) {
			d3.select(this).transition()
			.duration('100')
			.attr("r", 6);
		  	div.transition()
		       .duration(100)
		       .style("opacity", 1);
		  	div.html(d.location, d.total_recovered)
		       .style("left", (d3.event.pageX + 10) + "px")
		       .style("top", (d3.event.pageY - 15) + "px");
	     	})  
		// add for mouse out
		.on('mouseout', function (d, i) {
          		d3.select(this).transition()
		       .duration('200')
		       .attr("r", 4.5);
          		div.transition()
               		.duration('200')
               		.style("opacity", 0);
		})
		
	  });

}
