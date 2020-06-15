<template>
  <div id="app">
    <section class="fullpage">
      <el-row 
        type="flex"
        class="heading"
      >
        <el-col class="head_label">
          <h1 style="font-size: 30px">
            How have the limitations of the SARS-CoV-2 virus affected global air traffic?
          </h1>
        </el-col>
      </el-row>
      <el-row
        class="switcher_country_wrapper"
        type="flex"
      >
        <el-col
          :span="12"
          
          align="center"
        >
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
          <el-tooltip
            effect="light"
            placement="top"
          >
            <div slot="content">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, <br>
              sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.<br>
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
            </div>
            <i class="el-icon-question" />
          </el-tooltip>
        </el-col>
        <el-col
          :span="12"
        >
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
    <a 
      class="smooth_link"     
      href="#highlights"
      v-smooth-scroll
    >
      <div class="arrow" /></a>
    <section class="documentation">
      <h1
        class="highlights_heading "
        id="highlights"
      >
        HIGHLIGHTS
      </h1>
      <HighlightChinaRight />
      <HighlightIcelandLeft />
      <HighlightItalyRight />
      <HighlightAustriaLeft />
      <HighlightJapanRight />
      <HighlightSwedenLeft />
      <HighlightUSARight />
    </section>
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
  margin-right:20px;
}

.switcher_country_wrapper {
  margin-top:70px;
}

.diagram_wrap {
  margin: 10px 50px 50px 50px;
}

.head_label {
  height: 80px;
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
  color:#282828;
}

.heading {
  text-align: center;
  background-color:  	#282828;

}

.fullpage {
  height: 100vh;
  width: 100%;
}

.highlights_heading {
  padding-top:40px;
  padding-bottom:50px;
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

</style>
