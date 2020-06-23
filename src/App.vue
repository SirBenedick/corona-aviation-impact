<template>
  <div id="app">
    <section class="fullpage">
      <el-row type="flex" class="heading">
        <el-col class="head_label">
          <h1
            style="font-size: 30px"
          >How have SARS-CoV-2's limitations impacted global aviation traffic?</h1>
        </el-col>
      </el-row>
      <el-row class="switcher_country_wrapper" type="flex">
        <el-col :span="12" align="center">
          <el-switch
            v-model="toogleTypeOfFlights"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="internationalFlights"
            inactive-value="domesticFlights"
            active-text="international"
            inactive-text="domestic"
            class="switcher"
          />
          <el-tooltip effect="light" placement="top">
            <div slot="content" style="width: 400px;">
              This heatmap visualizes the change in the number of flights that accrued 2020 compared to 2019.
              The y-axis of the heatmap lists the countries which are displayed. On the x-axis, the month is shown.
              The switch above the heatmap allows you to switch from international to domestic flights.
              A flight is counted as international when the departing airport is within the country and the arriving airport outside of it. Domestic flights depart and arrive within the selected country.
              Below the heatmap, you can see a legend describing what value ranges the colors in the heatmap represent. If a cell has a blue shade it means that the aviation traffic (domestic or international depending on the switch) has increased in 2020 compared to 2019. If a cell has a red shade the traffic has decreased.
              <br />The data was taken from the
              <a
                href="https://opensky-network.org"
                target="_blank"
              >The OpenSky Network</a> community which is a community-driven network that collects and provides data for research and academic purposes.
            </div>
            <i class="el-icon-question" />
          </el-tooltip>
        </el-col>
        <el-col :span="12">
          <SelectedCountryTitle
            :country-name="selectedCountry"
            :country-code="selectedCountryCode"
          />
        </el-col>
      </el-row>
      <el-row class="diagram_wrap">
        <el-col :span="12">
          <HeatMap
            @selectCountry="setSelectedCountry"
            :type-of-flights="toogleTypeOfFlights"
            :selected-countries="selectedCountries"
            :country-name="selectedCountry"
          />
        </el-col>
        <el-col :span="12">
          <LineChart
            :country-name="selectedCountry"
            :country-code="selectedCountryCode"
            :type-of-flights="toogleTypeOfFlights"
            :selected-countries="selectedCountries"
          />
          <CoronaLineChart
            :country-name="selectedCountry"
            :country-code="selectedCountryCode"
            :type-of-flights="toogleTypeOfFlights"
            :selected-countries="selectedCountries"
          />
        </el-col>
      </el-row>
    </section>
    <a class="smooth_link" href="#highlights" v-smooth-scroll>
      <div class="arrow" />
    </a>
    <section class="documentation">
      <h1 class="highlights_heading" id="highlights">INCIDENTS</h1>
      <HighlightChinaRight :selected-country="setSelectedCountry" />
      <HighlightIcelandLeft :selected-country="setSelectedCountry" />
      <HighlightItalyRight :selected-country="setSelectedCountry" />
      <HighlightAustriaLeft :selected-country="setSelectedCountry" />
      <HighlightJapanRight :selected-country="setSelectedCountry" />
      <HighlightSwedenLeft :selected-country="setSelectedCountry" />
      <HighlightUSARight :selected-country="setSelectedCountry" />
      <HighlightBrazilLeft :selected-country="setSelectedCountry" />
    </section>
    <el-footer>
      <div class="footer">
        Flight Data provided by
        <a
          id="opensky-link"
          target="_blank"
          href="http://www.opensky-network.org"
        >The OpenSky Network</a>
      </div>
    </el-footer>
  </div>
</template>

<script>
import HeatMap from "./components/HeatMap.vue";
import SelectedCountryTitle from "./components/SelectedCountryTitle.vue";
import LineChart from "./components/LineChart.vue";
import CoronaLineChart from "./components/CoronaLineChart.vue";
import HighlightChinaRight from "./components/HighlightChinaRight.vue";
import HighlightIcelandLeft from "./components/HighlightIcelandLeft.vue";
import HighlightItalyRight from "./components/HighlightItalyRight.vue";
import HighlightAustriaLeft from "./components/HighlightAustriaLeft.vue";
import HighlightJapanRight from "./components/HighlightJapanRight.vue";
import HighlightSwedenLeft from "./components/HighlightSwedenLeft.vue";
import HighlightUSARight from "./components/HighlightUSARight.vue";
import HighlightBrazilLeft from "./components/HighlightBrazilLeft.vue";

