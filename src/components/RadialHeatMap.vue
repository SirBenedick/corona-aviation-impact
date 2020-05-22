<template>
  <div>
    <div id="arc" />
    <div id="legend" />
  </div>
</template>

<script>
import * as d3 from "d3";
import FlightService from "../services/FlightService";
export default {
  data() {
    return {
      radial_labels: ["January", "Feburary", "March", "April"],
      segment_labels: [
        {
          countryCode: "TW",
          countryDisplayedName: "Taiwan"
        },
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
          countryCode: "GB",
          countryDisplayedName: "UK"
        },
        {
          countryCode: "US",
          countryDisplayedName: "USA"
        }
      ],
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
      tooltip.append("div").attr("class", "month");
      tooltip.append("div").attr("class", "change");

      svg
        .selectAll("path")
        .on("mouseover", function(d) {
          let change = Math.round((d.value2020 / d.value2019) * 100 - 100);
          tooltip
            .select(".displayedCountryName")
            .html("<b>" + d.displayedCountryName + "</b>");
          tooltip.select(".month").html("<b> Month: " + d.month + "</b>");
          tooltip
            .select(".change")
            .html(
              "<b> Change: " +
                (change > 0 ? "+" : "") +
                change +
                "% " +
                (change > 0 ? "increase " : "decrease ") +
                "in traffic" +
                "</b>"
            );

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

      const freeSpaceSizeInPercent = 0.18;
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
              that.emitSelectCountry(accessorSegment(d));
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

      return chart;
    },
    emitSelectCountry(newCountryName) {
      this.$emit("selectCountry", newCountryName);
    },
    ramp(color, n = 256) {
      var canvas = document.createElement("CANVAS");
      const context = canvas.getContext("2d");
      for (let i = 0; i < n; ++i) {
        context.fillStyle = color(i / (n - 1));
        context.fillRect(i, 0, 100, 100);
      }

      return canvas;
    },
    legend({
      color,
      title,
      tickSize = 6,
      width = 320, 
      height = 44 + tickSize,
      marginTop = 18,
      marginRight = 0,
      marginBottom = 16 + tickSize,
      marginLeft = 0,
      ticks = width / 64,
      tickFormat,
      tickValues
    } = {}) {

      const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .style("overflow", "visible")
        .style("display", "block");

      let tickAdjust = g => g.selectAll(".tick line").attr("y1", marginTop + marginBottom - height);
      let x;

      // Continuous
      if (color.interpolate) {
        const n = Math.min(color.domain().length, color.range().length);

        x = color.copy().rangeRound(d3.quantize(d3.interpolate(marginLeft, width - marginRight), n));

        svg.append("image")
          .attr("x", marginLeft)
          .attr("y", marginTop)
          .attr("width", width - marginLeft - marginRight)
          .attr("height", height - marginTop - marginBottom)
          .attr("preserveAspectRatio", "none")
          .attr("xlink:href", this.ramp(color.copy().domain(d3.quantize(d3.interpolate(0, 1), n))).toDataURL());
      }

      // Sequential
      else if (color.interpolator) {
        x = Object.assign(color.copy()
          .interpolator(d3.interpolateRound(marginLeft, width - marginRight)),
        {range() { return [marginLeft, width - marginRight]; }});

        svg.append("image")
          .attr("x", marginLeft)
          .attr("y", marginTop)
          .attr("width", width - marginLeft - marginRight)
          .attr("height", height - marginTop - marginBottom)
          .attr("preserveAspectRatio", "none")
          .attr("xlink:href", this.ramp(color.interpolator()).toDataURL());

        // scaleSequentialQuantile doesn’t implement ticks or tickFormat.
        if (!x.ticks) {
          if (tickValues === undefined) {
            const n = Math.round(ticks + 1);
            tickValues = d3.range(n).map(i => d3.quantile(color.domain(), i / (n - 1)));
          }
          if (typeof tickFormat !== "function") {
            tickFormat = d3.format(tickFormat === undefined ? ",f" : tickFormat);
          }
        }
      }

      // Threshold
      else if (color.invertExtent) {
        const thresholds
        = color.thresholds ? color.thresholds() // scaleQuantize
          : color.quantiles ? color.quantiles() // scaleQuantile
            : color.domain(); // scaleThreshold

        const thresholdFormat
        = tickFormat === undefined ? d => d
          : typeof tickFormat === "string" ? d3.format(tickFormat)
            : tickFormat;

        x = d3.scaleLinear()
          .domain([-1, color.range().length - 1])
          .rangeRound([marginLeft, width - marginRight]);

        svg.append("g")
          .selectAll("rect")
          .data(color.range())
          .join("rect")
          .attr("x", (d, i) => x(i - 1))
          .attr("y", marginTop)
          .attr("width", (d, i) => x(i) - x(i - 1))
          .attr("height", height - marginTop - marginBottom)
          .attr("fill", d => d);

        tickValues = d3.range(thresholds.length);
        tickFormat = i => thresholdFormat(thresholds[i], i);
      }

      // Ordinal
      else {
        x = d3.scaleBand()
          .domain(color.domain())
          .rangeRound([marginLeft, width - marginRight]);

        svg.append("g")
          .selectAll("rect")
          .data(color.domain())
          .join("rect")
          .attr("x", x)
          .attr("y", marginTop)
          .attr("width", Math.max(0, x.bandwidth() - 1))
          .attr("height", height - marginTop - marginBottom)
          .attr("fill", color);

        tickAdjust = () => {};
      }

      svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x)
          .ticks(ticks, typeof tickFormat === "string" ? tickFormat : undefined)
          .tickFormat(typeof tickFormat === "function" ? tickFormat : undefined)
          .tickSize(tickSize)
          .tickValues(tickValues))
        .call(tickAdjust)
        .call(g => g.select(".domain").remove())
        .call(g => g.append("text")
          .attr("x", marginLeft)
          .attr("y", marginTop + marginBottom - height - 6)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .attr("font-weight", "bold")
          .text(title));

      return svg.node();
    }
  },
  mounted() {
    this.inputData = FlightService.getFlights(this.segment_labels);

    this.loadCircularHeatMap(
      this.inputData,
      "#arc",
      this.radial_labels,
      this.segment_labels
    );
    let legend = this.legend({
      color: d3.scaleDiverging([-1, 0, 1], d3.interpolateRdBu),
      title: "Daily change",
      tickFormat: "+%"
    });
    document.getElementById("legend").appendChild(legend)
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