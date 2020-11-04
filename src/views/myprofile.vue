<template>
  <div v-if="user">
    <v-row justify="start" justify-sm="center">
      <v-col cols="12" class="d-flex">
        <v-img
          :src="user.profilePicture"
          height="128"
          max-width="128"
          class="rounded"
        ></v-img>

        <div class="ml-5 d-flex flex-column">
          <h1>{{ user.username }}</h1>
          <p>{{ user.reviews + " " + $t("writtenreviews") }}</p>
        </div>
      </v-col>
    </v-row>
    <v-row class="mt-10">
      <v-col cols="12" sm="12">
        <v-card
          class="grey darken-3 review"
          dark
          v-for="review in userReviews"
          :key="review.id"
        >
          <v-rating
            background-color="grey"
            color="yellow"
            class="px-4 pt-4"
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
import { db } from "../firebase";

export default {
  data: () => {
    return {
      userReviews: [],
    };
  },

  created() {
    let vm = this.$data;

    db.collection("reviews")
      .where("userId", "==", this.$route.params.userId)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          vm.userReviews.push(doc.data());
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
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