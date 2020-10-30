<template>
  <div class="py-8 py-sm-16">
    <v-container class="pa-0">
      <div class="mb-5 d-flex justify-space-between align-center">
        <h2 class="font-weight-light">Lastest movies</h2>
        <v-btn x-small text class="white--text" to="all-movies"
          >all movies</v-btn
        >
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
          <moviecard>
            <v-img height="100" :src="movie.image"></v-img>
            <span slot="name">{{ movie.name }}</span>
            <span slot="year">{{ movie.year }}</span>
            <span slot="description">
              {{ movie.description.substring(0, 97) + "..." }}
            </span>
            <div slot="actions">
              <v-btn @click="navigate(movie.id)" color="indigo" dark small>
                infos
              </v-btn>
            </div>
          </moviecard>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import router from "../router/index";
import moviecard from "./moviecard";
import { db } from "../firebase";

export default {
  name: "lastestMovies",

  components: {
    moviecard,
  },

  data: () => {
    return {
      movies: {},
    };
  },

  methods: {
    navigate: (movieId) => {
      router.push({ name: "movie-detail", params: { movieId: movieId } });
    },
  },

  firestore: {
    movies: db.collection("movies").orderBy("uploadDate", "desc"),
  },
};
</script>

<style>
.v-card__title {
  word-break: break-word;
}
</style>