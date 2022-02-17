<template>
  <div id="app">
    <ascii />
  </div>
</template>

<script>
import ascii from "./components/ascii.vue";

export default {
  name: "App",
  components: {
    ascii,
  },
};
</script>

<style>
#app {
  font-family: "Courier New", Courier, monospace;
}

* {
  padding: 0;
  margin: 0;
  overflow: hidden;
  cursor: none;
}
</style>






