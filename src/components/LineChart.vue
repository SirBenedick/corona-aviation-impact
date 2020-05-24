<template>
  <div>
    <h1>this is a line chart hahahaha</h1>
    <b>{{ countryName }}</b>
    {{ typeOfFlights }}
    <div id="my_dataviz"></div>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  props: {
    countryName: { default: "World", type: String, required: true },
    typeOfFlights: {
      default: "internationalFlights",
      type: String,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    createLineChart() {
      // Use the margin convention practice
      var margin = { top: 50, right: 50, bottom: 50, left: 50 },
        width = window.innerWidth / 2 - margin.left - margin.right, // Use the window's width
        height = window.innerHeight / 2 - margin.top - margin.bottom; // Use the window's height

      // The number of datapoints
      var n = 31;

      // X scale will use the index of our data
      var xScale = d3
        .scaleLinear()
        .domain([0, n - 1]) // input
        .range([0, width]); // output

      // Y scale will use the randomly generate number
      var yScale = d3
        .scaleLinear()
        .domain([-100, 50]) // input
        .range([height, 0]); // output

      // d3's line generator
      var line = d3
        .area()
        .x(function(d, i) {
          return xScale(i);
        }) // set the x values for the line generator
        .y(function(d) {
          return yScale(d.y);
        }) // set the y values for the line generator
        .curve(d3.curveMonotoneX); // apply smoothing to the line

      // An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
      var dataset = d3.range(n).map(function(d) {
        return { y: d3.randomUniform(-80, 50)(), x: 0 };
      });

      // Add the SVG to the page and employ #2
      var svg = d3
        .create("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

      svg
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Call the x axis in a group tag
      svg
        .select("g")
        .append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height / 2 + ")")
        .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

      // Call the y axis in a group tag
      svg
        .select("g")
        .append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

      // Append the path, bind the data, and call the line generator
      svg
        .select("g")
        .append("path")
        .datum(dataset) // 10. Binds data to the line
        .attr("class", "line") // Assign a class for styling
        .attr("d", line); // 11. Calls the line generator

      // Appends a circle for each datapoint
      svg
        .select("g")
        .selectAll(".dot")
        .data(dataset)
        .enter()
        .append("circle") // Uses the enter().append() method
        .attr("class", "dot") // Assign a class for styling
        .attr("cx", function(d, i) {
          return xScale(i);
        })
        .attr("cy", function(d) {
          return yScale(d.y);
        })
        .attr("r", 5)
        .on("mouseover", function(a, b, c) {
          // this.attr("class", "focus");
        })
        .on("mouseout", function() {});

      var focus = svg
        .select("g")
        .append("g")
        .append("circle")
        .style("fill", "none")
        .attr("stroke", "black")
        .attr("r", 8.5)
        .style("opacity", 0);

      return svg.node();
    }
  },
  mounted() {
    let chart = this.createLineChart();
    document.getElementById("my_dataviz").appendChild(chart);
  }
};
</script>

<style>
/* Style the lines by removing the fill and applying a stroke */
.line {
  fill: none;
  stroke: #ffab00;
  stroke-width: 3;
}

.overlay {
  fill: none;
  pointer-events: all;
}

/* Style the dots by assigning a fill and stroke */
.dot {
  fill: #ffab00;
  stroke: #fff;
}

.focus circle {
  fill: none;
  stroke: steelblue;
}
</style>