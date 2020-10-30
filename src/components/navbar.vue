<template>
  <v-app-bar
    app
    class="grey darken-4 white--text"
    flat
    outlined
    elevate-on-scroll
  >
    <v-container class="pa-0">
      <v-row>
        <v-col cols="12" class="pa-0 d-flex justify-space-between">
          <v-btn dark icon class="no-active" to="/">
            <v-icon>mdi-home</v-icon>
          </v-btn>

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