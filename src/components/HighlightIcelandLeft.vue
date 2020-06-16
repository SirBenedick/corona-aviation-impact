<template>
  <div class="parent-cl">
    <div class="item left-cl">
      <div class="left-content-cl">
        <h1>Iceland doemstic flights</h1>
        <p>
          As Iceland is an island, there is basically very little domestic air traffic. In simple terms, if there are normally 5 flights
          on the day and then at a time of 25 there is an increase of 500%. However, one can only speculate about the cause of the increase. A
          Announcement of travel restrictions could trigger the urge to get home quickly when you have been somewhere else.
        </p>
      </div>
    </div>
    <div class="item right-cl">
      <div class="right-content-cl">
        <h1 class="image-title-cl">
          Iceland
        </h1>
        <img
          src="@/assets/iceland.png"
          class="image-cl"
        >
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
