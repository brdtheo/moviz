<template>
  <div class="py-8 py-sm-16">
    <div class="mb-5 d-flex justify-space-between align-center">
      <h2 class="font-weight-light">{{ $t("latestmovies") }}</h2>
      <v-btn x-small text class="white--text" to="all-movies">
        {{ $t("allmovies") }}
      </v-btn>
    </div>
    <v-row>
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
import moviecard from "./moviecard";
import { db } from "../firebase";

export default {
  name: "lastestMovies",

  components: {
    moviecard,
  },

  data() {
    return {
      movies: {},
    };
  },

  methods: {
    returnlocale() {
      return this.$i18n.locale;
    },
  },

  firestore: {
    movies: db.collection("movies").orderBy("uploadDate", "desc").limit(5),
  },
};
</script>

<style>
.v-card__title {
  word-break: break-word;
}
</style>

