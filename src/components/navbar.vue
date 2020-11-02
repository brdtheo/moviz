<template>
  <div class="grey darken-4 white--text">
    <v-app-bar app class="grey darken-4" flat elevate-on-scroll>
      <v-container>
        <v-row>
          <v-col cols="12" class="pa-0 d-flex justify-space-between">
            <div class="w-50 d-flex">
              <v-btn dark icon class="no-active" to="/">
                <v-icon>mdi-home</v-icon>
              </v-btn>

              <v-menu offset-y>
                <template v-slot:activator="{ attrs, on }">
                  <v-btn
                    class="indigo languageBtn"
                    dark
                    small
                    v-bind="attrs"
                    v-on="on"
                  >
                    {{ $t("language") }}
                  </v-btn>
                </template>
                <v-list dense>
                  <v-list-item
                    @click="changeLocale(language.abbr)"
                    link
                    v-for="language in languages"
                    :key="language.name"
                  >
                    <v-list-item-title>{{ language.name }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>

            <div class="d-flex align-center justify-end pl-5">
              <v-spacer></v-spacer>

              <v-fade-transition hide-on-leave>
                <v-text-field
                  @keyup.esc="toggleSearchMode"
                  @input="querySearch(searchField)"
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
        <h2 class="font-weight-light">
          {{ $t("search") }} ({{ queryResult.length }})
        </h2>
      </div>
      <v-row>
        <v-col v-if="queryResult.length == 0">{{ $t("noresult") }}</v-col>
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

      // i18n
      currentLocale: "en",
      languages: [
        {
          name: "english",
          abbr: "en",
        },
        {
          name: "français",
          abbr: "fr",
        },
      ],
    };
  },

  methods: {
    // i18n
    changeLocale(locale) {
      this.$i18n.locale = locale;
    },

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
            let movie = {
              id: doc.id,
              data: doc.data(),
            };
            vm.queryResult.push(movie);
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
.languageBtn {
  align-self: center;
}

.w-100 {
  width: 100%;
}

.v-btn--active.no-active::before {
  opacity: 0 !important;
}

.v-app-bar {
  position: relative !important;
}
</style>