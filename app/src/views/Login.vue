<template>
  <div class="container login-container" style="margin-top: 10%">
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6 login-form-1" style="background-color: #7971ea">
        <div class="row">
          <div class="col-md-6 offset-md-3">
            <div class="site-logo-login" style="text-align: center">
              <a href="index.html" class="js-logo-clone">E-SHOPPER</a>
            </div>
          </div>
        </div>
        <form>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Your Email *"
              v-model="email"
              @change="validateUserInput"
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              placeholder="Your Password *"
              v-model="password"
              @change="validateUserInput"
            />
          </div>
          <div class="form-group">
            <p v-if="isInvalidLogin" style="color: red">Invalid credentials</p>
          </div>
          <div class="form-group" style="text-align: center">
            <input
              type="button"
              class="btnSubmit"
              style="background-color: #fdb819; color: Black"
              value="Login"
              @click="login"
            />
          </div>
        </form>
      </div>

      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      isInvalidLogin: false,
    };
  },
  methods: {
    validateUserInput() {
      if (this.isInvalidLogin) {
        this.isInvalidLogin = false;
      }
    },
    login() {
      this.isInvalidLogin = true;

      if (!this.email || !this.password) {
        this.isInvalidLogin = true;
      } else {
        if (this.email == "charles@gmail.com" && this.password == "abc123") {
          localStorage.setItem(
            "user",
            JSON.stringify({
              id: 1,
              name: "Charles",
            })
          );

          this.isInvalidLogin = false;
          this.successLogin();
        } else if (
          this.email == "iresha@gmail.com" &&
          this.password == "abc123"
        ) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              id: 2,
              name: "Iresha",
            })
          );
          this.isInvalidLogin = false;
          this.successLogin();
        } else {
          this.isInvalidLogin = true;
        }

        // axios
        //   .post("http://localhost:3000/api/authenticate", {
        //     email: this.email,
        //     password: this.password,
        //   })
        //   .then((response) => {
        //     if (response && response.data && response.data.data) {
        //       this.isInvalidLogin = false;
        //       localStorage.setItem(
        //         "user",
        //         JSON.stringify({
        //           id: response.data.data._id,
        //           name: response.data.data.name,
        //         })
        //       );
        //       this.successLogin();
        //     } else {
        //       this.isInvalidLogin = true;
        //     }
        //   })
        //   .catch(function (error) {
        //     this.isInvalidLogin = true;
        //   });
      }
    },
    successLogin() {
      this.$router.push("Shop");
    },
    created() {
      localStorage.removeItem("user");
    },
  },
};
</script>

<style scoped>
body {
  background-color: #8c92a0;
}
</style>
