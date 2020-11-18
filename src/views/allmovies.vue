<template>
  <div class="py-8 py-sm-16">
    <filtermovies
      @enable-netflix-only="enableNetflixOnly()"
      @disable-netflix-only="disableNetflixOnly()"
      @sort="sort($event)"
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

      // filters
      displayNetflixOnly: false,
    };
  },

  methods: {
    enableNetflixOnly() {
      if (!this.displayNetflixOnly) {
        this.loading = true;
        this.displayNetflixOnly = true;
        this.$bind(
          "movies",
          db.collection("movies").where("links.netflix", "!=", "")
        ).then(() => {
          this.loading = false;
        });
      }
    },

    disableNetflixOnly() {
      this.loading = true;
      this.displayNetflixOnly = false;
      this.$bind("movies", db.collection("movies").orderBy("name")).then(() => {
        this.loading = false;
      });
    },

    sort(options) {
      let vm = this.$data;

      if (this.displayNetflixOnly) {
        if (options == "ascendingName") {
          console.log("netflix + ascending name");
        }
        if (options == "descendingName") {
          console.log("netflix + descending name");
        }
      }
      if (!this.displayNetflixOnly) {
        if (options == "ascendingName") {
          console.log("no netflix + ascending name");
          vm.loading = true;
          this.$bind(
            "movies",
            db.collection("movies").orderBy("name", "asc")
          ).then(() => {
            vm.loading = false;
          });
        }
        if (options == "descendingName") {
          console.log("no netflix + descending name");
          vm.loading = true;
          this.$bind(
            "movies",
            db.collection("movies").orderBy("name", "desc")
          ).then(() => {
            vm.loading = false;
          });
        }
      }
    },
  },

  created() {
    this.$bind("movies", db.collection("movies")).then(() => {
      this.loading = false;
    });
  },
};
</script>