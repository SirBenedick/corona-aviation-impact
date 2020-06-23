<template>
  <div>
    <el-row>
      <el-col align="middle">
        <div class="click-cell-hint">Select a cell to view the country's data in more detail</div>
        <div id="heatmap-diagram" />
      </el-col>
      <el-col align="middle">
        <HeatMapLabel />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as d3 from "d3";
import FlightService from "../services/FlightService";
import HeatMapLabel from "../components/HeatMapLabel";

export default {
  components: {
    HeatMapLabel
  },
  props: {
    typeOfFlights: {
      default: "internationalFlights",
      type: String,
      required: true
    },
    selectedCountries: {
      required: true
    },
    countryName: { default: "Germany", type: String, required: true }
  },
  data() {
    return {
      months: ["January", "February", "March", "April", "May"],
      inputData: [],
      colorScale: d3.scaleDiverging([-100, 0, 100], d3.interpolateRdBu)
    };
  },
  watch: {
    typeOfFlights: function() {
      this.createHeatmap();
    },
    countryName: function() {
      // Highlight Heatmap country label
      d3.selectAll(`svg>g>g>.tick>text`).style("font-weight", "normal");

      const textLabelOfCountry = d3.selectAll(
        `g>.tick>#${this.countryName.toLowerCase().replace(" ", "-")}`
      );
      textLabelOfCountry.style("font-weight", "bold");
    }
  },
  methods: {
    emitSelectCountry(newCountryName) {
      this.$emit("selectCountry", newCountryName);
    },
    createHeatmap() {
      this.inputData = FlightService.getFlights(
        this.selectedCountries,
        this.typeOfFlights
      );

      const padding = 0.15;

      // set the dimensions and margins of the graph
      let margin = { top: 10, right: 30, bottom: 30, left: 100 },
        width = 500 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

      d3.select("#heatmap-diagram")
        .select("svg")
        .remove();

      // append the svg object to the body of the page
      let svg = d3
        .select("#heatmap-diagram")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Build X scales and axis:
      let x = d3
        .scaleBand()
        .range([0, width])
        .domain(this.months)
        .padding(padding / 2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      // Build Y scales and axis:
      var y = d3
        .scaleBand()
        .range([height, 0])
        .domain(
          this.selectedCountries
            .map(country => country.countryDisplayedName)
            .sort()
            .reverse()
        )
        .padding(padding);

      svg.append("g").call(d3.axisLeft(y));

      // Set font size for axis labels
      svg
        .selectAll("g>.tick>text")
        .style("font-size", "15px")
        .style("font-weight", "normal")
        .attr("id", function(d) {
          // Returns the countryDisplayedName
          return d.toLowerCase().replace(" ", "-");
        });
      // First time the label is  generated the default country will be made bold
      const textLabelOfCountry = svg.selectAll(
        `g>.tick>#${this.countryName.toLowerCase().replace(" ", "-")}`
      );
      textLabelOfCountry.style("font-weight", "bold");

      // Build color scale
      let color = d3.scaleThreshold(
        [-75, -45, -15, 15, 45, 75],
        d3.schemeRdBu[7]
      );
      // let color = d3.scaleDiverging([-100, 0, 100], d3.schemeSpectral[7]);

      let tooltip = d3
        .select("#heatmap-diagram")
        .append("div")
        .style("display", "none")
        .attr("class", "tooltip")
        .style("width", "270px")
        .style("text-align", "center")
        .style("background-color", "rgb(245,245,245,.8)")
        .style("color", "black")
        .style("z-index", 10)
        .style("border", "solid")
        .style("border-width", "1px")
        .style("padding", "5px")
        .style("position", "absolute");

      // Three function that change the tooltip when user hover / move / leave a cell
      var mouseover = function(d) {
        tooltip.style("display", "block");
        d3.select(this)
          .style("stroke-width", 3)
          .style("stroke", "black")
          .style("cursor", "pointer");
      };

      var mousemove = function(d) {
        const change = Math.round((d.value2020 / d.value2019) * 100 - 100);
        tooltip
          .html(
            `In <b>${
              d.month
            }</b> 2020 there was an </br>${"change "} of <b>${(change > 0
              ? "+"
              : "") + change}%</b> in aviation traffic</br> compared to <b>${
              d.month
            }</b> 2019.`
          )
          .style("left", d3.mouse(this)[0] + 0.17 * window.innerWidth + "px")
          .style("top", d3.mouse(this)[1] + "px");
      };

      var mouseleave = function(d) {
        d3.select(this).style("stroke-width", 1);
        tooltip.style("display", "none");
      };

      // add the squares
      const that = this;
      svg
        .selectAll()
        .data(this.inputData, function(d) {
          return d.month + ":" + d.displayedCountryName;
        })
        .enter()
        .append("rect")
        .style("stroke-width", 1)
        .style("stroke", "black")
        .attr("x", function(d) {
          return x(d.month);
        })
        .attr("y", function(d) {
          return y(d.displayedCountryName);
        })
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .style("fill", function(d) {
          return color((d.value2020 / d.value2019) * 100 - 100);
        })
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
        .on("click", function(d) {
          that.emitSelectCountry({
            countryName: d.displayedCountryName,
            countryCode: d.countryCode
          });
        });
    }
  },
  mounted() {
    this.createHeatmap();
  }
};
</script>

<style>
.click-cell-hint {
  font-size: 12px;
}
</style>