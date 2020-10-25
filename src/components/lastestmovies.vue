<template>
  <div class="py-16">
    <h2 class="font-weight-light mb-5">Lastest movies</h2>

    <v-container class="pa-0">
      <v-row>
        <v-col
          xs="6"
          sm="4"
          md="4"
          lg="3"
          xl="2"
          v-for="movie in movies"
          :key="movie.id"
        >
          <v-card>
            <v-img :src="movie.image"></v-img>
            <v-card-title>{{ movie.name }}</v-card-title>
            <v-card-subtitle>{{ movie.year }}</v-card-subtitle>
            <v-card-text>{{ movie.description }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { db } from "../firebase";

export default {
  name: "lastestMovies",

  data: () => {
    return {
      movies: {},
    };
  },

  firestore: {
    movies: db.collection("movies"),
  },
};
</script>

<style>
</style>