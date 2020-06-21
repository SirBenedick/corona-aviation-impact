<template>
  <div class="parent-cl">
    <div class="item left-cl">
      <div class="left-content-cl">
        <h1>Brazil with the late outbreak</h1>
        <p>
          Brazil had a very late but also very severe outbreak compared to other countries, although they have restricted air traffic at the same time as other countries
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
    <div class="item right-cl">
      <div class="right-content-cl">
        <h1 class="image-title-cl">
          Brazil
        </h1>
        <img
          src="@/assets/brazil.png"
          class="image-cl"
        >
        <img
          src="@/assets/brazil-corona.png"
          class="image-cl"
        >
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
          countryName: "Brazil",
          countryCode: "BR"

        })
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
    color:white;

}

.left-content-cl > h1 {
  color: white;
  font-size: 3em;
}

.image-cl {
  max-width: 100%;
}

</style>