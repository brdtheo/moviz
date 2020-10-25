<template>
  <nav>
    <container>
      <h1>Moviz</h1>
    </container>
  </nav>
</template>

<script>
import container from './container'

export default {
  name: "navbar",
  components: {
    container,
  },
};
</script>

<style scoped>
nav {
  display: flex;
  width: 100%;
  background: var(--dark2);
}
</style>