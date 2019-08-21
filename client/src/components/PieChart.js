import React, { Component } from 'react';
import * as d3 from "d3";

// import './PieChart.css';

class PieChart extends Component {


  componentDidMount = () => {
    var width = 1000
    let height = 450
    let margin = 10

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin

    // append the svg object to the div called 'my_dataviz'
    var svg = d3.select("#PieChart")
    .append("svg")
        .attr("width", width)
        .attr("height", height)
    .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
    // Create dummy data
    var data = {a: 1, b: 1, c:1, d:1, e:1, f:1, g:1, h:1, i:1, j:1, k:1, l:1, m:1, n:1, o:1, p:1, q:1, r:1, s:1, t:1, u:1, v:1, w:1, x:1}

    // set the color scale
    var color = d3.scaleOrdinal()
    .domain(data)
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])

    // calculate the average of the data:
    var sum = 0;
    for (let j = 0; j < 24; j++) {
      sum += this.props.hourly[j].temperature;
    }
    var average = sum / 24;

    var dataHeightArray = []
    for (let i = 0; i < 24; i++) {
       dataHeightArray[i] = (this.props.hourly[i].temperature - average) * 8 + 190;
    }

    var dataHeight = d3.scaleOrdinal()
    .domain(data)
    .range(dataHeightArray)

    // Compute the position of each group on the pie:
    var pie = d3.pie()
    .value(function(d) {return d.value; })
    var data_ready = pie(d3.entries(data))

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
    .selectAll('whatever')
    .data(data_ready)
    .enter()
    .append('path')
    .attr('d', d3.arc()
        .innerRadius(130)
        .outerRadius(function(d){ return (dataHeight(d.data.key))})
    )
    .attr('fill', function(d){ return(color(d.data.key)) })
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.7)
  }
  
  render() {
      return (
        <div id="PieChart">

        </div>
      );
    }
  }

export default PieChart;