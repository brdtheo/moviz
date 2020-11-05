<template>
  <div class="mt-10">
    <v-row justify="center">
      <v-col cols="12" sm="6">
        <div v-if="!user">
          <h2 class="font-weight-light mb-5">{{ $t("login") }}</h2>

          <v-text-field
            @keypress.enter="login()"
            v-model="userInput.email"
            type="email"
            :label="$t('emailaddress')"
            color="indigo"
            dark
            outlined
            dense
          ></v-text-field>

          <v-text-field
            @keypress.enter="login()"
            v-model="userInput.password"
            type="password"
            :label="$t('password')"
            color="indigo"
            dark
            outlined
            dense
          ></v-text-field>

          <v-btn @click="login()" dark color="indigo"> login </v-btn>

          <small class="ml-5 small">
            {{ $t("noaccountyet") }}
            <v-btn class="registerBtn">{{ $t("register") }}</v-btn>
          </small>
        </div>
        <div v-else>
          <v-alert color="error" dark text icon="mdi-account">
            You are already logged in
          </v-alert>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import router from "../router/index";
import { auth } from "../firebase";
//import { db } from "../firebase";

export default {
  name: "login",

  data: () => {
    return {
      userInput: {
        email: "",
        password: "",
      },
    };
  },

  methods: {
    login: function () {
      auth
        .signInWithEmailAndPassword(
          this.userInput.email,
          this.userInput.password
        )
        .catch(function (error) {
          if (error) {
            // Handle Errors here.
            console.log(error);
          }
        });

      // clear inputs
      this.userInput.email = "";
      this.userInput.password = "";
      // redirect
      router.push("/");
    },
  },
};
</script>

<style lang="sass" scoped>
.registerBtn
  border-radius: 0 !important
  font-weight: inherit !important
  color: inherit !important
  min-width: inherit !important
  height: inherit !important
  padding: 0 !important
  font-size: inherit !important
  box-shadow: none !important
  background-color: transparent !important
  border: none !important
  text-transform: none !important
  letter-spacing: inherit !important
  position: relative !important
  &:hover
    &::before
      height: 100% !important

.registerBtn::before
  top: inherit !important
  bottom: 0 !important
  left: 0 !important
  position: absolute !important
  display: block !important
  background-color: #3f51b5 !important
  width: 100% !important
  height: 25% !important
  opacity: inherit !important
  transition: height ease-in 100ms
</style>