
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
        <iframe
          class="movieTrailer"
          :src="'https://www.youtube.com/embed/' + movie.trailerId"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
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
            <v-avatar size="24" class="mr-2" v-if="review.user">
              <img alt="" />
            </v-avatar>
            <span class="pointer" @click="goToUserProfile(review.userId)">{{
              review.author
            }}</span>
          </v-card-title>
          <v-rating
            background-color="grey"
            color="yellow"
            class="px-3"
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
//import Plyr from "plyr";
import { db } from "../firebase";

export default {
  data: () => {
    return {
      movie: {},
      reviews: [],
    };
  },

  methods: {
    goToUserProfile(userId) {
      router.push({ name: "myprofile", params: { userId: userId } });
    },

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
    //new Plyr("#trailer");
  },

  created() {
    let movieId = this.$route.params.movieId;

    // load movie infos
    this.$bind("movie", db.collection("movies").doc(movieId));

    // load reviews with user info
    this.$bind(
      "reviews",
      db.collection("reviews").where("movieId", "==", movieId)
    );
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

.pointer {
  cursor: pointer;
}

.movieTrailer {
  width: 100%;
  height: 100%;
}
</style>