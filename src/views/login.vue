<template>
  <div class="mt-10">
    <v-row justify="center">
      <v-col cols="12" sm="6">
        <div v-if="!user">
          <h2
            class="font-weight-light mb-5 text-capitalize"
            v-if="isRegistering"
          >
            {{ $t("register") }}
          </h2>
          <h2 class="font-weight-light mb-5" v-else>{{ $t("login") }}</h2>

          <v-text-field
            v-model="userInput.register.email"
            type="email"
            :label="$t('emailaddress')"
            :rules="required"
            color="indigo"
            dark
            outlined
            dense
            v-if="isRegistering"
          ></v-text-field>
          <v-text-field
            v-model="userInput.login.email"
            type="email"
            :label="$t('emailaddress')"
            color="indigo"
            dark
            outlined
            dense
            v-else
          ></v-text-field>

          <v-text-field
            v-model="userInput.register.password"
            type="password"
            :label="$t('password')"
            :rules="passwordRegister"
            color="indigo"
            dark
            outlined
            dense
            v-if="isRegistering"
          ></v-text-field>
          <v-text-field
            v-model="userInput.login.password"
            type="password"
            :label="$t('password')"
            color="indigo"
            dark
            outlined
            dense
            v-else
          ></v-text-field>

          <v-text-field
            v-model="userInput.register.confirmPassword"
            type="password"
            :label="$t('confirmpassword')"
            :rules="passwordRegister"
            color="indigo"
            dark
            outlined
            dense
            v-if="isRegistering"
          ></v-text-field>

          <v-text-field
            v-model="userInput.register.username"
            :label="$t('username')"
            :rules="usernameRegister"
            color="indigo"
            dark
            outlined
            dense
            v-if="isRegistering"
          ></v-text-field>

          <v-row v-if="isRegistering">
            <v-col cols="2" v-for="(picture, index) in pictures" :key="index">
              <img
                :src="picture"
                alt=""
                :class="[chosenProfilePicture == picture ? '' : 'grayscale']"
                class="w-100 rounded-circle pointer"
                @click="chosenProfilePicture = picture"
              />
            </v-col>
          </v-row>

          <v-btn @click="register()" dark color="indigo" v-if="isRegistering">
            {{ $t("register") }}
          </v-btn>
          <v-btn @click="login()" dark color="indigo" v-else>
            {{ $t("login") }}
          </v-btn>

          <small class="ml-5 small" v-if="isRegistering">
            {{ $t("alreadyhasaccount") }}
            <v-btn class="registerBtn" @click="isRegistering = false">{{
              $t("login")
            }}</v-btn>
          </small>
          <small class="ml-5 small" v-else>
            {{ $t("noaccountyet") }}
            <v-btn class="registerBtn" @click="isRegistering = true">{{
              $t("register")
            }}</v-btn>
          </small>

          <v-snackbar v-model="wrongPassword" color="error" outlined dark right>
            {{ $t("wrongpassword") }}
          </v-snackbar>
        </div>
        <div v-else>
          <v-alert color="error" dark text icon="mdi-account">
            {{ $t("alreadyloggedin") }}
          </v-alert>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import router from "../router/index";
import { auth } from "../firebase";
import { db } from "../firebase";

export default {
  name: "login",

  data: () => {
    return {
      userInput: {
        login: {
          email: "",
          password: "",
        },
        register: {
          email: "",
          password: "",
          confirmPassword: "",
          username: "",
        },
      },

      isRegistering: false,
      chosenProfilePicture: "",

      pictures: [
        "https://randomuser.me/api/portraits/men/68.jpg",
        "https://randomuser.me/api/portraits/women/2.jpg",
        "https://randomuser.me/api/portraits/men/20.jpg",
        "https://randomuser.me/api/portraits/women/90.jpg",
        "https://randomuser.me/api/portraits/men/60.jpg",
        "https://randomuser.me/api/portraits/women/27.jpg",
        "https://randomuser.me/api/portraits/men/83.jpg",
        "https://randomuser.me/api/portraits/women/60.jpg",
        "https://randomuser.me/api/portraits/men/42.jpg",
        "https://randomuser.me/api/portraits/women/12.jpg",
        "https://randomuser.me/api/portraits/men/1.jpg",
        "https://randomuser.me/api/portraits/women/80.jpg",
      ],

      snackTimeout: "2000",
      wrongPassword: false,
    };
  },

  computed: {
    required() {
      return [(value) => !!value || this.$t("required")];
    },

    passwordRegister() {
      return [
        (value) => !!value || this.$t("required"),
        (value) => (value && value.length > 6) || this.$t("minsixcharacters"),
      ];
    },
    usernameRegister() {
      return [
        (value) => !!value || this.$t("required"),
        (value) =>
          (value && value.length < 12) || this.$t("maxtwelvecharacters"),
      ];
    },
  },

  methods: {
    redirectToHome() {
      router.push("/");
    },

    register() {
      if (
        this.userInput.register.password !==
        this.userInput.register.confirmPassword
      ) {
        return console.error("passwords are not matching.");
      } else {
        if (
          this.userInput.register.email &&
          this.userInput.register.username &&
          this.userInput.register.username.length <= 12 &&
          this.userInput.register.password.length >= 6
        ) {
          auth
            .createUserWithEmailAndPassword(
              this.userInput.register.email,
              this.userInput.register.password
            )
            .then((user) => {
              if (this.chosenProfilePicture) {
                db.collection("users").doc(user.user.uid).set({
                  role: "user",
                  username: this.userInput.register.username,
                  profilePicture: this.chosenProfilePicture,
                });
              } else {
                db.collection("users")
                  .doc(user.user.uid)
                  .set({
                    role: "user",
                    username: this.userInput.register.username,
                  })
                  .then(() => {
                    this.redirectToHome();
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    },

    login() {
      auth
        .signInWithEmailAndPassword(
          this.userInput.login.email,
          this.userInput.login.password
        )
        .then(() => {
          this.userInput.login.email = "";
          this.userInput.login.password = "";
          this.redirectToHome();
        })
        .catch((error) => {
          if (error) {
            if (error.code === "auth/wrong-password") {
              this.wrongPassword = true;
              setTimeout(() => {
                this.wrongPassword = false;
              }, 2000);
            } else {
              console.log(error);
            }
          }
        });
    },
  },
};
</script>

<style lang="sass" scoped>
.grayscale
  filter: grayscale(1)
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