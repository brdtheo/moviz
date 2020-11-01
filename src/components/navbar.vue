<template>
  <div class="grey darken-4 white--text">
    <v-app-bar app class="grey darken-4" flat elevate-on-scroll>
      <v-container>
        <v-row>
          <v-col cols="12" class="pa-0 d-flex justify-space-between">
            <v-btn dark icon class="no-active" to="/">
              <v-icon>mdi-home</v-icon>
            </v-btn>

            <div class="d-flex align-center justify-end w-100">
              <v-fade-transition hide-on-leave>
                <v-text-field
                  @keyup.esc="toggleSearchMode"
                  @input="querySearch(searchField)"
                  class="search-bar"
                  color="indigo"
                  dark
                  dense
                  flat
                  hide-details="auto"
                  autofocus
                  v-model="searchField"
                  v-if="searchMode"
                ></v-text-field>
              </v-fade-transition>
              <v-btn
                class="no-active"
                @click="toggleSearchMode"
                dark
                icon
                v-if="!searchMode"
              >
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
              <v-btn
                class="no-active"
                @click="toggleSearchMode"
                dark
                icon
                v-if="searchMode"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-container class="pt-8" v-if="searchField">
      <div class="mb-5 d-flex justify-space-between align-center">
        <h2 class="font-weight-light">Your search ({{ queryResult.length }})</h2>
      </div>
      <v-row>
        <v-col v-if="queryResult.length == 0">No results.</v-col>
        <v-col
          sm="4"
          md="4"
          lg="3"
          xl="2"
          class="col-12"
          v-for="movie in queryResult"
          :key="movie.id"
          v-else
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
import { db } from "../firebase";
import moviecard from "./moviecard";

export default {
  name: "navbar",

  components: {
    moviecard,
  },

  data: () => {
    return {
      searchMode: false,
      searchField: "",
      queryResult: [],
    };
  },

  methods: {
    navigate: (movieId) => {
      router.push({ name: "movie-detail", params: { movieId: movieId } });
    },

    toggleSearchMode() {
      if (this.searchMode) {
        this.searchField = "";
        this.searchMode = false;
      } else {
        this.searchMode = true;
      }
    },

    querySearch(input) {
      let vm = this.$data;
      vm.queryResult = [];

      db.collection("movies")
        .where("name", "==", input)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            vm.queryResult.push(doc.data());
          });
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
    },
  },
};
</script>

<style scoped>
.w-100 {
  width: 100%;
}

.search-bar {
  width: 100%;
}

.v-btn--active.no-active::before {
  opacity: 0 !important;
}

.v-app-bar {
  position: relative !important;
}
</style>