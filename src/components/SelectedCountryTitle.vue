<template>
  <div>
<<<<<<< HEAD
    <h1 style="display:inline">
      {{ countryName }}
    </h1>({{ countryCode }})
=======
    <h3>How did SARS-CoV-2 Virus restrictions impact the global aviation traffic?</h3>
    <h1>{{ countryName }}</h1>{{ countryCode }}
>>>>>>> 19edc4be19cc2d2be154700684cd6b5990155e3f
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