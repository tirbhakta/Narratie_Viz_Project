function aggregate(json_array){
    
	var total_confirmed = 0
	var total_recovered = 0
	var total_deaths = 0
	for(i=0; i<json_array.length;i++){
		total_confirmed += parseInt(json_array[i]['total_confirmed']);
		total_recovered += parseInt(json_array[i]['total_recovered']);
		total_deaths += parseInt(json_array[i]['total_deaths']);
	}
	var total_active = total_confirmed - total_recovered - total_deaths;
	return [total_confirmed, total_recovered, total_deaths, total_active];    
}

function formatNumberWithComma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function worldSummary(){
	
	var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

	// append the svg object to the body of the page
	var svg = d3.select("#barplotDiv")
	  .append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	  .append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
			  
	// read data from csv
    d3.csv("https://raw.githubusercontent.com/tirbhakta/Narrative_Viz_Project/e31a339a05e4eb3ea739d72847a70238aab8a0d1/World_Covid_Data.csv", function(data) {
        
        var aggregation = aggregate(data)        

        // X axis
        var domain_array = ['Confirmed', 'Recovered', 'Deaths', 'Active'];
        var colors = ["rgb(17, 167, 237)", "rgb(240, 247, 20)", "rgb(247, 20, 58)", "rgb(17, 237, 64)"]
        var x = d3.scaleBand()
            .range([ 0, width ])
            .domain(domain_array)
            .padding(1);

        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end")
            .style('fill', 'blue');

        // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, aggregation[0]])
            .range([ height, 0]);
		
		svg.append("g")
		.call(d3.axisLeft(y));

        // Bars
        svg.selectAll("mybar")
        .data(aggregation)
        .enter()
        .append("rect")
            .attr("x", function(d,i) { return x(domain_array[i]); })
            //.attr("x2", function(d,i) { return x(domain_array[i]); })
            .attr("y", function(d,i) { return y(aggregation[i]); })
            //.attr("y2", y(0))
		.attr("width", x.bandwidth())
		.attr("height", function(d) { return height - y(d.Value); })
            .attr("fill", "blue");

        // Circles
        svg.selectAll("mycircle")
        .data(aggregation)
        .enter()
        .append("circle")
            .attr("cx", function(d,i) { return x(domain_array[i]); })
            .attr("cy", function(d,i) { return y(aggregation[i]); })
            .attr("r", "8")
            .style("fill", "#69b3a2")
            .attr("stroke", "black");

        svg.selectAll('body')
            .data(aggregation)
            .enter()
            .append('text')
            .text(function(d,i){
                return formatNumberWithComma(aggregation[i]);
            })
            .style('fill','black')
            .attr('x', function(d,i){ return x(domain_array[i])})
            .attr('y', function(d,i){ return y(aggregation[i])});
    });
}
