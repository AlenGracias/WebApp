<template>
  <div>
    <canvas
      id="image-canvas"
      ref="canvas"
      v-bind:width="windowWidth"
      v-bind:height="windowHeight"
      v-bind:style="{ height: windowHeight, width: windowWidth }"
      style="background-color: black"
      v-on:mousemove="mouseover($event)"
      v-on:click="click($event)"
    >
    </canvas>
  </div>
</template>

<script>
//import apiRequests from "../apiRequests";
import grid from "../grid";

export default {
  name: "HelloWorld",
  data() {
    return {
      //text: "",
      fontSize: 13,
      mouseX: 0,
      mouseY: 0,
      timer: "",
      grid: "",
      gridData: {},
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
      txt: "",
      pixelRatio: 0,
    };
  },
  computed: {
    canvas: function () {
      return this.$refs.canvas;
    },
    ctx: function () {
      return this.canvas.getContext("2d");
    },
  },
  created() {
    this.text = "2";

    //this.text = this.grid.getString();
    this.timer = setInterval(this.updateGrid, 42);
  },
  watch: {
    windowHeight() {},
    windowWidth() {},
    mouseX() {},
    mouseY() {},
  },
  methods: {
    mouseover: function (event) {
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
      //console.log(`${event.clientX},${event.clientX}`);
    },
    click: function (event) {
      this.grid.events.click.trigger({
        x: this.grid.convertXCoor(event.clientX),
        y: this.grid.convertYCoor(event.clientY),
      });
    },
    updateGrid() {
      this.grid.update(
        this.windowWidth,
        this.windowHeight,
        this.mouseX,
        this.mouseY
      );

      this.gridData = this.grid.getData();

      //this.text = this.grid.getString();
      //this.$nextTick(() => { ??????
    },
    cancelTimer() {
      clearInterval(this.timer);
    },
    onResize() {
      this.windowHeight = window.innerHeight;
      this.windowWidth = window.innerWidth;
    },
  },
  mounted() {
    this.grid = new grid(this.ctx, this.windowWidth, this.windowHeight);
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });

    this.pixelRatio = window.devicePixelRatio;
  },
  beforeDestroy() {
    this.cancelTimer();
    window.removeEventListener("resize", this.onResize);
  },
};
</script>

<style>
</style>