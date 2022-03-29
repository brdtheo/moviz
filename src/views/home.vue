<template>
  <div>
    <v-row class="mb-10">
      <v-col cols="12" sm="7" md="5">
        <h1>Moviz</h1>
        <p class="mt-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae error
          perferendis temporibus aperiam facilis. Nam rerum eum voluptatem
          perferendis ex dolor natus vitae deserunt, accusamus at nemo quaerat.
          Fuga, quos.
        </p>
        <div class="d-flex overflow-x-scroll">
          <v-btn color="indigo" dark small class="mr-2">
            <v-icon small class="mr-2">mdi-star</v-icon>
            button
          </v-btn>
          <v-btn color="indigo" dark small class="mr-2">
            <v-icon small class="mr-2">mdi-share-variant</v-icon>
            button
          </v-btn>
          <v-btn color="indigo" dark small>
            <v-icon small class="mr-2">mdi-filmstrip</v-icon>
            button
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <Movierow />
    <Movierow genre="action" />
    <Movierow genre="drama" />
    <Movierow genre="comedy" />
    <Movierow genre="horror" />
    <Movierow genre="documentary" />
  </div>
</template>

<script>
import Movierow from "../components/movierow";

export default {
  name: "home",
  components: {
    Movierow,
  },
};
</script>