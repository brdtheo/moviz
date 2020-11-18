<template>
  <div class="my-10">
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
              :label="$t('name')"
              v-model="newMovie.name"
              background-color="grey darken-3"
              dark
              solo
              dense
            ></v-text-field>

            <v-text-field
              v-model="newMovie.poster"
              label="Poster"
              background-color="grey darken-3"
              dark
              solo
              dense
            ></v-text-field>

            <v-row>
              <v-col cols="4" class="py-0">
                <v-text-field
                  v-model="newMovie.description.en"
                  label="Description (en)"
                  background-color="grey darken-3"
                  dark
                  solo
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="4" class="py-0">
                <v-text-field
                  v-model="newMovie.description.fr"
                  label="Description (fr)"
                  background-color="grey darken-3"
                  dark
                  solo
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="4" class="py-0">
                <v-text-field
                  v-model="newMovie.description.jp"
                  label="Description (jp)"
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

            <v-text-field
              v-model="newMovie.length"
              :label="$t('length')"
              background-color="grey darken-3"
              dark
              solo
              dense
            ></v-text-field>

            <v-text-field
              v-model="newMovie.year"
              :label="$t('year')"
              background-color="grey darken-3"
              dark
              solo
              dense
            ></v-text-field>

            <v-text-field
              v-model="newMovie.score.metacritic"
              type="number"
              :label="$t('metacriticscore')"
              background-color="grey darken-3"
              dark
              solo
              dense
            ></v-text-field>

            <v-text-field
              v-model="newMovie.trailer"
              label="trailer ID"
              background-color="grey darken-3"
              dark
              solo
              dense
            ></v-text-field>

            <h3 class="font-weight-light mb-2">{{ $t("watchnow") }}</h3>

            <v-row>
              <v-col cols="3" class="py-0">
                <v-text-field
                  v-model="newMovie.links.netflix"
                  label="Netflix"
                  background-color="grey darken-3"
                  dark
                  solo
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="3" class="py-0">
                <v-text-field
                  v-model="newMovie.links.youtube"
                  label="Youtube"
                  background-color="grey darken-3"
                  dark
                  solo
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="3" class="py-0">
                <v-text-field
                  v-model="newMovie.links.amazonPrime"
                  label="Prime"
                  background-color="grey darken-3"
                  dark
                  solo
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="3" class="py-0">
                <v-text-field
                  v-model="newMovie.links.googlePlay"
                  label="Google Play"
                  background-color="grey darken-3"
                  dark
                  solo
                  dense
                ></v-text-field>
              </v-col>
            </v-row>

            <h3 class="font-weight-light mb-2">{{ $t("producers") }}</h3>

            <v-row>
              <v-col cols="3" class="py-0">
                <v-text-field
                  v-model="newMovie.producers[0]"
                  label="1"
                  background-color="grey darken-3"
                  dark
                  solo
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="3" class="py-0">
                <v-text-field
                  v-model="newMovie.producers[1]"
                  label="2"
                  background-color="grey darken-3"
                  dark
                  solo
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="3" class="py-0">
                <v-text-field
                  v-model="newMovie.producers[2]"
                  label="3"
                  background-color="grey darken-3"
                  dark
                  solo
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="3" class="py-0">
                <v-text-field
                  v-model="newMovie.producers[3]"
                  label="4"
                  background-color="grey darken-3"
                  dark
                  solo
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="3" class="py-0">
                <v-text-field
                  v-model="newMovie.producers[4]"
                  label="5"
                  background-color="grey darken-3"
                  dark
                  solo
                  dense
                ></v-text-field>
              </v-col>
            </v-row>

            <v-btn small @click="addMovie()" dark color="indigo">
              {{ $t("add") }}
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </div>

    <v-snackbar
      v-model="successInsert"
      color="success"
      right
      bottom
      value="true"
    >
      Film added
    </v-snackbar>
    <v-snackbar v-model="errorInsert" color="danger" right bottom value="true">
      Error
    </v-snackbar>
  </div>
</template>

<script>
import { db } from "../firebase";

export default {
  data() {
    return {
      currentUser: null,

      genres: [
        "action",
        "adventure",
        "horror",
        "science fiction",
        "suspense",
        "thriller",
        "disaster",
        "drama",
        "mystery",
        "epic",
        "superhero",
        "crime film",
        "fantasy",
        "supernatural",
        "psychological horror",
        "romance",
        "comedy",
        "adaptation",
        "psychological thriller",
        "narrative",
        "satire",
        "dark comedy",
        "documentary",
      ],

      newMovie: {
        name: "",
        poster: "",
        description: {
          en: "",
          fr: "",
          jp: ""
        },
        length: "",
        year: "",
        score: {
          metacritic: "",
        },
        links: {},
        producers: [],
        genre: [],
        uploadDate: new Date(),
      },

      // insert
      successInsert: false,
      errorInsert: false,
    };
  },

  methods: {
    addMovie() {
      let newMovie = this.newMovie;
      let vm = this.$data;

      db.collection("movies")
        .add(newMovie)
        .then(function (docRef) {
          console.log("Document written with ID: ", docRef.id);
          vm.successInsert = true;
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
          vm.errorInsert = true;
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