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

function worldRace(all){
    //Using this selection to update the SVG everytime the function is called
    d3.selectAll('#worldRace').selectAll('*').remove()

    d3.csv("https://raw.githubusercontent.com/tirbhakta/Narrative_Viz_Project/e31a339a05e4eb3ea739d72847a70238aab8a0d1/World_Covid_Data.csv", function(data) {
        
        var aggregation = aggregate(data)

        // set the dimensions and margins of the graph
        var margin = {top: 10, right: 30, bottom: 0, left: 30},
            width = document.getElementById('worldRaceDiv').offsetWidth - margin.left - margin.right,
            height = document.getElementById('worldRaceDiv').offsetHeight*0.8 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        var svg = d3.selectAll("#worldRace")
            .append("svg")
                .attr("width", document.getElementById('worldRaceDiv').offsetWidth + margin.left + margin.right)
                .attr("height", document.getElementById('worldRaceDiv').offsetHeight*1.2 + margin.top + margin.bottom)
            .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

        // X axis
        var domain_array = ['Confirmed Cases', 'Recovered Cases', 'Covid Deaths', 'Active Cases'];
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
            .style('fill', 'white')
            .style('stroke-width',1.0)
	    .style('font-size','10px");

        // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, aggregation[0]])
            .range([ height, 90]);

        // Lines
        svg.selectAll("myline")
        .data(aggregation)
        .enter()
        .append("line")
            .attr("x1", function(d,i) { return x(domain_array[i]); })
            .attr("x2", function(d,i) { return x(domain_array[i]); })
            .attr("y1", function(d,i) { return y(aggregation[i]); })
            .attr("y2", y(0))
            .attr("stroke", function(d,i){
                return colors[i]
            })
            .style('stroke-width', 20);

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
            .style('fill','white')
            .attr('x', function(d,i){ return x(domain_array[i])})
            .attr('y', function(d,i){ return y(aggregation[i])})
            .style('font-size', 0.002*width + 'px');

    });
}
