<template>
  <div class="hello">
    <v-runtime-template :template="text"></v-runtime-template>
  </div>
</template>

<script>
//import apiRequests from "../apiRequests";
import grid from "../grid";
import VRuntimeTemplate from "v-runtime-template";

export default {
  name: "HelloWorld",
  data() {
    return {
      text: "",
      fontSize: 13,
      mouseX: 0,
      mouseY: 0,
      oldMouseX: 0,
      oldMouseY: 0,
      timer: "",
      grid: "",
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
      txt: "",
    };
  },
  created() {
    this.text = "2";

    this.grid = new grid(3, 3, this.windowWidth, this.windowHeight);
    this.text = this.grid.getString();
    this.timer = setInterval(this.updateGrid, 42);
  },
  watch: {
    windowHeight() {},
    windowWidth() {},
    mouseY() {},
    mouseX() {},
  },
  methods: {
    mouseover: function (event, x, y) {
      this.mouseX = x;
      this.mouseY = y;
      //console.log(`${x},${y}`);
    },
    updateGrid() {
      this.grid.update(
        this.windowWidth,
        this.windowHeight,
        this.mouseX,
        this.mouseY,
        this.oldMouseX,
        this.oldMouseY
      );

      this.oldMouseX = this.mouseX;
      this.oldMouseY = this.mouseY;

      this.text = this.grid.getString();
    },
    cancelTimer() {
      clearInterval(this.timer);
    },
    onResize() {
      this.windowHeight = window.innerHeight;
      this.windowWidth = window.innerWidth;
    },
    onMouseMove() {
      this.mouseX = clientX; // Gets Mouse X
      this.mouseY = clientY; // Gets Mouse Y
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
      window.addEventListener("mousemove", this.onMouseMove);
    });
  },
  beforeDestroy() {
    this.cancelTimer();
    window.removeEventListener("resize", this.onResize);
  },
  components: {
    VRuntimeTemplate,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
* {
  background: black;
  color: white;
  font-size: 13px;
  padding: 0;
  line-height: 13px;
  overflow: hidden;
  user-select: none;
}

p {
  white-space: break-spaces;
}

.highlighted {
  background: white;
  color: white;
}
</style>
