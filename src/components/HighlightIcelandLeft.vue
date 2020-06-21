<template>
  <div class="parent-cl">
    <div class="item left-cl">
      <div class="left-content-cl">
        <h1>Iceland island effect</h1>
        <p>
          As Iceland is an island, there is very little domestic air traffic. In simple terms, if there usually are 5 flights
          in a day and then there are 25 in one day there is an increase of 400%. However, one can only speculate about the cause of the increase.
          An Announcement of travel restrictions could trigger the urge to get home quickly when you have been somewhere else.
          The spike in domestic traffic accures shortly before the worldwide increase in avaiation traffic change.
          This could be due to Iceland being on of the first countries effected by the SARS-CoV-2 virus.
        </p>
        <a href="#app" v-smooth-scroll>
          <el-button @click="changeCountry()">SEE IN DIAGRAM</el-button>
        </a>
      </div>
    </div>
    <div class="item right-cl">
      <div class="right-content-cl">
        <h1 class="image-title-cl">Iceland</h1>
        <img src="@/assets/iceland.png" class="image-cl" />
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
        countryName: "Iceland",
        countryCode: "IS"
      });
    }
  }
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
