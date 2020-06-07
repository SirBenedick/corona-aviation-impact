<template>
  <div>
    <el-row>
      <el-col align="middle">
        <div id="heatmap-diagram" />
      </el-col>

      <el-col :span="9">
        <p>Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum</p>
      </el-col>
      <el-col :push="7" :span="7">
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
    }
  },
  data() {
    return {
      months: ["January", "February", "March", "April"],
      inputData: [],
      colorScale: d3.scaleDiverging([-100, 0, 100], d3.interpolateRdBu)
    };
  },
  watch: {
    typeOfFlights: function() {
      this.createHeatmap();
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
      let margin = { top: 30, right: 30, bottom: 30, left: 80 },
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

      // Build color scale
      let color = d3.scaleDiverging([-100, 0, 100], d3.interpolateRdBu);

      let tooltip = d3
        .select("#heatmap-diagram")
        .append("div")
        .style("display", "none")
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")
        .style("position", "absolute");

      // Three function that change the tooltip when user hover / move / leave a cell
      var mouseover = function(d) {
        tooltip.style("display", "block");
        d3.select(this)
          .style("stroke-width", 5)
          .style("stroke", "black");
      };

      var mousemove = function(d) {
        const change = Math.round((d.value2020 / d.value2019) * 100 - 100);
        tooltip
          .html(
            `In <b>${d.month}</b> 2020 there was an </br><b>${
              change > 0 ? "increase " : "decrease "
            }</b> of <b>${(change > 0 ? "+" : "") +
              change}%</b> in aviation traffic</br> compared to <b>${
              d.month
            }</b> 2019.`
          )
          .style("left", d3.mouse(this)[0] + 270 + "px")
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
</style>