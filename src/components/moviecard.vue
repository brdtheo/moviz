<template>
  <v-card tile>
    <v-btn
      class="m-0 error"
      block
      small
      depressed
      tile
      v-if="user && user.role == 'admin'"
      @click="deleteMovie(movieId)"
    >
      {{ $t("delete") }}
    </v-btn>
    <v-img
      class="pointer"
      position="bottom"
      height="250"
      :src="poster"
      alt=""
      @mouseover="displayDetails = true"
      @mouseleave="displayDetails = false"
      @click="
        navigate(movieId);
        $emit('event');
      "
    >
      <transition name="fade">
        <div class="movieDetails pa-5" v-if="displayDetails">
          <h3>{{ name }}</h3>
          <p>
            <small>{{ year }}</small>
          </p>
        </div>
      </transition>
    </v-img>
  </v-card>
</template>

<script>
import { router } from "../router/index";
import { db } from "../firebase";

export default {
  name: "Moviecard",

  props: {
    poster: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    movieId: {
      type: String,
      required: true,
    },
  },

  data: () => {
    return {
      displayDetails: false,
    };
  },

  methods: {
    navigate(id) {
      router.push({ name: "movie-detail", params: { movieId: id } });
    },

    async deleteMovie(id) {
      try {
        await db.collection("movies").doc(id).delete();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.movieDetails {
  background: #000;
  opacity: 0.85;
  width: 100%;
  height: 100%;
  color: #fff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity ease-in-out 100ms;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

h3 {
  font-size: 16px;
}
</style>