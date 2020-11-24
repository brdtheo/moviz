<template>
  <v-footer class="grey darken-4 white--text" padless>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="6">
          <v-btn
            icon
            dark
            class="mr-sm-2 mr-md-4"
            v-for="link in social"
            :key="link.name"
            :href="link.url"
            :target="link.target"
            rel="noreferrer"
          >
            <v-icon dense>{{ "mdi-" + link.icon }}</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="6" class="text-right">
          <span>{{ new Date().getFullYear() }}</span>
          <span class="mx-5">•</span> <strong>Moviz</strong>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",

  data: () => {
    return {
      social: [
        {
          name: "codepen",
          icon: "codepen",
          url: "https://codepen.io/theo-billardey",
          target: "_blank",
        },
        {
          name: "linkedin",
          icon: "linkedin",
          url: "https://www.linkedin.com/in/theo-billardey/",
          target: "_blank",
        },
        {
          name: "facebook",
          icon: "facebook",
          url: "https://www.facebook.com/profile.php?id=100017396689455",
          target: "_blank",
        },
        {
          name: "github",
          icon: "github",
          url: "https://github.com/brdtheo",
          target: "_blank",
        },
      ],
    };
  },
};
</script>