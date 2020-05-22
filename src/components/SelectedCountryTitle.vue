<template>
  <div>
    <h3>How did SARS-CoV-2 Virus restrictions impact the global aviation traffic?</h3>
    <h1>{{ countryName }}</h1>
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  props: {
    countryName: { default: "World", type: String, required: true }
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