
<template>
  <div>{{ $route.params.movieId }}</div>
</template>

<script>
//import router from "../router/index";
//import { db } from "../firebase";

export default {
  data: () => {
    return {
      movie: {},
    };
  },

  firestore: {
    //movie: db.collection("movies").where("id", "==", router.route.params.movieId),
  },

  mounted() {
    console.log(this.$route);
  },
};
</script>