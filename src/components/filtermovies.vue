<template>
  <div>
    <v-row>
      <v-col class="d-flex overflow-x-scroll">
        <v-btn
          small
          dark
          color="indigo"
          class="mr-2"
          @click="
            selectedPlatform = 'netflix';
            $emit('select-platform', 'netflix');
          "
        >
          netflix
        </v-btn>
        <v-btn
          small
          dark
          color="indigo"
          class="mr-2"
          @click="
            selectedPlatform = 'prime';
            $emit('select-platform', 'amazonPrime');
          "
        >
          prime
        </v-btn>
        <v-btn
          small
          dark
          color="indigo"
          class="mr-2"
          @click="
            selectedPlatform = 'youtube';
            $emit('select-platform', 'youtube');
          "
        >
          youtube
        </v-btn>
        <v-btn
          small
          dark
          color="indigo"
          class="mr-2"
          @click="
            selectedPlatform = 'disney +';
            $emit('select-platform', 'disneyPlus');
          "
        >
          disney +
        </v-btn>
        <v-btn
          small
          dark
          color="indigo"
          class="mr-2"
          @click="
            selectedPlatform = 'google play';
            $emit('select-platform', 'googlePlay');
          "
        >
          google play
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="col-12 col-sm-4 col-md-3">
        <v-select
          v-model="selectedGenres"
          :items="genres"
          :menu-props="{ maxHeight: '250' }"
          label="Genres"
          background-color="grey darken-3"
          offset-y
          multiple
          solo
          dense
          dark
          @change="$emit('select-genre', selectedGenres)"
        ></v-select>
      </v-col>
    </v-row>
    <v-row v-if="selectedPlatform">
      <v-col>
        <v-chip
          small
          close
          dark
          color="indigo"
          @click:close="
            selectedPlatform = null;
            $emit('unselect-platform');
          "
        >
          {{ selectedPlatform }}
        </v-chip>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "filtermovies",

  data() {
    return {
      selectedPlatform: null,

      genres: [
        "action",
        "adventure",
        "horror",
        "science fiction",
        "suspense",
        "thriller",
        "disaster",
        "drama",
        "mystery",
        "epic",
        "superhero",
        "crime film",
        "fantasy",
        "supernatural",
        "psychological horror",
        "romance",
        "comedy",
        "adaptation",
        "psychological thriller",
        "narrative",
        "satire",
        "dark comedy",
        "documentary",
      ],
      selectedGenres: [],
    };
  },
};
</script>