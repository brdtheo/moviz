<template>
  <div class="py-8 py-sm-16">
    <div class="mb-5 d-flex justify-space-between align-center">
      <h2 class="font-weight-light">{{ $t("latestmovies") }}</h2>
      <v-btn x-small text class="white--text" to="all-movies">
        {{ $t("allmovies") }}
      </v-btn>
    </div>
    <v-row v-if="loading">
      <v-col sm="4" md="3" class="col-12">
        <MovieCardPlaceholder />
      </v-col>
      <v-col sm="4" md="3" class="col-12">
        <MovieCardPlaceholder />
      </v-col>
      <v-col sm="4" md="3" class="col-12">
        <MovieCardPlaceholder />
      </v-col>
      <v-col sm="4" md="3" class="col-12">
        <MovieCardPlaceholder />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col
        sm="4"
        md="3"
        class="col-12"
        v-for="movie in movies"
        :key="movie.id"
      >
        <moviecard
          :image="movie.image"
          :name="movie.name"
          :year="movie.year"
          :description="movie.description.en"
          :movieId="movie.id"
          v-if="$i18n.locale == 'en'"
        />
        <moviecard
          :image="movie.image"
          :name="movie.name"
          :year="movie.year"
          :description="movie.description.fr"
          :movieId="movie.id"
          v-if="$i18n.locale == 'fr'"
        />
        <moviecard
          :image="movie.image"
          :name="movie.name"
          :year="movie.year"
          :description="movie.description.jp"
          :movieId="movie.id"
          v-if="$i18n.locale == 'jp'"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import MovieCardPlaceholder from "./placeholders/MovieCardPlaceholder";
import moviecard from "./moviecard";
import { db } from "../firebase";

export default {
  name: "lastestMovies",

  components: {
    moviecard,
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
      db.collection("movies").orderBy("uploadDate", "desc").limit(4)
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

