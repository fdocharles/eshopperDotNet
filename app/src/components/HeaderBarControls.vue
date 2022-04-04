<template>
  <div class="col-6 col-md-4 order-3 order-md-3 text-right">
    <div class="site-top-icons">
      <ul>
        <li v-if="isUserLoggedIn">
          <a href="/account"
            ><span
              class="icon icon-person icon-color"
              style="color: black; font-size: 30px"
            ></span
            >{{ user ? "Hi " + user.name : "" }}</a
          >
        </li>
        <li v-else>
          <a href="/login"
            ><span
              class="icon icon-person icon-color"
              style="color: black; font-size: 30px"
            ></span
          ></a>
        </li>
        <li>
          <a href="/checkout" class="site-cart">
            <span
              class="icon icon-shopping_cart icon-color"
              style="color: black; font-size: 30px"
            ></span>
            <!-- <span class="count">2</span> -->
          </a>
        </li>
        <li class="d-inline-block d-md-none ml-md-0">
          <a href="#" class="site-menu-toggle js-menu-toggle"
            ><span class="icon-menu"></span
          ></a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "HeaderBarControls",
  data() {
    return {
      user: {},
      isUserLoggedIn: false,
    };
  },
  created() {
    var currUser = JSON.parse(localStorage.getItem("user"));
    this.user = currUser ? currUser : {};
    this.isUserLoggedIn = currUser && currUser.id ? true : false;
  },
};
</script>
