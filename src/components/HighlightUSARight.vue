<template>
  <div class="parent">
    <div class="item left">
      <div class="left-content">
        <h1 class="image-title">
          USA USA USA USA USA
        </h1>
        <img
          src="@/assets/usa.png"
          class="image"
        >
      </div>
    </div>
    <div class="item right">
      <div class="right-content">
        <h1>USA</h1>
        <p>
            The USA has only restricted air traffic to other countries a few weeks ago. One can see that at week 11 to 12, international flights decrease sharply when the first corona cases are registered in the USA. The international flights have been discontinued in the USA but not completely. In terms of domestic flights, there were only minor deviations from the previous year in the USA. Both graphs run here, as in other countries, almost parallel to the global figures.

        </p>
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
          countryName: "USA",
          countryCode: "US"

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