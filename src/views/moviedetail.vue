
<template>
  <div>
    <v-row>
      <v-col cols="12" sm="6">
        <span
          class="placeholder placeholder__moviedetail__name"
          v-if="loading"
        ></span>
        <h1 class="font-weight-regular ma-0" v-else>{{ movie.name }}</h1>

        <div class="my-5">
          <v-row>
            <v-col>
              <h4 class="font-weight-medium">{{ $t("length") }}</h4>
              <span
                class="placeholder placeholder__moviedetail__text"
                v-if="loading"
              ></span>
              <p
                class="subtitle-2 font-weight-regular"
                v-if="movie.length && !loading"
              >
                {{ movie.length }}
              </p>
            </v-col>
            <v-col>
              <h4 class="font-weight-medium">{{ $t("year") }}</h4>
              <span
                class="placeholder placeholder__moviedetail__text"
                v-if="loading"
              ></span>
              <p
                class="subtitle-2 font-weight-regular"
                v-if="movie.year && !loading"
              >
                {{ movie.year }}
              </p>
            </v-col>
            <v-col>
              <h4 class="font-weight-medium">{{ $t("metacriticscore") }}</h4>
              <span
                class="placeholder placeholder__moviedetail__text"
                v-if="loading"
              ></span>
              <p
                class="subtitle-2 font-weight-regular percent"
                v-if="movie.score && !loading"
              >
                {{ movie.score.metacritic }}
              </p>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h4 class="font-weight-medium">{{ $t("country") }}</h4>
              <span
                class="placeholder placeholder__moviedetail__text"
                v-if="loading"
              ></span>
              <p class="subtitle-2 font-weight-regular" v-else>USA</p>
            </v-col>
            <v-col>
              <h4 class="font-weight-medium">{{ $t("producers") }}</h4>
              <span
                class="placeholder placeholder__moviedetail__text"
                v-if="loading"
              ></span>
              <p
                class="subtitle-2 font-weight-regular"
                v-if="movie.producers && !loading"
              >
                <span
                  class="comma"
                  v-for="(producer, index) in movie.producers"
                  :key="index"
                >
                  <span>{{ producer }}</span>
                </span>
              </p>
            </v-col>
            <v-col>
              <h4 class="font-weight-medium">{{ $t("watchnow") }}</h4>
              <span
                class="placeholder placeholder__moviedetail__text"
                v-if="loading"
              ></span>
              <div v-if="movie.links && !loading">
                <movieLink
                  v-if="movie.links.youtube"
                  color="#c4302b"
                  :url="movie.links.youtube"
                  icon="youtube"
                >
                  youtube
                </movieLink>
                <movieLink
                  v-if="movie.links.googlePlay"
                  color="#b3c833"
                  :url="movie.links.googlePlay"
                  icon="google-play"
                >
                  google play
                </movieLink>
                <movieLink
                  v-if="movie.links.amazonPrime"
                  color="#00a8e1"
                  :url="movie.links.amazonPrime"
                  icon="amazon"
                >
                  prime
                </movieLink>
                <movieLink
                  v-if="movie.links.netflix"
                  color="#e50914"
                  :url="movie.links.netflix"
                  icon="netflix"
                >
                  netflix
                </movieLink>
                <movieLink
                  v-if="movie.links.disneyPlus"
                  color="#113ccf"
                  :url="movie.links.disneyPlus"
                >
                  disney+
                </movieLink>
              </div>
            </v-col>
          </v-row>
        </div>

        <div v-if="loading">
          <span class="placeholder placeholder__moviedetail__chip"></span>
        </div>
        <div v-if="movie.genre && !loading">
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
        <span
          class="placeholder placeholder__moviedetail__trailer"
          v-if="loading"
        ></span>
        <iframe
          class="movieTrailer"
          :src="'https://www.youtube.com/embed/' + movie.trailerId"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          v-else
        ></iframe>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <span
          class="placeholder placeholder__description"
          v-if="loading"
        ></span>
        <p class="mt-5 movieDescription" v-else>{{ returnDescription() }}</p>
      </v-col>
    </v-row>

    <div class="mt-15">
      <h3 class="ma-0">{{ $t("userreviews") }}</h3>

      <v-row class="mb-0">
        <v-col cols="12" v-if="loading">
          <ReviewPlaceholder />
        </v-col>
        <v-col v-else>
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
            <v-card-text>
              <p class="mb-0">{{ review.description }}</p>
              <small v-if="review.edited">
                <em>{{
                  `${$t("editedon")} ${formatEditedDate(review.edited)}`
                }}</em>
              </small>
            </v-card-text>
          </v-card>
          <p v-if="reviews.length == 0">{{ $t("noreviews") }}</p>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
var moment = require("moment");
import ReviewPlaceholder from "../components/placeholders/ReviewPlaceholder";
import router from "../router/index";
//import Plyr from "plyr";
import { db } from "../firebase";
import movieLink from "../components/movielink";

export default {
  data: () => {
    return {
      loading: true,

      movie: {},
      reviews: [],
    };
  },

  components: {
    movieLink,
    ReviewPlaceholder,
  },

  methods: {
    goToUserProfile(userId) {
      router.push({ name: "my-profile", params: { userId: userId } });
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
        if (this.$i18n.locale == "jp") {
          return vm.movie.description.jp;
        }
      }
    },

    formatEditedDate(date) {
      return moment().calendar(date.toDate());
    },
  },

  mounted() {
    //new Plyr("#trailer");
  },

  created() {
    let movieId = this.$route.params.movieId;

    this.$bind("movie", db.collection("movies").doc(movieId));

    this.$bind(
      "reviews",
      db.collection("reviews").where("movieId", "==", movieId)
    ).then(() => {
      this.loading = false;
    });
  },
};
</script>

<style>
.trailer iframe {
  outline: none !important;
  border: none !important;
  width: 100% !important;
}

.movieDescription {
  line-height: 200%;
}

.movieTrailer {
  width: 100%;
  height: 100%;
}
</style>