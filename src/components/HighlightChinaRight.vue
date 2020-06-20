<template>
  <div class="parent">
    <div class="item left">
      <div class="left-content">
        <h1 class="image-title">
          China
        </h1>
        <img
          src="@/assets/china.png"
          class="image"
        >
        <img
          src="@/assets/china-corona.png"
          class="image"
        >
      </div>
    </div>
    <div class="item right">
      <div class="right-content">
        <h1>China: first to spread, first to lock down</h1>
        <p>
          China, as the trigger of the pandemic, was the first to experience the collapse of air traffic. Compared to the global average
          air traffic had slumped significantly a few weeks earlier. Domestic air traffic, however, has relatively quickly returned to moderate
          increased. The rise begins with the peak of newly infected persons. When the number of newly infected has dropped sharply,
          domestic air traffic increased again. In addition, international air traffic is once again a bit below the worldwide
          Average. One could speculate that it is because nobody wants to go to China anymore since the origin of the pandemic took place there and the
          pandemic is still advancing worldwide.
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
          countryName: "China",
          countryCode: "CN"

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
