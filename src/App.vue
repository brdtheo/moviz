<template>
  <div id="app">
    <navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/navbar";

export default {
  components: {
    Navbar,
  },
};
</script>

<style>
@import "./assets/style.css";
</style>