<template>
  <div class="py-8 py-sm-16">
    <v-container class="pa-0">
      <div class="mb-5 d-flex justify-space-between align-center">
        <h2 class="font-weight-light">
          {{
            $t("allmoviesbycategory") +
            " " +
            $t("genre." + this.$route.params.genre) +
            ` (${movies.length})`
          }}
        </h2>
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
    </v-container>
  </div>
</template>

<script>
import MovieCardPlaceholder from "../components/placeholders/MovieCardPlaceholder";
import Moviecard from "../components/moviecard";
import { db } from "../firebase";

export default {
  data() {
    return {
      movies: [],

      loading: true,
    };
  },

  components: {
    Moviecard,
    MovieCardPlaceholder,
  },

  created() {
    this.$bind(
      "movies",
      db
        .collection("movies")
        .where("genre", "array-contains-any", [this.$route.params.genre])
    ).then(() => {
      this.loading = false;
    });
  },
};
</script>