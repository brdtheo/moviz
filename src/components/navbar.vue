<template>
  <v-app-bar
    app
    class="grey darken-4 white--text"
    flat
    outlined
    elevate-on-scroll
  >
    <v-container>
      <v-row justify="center">
        <v-col cols="6" class="nav-left">
          <v-btn dark icon to="/">
            <v-icon>mdi-home</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="6" class="nav-right">
          <v-btn dark icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: "navbar",
};
</script>

<style scoped>
.nav-left {
  display: flex;
  align-items: center;
}

.nav-right {
  display: flex;
  justify-content: flex-end;
}
</style>