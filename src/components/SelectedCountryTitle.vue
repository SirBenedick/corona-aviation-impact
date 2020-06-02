<template>
  <div>
    <h1 style="display:inline">{{ countryName }}</h1>
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  props: {
    countryName: { default: "World", type: String, required: true },
    countryCode: { default: "", type: String, required: true }
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>

<style>
</style>