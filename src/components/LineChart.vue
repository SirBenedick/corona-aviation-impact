<template>
  <div>
      <h1>this is a line chart hahahaha</h1>
      <b>{{countryName}}</b>
  </div>
</template>

<script>
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