<template>
  <div id="app">
    <SelectedCountryTitle :country-name="selectedCountry" />
    <el-row>
      <el-col :span="12">
        <el-switch
          v-model="toogleTypeOfFlights"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-value="internationalFlights"
          inactive-value="domesticFlights"
          active-text="international"
          inactive-text="doemstic"
        />
        <RadialHeatMap
          @selectCountry="setSelectedCountry"
          :type-of-flights="toogleTypeOfFlights"
        />
      </el-col>
      <el-col :span="12">
        <LineChart
          :country-name="selectedCountry"
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

export default {
  name: "App",
  components: {
    RadialHeatMap,
    SelectedCountryTitle,
    LineChart
  },
  data() {
    return {
      selectedCountry: "World",
      selectedTimeStamp: "",
      toogleTypeOfFlights: "internationalFlights",
    };
  },
  methods: {
    setSelectedCountry(newCountryName) {
      this.selectedCountry = newCountryName;
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Lato');

html, body {
  font-family: 'Roboto Condensed', sans-serif;
}

#app {
  font-family: 'Roboto Condensed', sans-serif;
}
</style>
