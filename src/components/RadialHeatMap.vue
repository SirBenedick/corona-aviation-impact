<template>
  <div>
    <div id="arc" />
    <el-row >
      <el-col  :span="12">
    <p>Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum</p>

      </el-col>
      <el-col  :span="12">

    <RadialHeatMapLabel />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as d3 from "d3";
import FlightService from "../services/FlightService";
import RadialHeatMapLabel from "../components/RadialHeatMapLabel" 

export default {
  components:{
    RadialHeatMapLabel
  },
  props:{
    typeOfFlights: { default: "internationalFlights", type: String, required: true }
  },
  data() {
    return {
      radial_labels: ["January", "Feburary", "March", "April"],
      segment_labels: [
        {
          countryCode: "AR",
          countryDisplayedName: "Argentina"
        },
        {
          countryCode: "AT",
          countryDisplayedName: "Australia"
        },
        {
          countryCode: "BR",
          countryDisplayedName: "Brazil"
        },
        {
          countryCode: "CA",
          countryDisplayedName: "Canada"
        },
        {
          countryCode: "CN",
          countryDisplayedName: "China"
        },
        {
          countryCode: "FR",
          countryDisplayedName: "France"
        },
        {
          countryCode: "DE",
          countryDisplayedName: "Germany"
        },
        {
          countryCode: "IN",
          countryDisplayedName: "India"
        },
        {
          countryCode: "ID",
          countryDisplayedName: "Indonesia"
        },
        {
          countryCode: "IT",
          countryDisplayedName: "Italy"
        },
        {
          countryCode: "JP",
          countryDisplayedName: "Japan"
        },
        {
          countryCode: "MX",
          countryDisplayedName: "Mexico"
        },
        {
          countryCode: "RU",
          countryDisplayedName: "Russia"
        },
        {
          countryCode: "SA",
          countryDisplayedName: "Saudi Arabia"
        },
        {
          countryCode: "ZA",
          countryDisplayedName: "South Africa"
        },
        {
          countryCode: "TR",
          countryDisplayedName: "Turkey"
        },
        {
          countryCode: "TW",
          countryDisplayedName: "Taiwan"
        },
        {
          countryCode: "GB",
          countryDisplayedName: "UK"
        },
        {
          countryCode: "US",
          countryDisplayedName: "USA"
        }
      ],
      inputData: [],
      colorScale: d3.scaleDiverging([-100, 0, 100], d3.interpolateRdBu),
    };
  },
  watch: {
    typeOfFlights: function (newQuestion, oldQuestion) {
      this.createHeatmap();
    }
  },
  methods: {
    loadCircularHeatMap(
      dataset,
      dom_element_to_append_to,
      radial_labels,
      segment_labels
    ) {
      var margin = { top: 5, right: 30, bottom: 30, left: 5 };
      var width = screen.width*0.312 - margin.left - margin.right;

      var height = width;
      var innerRadius = width / 10; // Size of the inner circle
      var segmentHeight =
        (width - margin.top - margin.bottom - 2 * innerRadius) /
        (2 * this.radial_labels.length); // Height of a single cell

      var chart = this.circularHeatChart()
        .innerRadius(innerRadius)
        .segmentHeight(segmentHeight)
        .domain([-100, 100])
        // .range(["#9E0142", "#D53E4F", "#F46D43", "#FDAE61", "#FEE08B", "#FFFFBF", "#E6F598", "#ABDDA4", "#66C2A5", "#3288BD", "#5E4FA2"])
        .range([
          "#0A2F51",
          "#0E4D64",
          "#137177",
          "#188977",
          "#1D9A6C",
          "#39A96B",
          "#56B870",
          "#74C67A",
          "#99D492",
          "#BFE1B0",
          "#DEEDCF"
        ])
        .radialLabels(radial_labels)
        .segmentLabels(segment_labels.map(label => label.countryDisplayedName));

      chart.accessor(function(d) {
        return (d.value2020 / d.value2019) * 100 - 100;
      });
      chart.accessorSegment(function(d) {
        return d.displayedCountryName;
      });
      chart.accessorCountryCode(function(d) {
        return d.countryCode;
      });

      d3.select(dom_element_to_append_to).select("svg").remove();
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
      tooltip.append("div").attr("class", "description");
      // tooltip.append("div").attr("class", "month");
      // tooltip.append("div").attr("class", "change");

      svg
        .selectAll("path")
        .on("mouseover", function(d) {
          let change = Math.round((d.value2020 / d.value2019) * 100 - 100);
          tooltip
            .select(".displayedCountryName")
            .html("<b>" + d.displayedCountryName + "</b>");
          tooltip
            .select(".description")
            .html(`In <b>${d.month}</b> 2020 there was an </br><b>${(change > 0 ? "increase " : "decrease ")}</b> of <b>${(change > 0 ? "+" : "")+change}%</b> in aviation traffic</br> compared to <b>${d.month}</b> 2019.`);

          // tooltip.select(".month").html("<b> Month: " + d.month + "</b>");
          // tooltip
          //   .select(".change")
          //   .html(
          //     "<b> Change: " +
          //       (change > 0 ? "+" : "") +
          //       change +
          //       "% " +
          //       (change > 0 ? "increase " : "decrease ") +
          //       "in traffic" +
          //       "</b>"
          //   );

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
        accessorCountryCode = function(d) {
          return d;
        },
        segmentLabels = [], // Value assigned only for init
        radialLabels = (segmentLabels = []); // Value assigned only for init

      const freeSpaceSizeInPercent = 0.169;
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
        if (Math.floor((singleSegmentAngle * (i + 1)) % segementSapceAngleInRad) === 0) {
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

          // Color scale
          var color = d3.scaleDiverging([-100, 0, 100], d3.interpolateRdBu);

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
              that.emitSelectCountry({countryName: accessorSegment(d), countryCode: accessorCountryCode(d)});
            });

          // Unique id so that the text path defs are unique - is there a better way to do this?
          // var id = d3.selectAll(".circular-heat")[0].length;
          var id = 123;

          //Radial labels
          var lsa = 0.05; //Label start angle
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

      chart.accessorCountryCode = function(_) {
        if (!arguments.length) return accessorCountryCode;
        accessorCountryCode = _;
        return chart;
      };

      return chart;
    },
    emitSelectCountry(newCountryName) {
      this.$emit("selectCountry", newCountryName);
    },
    createHeatmap(){
      this.inputData = FlightService.getFlights(this.segment_labels, this.typeOfFlights);
      
      this.loadCircularHeatMap(
        this.inputData,
        "#arc",
        this.radial_labels,
        this.segment_labels
      );
    }
  },
  mounted() {
    this.createHeatmap();
  }
};
</script>

<style>
path:hover {
  fill: #37a561;
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