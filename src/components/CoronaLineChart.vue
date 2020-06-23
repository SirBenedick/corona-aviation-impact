<template>
  <div>
    Corona infections
    <el-tooltip effect="light" placement="top">
      <div slot="content" style="width: 500px;">
        The chart below shows the daily infection numbers for the selected country.
        It shows how the infection rate of COVID-19 has developed in 2020. The x-axis shows the weeks of the year 2020. The values are averaged using a 7-day window like the aviation traffic chart as well to account for weekly variations in the data due to authorities not reporting during weekends and to decrease the chance of indicating wrong trends towards the end of the chart.
        <br />The case numbers are provided by the
        <a
          href="https://data.europa.eu/euodp/de/data/dataset/covid-19-coronavirus-data"
          target="_blank"
        >EU Open Data Portal</a>.
      </div>
      <i class="el-icon-question" />
    </el-tooltip>
    <div id="corona_chart" />
  </div>
</template>

<script>
import * as d3 from "d3";
import moment from "moment";
import FlightService from "../services/FlightService";
import SelectedCountriesService from "../services/SelectedCountriesService";

export default {
  props: {
    countryName: { default: "World", type: String, required: true },
    countryCode: { default: "", type: String, required: true },
    selectedCountries: { required: true }
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
      let countryData;
      if (this.countryCode === "World") {
        countryData = SelectedCountriesService.getSumOf(this.selectedCountries);
      } else {
        countryData = FlightService.getFlightDataByCountryCode(
          this.countryCode
        );
      }

      let dataset = countryData.map((element, i) => {
        let average = 0;

        if (i > 2 && i < countryData.length - 3) {
          for (let j = i - 3; j <= i + 3; j++) {
            let cases = parseInt(countryData[j]["coronaCases"]["Cases"]);
            cases = cases ? cases : 0;
            average += cases;
          }
          average = average / 7;
        }

        if (average === 0) {
          return { y: 0, x: element["timestamp"] * 1000 };
        }

        return { y: average, x: element["timestamp"] * 1000 };
      });
      dataset.splice(0, 3);
      dataset.splice(dataset.length - 3, 3);

      let minMaxYAxis = d3.extent(dataset, function(d) {
        return d.y;
      });
      let minMaxXAxis = d3.extent(dataset, function(d) {
        return d.x;
      });
      // Use the margin convention practice
      var margin = { top: 50, right: 50, bottom: 50, left: 50 },
        width = window.innerWidth / 2 - margin.left - margin.right - 100, // Use the window's width
        height = window.innerHeight / 3 - margin.top - margin.bottom - 20; // Use the window's height

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
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(
          d3
            .axisBottom(xScale)
            .ticks(20)
            .tickFormat(d3.timeFormat("W%V"))
        )
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

      // axis lable size
      svg.selectAll("g>.tick>text").style("font-size", "11px");

      // Append the path, bind the data, and call the line generator
      svg
        .select("g")
        .append("path")
        .datum(dataset) // 10. Binds data to the line
        .attr("stroke", "#083d77")
        .attr("stroke-width", 3)
        .attr("fill", "none")
        .attr("d", line);

      // Tooltip
      // This allows to find the closest X index of the mouse:
      var bisect = d3.bisector(function(d) {
        return d.x;
      }).left;
      var focus = svg
        .select("g")
        .append("g")
        .append("path")
        .style("stroke-width", "1px")
        .attr("stroke", "black")
        .style("opacity", 0);

      var tooltip = d3
        .create("div")
        .attr("id", "tooltip-corona")
        .style("display", "none")
        .attr("class", "tooltip")
        .style("width", "150px")
        .style("text-align", "center")
        .style("background-color", "rgb(245,245,245,.8)")
        .style("color", "black")
        .style("z-index", 10)
        .style("border", "solid")
        .style("border-width", "1px")
        .style("padding", "5px")
        .style("position", "absolute");
      document.body.appendChild(tooltip.node());

      svg
        .select("g")
        .append("rect")
        .style("fill", "none")
        .style("pointer-events", "all")
        .attr("width", width)
        .attr("height", height)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseout", mouseout);

      function mouseover() {
        focus.style("opacity", 1);
        tooltip.style("display", "block");
      }

      function mousemove() {
        var x0 = xScale.invert(d3.mouse(this)[0]);
        var i = bisect(dataset, x0, 1);
        var selectedData = dataset[i];

        let date = moment(new Date(selectedData.x));
        let xPositionDelta = selectedData.x < 1583107200000 ? +90 : -100;
        let yPositionDelta = selectedData.y < 30 ? -30 : 0;
        focus
          .attr("cx", xScale(selectedData.x))
          .attr("cy", yScale(selectedData.y))
          .attr("d", function(d) {
            return `M${xScale(
              selectedData.x
            )},${height},${xScale(selectedData.x)},0`;
          });

        tooltip
          .style("display", "block")
          .style("left", d3.event.pageX + 20 + "px")
          .style("top", d3.event.pageY - 20 + "px")
          .html(
            "Day " +
              date.isoWeekday() +
              " of week " +
              date.isoWeek() +
              " </br>" +
              "New Cases: " +
              Math.round(selectedData.y)
          );
      }
      function mouseout() {
        focus.style("opacity", 0);
        tooltip.style("display", "none");
      }

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

.x-axis > :nth-child(2) > text {
  display: none;
}
</style>