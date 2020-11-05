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
            <v-img position="top" height="100" :src="movie.image"></v-img>
            <span slot="name">{{ movie.name }}</span>
            <span slot="year">{{ movie.year }}</span>
            <span slot="description" v-if="$i18n.locale == 'en'">
              {{ movie.description.en.substring(0, 97) + "..." }}
            </span>
            <span slot="description" v-if="$i18n.locale == 'fr'">
              {{ movie.description.fr.substring(0, 97) + "..." }}
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
import moviecard from "../components/moviecard";
import { db } from "../firebase";

export default {
  data: () => {
    return {
      movies: [],
    };
  },

  components: {
    moviecard,
  },

  methods: {
    navigate: (movieId) => {
      router.push({ name: "movie-detail", params: { movieId: movieId } });
    },
  },

  created() {
    // load movies by genre
    this.$bind(
      "movies",
      db.collection("movies").where("genre", "array-contains-any", [this.$route.params.genre])
    );
  },
};
</script>