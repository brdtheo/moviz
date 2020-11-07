<template>
  <div class="py-8 py-sm-16">
    <v-container class="pa-0">
      <div class="mb-5 d-flex justify-space-between align-center">
        <h2 class="font-weight-light">
          {{ $t("allmovies") + ` (${movies.length})` }}
        </h2>
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
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import router from "../router/index";
import moviecard from "../components/moviecard";
import { db } from "../firebase";

export default {
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
    movies: db.collection("movies").orderBy("name"),
  },
};
</script>