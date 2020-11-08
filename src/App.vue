<template>
  <v-app>
    <Navbar />

    <v-main class="pa-0 grey darken-4 white--text">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default {
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style>
:root {
  --plyr-color-main: #3f51b5;
  --indigo: #3f51b5;
}

.border-indigo {
  border: solid 2px var(--indigo);
}

.w-100 {
  width: 100%;
}

.pointer {
  cursor: pointer;
}

.percent::after {
  content: "%";
}

.comma::after {
  content: ", ";
}

.comma:last-of-type::after {
  content: "";
}

.v-btn--active.no-active::before {
  opacity: 0 !important;
}

.container {
  max-width: 1200px;
}

.placeholder::before {
  content: " ";
  display: block;
  background: linear-gradient(90deg, #eee 8%, #e5e5e5 18%, #eee 33%);
  background-size: 800px 104px;
  animation: placeholder 600ms linear infinite forwards;
}

@keyframes placeholder {
  0% {
    background-position: -468px 0;
  }
  to {
    background-position: 468px 0;
  }
}

.placeholder__name::before {
  width: 15ch;
  height: 32px;
}

.placeholder__year::before {
  width: 5ch;
  height: 22px;
}

.placeholder__description::before {
  width: 100%;
  height: 64px;
}

.placeholder__btn::before {
  width: 56px;
  height: 28px;
}

.placeholder__rating::before {
  width: 100px;
  height: 24px;
}

.placeholder__rating__description::before {
  width: 100%;
  height: 20px;
}

.placeholder__profilepicture::before {
  width: 128px;
  height: 128px;
}

.placeholder__moviedetail__name::before {
  width: 300px;
  height: 48px;
}

.placeholder__moviedetail__text::before {
  width: 100%;
  height: 22px;
}

.placeholder__moviedetail__chip::before {
  width: 60px;
  height: 24px;
}

.placeholder__moviedetail__trailer::before {
  width: 100%;
  height: 100%;
}
</style>