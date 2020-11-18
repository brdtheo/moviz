<template>
  <div>
    <Movierow />
    <Movierow genre="action" />
    <Movierow genre="drama" />
    <Movierow genre="comedy" />
    <Movierow genre="horror" />
    <Movierow genre="documentary" />
  </div>
</template>

<script>
import Movierow from "../components/movierow";

export default {
  name: "home",
  components: {
    Movierow,
  },
};
</script>