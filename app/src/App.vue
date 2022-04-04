<template>
  <fragment>
    <router-view />
    <Footer v-if="isLoggedIn" />
  </fragment>
</template>

<script>
import Footer from "./components/Footer.vue";
import startup from "./components/Startup.vue";

export default {
  name: "App",
  components: { startup, Footer },
  data() {
    return {
      isLoggedIn: false,
    };
  },
  created() {
    var user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
