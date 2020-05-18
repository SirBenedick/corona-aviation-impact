<template>
  <div id="arc" />
</template>

<script>
import * as d3 from "d3";
export default {
  data() {
    return {
      radial_labels: ["January", "Feburary", "March", "April"],
      segment_labels: [
        // "",
        // "",
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      gdp: [
        // { month: 1, type: "egal", value: 0 },
        // { month: 1, type: "EGAL", value: 0 },
        { month: 1, type: "Category 1", value: 12 },
        { month: 2, type: "Category 1", value: 15 },
        { month: 3, type: "Category 1", value: 27 },
        { month: 4, type: "Category 1", value: 10 },
        { month: 5, type: "Category 1", value: 54 },
        { month: 6, type: "Category 1", value: 23 },
        { month: 7, type: "Category 1", value: 31 },
        { month: 8, type: "Category 1", value: 17 },
        { month: 9, type: "Category 1", value: 8 },
        { month: 10, type: "Category 1", value: 12 },
        { month: 11, type: "Category 1", value: 32 },
        { month: 12, type: "Category 1", value: 35 },
        // { month: 1, type: "EGAL", value: 0 },
        // { month: 1, type: "EGAL", value: 0 },
        { month: 1, type: "Category 2", value: 19 },
        { month: 2, type: "Category 2", value: 24 },
        { month: 3, type: "Category 2", value: 27 },
        { month: 4, type: "Category 2", value: 12 },
        { month: 5, type: "Category 2", value: 19 },
        { month: 6, type: "Category 2", value: 30 },
        { month: 7, type: "Category 2", value: 31 },
        { month: 8, type: "Category 2", value: 25 },
        { month: 9, type: "Category 2", value: 20 },
        { month: 10, type: "Category 2", value: 5 },
        { month: 11, type: "Category 2", value: 21 },
        { month: 12, type: "Category 2", value: 10 },
        // { month: 1, type: "Category 3", value: 0 },
        // { month: 1, type: "Category 3", value: 0 },
        { month: 1, type: "Category 3", value: 19 },
        { month: 2, type: "Category 3", value: 3 },
        { month: 3, type: "Category 3", value: 32 },
        { month: 4, type: "Category 3", value: 23 },
        { month: 5, type: "Category 3", value: 9 },
        { month: 6, type: "Category 3", value: 17 },
        { month: 7, type: "Category 3", value: 25 },
        { month: 8, type: "Category 3", value: 29 },
        { month: 9, type: "Category 3", value: 32 },
        { month: 10, type: "Category 3", value: 33 },
        { month: 11, type: "Category 3", value: 19 },
        { month: 12, type: "Category 3", value: 24 },
        // // { month: 1, type: "Category 4", value: 0 },
        // { month: 1, type: "Category 4", value: 0 },
        { month: 1, type: "Category 4", value: 12 },
        { month: 2, type: "Category 4", value: 43 },
        { month: 3, type: "Category 4", value: 12 },
        { month: 4, type: "Category 4", value: 23 },
        { month: 5, type: "Category 4", value: 14 },
        { month: 6, type: "Category 4", value: 19 },
        { month: 7, type: "Category 4", value: 22 },
        { month: 8, type: "Category 4", value: 39 },
        { month: 9, type: "Category 4", value: 22 },
        { month: 10, type: "Category 4", value: 26 },
        { month: 11, type: "Category 4", value: 31 },
        { month: 12, type: "Category 4", value: 25 }
        // { month: 13, type: "Category 1", value: 12 },
        // { month: 13, type: "Category 2", value: 43 },
        // { month: 13, type: "Category 3", value: 12 },
        // { month: 13, type: "Category 4", value: 23 }
      ]
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
        .range(["white", "#01579b"])
        .radialLabels(radial_labels)
        .segmentLabels(segment_labels);

      chart.accessor(function(d) {
        return d.value;
      });
      chart.accessorSegment(function(d) {
        return d.month;
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

      tooltip.append("div").attr("class", "month");
      tooltip.append("div").attr("class", "value");
      tooltip.append("div").attr("class", "type");

      svg
        .selectAll("path")
        .on("mouseover", function(d) {
          tooltip.select(".month").html("<b> Month: " + d.month + "</b>");
          tooltip.select(".type").html("<b> Type: " + d.type + "</b>");
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

      const freeSpaceSize = 0.5;
      const emptySpaceAngleInRad = freeSpaceSize * Math.PI;
      const segementSapceAngleInRad = (2 - freeSpaceSize) * Math.PI;
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

      function chart(selection) {
        selection.each(function(data) {
          console.log(data);
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
              return (75 / numSegments) * i + 25 + "%";
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
    }
  },
  mounted() {
    this.loadCircularHeatMap(
      this.gdp,
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