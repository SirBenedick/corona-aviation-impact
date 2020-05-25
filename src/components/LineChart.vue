<template>
  <div>
    <h1>this is a line chart hahahaha</h1>
    <b>{{ countryName }}</b>
    {{countryCode}}
    {{ typeOfFlights }}
    <div id="my_dataviz"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
import FlightService from "../services/FlightService";

export default {
  props: {
    countryName: { default: "World", type: String, required: true },
    countryCode: { default: "", type: String, required: true },
    typeOfFlights: {
      default: "internationalFlights",
      type: String,
      required: true
    }
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
    },
    typeOfFlights: function(newQuestion, oldQuestion) {
      this.createLineChart();
    }
  },
  methods: {
    createLineChart() {
      let flightData = FlightService.getFlightDataByCountryCode(
        this.countryCode
      );

      let dataset = flightData.map((element, i) => {

        let average2019 = 0;
        let average2020 = 0;

        if (i === 0) {
          average2019 = element[this.typeOfFlights]["2019"];
          average2020 = element[this.typeOfFlights]["2020"];
        } else if (i === flightData.length - 1) {
          average2019 = element[this.typeOfFlights]["2019"];
          average2020 = element[this.typeOfFlights]["2020"];
        } else {
          average2019 =
            (flightData[i - 1][this.typeOfFlights]["2019"] +
              flightData[i][this.typeOfFlights]["2019"] +
              flightData[i + 1][this.typeOfFlights]["2019"]) /
            3;
          average2020 =
            (flightData[i - 1][this.typeOfFlights]["2020"] +
              flightData[i][this.typeOfFlights]["2020"] +
              flightData[i + 1][this.typeOfFlights]["2020"]) /
            3;
        }

        if (average2019 === 0) {
          return { y: 0, x: 0 };
        }
        let delta = (average2020 / average2019) * 100 - 100;
        return { y: delta, x: 0 };
      });

      // Use the margin convention practice
      var margin = { top: 50, right: 50, bottom: 50, left: 50 },
        width = window.innerWidth / 2 - margin.left - margin.right, // Use the window's width
        height = window.innerHeight / 2 - margin.top - margin.bottom; // Use the window's height

      // The number of datapoints
      var n = dataset.length;

      var color = d3.scaleDiverging([-100, 0, 100], d3.interpolateRdBu);
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
        .line()
        .x(function(d, i) {
          return xScale(i);
        }) // set the x values for the line generator
        .y(function(d) {
          return yScale(d.y);
        }) // set the y values for the line generator
        .curve(d3.curveMonotoneX); // apply smoothing to the line

      d3.select("#linechart").remove();
      // Add the SVG to the page and employ #2
      var svg = d3
        .create("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("id", "linechart");

      svg
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Call the x axis in a group tag
      svg
        .select("g")
        .append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height * 1) / 3 + ")")
        .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

      // Call the y axis in a group tag
      svg
        .select("g")
        .append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

      var areaGradient = svg
        .select("g")
        .append("defs")
        .append("linearGradient")
        .attr("id", "areaGradient")
        .attr("x1", "0")
        .attr("y1", "0")
        .attr("x2", "0")
        .attr("y2", "1");

      // Sets the gradient color from -100%to100%
      for (let i = 0; i <= 100; i += 10) {
        areaGradient
          .append("stop")
          .attr("offset", i + "%")
          .attr("stop-color", color(i > (100 * 1) / 3 ? i * -1 : i))
          .attr("stop-opacity", 0.9);
      }

      // Append the path, bind the data, and call the line generator
      svg
        .select("g")
        .append("path")
        .datum(dataset) // 10. Binds data to the line
        .attr("class", "line") // Assign a class for styling
        .attr("d", line) // 11. Calls the line generator
        .style("fill", "url(#areaGradient)");

      var focus = svg
        .select("g")
        .append("g")
        .append("circle")
        .style("fill", "none")
        .attr("stroke", "black")
        .attr("r", 8.5)
        .style("opacity", 0);

      document.getElementById("my_dataviz").appendChild(svg.node());
      return svg.node();
    },
    getFlightData() {}
  },
  mounted() {
    this.createLineChart();
    // let chart = this.createLineChart();
    // document.getElementById("my_dataviz").appendChild(chart);
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