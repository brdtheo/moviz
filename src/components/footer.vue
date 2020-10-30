<template>
  <v-footer class="grey darken-4 white--text" padless height="150">
    <v-container class="">
      <v-row justify="center" align="center">
        <v-col cols="6" class="pa-0">
          <v-btn icon dark class="mr-8" v-for="link in social" :key="link.name" :href="link.url" target="_blank">
            <v-icon dense>{{ "mdi-" + link.icon }}</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="6" class="text-right pa-0">
          <span>{{ new Date().getFullYear() }}</span> <span class="mx-5">•</span> <strong>Moviz</strong>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: "mfooter",

  data: () => {
    return {
      social: [
        {
          name: "instagram",
          icon: "instagram",
          url: "#"
        },
        {
          name: "twitter",
          icon: "twitter",
          url: "#"
        },
        {
          name: "facebook",
          icon: "facebook",
          url: "#"
        },
        {
          name: "github",
          icon: "github",
          url: "https://github.com/brdtheo/moviz"
        },
      ],
    };
  },
};
</script>