export default {
  name: "App",
  components: {
    HeatMap,
    SelectedCountryTitle,
    LineChart,
    CoronaLineChart,
    HighlightChinaRight,
    HighlightIcelandLeft,
    HighlightItalyRight,
    HighlightAustriaLeft,
    HighlightJapanRight,
    HighlightSwedenLeft,
    HighlightUSARight,
    HighlightBrazilLeft
  },
  data() {
    return {
      selectedCountry: "Germany",
      selectedCountryCode: "DE",
      selectedTimeStamp: "",
      toogleTypeOfFlights: "internationalFlights",
      selectedCountries: [
        {
          countryCode: "AT",
          countryDisplayedName: "Austria"
        },
        {
          countryCode: "ES",
          countryDisplayedName: "Spain"
        },
        {
          countryCode: "IS",
          countryDisplayedName: "Iceland"
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
          countryCode: "IT",
          countryDisplayedName: "Italy"
        },
        {
          countryCode: "JP",
          countryDisplayedName: "Japan"
        },
        // {
        //   countryCode: "SN",
        //   countryDisplayedName: "Senegal"
        // },
        {
          countryCode: "RU",
          countryDisplayedName: "Russia"
        },
        {
          countryCode: "SA",
          countryDisplayedName: "Saudi Arabia"
        },
        {
          countryCode: "UK",
          countryDisplayedName: "UK"
        },
        {
          countryCode: "US",
          countryDisplayedName: "USA"
        },
        {
          countryCode: "SE",
          countryDisplayedName: "Sweden"
        }
      ]
    };
  },
  methods: {
    setSelectedCountry(newCountry) {
      this.selectedCountry = newCountry.countryName;
      this.selectedCountryCode = newCountry.countryCode;
    }
  }
};
</script>

<style >
/* @import url('https://fonts.googleapis.com/css?family=Lato'); */

html,
body {
  font-family: "Roboto Condensed", sans-serif;
}

body {
  margin: 0px 0px 0px 0px !important;
}

#app {
  font-family: "Roboto Condensed", sans-serif;
}

.switcher {
  min-height: 100%;
  margin-right: 20px;
}

.switcher_country_wrapper {
  margin-top: 70px;
}

.diagram_wrap {
  margin: 10px 50px 50px 50px;
}

.head_label {
  text-align: center;
  width: 70%;
  margin-left: auto;
  margin-right: auto;

  box-shadow: 0px 23px 30px -20px #111;
}

.head_label > h1 {
  color: white;
}

h1 {
  color: #282828;
}

.heading {
  text-align: center;
  background-color: #282828;
}

.fullpage {
  height: 100vh;
  width: 100%;
}

.highlights_heading {
  padding-top: 40px;
  padding-bottom: 50px;
  text-align: center;
  font-size: 60px;
  letter-spacing: 12px;
  border-bottom: solid 1px #282828;
  margin-bottom: 0px;
}

.smooth_link {
  position: absolute;
  left: 50%;
  bottom: 20px;
}
div.arrow {
  width: 3vmin;
  height: 3vmin;
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  bottom: 20px;
  transform: rotate(135deg);
}
div.arrow::before {
  content: "";
  width: 100%;
  height: 100%;
  border-width: 0.8vmin 0.8vmin 0 0;
  border-style: solid;
  border-color: #282828;
  transition: 0.2s ease;
  display: block;
  transform-origin: 100% 0;
}
div.arrow:after {
  content: "";
  float: left;
  position: relative;
  top: -100%;
  width: 100%;
  height: 100%;
  border-width: 0 0.8vmin 0 0;
  border-style: solid;
  border-color: #282828;
  transform-origin: 100% 0;
  transition: 0.2s ease;
}
div.arrow:hover::after {
  transform: rotate(45deg);
  border-color: orange;
  height: 120%;
}
div.arrow:hover::before {
  border-color: orange;
  transform: scale(0.8);
}

.el-footer {
  background-color: #282828;
}

.footer {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 12px;
}

#opensky-link {
  color: white;
  margin-left: 5px;
}
</style>
