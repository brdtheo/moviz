
<template>
  <div class="compressedWrapper">
    <v-row>
      <v-col cols="12" class="py-0">
        <span
          class="placeholder placeholder__moviedetail__name"
          v-if="loading"
        ></span>
        <h1 class="font-weight-regular ma-0" v-else>
          {{ movie.name }} <small class="movieYear">{{ movie.year }}</small>
        </h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="py-0">
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
    </v-row>
    <v-row class="pt-5">
      <v-col cols="12">
        <span
          class="placeholder placeholder__moviedetail__trailer"
          v-if="loading"
        ></span>
        <video
          preload="metadata"
          ref="videoPlayer"
          class="video-js vjs-big-play-centered"
          :options="videoOptions"
        ></video>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <span
          class="placeholder placeholder__description"
          v-if="loading"
        ></span>
        <p class="movieDescription" v-else>{{ returnDescription() }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="auto" sm="2">
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
      <v-col cols="auto" sm="2">
        <h4 class="font-weight-medium">{{ $t("year") }}</h4>
        <span
          class="placeholder placeholder__moviedetail__text"
          v-if="loading"
        ></span>
        <p class="subtitle-2 font-weight-regular" v-if="movie.year && !loading">
          {{ movie.year }}
        </p>
      </v-col>
      <v-col cols="auto" sm="2">
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
      <v-col cols="2">
        <h4 class="font-weight-medium">{{ $t("country") }}</h4>
        <span
          class="placeholder placeholder__moviedetail__text"
          v-if="loading"
        ></span>
        <p class="subtitle-2 font-weight-regular" v-else>USA</p>
      </v-col>
      <v-col cols="auto" sm="4">
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
      <v-col cols="2">
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

    <div class="mt-15">
      <h3 class="ma-0">{{ $t("userreviews") }}</h3>

      <v-row v-if="user">
        <v-col>
          <v-alert
            color="indigo"
            dark
            v-if="user && writtenReview.length == 0 && !writingReview"
          >
            <p class="ma-0">{{ $t("youdidntwriteareviewforthismovieyet") }}</p>
            <v-btn small class="mt-2" @click="writingReview = true">
              {{ $t("writeareview") }}
            </v-btn>
          </v-alert>

          <v-card class="indigo" dark v-if="writingReview">
            <v-card-title class="subtitle-1 pb-0">
              <span v-if="user">{{ user.username }}</span>
            </v-card-title>
            <v-rating
              background-color="grey"
              color="yellow"
              class="px-3"
              length="5"
              v-model="writingReviewObj.rating"
              small
              dense
            ></v-rating>
            <v-card-text>
              <v-textarea
                v-model="writingReviewObj.description"
                solo
                background-color="grey darken-4"
                hide-details="auto"
              ></v-textarea>
            </v-card-text>
            <v-card-actions class="px-4 pb-3">
              <v-btn small @click="cancelWriteReview()">
                {{ $t("cancel") }}
              </v-btn>
              <v-btn small color="success" @click="insertWroteReview()">
                {{ $t("submit") }}
              </v-btn>
            </v-card-actions>
          </v-card>

          <v-card class="indigo mb-8" dark v-if="writtenReview[0]">
            <v-card-title class="subtitle-1 pb-0">
              <span v-if="user">{{ writtenReview[0].author }}</span>
            </v-card-title>
            <v-rating
              background-color="grey"
              color="yellow"
              class="px-3"
              length="5"
              :value="writtenReview[0].rating"
              small
              readonly
              dense
            ></v-rating>
            <v-card-text>
              <p class="mb-0">{{ writtenReview[0].description }}</p>
              <small v-if="writtenReview[0].edited">
                <em>
                  {{
                    `${$t("editedon")} ${formatEditedDate(
                      writtenReview[0].edited
                    )}`
                  }}
                </em>
              </small>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mb-0">
        <v-col cols="12" v-if="loading">
          <ReviewPlaceholder />
        </v-col>
        <v-col v-else>
          <v-card
            class="grey darken-3 mb-5"
            dark
            v-for="review in reviews"
            :key="review.id"
          >
            <v-card-title class="subtitle-1 pb-0">
              <span class="pointer" @click="goToUserProfile(review.userId)">
                {{ review.author }}
              </span>
            </v-card-title>
            <v-rating
              background-color="grey"
              color="yellow"
              class="px-3"
              length="5"
              :value="review.rating"
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
import { router, titleEnd } from "../router/index";
import { db } from "../firebase";
import movieLink from "../components/movielink";
import videojs from "video.js";
import "video.js/dist/video-js.min.css";

export default {
  components: {
    movieLink,
    ReviewPlaceholder,
  },

  data: () => {
    return {
      loading: true,

      movie: {},
      reviews: [],
      writtenReview: [],
      writingReview: false,
      writingReviewObj: {
        rating: 0,
        description: "",
      },

      videoOptions: {
        fluid: true,
        controls: true,
        sources: [
          {
            type: "video/mp4",
          },
        ],
      },
    };
  },

  methods: {
    async insertWroteReview() {
      try {
        const review = this.writingReviewObj;
        review.author = this.user.username;
        review.userId = this.user.id;
        review.movieId = this.$route.params.movieId;
        review.movieName = this.movie.name;
        review.date = new Date();

        let reviewId = null;
        await db
          .collection("reviews")
          .add(review)
          .then((doc) => {
            reviewId = doc.id;
          });
        console.log(reviewId);

        await db.collection("reviews").doc(reviewId).update({
          id: reviewId,
        });
        this.cancelWriteReview();
      } catch (error) {
        console.error(error);
      }
    },

    cancelWriteReview() {
      this.writingReview = false;
      this.writingReviewObj.rating = 0;
      this.writingReviewObj.text = "";
    },

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

  computed: {
    hasWrittenReview() {
      let movieId = this.$route.params.movieId;
      let userId = this.user.id;
      return db
        .collection("reviews")
        .where("movieId", "==", movieId)
        .where("userId", "==", userId);
    },
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

  watch: {
    movie: function (movie) {
      document.title = movie.name + titleEnd;
      this.videoOptions.sources[0].src = movie.trailer + "#t=0.5";
      this.player = videojs(this.$refs.videoPlayer, this.videoOptions);
    },

    user: function (user) {
      this.$bind(
        "writtenReview",
        db
          .collection("reviews")
          .where("movieId", "==", this.$route.params.movieId)
          .where("userId", "==", user.id)
      );
    },
  },
};
</script>

<style scoped>
.video-js {
  border-radius: 10px;
}

.movieDescription {
  line-height: 200%;
}

.movieTrailer {
  width: 100%;
}

@media screen and (max-width: 500px) {
  .movieTrailer {
    height: 200px;
  }
}

@media screen and (min-width: 501px) {
  .movieTrailer {
    height: 400px;
  }
}

.movieYear {
  font-size: 15px;
}
</style>