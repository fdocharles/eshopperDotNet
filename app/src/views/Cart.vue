<template>
  <fragment>
    <header-bar />
    <BreadCrumb previousPage="Home" currentPage="Checkout" />
    <div class="site-section">
      <div v-if="cartItems && cartItems.length > 0" class="container">
        <div class="row mb-5">
          <div class="col-md-12">
            <div class="site-blocks-table">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th class="product-thumbnail">Image</th>
                    <th class="product-name">Product</th>
                    <th class="product-price">Price</th>
                    <th class="product-quantity">Quantity</th>
                    <th class="product-total">Total</th>
                    <th class="product-remove">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in cartItems" :key="i">
                    <td class="product-thumbnail">
                      <img
                        v-bind:src="item.image"
                        alt="Image"
                        class="img-fluid"
                        style="height: 120px"
                      />
                    </td>
                    <td class="product-name">
                      <h2 class="h5 text-black" style="text-align: left">
                        {{ item.name }}
                      </h2>
                    </td>
                    <td>$ {{ item.price }}</td>
                    <td>
                      <div
                        class="input-group mb-3"
                        style="max-width: 120px; text-align: center"
                      >
                        <div class="input-group-prepend">
                          <button
                            class="btn cus-btn-outline-primary"
                            type="button"
                            @click="minusQty(i)"
                          >
                            &minus;
                          </button>
                        </div>
                        <input
                          type="text"
                          class="form-control text-center"
                          v-bind:value="item.qty"
                          placeholder=""
                          aria-label="Example text with button addon"
                          aria-describedby="button-addon1"
                        />
                        <div class="input-group-append">
                          <button
                            class="btn cus-btn-outline-primary"
                            type="button"
                            @click="plusQty(i)"
                          >
                            &plus;
                          </button>
                        </div>
                      </div>
                    </td>
                    <td>${{ (item.price * item.qty).toFixed(2) }}</td>
                    <td>
                      <button
                        @click="removeItem(item.id)"
                        class="btn customize-btn btn-sm"
                      >
                        X
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="row mb-5">
              <div class="col-md-6">
                <a href="/shop">
                  <button class="btn customize-btn btn-sm btn-block">
                    Continue Shopping
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div class="col-md-6 pl-5">
            <div class="row justify-content-end">
              <div class="col-md-7">
                <div class="row">
                  <div class="col-md-12 text-right border-bottom mb-5">
                    <h3 class="text-black h4 text-uppercase">Cart Totals</h3>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-6">
                    <span class="text-black">Subtotal</span>
                  </div>
                  <div class="col-md-6 text-right">
                    <strong class="text-black">${{ getSubTotal }}</strong>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-6">
                    <span class="text-black">HST</span>
                  </div>
                  <div class="col-md-6 text-right">
                    <strong class="text-black">${{ getTax }}</strong>
                  </div>
                </div>
                <div class="row mb-5">
                  <div class="col-md-6">
                    <span class="text-black">Total</span>
                  </div>
                  <div class="col-md-6 text-right">
                    <strong class="text-black">${{ getTotal }}</strong>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <button
                      class="btn customize-btn btn-lg py-3 btn-block"
                      @click="placeOrder"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="container text-center">
        <h3 class="text-black h4 text-uppercase">Your cart is empty</h3>
        <br />
        <br />
        <br />
        <div class="row">
          <a href="/shop" class="col-md-6 offset-md-3">
            <button class="btn customize-btn btn-sm btn-block">
              Continue Shopping
            </button>
          </a>
        </div>
      </div>
    </div>
  </fragment>
</template>

<script>
import BreadCrumb from "../components/BreadCrumb.vue";
import HeaderBar from "../components/HeaderBar.vue";

export default {
  name: "Cart",
  components: {
    BreadCrumb,
    HeaderBar,
  },
  data() {
    return {
      cartItems: [],
    };
  },
  computed: {
    getSubTotal: function () {
      return this.cartItems
        .reduce((acc, curr) => {
          return acc + curr.price * curr.qty;
        }, 0.0)
        .toFixed(2);
    },
    getTax: function () {
      var subTotal2 = this.cartItems.reduce((acc, curr) => {
        return acc + curr.price * curr.qty;
      }, 0.0);

      return ((subTotal2 / 100) * 13).toFixed(2);
    },
    getTotal: function () {
      var subTotal1 = this.cartItems.reduce((acc, curr) => {
        return acc + curr.price * curr.qty;
      }, 0.0);
      return (subTotal1 + (subTotal1 / 100) * 13).toFixed(2);
    },
  },
  methods: {
    minusQty(i) {
      if (this.cartItems[i].qty > 0) {
        this.cartItems[i].qty -= 1;
      }
    },
    plusQty(i) {
      this.cartItems[i].qty += 1;
    },
    removeItem(id) {
      this.cartItems = this.cartItems.filter((x) => {
        return x.id != id;
      });

      localStorage.setItem("cart", JSON.stringify(this.cartItems));
    },
    placeOrder() {
      var subTot = this.cartItems.reduce((acc, curr) => {
        return acc + curr.price * curr.qty;
      }, 0.0);

      var orders = JSON.parse(localStorage.getItem("orders"));
      var currOrder = {
        orderNo: Math.floor(Math.random() * (1000000 - 10000 + 1)) + 10000,
        status: "Ordered",
        cart: this.cartItems,
        total: (subTot + (subTot / 100) * 13).toFixed(2),
        orderDate: new Date().toLocaleDateString("en-us", {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      };

      if (orders) {
        localStorage.setItem("orders", JSON.stringify([...orders, currOrder]));
      } else {
        localStorage.setItem("orders", JSON.stringify([currOrder]));
      }

      localStorage.setItem("lastOrderNumber", currOrder.orderNo);
      localStorage.removeItem("cart", []);

      this.$router.push("Success");
      location.reload();
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

    this.cartItems = JSON.parse(localStorage.getItem("cart"));
  },
};
</script>
