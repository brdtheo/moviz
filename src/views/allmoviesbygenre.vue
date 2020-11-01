<template>
  <div class="py-8 py-sm-16">
    <v-container class="pa-0">
      <div class="mb-5 d-flex justify-space-between align-center">
        <h2 class="font-weight-light">
          All {{ currentGenre }} movies ({{ movies.length }})
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
            <v-img height="100" :src="movie.image"></v-img>
            <span slot="name">{{ movie.name }}</span>
            <span slot="year">{{ movie.year }}</span>
            <span slot="description">
              {{ movie.description.substring(0, 97) + "..." }}
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
          // doc.data() is never undefined for query doc snapshots
          vm.movies.push(doc.data());
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  },
};
</script>