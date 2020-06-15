<template>
  <div class="parent-cl">
    <div class="item left-cl">
      <div class="left-content-cl">
        <h1>China started early to lock down</h1>
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna 
          aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
          sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
          magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem 
          ipsum dolor sit amet.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna 
          aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
          sanctus est Lorem ipsum dolor sit amet. 
        </p>
      </div>
    </div>
    <div class="item right-cl">
      <div class="right-content-cl">
        <h1 class="image-title-cl">
          China
        </h1>
        <img
          src="@/assets/china_example.png"
          class="image-cl"
        >
        <p align="center">
          Short description - what are the colors?
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