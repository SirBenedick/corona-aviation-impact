<template>
  <div id="arc" />
</template>

<script>
import * as d3 from "d3";
import FlightService from '../services/FlightService'
export default {
  data() {
    return {
      radial_labels: ["January", "Feburary", "March", "April"],
      segment_labels: [{
        countryCode : 'DE',
        countryDisplayedName: 'Germany',
      }],
      inputData: [],
      data: []
    };
  },
  methods: {
    loadCircularHeatMap(
      dataset,
      dom_element_to_append_to,
      radial_labels,
      segment_labels
    ) {
      var margin = { top: 50, right: 50, bottom: 50, left: 50 };
      var width = 600 - margin.left - margin.right;

      var height = width;
      var innerRadius = width / 10; // Size of the inner circle
      var segmentHeight =
        (width - margin.top - margin.bottom - 2 * innerRadius) /
        (2 * this.radial_labels.length); // Height of a single cell

      var chart = this.circularHeatChart()
        .innerRadius(innerRadius)
        .segmentHeight(segmentHeight)
        .range(["green", "red"])
        .radialLabels(radial_labels)
        .segmentLabels(segment_labels);

      chart.accessor(function(d) {
        return d.value;
      });
      chart.accessorSegment(function(d) {
        return d.displayedCountryName;
      });

      var svg = d3
        .select(dom_element_to_append_to)
        .selectAll("svg")
        .data([dataset])
        .enter()
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr(
          "transform",
          "translate(" +
            (width / 2 -
              (this.radial_labels.length * segmentHeight + innerRadius)) +
            "," +
            margin.top +
            ")"
        )
        .call(chart);

      var tooltip = d3
        .select(dom_element_to_append_to)
        .append("div")
        .attr("class", "tooltip");

      tooltip.append("div").attr("class", "displayedCountryName");
      tooltip.append("div").attr("class", "value");
      tooltip.append("div").attr("class", "month");

      svg
        .selectAll("path")
        .on("mouseover", function(d) {
          tooltip
            .select(".displayedCountryName")
            .html("<b> Country: " + d.displayedCountryName + "</b>");
          tooltip.select(".month").html("<b> Month: " + d.month + "</b>");
          tooltip.select(".value").html("<b> Value: " + d.value + "</b>");

          tooltip.style("display", "block");
          tooltip.style("opacity", 2);
          tooltip.style("position", "absolute");
        })
        .on("mousemove", function(d) {
          tooltip
            .style("top", d3.event.layerY + 10 + "px")
            .style("left", d3.event.layerX - 25 + "px");
        })
        .on("mouseout", function(d) {
          tooltip.style("display", "none");
          tooltip.style("opacity", 0);
        });
    },
    circularHeatChart() {
      var margin = { top: 20, right: 20, bottom: 20, left: 20 },
        innerRadius = 20, // Value assigned only for init
        numSegments = this.segment_labels.length,
        segmentHeight = 200, // Value assigned only for init
        domain = null,
        range = ["white", "red"], // Value assigned only for init
        accessor = function(d) {
          return d;
        },
        accessorSegment = function(d) {
          return d;
        },
        segmentLabels = [], // Value assigned only for init
        radialLabels = (segmentLabels = []); // Value assigned only for init

      const freeSpaceSizeInPercent = 0.25;
      const emptySpaceAngleInRad = freeSpaceSizeInPercent * 2 * Math.PI;
      const segementSapceAngleInRad = 2 * Math.PI - emptySpaceAngleInRad;
      const singleSegmentAngle = segementSapceAngleInRad / numSegments;

      /* Arc functions */
      let ir = function(d, i) {
        return innerRadius + Math.floor(i / numSegments) * segmentHeight;
      };
      let or = function(d, i) {
        return (
          innerRadius +
          segmentHeight +
          Math.floor(i / numSegments) * segmentHeight
        );
      };
      let sa = function(d, i) {
        return (
          emptySpaceAngleInRad +
          ((singleSegmentAngle * i) % segementSapceAngleInRad)
        );
      };
      let ea = function(d, i) {
        if ((singleSegmentAngle * (i + 1)) % segementSapceAngleInRad === 0) {
          return 2 * Math.PI;
        }
        return (
          emptySpaceAngleInRad +
          ((singleSegmentAngle * (i + 1)) % segementSapceAngleInRad)
        );
      };
      const that = this;

      function chart(selection) {
        selection.each(function(data) {
          var svg = d3.select(this);

          // Ofset of the whole svg
          var offset =
            innerRadius + Math.ceil(data.length / numSegments) * segmentHeight;

          // The circular heatmap
          let g = svg
            .append("g")
            .classed("circular-heat", true)
            .attr(
              "transform",
              "translate(" +
                parseInt(margin.left + offset) +
                "," +
                parseInt(margin.top + offset) +
                ")"
            );

          var autoDomain = false;

          if (domain === null) {
            domain = d3.extent(data, accessor);
            autoDomain = true;
          }

          // Linear d3 color scale
          var color = d3
            .scaleLinear()
            .domain(domain)
            .range(range);

          if (autoDomain) domain = null;

          // Path is a single cell inside the heatmap
          g.selectAll("path")
            .data(data)
            .enter()
            .append("path")
            .attr(
              "d",
              d3
                .arc()
                .innerRadius(ir)
                .outerRadius(or)
                .startAngle(sa)
                .endAngle(ea)
            )
            .attr("stroke", function(d) {
              return "#4f5b69"; // Cell border
            })
            .attr("fill", function(d) {
              return color(accessor(d));
            })
            .attr("class", function(d) {
              return accessorSegment(d);
            })
            .on("click", function(d) {
              that.emitSelectCountry(accessorSegment(d));
            });

          // Unique id so that the text path defs are unique - is there a better way to do this?
          // var id = d3.selectAll(".circular-heat")[0].length;
          var id = 123;

          //Radial labels
          var lsa = 0.01; //Label start angle
          var labels = svg
            .append("g")
            .classed("labels", true)
            .classed("radial", true)
            .attr(
              "transform",
              "translate(" +
                parseInt(margin.left + offset) +
                "," +
                parseInt(margin.top + offset) +
                ")"
            );

          labels
            .selectAll("def")
            .data(radialLabels)
            .enter()
            .append("def")
            .append("path")
            .attr("id", function(d, i) {
              return "radial-label-path-" + id + "-" + i;
            })
            .attr("d", function(d, i) {
              var r = innerRadius + (i + 0.2) * segmentHeight;

              return (
                "m" +
                r * Math.sin(lsa) +
                " -" +
                r * Math.cos(lsa) +
                " a" +
                r +
                " " +
                r +
                " 0 1 1 -1 0"
              );
            });

          labels
            .selectAll("text")
            .data(radialLabels)
            .enter()
            .append("text")
            .append("textPath")
            .attr("xlink:href", function(d, i) {
              return "#radial-label-path-" + id + "-" + i;
            })
            .style("font-size", "16px")
            .text(function(d) {
              return d;
            });

          //Segment labels
          var segmentLabelOffset = 8;

          var r =
            innerRadius +
            Math.ceil(data.length / numSegments) * segmentHeight +
            segmentLabelOffset;

          labels = svg
            .append("g")
            .classed("labels", true)
            .classed("segment", true)
            .attr(
              "transform",
              "translate(" +
                parseInt(margin.left + offset) +
                "," +
                parseInt(margin.top + offset) +
                ")"
            );

          labels
            .append("def")
            .append("path")
            .attr("id", "segment-label-path-" + id)
            .attr("d", "m0 -" + r + " a" + r + " " + r + " 0 1 1 -1 0");

          labels
            .selectAll("text")
            .data(segmentLabels)
            .enter()
            .append("text")
            .append("textPath")
            .attr("xlink:href", "#segment-label-path-" + id)
            .style("font-size", "16px")
            .attr("startOffset", function(d, i) {
              // return (i * 100) / numSegments + "%";
              return (
                ((100 - freeSpaceSizeInPercent * 100) / numSegments) * i +
                freeSpaceSizeInPercent * 100 +
                "%"
              );
            })
            .text(function(d) {
              return d;
            });
        });
      }

      /* Configuration getters/setters */
      chart.margin = function(_) {
        if (!arguments.length) return margin;
        margin = _;
        return chart;
      };

      chart.innerRadius = function(_) {
        if (!arguments.length) return innerRadius;
        innerRadius = _;
        return chart;
      };

      chart.numSegments = function(_) {
        if (!arguments.length) return numSegments;
        numSegments = _;
        return chart;
      };

      chart.segmentHeight = function(_) {
        if (!arguments.length) return segmentHeight;
        segmentHeight = _;
        return chart;
      };

      chart.domain = function(_) {
        if (!arguments.length) return domain;
        domain = _;
        return chart;
      };

      chart.range = function(_) {
        if (!arguments.length) return range;
        range = _;
        return chart;
      };

      chart.radialLabels = function(_) {
        if (!arguments.length) return radialLabels;
        if (_ == null) _ = [];
        radialLabels = _;
        return chart;
      };

      chart.segmentLabels = function(_) {
        if (!arguments.length) return segmentLabels;
        if (_ == null) _ = [];
        segmentLabels = _;
        return chart;
      };

      chart.accessor = function(_) {
        if (!arguments.length) return accessor;
        accessor = _;
        return chart;
      };

      chart.accessorSegment = function(_) {
        if (!arguments.length) return accessorSegment;
        accessorSegment = _;
        return chart;
      };

      return chart;
    },
    emitSelectCountry(newCountryName) {
      this.$emit("selectCountry", newCountryName);
    }
  },
  mounted() {
    this.data = FlightService.getFlights(this.segment_labels)
    console.log(this.data)
    // Call Service
    let allData = {
      radial_labels: ["January", "Feburary", "March", "April"],
      segment_labels: [
        "Germany",
        "United Kingdom",
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      data: [
        {
          displayedCountryName: "Germany",
          countryCode: "DE",
          month: "January",
          value: 12
        },
        { displayedCountryName: "United Kingdom", month: "January", value: 15 },
        { displayedCountryName: 3, month: "January", value: 27 },
        { displayedCountryName: 4, month: "January", value: 10 },
        { displayedCountryName: 5, month: "January", value: 54 },
        { displayedCountryName: 6, month: "January", value: 23 },
        { displayedCountryName: 7, month: "January", value: 31 },
        { displayedCountryName: 8, month: "January", value: 17 },
        { displayedCountryName: 9, month: "January", value: 8 },
        { displayedCountryName: 10, month: "January", value: 12 },
        { displayedCountryName: 11, month: "January", value: 32 },
        { displayedCountryName: 12, month: "January", value: 35 },
        { displayedCountryName: "Germany", month: "February", value: 19 },
        {
          displayedCountryName: "United Kingdom",
          month: "February",
          value: 24
        },
        { displayedCountryName: 3, month: "February", value: 27 },
        { displayedCountryName: 4, month: "February", value: 12 },
        { displayedCountryName: 5, month: "February", value: 19 },
        { displayedCountryName: 6, month: "February", value: 30 },
        { displayedCountryName: 7, month: "February", value: 31 },
        { displayedCountryName: 8, month: "February", value: 25 },
        { displayedCountryName: 9, month: "February", value: 20 },
        { displayedCountryName: 10, month: "February", value: 5 },
        { displayedCountryName: 11, month: "February", value: 21 },
        { displayedCountryName: 12, month: "February", value: 10 },
        { displayedCountryName: "Germany", month: "March", value: 19 },
        { displayedCountryName: "United Kingdom", month: "March", value: 3 },
        { displayedCountryName: 3, month: "March", value: 32 },
        { displayedCountryName: 4, month: "March", value: 23 },
        { displayedCountryName: 5, month: "March", value: 9 },
        { displayedCountryName: 6, month: "March", value: 17 },
        { displayedCountryName: 7, month: "March", value: 25 },
        { displayedCountryName: 8, month: "March", value: 29 },
        { displayedCountryName: 9, month: "March", value: 32 },
        { displayedCountryName: 10, month: "March", value: 33 },
        { displayedCountryName: 11, month: "March", value: 19 },
        { displayedCountryName: 12, month: "March", value: 24 },
        { displayedCountryName: "Germany", month: "April", value: 12 },
        { displayedCountryName: "United Kingdom", month: "April", value: 43 },
        { displayedCountryName: 3, month: "April", value: 12 },
        { displayedCountryName: 4, month: "April", value: 23 },
        { displayedCountryName: 5, month: "April", value: 14 },
        { displayedCountryName: 6, month: "April", value: 19 },
        { displayedCountryName: 7, month: "April", value: 22 },
        { displayedCountryName: 8, month: "April", value: 39 },
        { displayedCountryName: 9, month: "April", value: 22 },
        { displayedCountryName: 10, month: "April", value: 26 },
        { displayedCountryName: 11, month: "April", value: 31 },
        { displayedCountryName: 12, month: "April", value: 25 }
      ]
    };

    this.radial_labels = allData.radial_labels;
    this.segment_labels = allData.segment_labels;
    this.inputData = allData.data;

    this.loadCircularHeatMap(
      this.inputData,
      "#arc",
      this.radial_labels,
      this.segment_labels
    );
  }
};
</script>

<style>
path:hover {
  fill: #9b59b6;
}

.tooltip {
  background: #eee;
  box-shadow: 0 0 5px #999999;
  color: #333;
  font-size: 12px;
  left: 130px;
  padding: 10px;
  position: absolute;
  text-align: center;
  top: 95px;
  z-index: 10;
  display: block;
  opacity: 0;
}

.title {
  font-size: 16px;
}
</style>