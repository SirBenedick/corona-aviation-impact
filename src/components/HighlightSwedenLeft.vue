<template>
  <div class="parent-cl">
    <div class="item left-cl">
      <div class="left-content-cl">
        <h1>Sweden with a different technique</h1>
        <p>On the basis of the graph of Sweden, one can clearly see that international air traffic has been almost completely shut down for the time being. However, domestic flights continue to operate here, even if not to the same extent as before. This might be due to the fact that in Sweden corona measures are more voluntary.</p>
        <a href="#app" v-smooth-scroll>
          <el-button @click="changeCountry()">SEE IN DIAGRAM</el-button>
        </a>
      </div>
    </div>
    <div class="item right-cl">
      <div class="right-content-cl">
        <h1 class="image-title-cl">Sweden</h1>
        <img src="@/assets/sweden.png" class="image-cl" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedCountry: { type: Function }
  },
  data() {
    return {};
  },
  methods: {
    changeCountry() {
      this.selectedCountry({
        countryName: "Sweden",
        countryCode: "SE"
      });
    }
  },
  mounted() {}
};
</script>

<style>
.parent-cl {
  display: -ms-flex;
  display: -webkit-flex;
  display: flex;
  border-bottom: solid 1px #282828;
}
.parent-cl > div {
  flex: 1;
}

.container-cl {
  display: flex;
  overflow: hidden;
  position: relative;
  width: 100%;
}
.item-cl {
  padding: 10px;
}

.left-cl {
  background-color: #282828;
}

.right-content-cl {
  margin: 30px;
}

.left-content-cl {
  margin: 30px;
  color: white;
}

.left-content-cl > h1 {
  color: white;
  font-size: 3em;
}

.image-cl {
  max-width: 100%;
}
</style>