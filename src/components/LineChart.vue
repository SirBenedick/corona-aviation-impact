<template>
  <div>
    Air traffic compared to previous year
    <div id="my_dataviz" />
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
    typeOfFlights: {
      default: "internationalFlights",
      type: String,
      required: true
    },
    selectedCountries: {
      required: true
    }
  },
  data() {
    return {
      datasetWorldRAW: []
    };
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
      let flightData = FlightService.getFlightDataByCountryCode(
        this.countryCode
      );

      let datasetDomestic = flightData.map((element, i) => {
        let average2019 = 0;
        let average2020 = 0;

        if (i > 2 && i < flightData.length - 3) {
          for (let j = i - 3; j <= i + 3; j++) {
            average2019 += flightData[j]["domesticFlights"]["2019"];
            average2020 += flightData[j]["domesticFlights"]["2020"];
          }
          average2019 = average2019 / 7;
          average2020 = average2020 / 7;
        }

        if (average2019 === 0) {
          return { y: 0, x: element["timestamp"] * 1000 };
        }
        let delta = (average2020 / average2019) * 100 - 100;
        return { y: delta, x: element["timestamp"] * 1000 };
      });
      datasetDomestic.splice(0, 3);
      datasetDomestic.splice(datasetDomestic.length - 3, 3);

      let datasetInternational = flightData.map((element, i) => {
        let average2019 = 0;
        let average2020 = 0;

        if (i > 2 && i < flightData.length - 3) {
          for (let j = i - 3; j <= i + 3; j++) {
            average2019 += flightData[j]["internationalFlights"]["2019"];
            average2020 += flightData[j]["internationalFlights"]["2020"];
          }
          average2019 = average2019 / 7;
          average2020 = average2020 / 7;
        }

        if (average2019 === 0) {
          return { y: 0, x: element["timestamp"] * 1000 };
        }
        let delta = (average2020 / average2019) * 100 - 100;
        return { y: delta, x: element["timestamp"] * 1000 };
      });
      datasetInternational.splice(0, 3);
      datasetInternational.splice(datasetInternational.length - 3, 3);

      let datasetWorld = this.datasetWorldRAW.map((element, i) => {
        let average2019 = 0;
        let average2020 = 0;

        if (i > 2 && i < flightData.length - 3) {
          for (let j = i - 3; j <= i + 3; j++) {
            average2019 += this.datasetWorldRAW[j]["internationalFlights"][
              "2019"
            ];
            average2020 += this.datasetWorldRAW[j]["internationalFlights"][
              "2020"
            ];
          }
          average2019 = average2019 / 7;
          average2020 = average2020 / 7;
        }

        if (average2019 === 0) {
          return { y: 0, x: element["timestamp"] * 1000 };
        }
        let delta = (average2020 / average2019) * 100 - 100;
        return { y: delta, x: element["timestamp"] * 1000 };
      });
      datasetWorld.splice(0, 3);
      datasetWorld.splice(datasetWorld.length - 3, 3);

      let minMaxYAxisInternational = d3.extent(datasetInternational, function(
        d
      ) {
        return d.y;
      });
      let minMaxXAxisInternational = d3.extent(datasetInternational, function(
        d
      ) {
        return d.x;
      });
      let minMaxYAxisDomestic = d3.extent(datasetDomestic, function(d) {
        return d.y;
      });
      let minMaxXAxisDomestic = d3.extent(datasetDomestic, function(d) {
        return d.x;
      });
      let minMaxYAxisWorld = d3.extent(datasetWorld, function(d) {
        return d.y;
      });
      let minMaxXAxisWorld = d3.extent(datasetWorld, function(d) {
        return d.x;
      });

      let allMinMaxY = minMaxYAxisInternational;
      allMinMaxY = allMinMaxY.concat(minMaxYAxisDomestic);
      allMinMaxY = allMinMaxY.concat(minMaxYAxisWorld);

      let allMinMaxX = minMaxXAxisInternational;
      allMinMaxX = allMinMaxX.concat(minMaxXAxisDomestic);
      allMinMaxX = allMinMaxX.concat(minMaxXAxisWorld);

      let minMaxYAxis = d3.extent(allMinMaxY);
      let minMaxXAxis = d3.extent(allMinMaxX);

      // Use the margin convention practice
      var margin = { top: 50, right: 50, bottom: 50, left: 50 },
        width = window.innerWidth / 2 - margin.left - margin.right - 100, // Use the window's width
        height = window.innerHeight / 2 - margin.top - margin.bottom - 150; // Use the window's height

      // The number of datapoints
      var n = datasetInternational.length;

      var color = d3.scaleDiverging([-100, 0, 100], d3.interpolateRdBu);
      // X scale will use the index of our data
      var xScale = d3
        .scaleTime()
        .domain(minMaxXAxis) // input
        .range([0, width]); // output

      // Y scale will use the randomly generate number
      var yScale = d3
        .scaleLinear()
        .domain([-100, minMaxYAxis[1]]) // input
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
        .attr(
          "transform",
          "translate(0," +
            (height * minMaxYAxis[1]) / (minMaxYAxis[1] + 100) +
            ")"
        )
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
        .call(d3.axisLeft(yScale).tickFormat(d => d + "%"));

      let lineColorWorld = "#083d77";
      let lineColorInternational = "#f95738";
      let lineColorDomestic = "#f4d35e";
      // Append the path, bind the data, and call the line generator
      svg
        .select("g")
        .append("path")
        .datum(datasetInternational) // 10. Binds data to the line
        .attr("stroke", lineColorInternational)
        .attr("stroke-width", 3)
        .attr("fill", "none")
        .attr("d", line)
        .attr("class", "datasetInternational"); // 11. Calls the line generator
      // .style("fill", "url(#areaGradient)");

      svg
        .select("g")
        .append("path")
        .datum(datasetDomestic) // 10. Binds data to the line
        .attr("stroke", lineColorDomestic)
        .attr("stroke-width", 3)
        .attr("fill", "none")
        .attr("d", line)
        .attr("class", "datasetDomestic");

      svg
        .select("g")
        .append("path")
        .datum(datasetWorld) // 10. Binds data to the line
        .attr("stroke", lineColorWorld)
        .attr("stroke-width", 3)
        .attr("fill", "none")
        .attr("d", line)
        .attr("class", "datasetWorld");

      var focus = svg
        .select("g")
        .append("g")
        .append("path")
        .style("stroke-width", "1px")
        .attr("stroke", "black")
        .style("opacity", 0);

      var tooltip = d3
        .create("div")
        .attr("id", "tooltip")
        .style("background-color", "white")
        .style("z-index", 10)
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
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

      var bisect = d3.bisector(function(d) {
        return d.x;
      }).left;

      function mouseover() {
        focus.style("opacity", 1);
        tooltip.style("display", "block");
      }

      function mousemove() {
        var x0 = xScale.invert(d3.mouse(this)[0]);
        var i = bisect(datasetInternational, x0, 1);
        var selectedDataInternational = datasetInternational[i];
        var selectedDataDomestic = datasetDomestic[i];
        var selectedDataWorld = datasetWorld[i];

        let date = moment(new Date(selectedDataInternational.x));
        let xPositionDelta =
          selectedDataInternational.x < 1583107200000 ? +90 : -90;
        let yPositionDelta = 0;
        focus
          .attr("cx", xScale(selectedDataInternational.x))
          .attr("cy", yScale(selectedDataInternational.y))
          .attr("d", function(d) {
            return `M${xScale(
              selectedDataInternational.x
            )},${height},${xScale(selectedDataInternational.x)},0`;
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
              " </br> " +
              "International: " +
              Math.round(selectedDataInternational.y) +
              "%" +
              "</br>" +
              "Domestic: " +
              Math.round(selectedDataDomestic.y) +
              "%" +
              "</br>" +
              "World: " +
              Math.round(selectedDataWorld.y) +
              "%"
          );
      }
      function mouseout() {
        focus.style("opacity", 0);
        tooltip.style("display", "none");
      }

      document.getElementById("my_dataviz").appendChild(svg.node());
      return svg.node();
    },
    getFlightData() {}
  },
  mounted() {
    this.datasetWorldRAW = SelectedCountriesService.getSumOf(
      this.selectedCountries
    );
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
</style>