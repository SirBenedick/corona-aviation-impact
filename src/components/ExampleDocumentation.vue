<template>
  <div>
    <el-row type="flex" align="middle">
      <el-col :span="12" type="flex" align="middle" class="left">
        <p>Image</p>
        <img src="@/assets/china_example.png" />
      </el-col>
      <el-col :span="12" type="flex" align="middle" class="right">
        <p>text</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>

<style>
.left {
  background-color: green;
}
.right {
  background-color: blue;
}
</style>