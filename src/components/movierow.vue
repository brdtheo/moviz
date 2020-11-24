<template>
  <div class="pb-8 pb-sm-16">
    <v-row>
      <v-col cols="12" sm="8">
        <h2 class="font-weight-light" v-if="!genre">
          {{ $t("latestmovies") }}
        </h2>
        <h2 class="font-weight-light" v-else-if="genre === 'action'">
          {{ $t("movierow.latestaction") }}
        </h2>
        <h2 class="font-weight-light" v-else-if="genre === 'drama'">
          {{ $t("movierow.latestdrama") }}
        </h2>
        <h2 class="font-weight-light" v-else-if="genre === 'comedy'">
          {{ $t("movierow.latestcomedy") }}
        </h2>
        <h2 class="font-weight-light" v-else-if="genre === 'horror'">
          {{ $t("movierow.latesthorror") }}
        </h2>
        <h2 class="font-weight-light" v-else-if="genre === 'documentary'">
          {{ $t("movierow.latestdocumentary") }}
        </h2>
      </v-col>

      <v-col
        cols="12"
        sm="4"
        class="test"
        :class="{
          'pt-0': $vuetify.breakpoint.xsOnly,
          'pl-0': $vuetify.breakpoint.xsOnly,
          'd-flex': $vuetify.breakpoint.smAndUp,
          'justify-end': $vuetify.breakpoint.smAndUp,
          'align-end': $vuetify.breakpoint.smAndUp,
        }"
      >
        <v-btn x-small text class="white--text" to="all-movies" v-if="!genre">
          {{ $t("allmovies") }}
        </v-btn>
        <v-btn
          x-small
          text
          class="white--text"
          :to="{ name: 'all-movies-by-genre', params: { genre: 'action' } }"
          v-else-if="genre === 'action'"
        >
          {{ $t("movierow.allaction") }}
        </v-btn>
        <v-btn
          x-small
          text
          class="white--text"
          :to="{ name: 'all-movies-by-genre', params: { genre: 'drama' } }"
          v-else-if="genre === 'drama'"
        >
          {{ $t("movierow.alldrama") }}
        </v-btn>
        <v-btn
          x-small
          text
          class="white--text"
          :to="{ name: 'all-movies-by-genre', params: { genre: 'comedy' } }"
          v-else-if="genre === 'comedy'"
        >
          {{ $t("movierow.allcomedy") }}
        </v-btn>
        <v-btn
          x-small
          text
          class="white--text"
          :to="{ name: 'all-movies-by-genre', params: { genre: 'horror' } }"
          v-else-if="genre === 'horror'"
        >
          {{ $t("movierow.allhorror") }}
        </v-btn>
        <v-btn
          x-small
          text
          class="white--text"
          :to="{
            name: 'all-movies-by-genre',
            params: { genre: 'documentary' },
          }"
          v-else-if="genre === 'documentary'"
        >
          {{ $t("movierow.alldocumentary") }}
        </v-btn>
      </v-col>
    </v-row>
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
import Moviecard from "./moviecard";
import { db } from "../firebase";

export default {
  name: "lastestMovies",

  components: {
    Moviecard,
    MovieCardPlaceholder,
  },

  props: {
    genre: {
      type: String,
    },
  },

  data() {
    return {
      movies: [],
      loading: true,
    };
  },

  created() {
    switch (this.genre) {
      case undefined:
        this.$bind(
          "movies",
          db.collection("movies").orderBy("uploadDate", "desc").limit(6)
        ).then(() => {
          this.loading = false;
        });
        break;
      case "action":
        this.$bind(
          "movies",
          db
            .collection("movies")
            .where("genre", "array-contains-any", ["action"])
            .orderBy("uploadDate", "desc")
            .limit(6)
        ).then(() => {
          this.loading = false;
        });
        break;
      case "drama":
        this.$bind(
          "movies",
          db
            .collection("movies")
            .where("genre", "array-contains-any", ["drama"])
            .orderBy("uploadDate", "desc")
            .limit(6)
        ).then(() => {
          this.loading = false;
        });
        break;
      case "comedy":
        this.$bind(
          "movies",
          db
            .collection("movies")
            .where("genre", "array-contains-any", ["comedy"])
            .orderBy("uploadDate", "desc")
            .limit(6)
        ).then(() => {
          this.loading = false;
        });
        break;
      case "horror":
        this.$bind(
          "movies",
          db
            .collection("movies")
            .where("genre", "array-contains-any", ["horror"])
            .orderBy("uploadDate", "desc")
            .limit(6)
        ).then(() => {
          this.loading = false;
        });
        break;
      case "documentary":
        this.$bind(
          "movies",
          db
            .collection("movies")
            .where("genre", "array-contains-any", ["documentary"])
            .orderBy("uploadDate", "desc")
            .limit(6)
        ).then(() => {
          this.loading = false;
        });
        break;
    }
  },
};
</script>

