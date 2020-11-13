<template>
  <v-card class="grey darken-3 review" dark>
    <v-card-title class="pb-2">
      <span class="placeholder placeholder__rating__name"></span>
    </v-card-title>
    <div class="px-4">
      <span class="placeholder placeholder__rating"></span>
    </div>
    <v-card-text>
      <span class="placeholder placeholder__rating__description"></span>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ReviewPlaceholder",
};
</script>