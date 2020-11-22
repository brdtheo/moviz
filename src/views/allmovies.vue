<template>
  <div>
    <filtermovies
      @select-platform="selectPlatform"
      @sort="sort($event)"
      @unselect-platform="unselectPlatform()"
      @select-genre="selectGenre"
    />

    <div class="mb-5 d-flex justify-space-between align-center">
      <h2 class="font-weight-light">
        {{ $t("allmovies") + ` (${movies.length})` }}
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
import MovieCardPlaceholder from "../components/placeholders/MovieCardPlaceholder";
import filtermovies from "../components/filtermovies";
import Moviecard from "../components/moviecard";
import { db } from "../firebase";

export default {
  components: {
    Moviecard,
    filtermovies,
    MovieCardPlaceholder,
  },

  data() {
    return {
      movies: [],
      loading: true,
    };
  },

  methods: {
    selectGenre(array) {
      this.loading = true;
      if (array.length == 0) {
        this.$bind("movies", db.collection("movies")).then(() => {
          this.loading = false;
        });
      } else {
        this.$bind(
          "movies",
          db.collection("movies").where("genre", "array-contains-any", array)
        ).then(() => {
          this.loading = false;
        });
      }
    },

    selectPlatform(platform) {
      this.loading = true;
      this.$bind(
        "movies",
        db.collection("movies").where("links." + platform, "!=", "")
      ).then(() => {
        this.loading = false;
      });
    },

    unselectPlatform() {
      this.loading = true;
      this.$bind("movies", db.collection("movies")).then(() => {
        this.loading = false;
      });
    },
  },

  created() {
    this.$bind("movies", db.collection("movies")).then(() => {
      this.loading = false;
    });
  },
};
</script>