
<template>
  <div>
    <v-row>
      <v-col cols="12" sm="6">
        <h1 class="font-weight-regular ma-0">{{ movie.name }}</h1>

        <div class="my-5">
          <h4 class="font-weight-medium">{{ $t("length") }}</h4>
          <p class="subtitle-2 font-weight-regular">{{ movie.length }}</p>
          <h4 class="font-weight-medium">{{ $t("year") }}</h4>
          <p class="subtitle-2 font-weight-regular">{{ movie.year }}</p>
        </div>

        <div>
          <v-chip
            class="mt-1 mr-1 mb-1 movie-detail-genre font-weight-bold"
            color="indigo"
            dark
            small
            v-for="genre in movie.genre"
            :key="genre"
            @click="navigateByGenre(genre)"
          >
            {{ $t("genre." + genre) }}
          </v-chip>
        </div>
      </v-col>

      <v-col cols="12" sm="6">
        <div class="plyr__video-embed" id="trailer">
          <iframe
            :src="
              'https://www.youtube.com/embed/' +
              //movie.trailerId
              'bTqVqk7FSmY' +
              '?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1'
            "
            allowfullscreen
            allowtransparency
            allow="autoplay"
          ></iframe>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <p class="mt-5 movieDescription">{{ returnDescription() }}</p>
      </v-col>
    </v-row>

    <v-row class="mt-15 mb-0">
      <v-col>
        <h2 class="font-weight-light mb-2">{{ $t("userreviews") }}</h2>
        <v-card
          class="grey darken-3"
          dark
          v-for="review in reviews"
          :key="review.id"
        >
          <v-card-title class="subtitle-1 pb-0">
            {{ review.author }}
          </v-card-title>
          <v-rating
            background-color="grey"
            color="yellow"
            class="px-4"
            length="5"
            :value="review.rating"
            half-increments
            readonly
            small
            dense
          ></v-rating>
          <v-card-text>{{ review.description }}</v-card-text>
        </v-card>
        <p v-if="reviews.length == 0">{{ $t("noreviews") }}</p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import router from "../router/index";
import Plyr from "plyr";
import { db } from "../firebase";

export default {
  data: () => {
    return {
      movie: {},
      reviews: [],
    };
  },

  methods: {
    navigateByGenre(genre) {
      router.push({ name: "all-movies-by-genre", params: { genre: genre } });
    },

    returnDescription() {
      let vm = this.$data;
      if (vm.movie.description) {
        if (this.$i18n.locale == "en") {
          return vm.movie.description.en;
        }
        if (this.$i18n.locale == "fr") {
          return vm.movie.description.fr;
        }
      }
    },
  },

  mounted() {
    new Plyr("#trailer");
  },

  created() {
    let vm = this.$data;

    // load movie details
    var docRef = db.collection("movies").doc(this.$route.params.movieId);
    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          vm.movie = doc.data();
        } else {
          console.log("doc not found");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });

    // load reviews
    db.collection("reviews")
      .where("movieId", "==", this.$route.params.movieId)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          vm.reviews.push(doc.data());
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  },
};
</script>

<style>
:root {
  --plyr-color-main: #3f51b5;
}

.w-100 {
  width: 100%;
}

.trailer iframe {
  outline: none !important;
  border: none !important;
  width: 100% !important;
}

.movieDescription {
  line-height: 200%;
}
</style>