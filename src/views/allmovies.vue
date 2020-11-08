<template>
  <div class="py-8 py-sm-16">
    <filtermovies
      @enable-netflix-only="enableNetflixOnly()"
      @disable-netflix-only="disableNetflixOnly()"
      @sort="sort($event)"
    />

    <div class="mb-5 d-flex justify-space-between align-center">
      <h2 class="font-weight-light">
        {{ $t("allmovies") + ` (${movies.length})` }}
      </h2>
    </div>
    <v-row>
      <v-col
        sm="4"
        md="3"
        class="col-12"
        v-for="movie in movies"
        :key="movie.id"
      >
        <moviecard
          :image="movie.image"
          :name="movie.name"
          :year="movie.year"
          :description="movie.description.en"
          :movieId="movie.id"
          v-if="movie.description && $i18n.locale == 'en'"
        />
        <moviecard
          :image="movie.image"
          :name="movie.name"
          :year="movie.year"
          :description="movie.description.fr"
          :movieId="movie.id"
          v-if="movie.description && $i18n.locale == 'fr'"
        />
        <moviecard
          :image="movie.image"
          :name="movie.name"
          :year="movie.year"
          :description="movie.description.jp"
          :movieId="movie.id"
          v-if="movie.description && $i18n.locale == 'jp'"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import filtermovies from "../components/filtermovies";
import moviecard from "../components/moviecard";
import { db } from "../firebase";

export default {
  components: {
    moviecard,
    filtermovies,
  },

  data() {
    return {
      movies: {},

      // filters
      displayNetflixOnly: false,
    };
  },

  methods: {
    enableNetflixOnly() {
      if (!this.displayNetflixOnly) {
        this.displayNetflixOnly = true;
        this.$bind(
          "movies",
          db.collection("movies").where("links.netflix", "!=", "")
        );
      }
    },

    disableNetflixOnly() {
      this.displayNetflixOnly = false;
      this.$bind("movies", db.collection("movies").orderBy("name"));
    },

    sort(options) {
      if (this.displayNetflixOnly) {
        if (options == "ascendingName") {
          console.log("netflix + ascending name");
        }
        if (options == "descendingName") {
          console.log("netflix + descending name");
        }
      }
      if (!this.displayNetflixOnly) {
        if (options == "ascendingName") {
          console.log("no netflix + ascending name");
          this.$bind("movies", db.collection("movies").orderBy("name", "asc"));
        }
        if (options == "descendingName") {
          console.log("no netflix + descending name");
          this.$bind("movies", db.collection("movies").orderBy("name", "desc"));
        }
      }
    },
  },

  created() {
    this.$bind("movies", db.collection("movies"));
  },
};
</script>