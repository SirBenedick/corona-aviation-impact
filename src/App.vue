<template>
  <div id="app">
    <SelectedCountryTitle
      :country-name="selectedCountry"
      :country-code="selectedCountryCode"
    />
    <el-row>
      <el-col :span="12">
        <el-switch
          v-model="toogleTypeOfFlights"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-value="internationalFlights"
          inactive-value="domesticFlights"
          active-text="international"
          inactive-text="domestic"
        />
        <RadialHeatMap
          @selectCountry="setSelectedCountry"
          :type-of-flights="toogleTypeOfFlights"
        />
      </el-col>
      <el-col :span="12">
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
</template>

<script>
import RadialHeatMap from "./components/RadialHeatMap.vue";
import SelectedCountryTitle from "./components/SelectedCountryTitle.vue";
import LineChart from "./components/LineChart.vue";
import CoronaLineChart from "./components/CoronaLineChart.vue";

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

<style>
/* @import url('https://fonts.googleapis.com/css?family=Lato'); */

html, body {
  font-family: 'Roboto Condensed', sans-serif;
}

#app {
  font-family: 'Roboto Condensed', sans-serif;
}
</style>
