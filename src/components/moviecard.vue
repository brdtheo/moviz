<template>
  <v-card>
    <v-img position="top" height="100" :src="image"></v-img>
    <v-card-title>{{ name }}</v-card-title>
    <v-card-subtitle>{{ year }}</v-card-subtitle>
    <v-card-text>{{ description.substring(0, 97) + "..." }}</v-card-text>
    <v-card-actions>
      <v-btn
        @click="
          navigate(movieId);
          $emit('event');
        "
        color="indigo"
        dark
        small
      >
        infos
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import router from "../router/index";

export default {
  name: "moviecard",

  props: {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    movieId: {
      type: String,
      required: true,
    }
  },

  methods: {
    navigate(id) {
      router.push({ name: "movie-detail", params: { movieId: id } });
    },
  },
};
</script>