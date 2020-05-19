<template>
  <div id="app">
    <h1>United States of America</h1>
    <el-row>
      <el-col :span="12">
        <RadialHeatMap />
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

export default {
  name: "App",
  components: {
    // LSDFlights,
    RadialHeatMap
  }
};
</script>

<style>
</style>
