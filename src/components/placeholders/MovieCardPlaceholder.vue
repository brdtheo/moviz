<template>
  <v-card>
    <v-img class="grey lighten-3" height="100"></v-img>
    <v-card-title class="mb-1">
      <span class="placeholder placeholder__name"></span>
    </v-card-title>
    <v-card-subtitle>
      <span class="placeholder placeholder__year"></span>
    </v-card-subtitle>
    <v-card-text>
      <span class="placeholder placeholder__description"></span>
    </v-card-text>
    <v-card-actions>
      <div class="placeholder placeholder__btn"></div>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "MovieCardPlaceholder",
};
</script>