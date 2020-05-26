<template>
  <div>
    <b>{{ countryName }}</b>
    {{countryCode}}
    <div id="corona_chart"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
import FlightService from "../services/FlightService";

export default {
  props: {
    countryName: { default: "World", type: String, required: true },
    countryCode: { default: "", type: String, required: true }
  },
  data() {
    return {};
  },
  watch: {
    typeOfFlights: function(newQuestion, oldQuestion) {
      this.createLineChart();
    },
    countryName: function(newQuestion, oldQuestion) {
      this.createLineChart();
    }
  },
  methods: {
    createLineChart() {
      let countryData = FlightService.getFlightDataByCountryCode(
        this.countryCode
      );

      let dataset = countryData.map((element, i) => {
        let average = 0;

        if (i < 3) {
          for (let j = i; j <= i + 6; j++) {
            let cases = parseInt(countryData[j]["coronaCases"]["Cases"]);
            cases = cases ? cases : 0;
            average += cases;
          }
        } else if (i >= countryData.length - 3) {
          for (let j = i; j <= i - 6; j--) {
            let cases = parseInt(countryData[j]["coronaCases"]["Cases"]);
            cases = cases ? cases : 0;
            average += cases;
          }
        } else {
          for (let j = i - 3; j <= i + 3; j++) {
            let cases = parseInt(countryData[j]["coronaCases"]["Cases"]);
            cases = cases ? cases : 0;
            average += cases;
          }
          average = average / 7;
        }
        console.log(average);

        if (average === 0) {
          return { y: 0, x: element["timestamp"] * 1000 };
        }
        // let cases = parseInt(countryData[i]["coronaCases"]["Cases"])

        // console.log(cases ? cases : 0)
        // console.log(parseInt(countryData[i]["coronaCases"]["Cases"]))
        return { y: average, x: element["timestamp"] * 1000 };
      });
      let minMaxYAxis = d3.extent(dataset, function(d) {
        return d.y;
      });
      let minMaxXAxis = d3.extent(dataset, function(d) {
        return d.x;
      });
      // Use the margin convention practice
      var margin = { top: 50, right: 50, bottom: 50, left: 50 },
        width = window.innerWidth / 2 - margin.left - margin.right, // Use the window's width
        height = window.innerHeight / 3 - margin.top - margin.bottom; // Use the window's height

      // The number of datapoints
      var n = dataset.length;

      var color = d3.scaleDiverging([-100, 0, 100], d3.interpolateRdBu);
      // X scale will use the index of our data
      var xScale = d3
        .scaleTime()
        .domain(minMaxXAxis) // input
        .range([0, width]); // output

      // Y scale
      var yScale = d3
        .scaleLinear()
        .domain([0, minMaxYAxis[1]]) // input
        .range([height, 0]); // output

      // d3's line generator
      var line = d3
        .line()
        .x(function(d, i) {
          return xScale(d.x);
        }) // set the x values for the line generator
        .y(function(d) {
          return yScale(d.y);
        }) // set the y values for the line generator
        .curve(d3.curveMonotoneX); // apply smoothing to the line

      d3.select("#corona_linechart").remove();
      // Add the SVG to the page and employ #2
      var svg = d3
        .create("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("id", "corona_linechart");

      svg
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Call the x axis in a group tag
      svg
        .select("g")
        .append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%U CW")))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)"); // Create an axis component with d3.axisBottom

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

      var focus = svg
        .select("g")
        .append("g")
        .append("circle")
        .style("fill", "none")
        .attr("stroke", "black")
        .attr("r", 8.5)
        .style("opacity", 0);

      document.getElementById("corona_chart").appendChild(svg.node());
      return svg.node();
    },
    getFlightData() {}
  },
  mounted() {
    this.createLineChart();
  }
};
</script>

<style>
/* Style the lines by removing the fill and applying a stroke */
.line {
  fill: none;
  stroke: #ffab00;
  stroke-width: 1;
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