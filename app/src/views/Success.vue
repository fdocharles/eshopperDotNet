<template>
  <fragment>
    <header-bar />
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3 text-center" style="margin-top: 100px">
          <h1 class="success-order-no-title" sty>
            Order Placed Successfully !
          </h1>
          <h5 style="margin-top: 30px">Your Order No : {{ orderNo }}</h5>
        </div>
      </div>
    </div>
  </fragment>
</template>

<script>
import HeaderBar from "../components/HeaderBar.vue";

export default {
  components: { HeaderBar },
  name: "Success",
  data() {
    return {
      orderNo: 0,
    };
  },
  created() {
    this.cartItems = JSON.parse(localStorage.getItem("cart"));
    this.orderNo = localStorage.getItem("lastOrderNumber");
  },
};
</script>
