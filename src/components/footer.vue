<template>
  <v-footer class="grey darken-4 white--text" padless>
    <v-container>
      <v-row justify="space-between" align="center">
        <v-col cols="7">
          <v-btn
            small
            href="https://github.com/brdtheo/moviz/"
            target="_blank"
            rel="noreferrer"
          >
            <v-icon dense class="mr-2">mdi-github</v-icon>
            <span>View on Github</span>
          </v-btn>
        </v-col>
        <v-col cols="5" class="text-right">
          <span>{{ new Date().getFullYear() }}</span>
          <span class="mx-2">•</span>
          <strong>Moviz</strong>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>