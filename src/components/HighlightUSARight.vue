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
          Die USA haben den Flugverkehr erst ein paar Wochen nach anderen Ländern ihren Flugverkehr eingeschränkt. Man kann sehen, dass bei Woche 11 bis 12 die internationalen Flüge stark abnehmen, wenn die ersten Coronafälle in der USA registriert wurden. Die internationalen Flüge haben in der USA wurden jedoch nicht komplett eingestellt. Bei den Inlandflügen hat man bei den USA nur geringe Abweichungen zum Vorjahr. Beide Graphen laufen hier, wie auch bei anderen Ländern, fast Parallel zu den weltweiten Zahlen.
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