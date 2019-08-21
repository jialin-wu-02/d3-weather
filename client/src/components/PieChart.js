import React, { Component } from 'react';
import * as d3 from "d3";

class PieChart extends Component {


  componentDidMount = () => {
    var width = 500
    let height = 600

    // append the svg object to the div called 'my_dataviz'
    var svg = d3.select("#PieChart")
    .append("svg")
        .attr("width", width)
        .attr("height", height)
    .append("g")
        .attr("transform", "translate(" + width / 2+ "," + height / 2 + ")");

    var svg1 = d3.select("#PieChart")
    .append("svg")
        .attr("width", width)
        .attr("height", height)
    .append("g")
        .attr("transform", "translate(" + width / 2+ "," + height / 2 + ")");
    
    // Create dummy data
    var data = {a: 1, b: 1, c:1, d:1, e:1, f:1, g:1, h:1, i:1, j:1, k:1, l: 1}

    // calculate current hour:
    var date = new Date(this.props.hourly[0].time * 1000);
    var hour = date.getHours();

    // calculate the average of the data:
    var sum = 0;
    var sum1 = 0;
    var sum2 = 0;
    for (let j = 0; j < 24; j++) {
      sum += this.props.hourly[j].temperature;
      j < 12 ? sum1 += this.props.hourly[j].temperature : sum2 += this.props.hourly[j].temperature;
    }
    var average1 = sum1 / 12;
    var average2 = sum2 / 12;
    var average = sum / 24;

    var dataHeightArray1 = []
    var dataHeightArray2 = []

    var weatherColorMAP = {
      "clear-day": "#f5d442",
      "clear-night": "#f5d442",
      "cloudy": "#87fae3",
      "partly-cloudy-day": "#87fae3",
      "partly-cloudy-night": "#87fae3",
      "rain": "#93cafa"
    }
    var weatherColor1 = [];
    var weatherColor2 = [];
    // adding height and color together
    for (let i = 0; i < 12; i++) {
      dataHeightArray1[(i + hour) % 12] = (this.props.hourly[i].temperature - average) * 8 + 190;
      weatherColor1[(i + hour) % 12] = weatherColorMAP[(this.props.hourly[i].icon)]
    }
    for (let i = 12; i < 24; i++) {
      dataHeightArray2[(i + hour) % 12] = (this.props.hourly[i].temperature - average) * 8 + 190;
      weatherColor2[(i + hour) % 12] = weatherColorMAP[(this.props.hourly[i].icon)]
    }

    var dataHeight1 = d3.scaleOrdinal()
    .domain(data)
    .range(dataHeightArray1)
  
    var dataHeight2 = d3.scaleOrdinal()
    .domain(data)
    .range(dataHeightArray2)

    // set the color scale
    var color1 = d3.scaleOrdinal()
    .domain(data)
    .range(weatherColor1)

    // set the color scale
    var color2 = d3.scaleOrdinal()
    .domain(data)
    .range(weatherColor2)


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
        .outerRadius(function(d){ return (dataHeight1(d.data.key))})
    )
    .attr('fill', function(d){ return(color1(d.data.key)) })
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.7)

    svg1
    .selectAll('whatever')
    .data(data_ready)
    .enter()
    .append('path')
    .attr('d', d3.arc()
        .innerRadius(130)
        .outerRadius(function(d){ return (dataHeight2(d.data.key))})
    )
    .attr('fill', function(d){ return(color2(d.data.key)) })
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