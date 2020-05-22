<template>
  <div id="app">
    <SelectedCountryTitle :country-name="selectedCountry" />
    <el-row>
      <el-col :span="12">
        <RadialHeatMap @selectCountry="setSelectedCountry" />
      </el-col>
      <el-col :span="12">
        <LineChart :country-name="selectedCountry" />
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
      selectedTimeStamp: ""
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
</style>
