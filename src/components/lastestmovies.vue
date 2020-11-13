<template>
  <div class="py-8 py-sm-16">
    <div class="mb-5 d-flex justify-space-between align-center">
      <h2 class="font-weight-light">{{ $t("latestmovies") }}</h2>
      <v-btn x-small text class="white--text" to="all-movies">
        {{ $t("allmovies") }}
      </v-btn>
    </div>
    <v-row v-if="loading">
      <v-col sm="3" md="2" class="col-6">
        <MovieCardPlaceholder />
      </v-col>
      <v-col sm="3" md="2" class="col-6">
        <MovieCardPlaceholder />
      </v-col>
      <v-col sm="3" md="2" class="col-6">
        <MovieCardPlaceholder />
      </v-col>
      <v-col sm="3" md="2" class="col-6">
        <MovieCardPlaceholder />
      </v-col>
      <v-col sm="3" md="2" class="col-6">
        <MovieCardPlaceholder />
      </v-col>
      <v-col sm="3" md="2" class="col-6">
        <MovieCardPlaceholder />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col
        sm="3"
        md="2"
        class="col-6"
        v-for="movie in movies"
        :key="movie.id"
      >
        <Moviecard
          :poster="movie.poster"
          :name="movie.name"
          :year="movie.year"
          :movieId="movie.id"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import MovieCardPlaceholder from "./placeholders/MovieCardPlaceholder";
import Moviecard from "./Moviecard";
import { db } from "../firebase";

export default {
  name: "lastestMovies",

  components: {
    Moviecard,
    MovieCardPlaceholder,
  },

  data() {
    return {
      movies: [],
      loading: true,
    };
  },

  methods: {
    returnlocale() {
      return this.$i18n.locale;
    },
  },

  created() {
    this.$bind(
      "movies",
      db.collection("movies").orderBy("uploadDate", "desc").limit(6)
    ).then(() => {
      this.loading = false;
    });
  },
};
</script>

<style>
.v-card__title {
  word-break: break-word;
}
</style>

