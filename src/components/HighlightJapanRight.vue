<template>
  <div class="parent">
    <div class="item left">
      <div class="left-content">
        <h1 class="image-title">
          Japan
        </h1>
        <img
          src="@/assets/japan.png"
          class="image"
        >
      </div>
    </div>
    <div class="item right">
      <div class="right-content">
        <h1>Japan</h1>
        <p>
When you look at Japan's flight figures, you can see that international air traffic is collapsing into a worldwide lockdown. Only week 9-11 shows a small deviation. However, domestic flights did not decrease until 1 month later, when the registered corona falls had increased sharply.        </p>
        <a 
          href="#app"
          v-smooth-scroll
        >
          <el-button
            @click="changeCountry()"
          >
            SEE IN DIAGRAM
          </el-button>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedCountry: {type: Function},
  },
  data() {
    return {};
  },
  methods: {
    changeCountry() {
      this.selectedCountry( 
        {
          countryName: "Japan",
          countryCode: "JP"

        })
    }
  },
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