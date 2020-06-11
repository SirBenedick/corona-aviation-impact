<template>
  <div class="parent">
    <div class="item left">
      <div class="left-content">
        <h1>China</h1>
        <img src="@/assets/china_example.png" class="image" />
      </div>
    </div>
    <div class="item right">
      <p>kjdfndlsakkjd fndlsakkjdfndlsakkjdf ndlsakkjdfndlsa kkjdfn dlsak kjdf ndlsak kjdfnd lsakkjdf ndlsak</p>
      <br />
      <p>kjdfndlsakkjd fndlsakkjdfndlsakkjdf ndlsakkjdfndlsa kkjdfn dlsak kjdf ndlsak kjdfnd lsakkjdf ndlsak</p>
      <br />
      <p>kjdfndlsakkjd fndlsakkjdfndlsakkjdf ndlsakkjdfndlsa kkjdfn dlsak kjdf ndlsak kjdfnd lsakkjdf ndlsak</p>
      <br />
      <p>kjdfndlsakkjd fndlsakkjdfndlsakkjdf ndlsakkjdfndlsa kkjdfn dlsak kjdf ndlsak kjdfnd lsakkjdf ndlsak</p>
      <br />
      <p>kjdfndlsakkjd fndlsakkjdfndlsakkjdf ndlsakkjdfndlsa kkjdfn dlsak kjdf ndlsak kjdfnd lsakkjdf ndlsak</p>
      <br />
      <p>kjdfndlsakkjd fndlsakkjdfndlsakkjdf ndlsakkjdfndlsa kkjdfn dlsak kjdf ndlsak kjdfnd lsakkjdf ndlsak</p>
      <br />
      <p>kjdfndlsakkjd fndlsakkjdfndlsakkjdf ndlsakkjdfndlsa kkjdfn dlsak kjdf ndlsak kjdfnd lsakkjdf ndlsak</p>
      <br />
      <p>kjdfndlsakkjd fndlsakkjdfndlsakkjdf ndlsakkjdfndlsa kkjdfn dlsak kjdf ndlsak kjdfnd lsakkjdf ndlsak</p>
      <br />
    </div>
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
.parent {
  display: -ms-flex;
  display: -webkit-flex;
  display: flex;
  padding: 20px;
}
.parent > div {
  flex: 1;
}

.container {
  display: flex;
  overflow: hidden;
  position: relative;
  width: 100%;
}
.item {
  padding: 10px;
}
.left {
  margin-right: 10px;
  background-color: lightgrey;
}
.right {
  margin-left: 10px;
  background-color: lightblue;
}
.left-content {
  position: -webkit-sticky;
  position: sticky;
  top: 1rem;
}
.image {
  max-width: 100%;
}
</style>