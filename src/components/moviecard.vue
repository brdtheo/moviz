<template>
  <v-card
    tile
    @mouseover="displayDetails = true"
    @mouseleave="displayDetails = false"
    @click="
      navigate(movieId);
      $emit('event');
    "
  >
    <v-img position="bottom" height="250" :src="poster" alt="">
      <transition name="fade">
        <div class="movieDetails pa-5" v-if="displayDetails">
          <h4>{{ name }}</h4>
          <p>
            <small>{{ year }}</small>
          </p>
        </div>
      </transition>
    </v-img>
  </v-card>
</template>

<script>
import {router} from "../router/index";

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
</style>