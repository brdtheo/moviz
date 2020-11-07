<template>
  <div class="mt-10">
    <div>
      <v-row justify="center">
        <v-col cols="12" sm="6">
          <div v-if="currentUser && currentUser.role !== 'superadmin'">
            <v-alert color="error" dark text icon="mdi-alert-octagon">
              You are not allowed to see this page
            </v-alert>
          </div>
          <div v-if="currentUser && currentUser.role == 'superadmin'">
            <h2 class="font-weight-light mb-5">{{ $t("addamovie") }}</h2>

            <v-text-field
              type="text"
              :label="$t('name')"
              v-model="newMovie.name"
              background-color="grey darken-3"
              dark
              solo
              dense
            ></v-text-field>

            <v-text-field
              v-model="newMovie.image"
              type="text"
              label="Image"
              background-color="grey darken-3"
              dark
              solo
              dense
            ></v-text-field>

            <v-row>
              <v-col cols="6" class="py-0">
                <v-text-field
                  v-model="newMovie.description.en"
                  type="text"
                  label="Description (en)"
                  background-color="grey darken-3"
                  dark
                  solo
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="6" class="py-0">
                <v-text-field
                  v-model="newMovie.description.fr"
                  type="text"
                  label="Description (fr)"
                  background-color="grey darken-3"
                  dark
                  solo
                  dense
                ></v-text-field>
              </v-col>
            </v-row>

            <v-select
              v-model="newMovie.genre"
              :items="genres"
              :menu-props="{ maxHeight: '500' }"
              label="Genres"
              background-color="grey darken-3"
              multiple
              solo
              dense
              dark
            ></v-select>

            <v-btn @click="addDocument()" dark color="indigo"> {{ $t("add") }} </v-btn>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";

export default {
  data() {
    return {
      currentUser: null,

      genres: ["action", "adventure", "horror", "science fiction"],

      newMovie: {
        name: "",
        image: "",
        description: {
          en: "",
          fr: "",
        },
        genre: [],
        uploadDate: new Date()
      },
    };
  },

  methods: {
    addDocument() {
      var newMovie = this.newMovie;

      // Add a new document with a generated id.
      db.collection("movies")
        .add(newMovie)
        .then(function (docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
    },
  },

  created() {
    let userId = this.$route.params.userId;

    this.$bind("currentUser", db.collection("users").doc(userId)).then(
      (user) => {
        this.currentUser = user;
      }
    );
  },
};
</script>

<style>
</style>