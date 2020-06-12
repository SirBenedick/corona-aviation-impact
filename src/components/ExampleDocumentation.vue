<template>
  <div class="parent">
    <div class="item left">
      <div class="left-content">
        <h1 class="image-title">China</h1>
        <img src="@/assets/china_example.png" class="image" />
        <p align="center" >Short description - what are the colors?</p>
      </div>
    </div>
    <div class="item right">
      <div class="right-content">
        <h1>China started early to lock down</h1>
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
      </div>
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
  padding-right: 0px;
  padding-top: 25px;
  padding-bottom: 25px;
}
.left-content {
  position: -webkit-sticky;
  position: sticky;
  padding: 5px;
  top: 1rem;
  background-color: #ebebd3;

  border: solid;
  border-width: 3px;
  border-right-style: none;
  border-color: #ee964b;

  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}
.right {
  background-color: #ee964b;
  border-radius: 20px;
}
.right-content {
  position: -webkit-sticky;
  position: sticky;
  top: 1rem;
}
.image {
  max-width: 100%;
}
h1{
  color: #083d77;
}
</style>