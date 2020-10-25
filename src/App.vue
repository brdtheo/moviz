<template>
  <v-app>
    <navbar />
    <v-main>
      <v-container>content</v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/navbar";

export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>

<style>
.nav-left {
  display: flex;
  align-items: center;
}

.nav-right {
  display: flex;
  justify-content: flex-end;
}
</style>