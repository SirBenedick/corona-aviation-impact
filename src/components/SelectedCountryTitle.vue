<template>
  <h1>{{ countryName }}</h1>
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