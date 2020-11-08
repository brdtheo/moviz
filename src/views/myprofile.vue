<template>
  <div>
    <v-row justify="start" justify-sm="center">
      <v-col cols="12" class="d-flex">
        <span class="placeholder placeholder__profilepicture" v-if="loading"></span>
        <v-img
          :src="userInfos.profilePicture"
          height="128"
          max-width="128"
          class="rounded"
          v-else
        ></v-img>

        <div class="ml-5 d-flex flex-column">
          <h1 class="placeholder placeholder__name mb-2" v-if="loading"></h1>
          <h1 v-else>{{ userInfos.username }}</h1>
          <span class="placeholder placeholder__rating" v-if="loading"></span>
          <p class="mb-0" v-else>
            {{ userReviews.length + " " + $t("writtenreviews") }}
          </p>
        </div>
      </v-col>
    </v-row>
    <v-row class="mt-10">
      <v-col cols="12" v-if="loading">
        <ReviewPlaceholder />
      </v-col>
      <v-col cols="12" v-for="review in userReviews" :key="review.id" v-else>
        <v-card class="grey darken-3 review" dark>
          <v-card-title
            class="pb-0 pointer"
            @click="navigateToMovie(review.movieId)"
            >{{ review.movieName }}</v-card-title
          >
          <v-rating
            background-color="grey"
            color="yellow"
            class="px-4"
            length="5"
            v-if="review.rating"
            :value="review.rating"
            half-increments
            readonly
            small
            dense
          ></v-rating>
          <v-card-text>{{ review.description }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ReviewPlaceholder from "../components/placeholders/ReviewPlaceholder";
import router from "../router/index";
import { db } from "../firebase";

export default {
  components: {
    ReviewPlaceholder,
  },

  data: () => {
    return {
      loading: true,

      // public infos
      userInfos: {},
      userReviews: [],
    };
  },

  methods: {
    navigateToMovie(id) {
      router.push({ name: "movie-detail", params: { movieId: id } });
    },
  },

  created() {
    let userId = this.$route.params.userId;

    this.$bind("userInfos", db.collection("users").doc(userId));

    this.$bind(
      "userReviews",
      db
        .collection("reviews")
        .where("userId", "==", userId)
        .orderBy("date", "desc")
    ).then(() => {
      this.loading = false;
    });
  },
};
</script>

<style scoped>
.review {
  margin-bottom: 20px;
}

.review:last-of-type {
  margin-bottom: 0;
}
</style>