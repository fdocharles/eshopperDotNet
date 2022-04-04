<template>
  <fragment>
    <header-bar />
    <BreadCrumb :currentPage="currentPage" previousPage="Shop"></BreadCrumb>
    <div class="site-section">
      <div v-if="product" class="container">
        <div class="row">
          <div class="col-md-6">
            <img v-bind:src="product.image" alt="Image" class="img-fluid" />
          </div>
          <div class="col-md-6">
            <h2 class="text-black">{{ product.name }}</h2>
            <p>
              {{ product.description }}
            </p>
            <p>
              <strong class="text-primary h4">$ {{ product.price }}</strong>
            </p>
            <div class="mb-1 d-flex">
              <label for="option-sm" class="d-flex mr-3 mb-3">
                <span
                  class="d-inline-block mr-2"
                  style="top: -2px; position: relative"
                  ><input
                    type="radio"
                    id="option-sm"
                    name="shop-sizes"
                    value="small"
                    v-model="size"
                /></span>
                <span class="d-inline-block text-black">Small</span>
              </label>
              <label for="option-md" class="d-flex mr-3 mb-3">
                <span
                  class="d-inline-block mr-2"
                  style="top: -2px; position: relative"
                  ><input
                    type="radio"
                    id="option-md"
                    name="shop-sizes"
                    value="medium"
                    v-model="size"
                /></span>
                <span class="d-inline-block text-black">Medium</span>
              </label>
              <label for="option-lg" class="d-flex mr-3 mb-3">
                <span
                  class="d-inline-block mr-2"
                  style="top: -2px; position: relative"
                  ><input
                    type="radio"
                    id="option-lg"
                    name="shop-sizes"
                    value="large"
                    v-model="size"
                /></span>
                <span class="d-inline-block text-black">Large</span>
              </label>
              <label for="option-xl" class="d-flex mr-3 mb-3">
                <span
                  class="d-inline-block mr-2"
                  style="top: -2px; position: relative"
                  ><input
                    type="radio"
                    id="option-xl"
                    name="shop-sizes"
                    value="extraLarge"
                    v-model="size"
                /></span>
                <span class="d-inline-block text-black"> Extra Large</span>
              </label>
            </div>
            <div class="mb-5">
              <div class="input-group mb-3" style="max-width: 120px">
                <div class="input-group-prepend">
                  <button
                    class="btn btn-outline-primary"
                    type="button"
                    @click="minusQty"
                  >
                    &minus;
                  </button>
                </div>
                <input
                  type="text"
                  class="form-control text-center"
                  value="1"
                  placeholder=""
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                  v-model="qty"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-outline-primary"
                    type="button"
                    @click="plusQty"
                  >
                    &plus;
                  </button>
                </div>
              </div>
            </div>
            <p>
              <button
                @click="AddProduct"
                class="[buy-now btn btn-sm customize-btn"
                :class="{ disabled: isAddToCartDisabled }"
              >
                Add To Cart
              </button>
            </p>
          </div>
        </div>
        <br />
        <br />
        <br />
        <div>
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item">
              <a
                class="nav-link active"
                id="home-tab"
                data-toggle="tab"
                href="#home"
                role="tab"
                aria-controls="home"
                aria-selected="true"
                >Customer Reviews</a
              >
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div
              class="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <div v-if="reviews.length > 0">
                <div
                  v-for="review in reviews"
                  v-bind:key="review.id"
                  class="row review"
                >
                  <div class="col-md-12">
                    <p style="font-size: 15px; font-style: italic; margin: 0px">
                      " {{ review.comment }} "
                    </p>
                  </div>
                  <div class="col-md-12">
                    <p style="color: black">
                      {{ review.cust_name }}
                      <span
                        v-for="index in 5"
                        :key="index"
                        class="fa fa-star"
                        v-bind:class="[
                          index <= review.rating ? 'rating-star-checked' : '',
                        ]"
                      ></span>
                    </p>
                  </div>
                </div>
              </div>
              <div v-else class="reviews-not-available">
                <p>Reviews not available !</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </fragment>
</template>

<script>
import axios from "axios";
import BreadCrumb from "../components/BreadCrumb.vue";
import HeaderBar from "../components/HeaderBar.vue";
import json from "../data/data.json";

var currentProduct = null;

export default {
  name: "Details",
  components: { BreadCrumb, HeaderBar },
  data() {
    return {
      currentPage: this.$route.params.id,
      product: {},
      size: "",
      qty: 0,
      isAddToCartDisabled: true,
      isLoggedIn: false,
      reviews: [],
    };
  },
  methods: {
    minusQty() {
      if (this.qty > 0) this.qty -= 1;

      this.udapteAddToCartBtn();
    },
    plusQty() {
      this.qty += 1;
      this.udapteAddToCartBtn();
    },
    AddProduct() {
      var cart = localStorage.getItem("cart");
      var currProduct = {
        id: this.$route.params.id,
        size: this.size,
        qty: this.qty,
        image: this.product.image,
        name: this.product.name,
        price: this.product.price,
        total: this.product.price * this.qty,
      };

      if (cart) {
        cart = JSON.parse(cart);

        cart = [
          ...cart.filter((x) => {
            return x.id != currProduct.id;
          }),
          currProduct,
        ];
      } else {
        cart = [currProduct];
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      var x = document.getElementById("toast");
      x.className = "show";
      setTimeout(function () {
        x.className = x.className.replace("show", "");
      }, 5000);
    },
    udapteAddToCartBtn() {
      this.isAddToCartDisabled = this.qty > 0 && this.size ? false : true;
    },
    loadProduct(id) {
      let productDetailsURL = "http://localhost:3655/api/Product/" + id;
      let reviewsURL = "http://localhost:3655/api/Review/" + id;

      const fetchURL = (url) => axios.get(url);

      const promiseArray = [productDetailsURL, reviewsURL].map(fetchURL);

      Promise.all(promiseArray)
        .then((data) => {
          if (data[0] && data[0].data) {
            this.product = data[0].data;
            this.currentPage = this.product.name;
          }

          if (data[1] && data[1].data) {
            this.reviews = data[1].data;
            console.log(this.reviews);
          }
        })
        .catch((err) => {
          console.log(err);
        });

      // axios
      //   .get("http://localhost:3000/api/product?id=" + id)
      //   .then((response) => {
      //     if (response && response.status == 200) {
      //       if (response.data) {
      //         this.product = response.data;
      //         this.currentPage = this.product.name;
      //         // this.product.reviews = Object.assign(
      //         //   [],
      //         //   response.data.data[0].reviews
      //         // );

      //         this.reviews = response.data.data[0].reviews
      //           ? response.data.data[0].reviews
      //           : [];
      //       }
      //     }
      //   });
    },
  },
  created() {
    var products = JSON.parse(localStorage.getItem("products"));

    // if (products && products.length > 0) {
    //   var tempProduct = products.filter((x) => x.id == this.product.id)[0]
    //     .reviews;
    //   this.reviews = tempProduct;
    // }

    var user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  },
  mounted() {
    this.loadProduct(this.$route.params.id);
  },
};
</script>
