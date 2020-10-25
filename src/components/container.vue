<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script>
export default {
    name: 'container'
};
</script>

<style scoped>
.container {
  width: 960px;
  margin: 0 auto;
}
</style>