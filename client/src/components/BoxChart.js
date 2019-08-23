import React, { Component } from 'react';
import * as d3 from "d3";

import './BoxChart.css'

class BoxChart extends Component {


  componentDidMount = () => {
    var width = 500
    let height = 600

    // append the svg object to the div called 'my_dataviz'
    var svg = d3.select("#BoxChart")
    .append("svg")
        .attr("width", width)
        .attr("height", height)
    .append("g")
        .attr("transform", "translate(" + width / 2+ "," + height / 2 + ")");
    
    const dateNameMap = {
        0: "Sun",
        1: "Mon",
        2: "Tue",
        3: "Wed",
        4: "Thur",
        5: "Fri",
        6: "Sat"
    }

    // convert unix time to day
    const unix2Day = (d) => {
        const date = new Date(d.time * 1000);
        return dateNameMap[date.getDay()];
    }

    // xScale is an object to map the input data's domain to the bar chart's range.
    const xScale = d3.scaleBand()
        .domain(this.props.daily.map(unix2Day))
        .range([0, width])
        .padding(0.1);
     
    // band scale data space => screen space
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(this.props.daily, d => d.temperatureHigh)])
        .range([0, height])

    console.log(xScale.domain());
    console.log(yScale.domain());
    console.log(xScale.range());
    console.log(yScale.range());
        
    
  }
  
  render() {
      return (
        <div id="BoxChart">

        </div>
      );
    }
  }

export default BoxChart;