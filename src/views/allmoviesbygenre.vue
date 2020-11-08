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
            v-if="movie.description && $i18n.locale == 'en'"
          />
          <moviecard
            :image="movie.image"
            :name="movie.name"
            :year="movie.year"
            :description="movie.description.fr"
            :movieId="movie.id"
            v-if="movie.description && $i18n.locale == 'fr'"
          />
          <moviecard
            :image="movie.image"
            :name="movie.name"
            :year="movie.year"
            :description="movie.description.jp"
            :movieId="movie.id"
            v-if="movie.description && $i18n.locale == 'jp'"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import MovieCardPlaceholder from "../components/placeholders/MovieCardPlaceholder";
import moviecard from "../components/moviecard";
import { db } from "../firebase";

export default {
  data() {
    return {
      movies: [],

      loading: true,
    };
  },

  components: {
    moviecard,
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