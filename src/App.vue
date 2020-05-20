<template>
  <div id="app">
    <SelectedCountryTitle :country-name="selectedCountry" />
    <el-row>
      <el-col :span="12">
        <RadialHeatMap @selectCountry="setSelectedCountry" />
      </el-col>
      <el-col :span="12">
        <el-row :span="12">
          <h1>Diagramm 1</h1>
        </el-row>
        <el-row>
          <h1>Diagramm 2</h1>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LSDFlights from "./components/LSDFlights.vue";
import RadialHeatMap from "./components/RadialHeatMap.vue";
import SelectedCountryTitle from "./components/SelectedCountryTitle.vue";

export default {
  name: "App",
  components: {
    RadialHeatMap,
    SelectedCountryTitle
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
