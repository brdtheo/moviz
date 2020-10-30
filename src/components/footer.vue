<template>
  <v-footer class="grey darken-4 white--text" padless height="150">
    <v-container class="">
      <v-row justify="center" align="center">
        <v-col cols="6">
          <v-btn
            icon
            dark
            class="mr-8"
            v-for="link in social"
            :key="link.name"
            :href="link.url"
            :target="link.target"
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
  name: "mfooter",

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