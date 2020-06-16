<template>
  <div class="parent">
    <div class="item left">
      <div class="left-content">
        <h1 class="image-title">
          Italy
        </h1>
        <img
          src="@/assets/italy.png"
          class="image"
        >
      </div>
    </div>
    <div class="item right">
      <div class="right-content">
        <h1>Italy early lock down</h1>
        <p>
          The first closures took place on 21st February 2020, initially affecting only 50000 people. Already on 09th March 2020 a
          national quarantine. This also had an impact on air traffic, which in comparison to global air traffic used to be
          broke in. However, it was announced that it was not an absolute ban and, among other things, flights in proven
          working conditions and emergencies are allowed, which explains the slight increase after the break-in. The national quarantine was lifted on 18th May.
        </p>
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
  border-bottom: solid 1px #282828;

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


.right {
  background-color: #282828;
}

.left-content {
  margin: 30px;
  
}

.right-content {
    margin: 30px;
      color:white;

}

.right-content > h1 {
  font-size: 3em;
  color: white;
}

.image {
  max-width: 100%;
}

</style>
