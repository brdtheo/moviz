<template>
  <div>
    <v-btn
      v-if="icon"
      target="_blank"
      :href="url"
      class="mt-1 mr-1 mb-1 grey--text text--darken-4"
      dark
      small
      :color="color"
    >
      <slot></slot>
      <v-icon size="18" right dark>{{ "mdi-" + icon }}</v-icon>
    </v-btn>
    <v-btn
      v-else
      target="_blank"
      :href="url"
      class="mt-1 mr-1 mb-1"
      dark
      small
      :color="color"
    >
      <slot></slot>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "movieLink",

  props: {
    url: { type: String, required: true },
    color: { type: String, default: "indigo" },
    icon: { type: String },
  },
};
</script>