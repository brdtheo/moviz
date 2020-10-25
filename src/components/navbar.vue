<template>
  <v-app-bar app color="#212121" class="white--text">
    <v-container>
      <v-row justify="center">
        <v-col cols="6" class="nav-left">
          <v-toolbar-title color="white" class="title">Moviz</v-toolbar-title>
        </v-col>
        <v-col cols="6" class="nav-right">
          <v-btn color="white" icon>
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