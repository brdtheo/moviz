<template>
  <v-card>
    <slot></slot>
    <v-card-title>
      <slot name="name"></slot>
    </v-card-title>
    <v-card-subtitle>
      <slot name="year"></slot>
    </v-card-subtitle>
    <v-card-text>
      <slot name="description"></slot>
    </v-card-text>
    <v-card-actions>
      <slot name="actions"></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "moviecard",
};
</script>