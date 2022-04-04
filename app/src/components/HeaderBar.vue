<template>
  <fragment>
    <header class="site-navbar" role="banner">
      <div class="site-navbar-top">
        <div class="container">
          <div class="row align-items-center">
            <div
              class="col-6 col-md-4 order-2 order-md-1 site-search-icon text-left"
            ></div>

            <div
              class="col-12 mb-3 mb-md-0 col-md-4 order-1 order-md-2 text-center"
            >
              <div class="site-logo">
                <a href="/" class="js-logo-clone">E-Shopper</a>
              </div>
            </div>

            <header-bar-controls
              v-on:updateCartCount="updateCartCount"
              :user="accountName"
            />
          </div>
          <toast-message />
        </div>
      </div>
      <menu-bar />
    </header>
  </fragment>
</template>

<script>
import MenuBar from "./MenuBar.vue";
import Login from "./Login.vue";
import HeaderBarControls from "./HeaderBarControls.vue";
import ToastMessage from "./ToastMessage.vue";

export default {
  name: "HeaderBar",
  components: {
    MenuBar,
    Login,
    HeaderBarControls,
    ToastMessage,
  },
  data() {
    return {
      cartCount: 0,
      accountName: "",
    };
  },
  methods: {
    updateCartCount() {
      var length = JSON.parse(localStorage.getItem("cart")).length;
      this.cartCount = length > 0 ? length : 0;
    },
  },
  created() {
    var user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.isLoggedIn = true;
      this.accountName = user.name;
    } else {
      this.isLoggedIn = false;
      this.accountName = "";
    }
  },
};
</script>
