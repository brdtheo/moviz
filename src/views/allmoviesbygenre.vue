<template>
  <div class="py-8 py-sm-16">
    <v-container class="pa-0">
      <div class="mb-5 d-flex justify-space-between align-center">
        <h2 class="font-weight-light">
          {{
            $t("allmoviesbycategory") +
            " " +
            $t("genre." + currentGenre) +
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
            <v-img height="100" :src="movie.data.image"></v-img>
            <span slot="name">{{ movie.data.name }}</span>
            <span slot="year">{{ movie.data.year }}</span>
            <span slot="description" v-if="$i18n.locale == 'en'">
              {{ movie.data.description.en.substring(0, 97) + "..." }}
            </span>
            <span slot="description" v-if="$i18n.locale == 'fr'">
              {{ movie.data.description.fr.substring(0, 97) + "..." }}
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
      currentGenre: "",
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
    // set genre
    this.currentGenre = this.$route.params.genre;

    // load movies by genre
    let vm = this.$data;

    // load movie details
    db.collection("movies")
      .where("genre", "array-contains-any", [this.$route.params.genre])
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          let movie = {
            id: doc.id,
            data: doc.data(),
          };
          vm.movies.push(movie);
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  },
};
</script>