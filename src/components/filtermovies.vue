<template>
  <div class="mb-5">
    <v-row justify="space-between">
      <v-col class="d-flex align-center justify-space-between">
        <v-btn
          small
          dark
          color="indigo"
          @click="
            openNetflixOnly();
            $emit('enable-netflix-only');
          "
        >
          netflix
        </v-btn>

        <v-menu left>
          <template v-slot:activator="{ on }">
            <v-btn small dark color="indigo" v-on="on">
              {{ $t("sort") }}
              <v-icon right dark size="15">mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item link @click="$emit('sort', 'ascendingName')">
              <v-list-item-title>
                {{ `${$t("name")} : A > Z` }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item link @click="$emit('sort', 'descendingName')">
              <v-list-item-title>{{
                `${$t("name")} : Z > A`
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <v-row v-if="netflixOnly">
      <v-col>
        <v-chip
          small
          close
          dark
          color="indigo"
          v-if="netflixOnly"
          @click:close="
            closeNetflixOnly();
            $emit('disable-netflix-only');
          "
        >
          Netflix
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
      netflixOnly: false,
    };
  },

  methods: {
    openNetflixOnly() {
      this.netflixOnly = true;
    },
    closeNetflixOnly() {
      this.netflixOnly = false;
    },
  },
};
</script>