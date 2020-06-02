<template>
  <div
    id="app"
  >
    <div class="app_container">
      <el-row
        type="flex"
        align="middle"
      />
      <el-row
        type="flex"
        class="head_label head_label_box"
        align="middle"
      >
        <el-col
          :span="10"
          :push="7"
          class="header_label "
        >
          <SelectedCountryTitle
          
            :country-name="selectedCountry"
            :country-code="selectedCountryCode"
          />
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
        </el-col>
      </el-row>
      <el-row class="heading">
        <h1>How have the limitations of the SARS-CoV-2 virus affected global air traffic? </h1>
      </el-row>
      <el-row class="diagram_wrap">
        <el-col
          :span="12"
        >
          <RadialHeatMap
            @selectCountry="setSelectedCountry"
            :type-of-flights="toogleTypeOfFlights"
          />
        </el-col>
        <el-col
          :span="12"
        >
          <LineChart
            :country-name="selectedCountry"
            :country-code="selectedCountryCode"
            :type-of-flights="toogleTypeOfFlights"
          />
          <CoronaLineChart
            :country-name="selectedCountry"
            :country-code="selectedCountryCode"
            :type-of-flights="toogleTypeOfFlights"
          />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import RadialHeatMap from "./components/RadialHeatMap.vue";
import SelectedCountryTitle from "./components/SelectedCountryTitle.vue";
import LineChart from "./components/LineChart.vue";
import CoronaLineChart from "./components/CoronaLineChart.vue";
import RadialHeatMapLabel from "./components/RadialHeatMapLabel.vue";

export default {
  name: "App",
  components: {
    RadialHeatMap,
    SelectedCountryTitle,
    LineChart,
    CoronaLineChart
  },
  data() {
    return {
      selectedCountry: "World",
      selectedCountryCode: "World",
      selectedTimeStamp: "",
      toogleTypeOfFlights: "internationalFlights",
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


html, body {
  font-family: 'Roboto Condensed', sans-serif;
}

body {
  margin:0px 0px 0px 0px !important;
}

#app {
  font-family: 'Roboto Condensed', sans-serif;
}

.switcher {
  min-height:100%;
}


.diagram_wrap {
  margin: 50px 50px 50px 50px;

}

.head_label {
  height:90px;
  text-align:center;
  width:700px;
  margin-left:auto;
  margin-right: auto;
-webkit-box-shadow: -40px 20px 40px -30px rgba(0,0,0,0.75);
-moz-box-shadow: -40px 20px 40px -30px rgba(0,0,0,0.75);
    box-shadow: 0px 20px 20px -25px #111;  
  
}

.heading {
  text-align:center;
}


</style>
