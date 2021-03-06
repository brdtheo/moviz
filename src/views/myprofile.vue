<template>
  <div class="compressedWrapper">
    <v-row>
      <v-col cols="5" sm="auto" class="p-relative">
        <div
          class="bannedBadge rounded-xl error"
          v-if="userInfos && userInfos.isBanned"
        >
          <v-icon dark size="60">mdi-gavel</v-icon>
        </div>
        <span
          class="placeholder placeholder__profilepicture"
          v-if="loading"
        ></span>
        <v-img
          :src="userInfos && userInfos.profilePicture"
          class="rounded-circle"
          v-else
        ></v-img>
        <v-img
          :src="`https://identicon-api.herokuapp.com/${userInfos.username}/128?format=png`"
          alt=""
          class="rounded-circle"
          v-if="!loading && userInfos && !userInfos.profilePicture"
        />
        <v-tooltip
          right
          v-if="userInfos && userInfos.role && userInfos.role == 'superadmin'"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              size="40"
              dark
              v-bind="attrs"
              v-on="on"
              class="p-absolute user-badge"
            >
              mdi-alpha-s-circle
            </v-icon>
          </template>
          <span>{{ userInfos.role }}</span>
        </v-tooltip>
        <v-tooltip
          right
          v-if="userInfos && userInfos.role && userInfos.role == 'admin'"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              size="40"
              dark
              v-bind="attrs"
              v-on="on"
              class="p-absolute user-badge"
            >
              mdi-alpha-a-circle
            </v-icon>
          </template>
          <span>{{ userInfos.role }}</span>
        </v-tooltip>
        <v-tooltip
          right
          v-if="userInfos && userInfos.role && userInfos.role == 'moderator'"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              size="40"
              dark
              v-bind="attrs"
              v-on="on"
              class="p-absolute user-badge"
            >
              mdi-alpha-m-circle
            </v-icon>
          </template>
          <span>{{ userInfos.role }}</span>
        </v-tooltip>
      </v-col>
      <v-col cols="7" sm="auto">
        <div class="d-flex flex-column">
          <h1 class="placeholder placeholder__name mb-2" v-if="loading"></h1>
          <h1 v-if="!loading && userInfos">{{ userInfos.username }}</h1>
          <span class="placeholder placeholder__rating" v-if="loading"></span>
          <p class="mb-0" v-else>
            {{ userReviews.length + " " + $t("writtenreviews") }}
          </p>
          <div
            class="mt-2"
            v-if="
              user &&
              userInfos &&
              user.role == 'superadmin' &&
              userInfos.username !== user.username &&
              !userInfos.isBanned
            "
          >
            <v-btn
              small
              color="error"
              tile
              text
              v-if="
                (userInfos && userInfos.role == 'admin') ||
                userInfos.role == 'moderator'
              "
              @click="removePrivileges()"
            >
              <v-icon size="18" class="mr-2">mdi-account-minus</v-icon>
              {{$t('removeprivileges')}}
            </v-btn>
            <v-btn
              small
              dark
              tile
              text
              @click="addRole('moderator')"
              v-if="
                !(userInfos.role == 'moderator' || userInfos.role == 'admin')
              "
            >
              <v-icon size="18" class="mr-2">mdi-alpha-m</v-icon>
              {{$t('addmoderatorrole')}}
            </v-btn>
            <v-btn
              small
              dark
              tile
              text
              @click="addRole('admin')"
              v-if="
                !(userInfos.role == 'moderator' || userInfos.role == 'admin')
              "
            >
              <v-icon size="18" class="mr-2">mdi-alpha-a</v-icon>
              {{$t('addadminrole')}}
            </v-btn>
            <v-btn small color="error" tile text @click="banUser()">
              <v-icon size="18" class="mr-2">mdi-gavel</v-icon>
              {{ $t("banuser") }}
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row class="mt-10">
      <v-col cols="12" v-if="loading">
        <ReviewPlaceholder />
      </v-col>
      <v-col cols="12" v-for="review in userReviews" :key="review.id" v-else>
        <v-card class="grey darken-3 review" dark>
          <v-alert
            type="error"
            icon="mdi-alert-octagon"
            class="ma-0"
            outlined
            dense
            v-if="review.restricted"
          >
            {{ $t("thisreviewhasbeenrestricted") }}
          </v-alert>

          <div class="px-4 pt-2" v-if="user && review.author === user.username">
            <v-chip
              v-if="selectedReview.id != review.id && !review.restricted"
              @click="editReview(review)"
              color="indigo"
              class="mr-2"
              small
            >
              <v-icon left size="15">mdi-pencil</v-icon>
              {{ $t("edit") }}
            </v-chip>
            <v-chip
              v-if="selectedReview.id == review.id"
              @click="cancelEdit()"
              color="indigo"
              class="mr-2"
              small
            >
              <v-icon left size="15">mdi-pencil-off</v-icon>
              {{ $t("cancel") }}
            </v-chip>
            <v-chip
              @click="deleteReview(review.id)"
              color="indigo"
              class="mr-2"
              small
            >
              <v-icon left size="15">mdi-delete</v-icon>
              {{ $t("delete") }}
            </v-chip>
            <v-snackbar
              v-model="reviewDeleted"
              color="success"
              outlined
              right
              timeout="2000"
              bottom
            >
              {{ $t("reviewdeleted") }}
            </v-snackbar>
          </div>

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
            v-if="review.rating && selectedReview.id == review.id"
            v-model="selectedReview.rating"
            small
            dense
          ></v-rating>
          <v-rating
            v-else
            background-color="grey"
            color="yellow"
            class="px-4"
            length="5"
            readonly
            :value="review.rating"
            small
            dense
          ></v-rating>
          <v-card-text v-if="selectedReview.id == review.id">
            <v-textarea
              v-model="selectedReview.description"
              solo
              background-color="grey darken-4"
              hide-details="auto"
            ></v-textarea>
          </v-card-text>
          <v-card-text v-else>
            <p :class="{ restricted: review.restricted }">
              {{ review.description }}
            </p>
          </v-card-text>
          <v-card-actions
            class="px-4 pb-3"
            v-if="selectedReview.id == review.id"
          >
            <v-btn
              small
              @click="sendEditedReview()"
              color="indigo"
              class="mr-2"
            >
              {{ $t("save") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar
      v-model="reviewEditedSuccess"
      color="success"
      timeout="2000"
      dark
      outlined
      right
      bottom
    >
      {{ $t("reviewedited") }}
    </v-snackbar>
  </div>
</template>

<script>
import ReviewPlaceholder from "../components/placeholders/ReviewPlaceholder";
import { router, titleEnd } from "../router/index";
import { db } from "../firebase";

export default {
  components: {
    ReviewPlaceholder,
  },

  data() {
    return {
      loading: true,

      // public infos
      userInfos: {},
      userReviews: [],

      // manage reviews
      reviewDeleted: false,
      selectedReview: {
        id: "",
        description: "",
        rating: null,
      },
      reviewEditedSuccess: false,
    };
  },

  methods: {
    async banUser() {
      let userId = this.$route.params.userId;
      let oldUsername = this.userInfos.username;

      try {
        await db
          .collection("users")
          .doc(userId)
          .update({
            username: `[banned] ${oldUsername}`,
            role: "user",
            isBanned: true,
          });
      } catch (error) {
        console.error(error);
      }
    },

    async addRole(role) {
      let userId = this.$route.params.userId;

      try {
        await db.collection("users").doc(userId).update({
          role: role,
        });
      } catch (error) {
        console.error(error);
      }
    },

    async removePrivileges() {
      let userId = this.$route.params.userId;

      try {
        await db.collection("users").doc(userId).update({
          role: "user",
        });
      } catch (error) {
        console.error(error);
      }
    },

    navigateToMovie(id) {
      router.push({ name: "movie-detail", params: { movieId: id } });
    },

    async deleteReview(id) {
      try {
        await db.collection("reviews").doc(id).delete();
        this.reviewDeleted = true;
        setTimeout(() => {
          this.reviewDeleted = false;
        }, 2000);
      } catch (err) {
        console.error(err);
      }
    },

    editReview(review) {
      this.selectedReview.id = review.id;
      this.selectedReview.description = review.description;
      this.selectedReview.rating = review.rating;
    },

    cancelEdit() {
      this.selectedReview.id = null;
      this.selectedReview.description = null;
      this.selectedReview.rating = null;
    },

    async sendEditedReview() {
      try {
        let editedReview = this.selectedReview;

        await db.collection("reviews").doc(editedReview.id).update({
          rating: editedReview.rating,
          description: editedReview.description,
          edited: new Date(),
        });

        this.reviewEditedSuccess = true;
        setTimeout(() => {
          this.reviewEditedSuccess = false;
        }, 2000);
        this.cancelEdit();
      } catch (error) {
        console.error(error);
      }
    },
  },

  watch: {
    userInfos: function (userInfos) {
      if (userInfos) {
        document.title = userInfos.username + titleEnd;
      }
    },

    "$route.params.userId": function (userId) {
      this.loading = true;
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