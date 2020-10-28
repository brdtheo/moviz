<template>
  <div class="py-8 py-sm-16">
    <v-container class="pa-0">
      <div class="mb-5 d-flex justify-space-between align-center">
        <h2 class="font-weight-light">All movies</h2>
      </div>
      <v-row>
        <v-col
          sm="4"
          md="4"
          lg="3"
          xl="2"
          class="col-12"
          v-for="movie in movies"
          :key="movie.id"
        >
          <v-card>
            <v-img height="100" :src="movie.image"></v-img>
            <v-card-title>{{ movie.name }}</v-card-title>
            <v-card-subtitle>{{ movie.year }}</v-card-subtitle>
            <v-card-text>
              {{ movie.description.substring(0, 97) + "..." }}
            </v-card-text>
            <v-card-actions>
              <v-btn small color="indigo" class="white--text"> infos </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { db } from "../firebase";

export default {
  data: () => {
    return {
      movies: {},
    };
  },

  firestore: {
    movies: db.collection("movies").orderBy("name"),
  },
};
</script>