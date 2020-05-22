<template>
  <div>
    <h1>this is a line chart hahahaha</h1>
    <b>{{ countryName }}</b>
    {{ typeOfFlights }}
  </div>
</template>

<script>
export default {
  props: {
    countryName: { default: "World", type: String, required: true },
    typeOfFlights: { default: "internationalFlights", type: String, required: true }
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