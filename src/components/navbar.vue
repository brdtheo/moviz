<template>
  <div class="grey darken-4 white--text">
    <v-app-bar app class="grey darken-4" flat outlined elevate-on-scroll>
      <v-container class="pa-0">
        <v-row>
          <v-col cols="12" class="pa-0 d-flex justify-space-between">
            <v-btn dark icon class="no-active" to="/">
              <v-icon>mdi-home</v-icon>
            </v-btn>

            <div class="d-flex align-center">
              <v-fade-transition hide-on-leave>
                <v-text-field
                  ref="input"
                  @keyup.esc="toggleSearchMode"
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
              <v-btn class="no-active" @click="toggleSearchMode" dark icon v-if="!searchMode">
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
              <v-btn class="no-active" @click="toggleSearchMode" dark icon v-if="searchMode">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-container class="mt-16" v-if="searchField">
      <div class="mb-5 d-flex justify-space-between align-center">
        <h2 class="font-weight-light">Your search</h2>
      </div>
      <v-row>
        <v-col v-if="!queryResult">No results.</v-col>
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
          <v-card>
            <v-img height="100" :src="movie.image"></v-img>
            <v-card-title>{{ movie.name }}</v-card-title>
            <v-card-subtitle>{{ movie.year }}</v-card-subtitle>
            <v-card-text>
              {{ movie.description.substring(0, 97) + "..." }}
            </v-card-text>
            <v-card-actions>
              <v-btn small color="indigo" class="white--text"> infos </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { db } from "../firebase";

export default {
  name: "navbar",

  data: () => {
    return {
      searchMode: false,
      searchField: "",
      queryResult: {},
    };
  },

  methods: {
    toggleSearchMode() {
      if (this.searchMode) {
        this.searchField = "";
        this.searchMode = false;
      } else {
        this.searchMode = true;
      }
    },
  },

  firestore: {
    queryResult: db.collection("movies").where("name", "==", "Avatar"),
  },
};
</script>

<style scoped>
.search-bar {
  width: 250px;
}
</style>