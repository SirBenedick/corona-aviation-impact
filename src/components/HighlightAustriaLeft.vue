<template>
  <div class="parent-cl">
    <div class="item left-cl">
      <div class="left-content-cl">
        <h1>Austria enjoys gliding</h1>
        <p>
          Already on 01st May 2020, the measures concerning leisure sports in Austria were relaxed. This also included gliding,
          which is why domestic flights in Austria have increased enormously.
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
          Austria
        </h1>
        <img
          src="@/assets/austria.png"
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
          countryName: "Austria",
          countryCode: "AT"

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
