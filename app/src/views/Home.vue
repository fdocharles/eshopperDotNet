<template>
  <fragment>
    <header-bar />
    <banner />
    <FeaturedProducts />
  </fragment>
</template>

<script>
import Banner from "../components/Banner.vue";
import FeaturedProducts from "../components/FeaturedProducts.vue";
import HeaderBar from "../components/HeaderBar.vue";
import json from "./../data/data.json";

export default {
  name: "Home",
  components: {
    Banner,
    FeaturedProducts,
    HeaderBar,
  },
  data() {
    return {};
  },
  // created() {
  //   if (!localStorage.getItem("products")) {
  //     localStorage.setItem("products", JSON.stringify(json));
  //   }
  // },
};
</script>
