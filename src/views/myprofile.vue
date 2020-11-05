<template>
  <div>
    <v-row justify="start" justify-sm="center">
      <v-col cols="12" class="d-flex">
        <v-img
          :src="userInfos.profilePicture"
          height="128"
          max-width="128"
          class="rounded"
        ></v-img>

        <div class="ml-5 d-flex flex-column">
          <h1>{{ userInfos.username }}</h1>
          <p>{{ userReviews.length + " " + $t("writtenreviews") }}</p>
        </div>
      </v-col>
    </v-row>
    <v-row class="mt-10">
      <v-col cols="12" v-for="review in userReviews" :key="review.id">
        <v-card class="grey darken-3 review" dark>
          <v-card-title class="pb-0 pointer" @click="navigateToMovie(review.movieId)">{{review.movieName}}</v-card-title>
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
import router from "../router/index";
import { db } from "../firebase";

export default {
  data: () => {
    return {
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

    // load user infos
    this.$bind("userInfos", db.collection("users").doc(userId));

    // load reviews
    this.$bind(
      "userReviews",
      db.collection("reviews").where("userId", "==", userId)
    );
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