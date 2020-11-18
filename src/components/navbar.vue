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
            </div>

            <div class="d-flex align-center justify-end">
              <v-spacer></v-spacer>

              <v-fade-transition hide-on-leave>
                <v-text-field
                  @keyup.esc="toggleSearchMode"
                  @input="querySearch(searchField)"
                  dense
                  background-color="grey darken-3"
                  solo
                  dark
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

              <v-menu offset-y left>
                <template v-slot:activator="{ attrs, on }">
                  <v-btn
                    class="languageBtn no-active"
                    dark
                    icon
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon size="20">mdi-translate</v-icon>
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

              <v-btn
                v-if="!user && !userLoading"
                class="no-active"
                icon
                dark
                to="/login"
              >
                <v-icon>mdi-account</v-icon>
              </v-btn>

              <span
                class="placeholder placeholder__navbar__profilepicture"
                v-if="!user && userLoading"
              ></span>
              <v-menu offset-y left v-if="user && !userLoading">
                <template v-slot:activator="{ attrs, on }">
                  <v-btn icon rounded dark v-bind="attrs" v-on="on">
                    <v-avatar size="32">
                      <img
                        :src="user.profilePicture"
                        alt=""
                        v-if="user.profilePicture"
                      />
                      <img
                        :src="`https://identicon-api.herokuapp.com/${user.username}/256?format=png`"
                        alt=""
                        v-else
                      />
                    </v-avatar>
                  </v-btn>
                </template>
                <v-list dense>
                  <v-list-item
                    class="indigo"
                    dark
                    link
                    v-if="user.role && user.role == 'superadmin'"
                    @click="goToRoute('back-office')"
                  >
                    <v-list-item-title> superadmin </v-list-item-title>
                  </v-list-item>
                  <v-list-item link @click="goToRoute('my-profile')">
                    <v-list-item-title>
                      {{ $t("myprofile") }}
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item link @click="logout()">
                    <v-list-item-title>
                      {{ $t("logout") }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
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
          sm="3"
          md="2"
          class="col-6"
          v-for="movie in queryResult"
          :key="movie.id"
          v-else
        >
          <Moviecard
            :poster="movie.poster"
            :name="movie.name"
            :year="movie.year"
            :movieId="movie.id"
            @event="toggleSearchMode(); navigate(movie.id)"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import {router} from "../router/index";
import { auth } from "../firebase";
import { db } from "../firebase";
import Moviecard from "./moviecard";

export default {
  name: "Navbar",

  components: {
    Moviecard,
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
        {
          name: "日本人",
          abbr: "jp",
        },
      ],
    };
  },

  methods: {
    goToRoute(routeName) {
      let userId = this.user.id;
      router.push({ name: routeName, params: { userId: userId } });
    },

    logout() {
      auth
        .signOut()
        .then(function () {
          // Sign-out successful.
          router.push("/login");
        })
        .catch(function (error) {
          // An error happened.
          console.log(error);
        });
    },

    // i18n
    changeLocale(locale) {
      this.$i18n.locale = locale;
      this.$moment.locale(locale);
      
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
      this.queryResult = [];

      this.$bind(
        "queryResult",
        db.collection("movies").where("name", "==", input)
      );
    },
  }
};
</script>

<style scoped>
.v-app-bar {
  position: relative !important;
}
</style>