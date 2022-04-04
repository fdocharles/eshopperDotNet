<template>
  <fragment>
    <header-bar v-if="isLoggedIn" />
    <bread-crumb currentPage="Account" previousPage="Shop"></bread-crumb>
    <div class="container">
      <h1 class="mb-2 account-user">
        Hi, {{ accountUser }} &nbsp;&nbsp;&nbsp;<span
          style="font-size: 20px"
          v-if="orders && orders.length > 0"
          >({{ orders ? orders.length : 0 }} orders )</span
        >
      </h1>
      <br />
      <br />
      <div v-if="orders && orders.length > 0" id="accordion">
        <div class="card" v-for="order in orders" v-bind:key="order.orderNo">
          <div class="card-header" id="headingOne">
            <div class="row">
              <div class="col-md-10">
                <h5 class="mb-0" style="color: black">
                  {{ "#" + order.orderNo }} &nbsp; &nbsp;&nbsp;
                  {{ order.orderDate }}
                </h5>
              </div>
              <div class="col-md-2">
                <h5 class="mb-0" style="color: black; float: right">
                  ${{ order.total }}
                </h5>
              </div>
            </div>
          </div>

          <div
            :id="order.orderNo"
            class="collapse show"
            aria-labelledby="headingOne"
            data-parent="#accordion"
          >
            <div class="card-body">
              <div
                class="row"
                style="margin-top: 10px"
                v-for="item in order.cart"
                v-bind:key="item.id"
              >
                <div class="col-md-1">
                  <img
                    v-bind:src="item.image"
                    alt="Image"
                    class="img-fluid"
                    style="height: 80px"
                  />
                </div>
                <div class="col-md-9">
                  <h6 class="mb-0 text-black">Product : {{ item.name }}</h6>
                  <p class="text-black" style="margin: 0px">
                    Size : {{ item.size }}
                  </p>
                  <p class="text-black" style="margin: 0px">
                    Quantity : {{ item.qty }}
                  </p>
                </div>
                <div class="col-md-2">
                  <button
                    class="btn customize-btn btn-sm btn-block"
                    style="
                      width: unset;
                      margin-left: 30%;
                      width: 100px;
                      height: 40px;
                    "
                    @click="toggle(item)"
                  >
                    Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="row">
          <div class="col-md-6 offset-md-3" style="text-align: center">
            <h4>No Orders Yet</h4>
            <h6>Look's like you, haven't made your menu yet</h6>
          </div>
        </div>
        <br />
        <br />
        <div class="row">
          <div class="col-md-6 offset-md-3">
            <a href="/shop">
              <button class="btn customize-btn btn-sm btn-block">
                Start Shopping
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div
      :class="modalClasses"
      class="fade"
      id="reject"
      role="dialog"
      style="margin-top: 15%"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ reviewItem.name }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="toggle(reviewItem)"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="star-rating-wrapper">
              Rating :
              <star-rating
                v-model="userRating"
                :show-rating="false"
                :rounded-corners="true"
                :star-points="[
                  23, 2, 14, 17, 0, 19, 10, 34, 7, 50, 23, 43, 38, 50, 36, 34,
                  46, 19, 31, 17,
                ]"
                :star-size="25"
                :inline="true"
              ></star-rating>
            </div>
            <textarea
              v-model="review"
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              style="width: 100px; height: 36px; font-size: 14px"
              @click="addReview(reviewItem.id)"
            >
              Review
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              style="width: 100px; height: 36px; font-size: 14px"
              @click="toggle(reviewItem)"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </fragment>
</template>

<script>
import BreadCrumb from "../components/BreadCrumb.vue";
import HeaderBar from "../components/HeaderBar.vue";
import StarRating from "vue-star-rating";
import axios from "axios";

export default {
  name: "Account",
  components: { HeaderBar, BreadCrumb, StarRating },
  data() {
    return {
      isLoggedIn: false,
      accountUser: "",
      orders: [],
      showModal: false,
      modalClasses: ["modal", "fade"],
      reviewItem: {},
      review: "",
      userRating: 0,
    };
  },
  methods: {
    orderNumRef(no) {
      return "#" + no;
    },
    closeReview() {
      this.showModal = false;
    },
    showReview() {
      this.showModal = true;
    },
    addReview(itemid) {
      var user = JSON.parse(localStorage.getItem("user"));

      var curentReview = {
        comment: this.review,
        id: 0, //Math.floor(Math.random() * (1000000 - 10000 + 1)) + 10000,
        name: user.name,
        rating: this.userRating,
        productId: itemid,
      };

      // this.reviewItem.reviews = [...this.reviewItem.reviews, curentReview];

      // var tempProducts = JSON.parse(localStorage.getItem("products"));

      // var updatedProducts = tempProducts.map((x) => {
      //   return x._id == this.reviewItem.id ? this.reviewItem : x;
      // });

      // localStorage.setItem("products", JSON.stringify(updatedProducts));
      //this.toggle(this.reviewItem);

      axios
        .post("http://localhost:3655/api/review", {
          comment: this.review,
          id: 0,
          cust_name: user.name,
          rating: this.userRating,
          product_id: itemid,
        })
        .then((response) => {
          var products = JSON.parse(localStorage.getItem("products"));
          var tempReviewItem =
            products && products.length > 0
              ? products.filter((x) => x.id == item.id)[0]
              : {};
          this.reviewItem = tempReviewItem ? tempReviewItem : {};
        });

      document.body.className += " modal-open";
      let modalClasses = this.modalClasses;

      if (modalClasses.indexOf("d-block") > -1) {
        modalClasses.pop();
        modalClasses.pop();

        //hide backdrop
        let backdrop = document.querySelector(".modal-backdrop");
        document.body.removeChild(backdrop);
      } else {
        modalClasses.push("d-block");
        modalClasses.push("show");

        //show backdrop
        let backdrop = document.createElement("div");
        backdrop.classList = "modal-backdrop fade show";
        document.body.appendChild(backdrop);
      }
    },
    toggle(item) {
      var products = JSON.parse(localStorage.getItem("products"));
      var tempReviewItem =
        products && products.length > 0
          ? products.filter((x) => x.id == item.id)[0]
          : {};
      this.reviewItem = tempReviewItem ? tempReviewItem : {};

      document.body.className += " modal-open";
      let modalClasses = this.modalClasses;

      if (modalClasses.indexOf("d-block") > -1) {
        modalClasses.pop();
        modalClasses.pop();

        //hide backdrop
        let backdrop = document.querySelector(".modal-backdrop");
        document.body.removeChild(backdrop);
      } else {
        modalClasses.push("d-block");
        modalClasses.push("show");

        //show backdrop
        let backdrop = document.createElement("div");
        backdrop.classList = "modal-backdrop fade show";
        document.body.appendChild(backdrop);
      }
    },
  },
  created() {
    var user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.isLoggedIn = true;
      this.accountUser = user.name;
    } else {
      this.isLoggedIn = false;
    }

    this.orders = JSON.parse(localStorage.getItem("orders"));
  },
  mounted() {
    // var user1 = JSON.parse(localStorage.getItem("user"));
    // axios
    //   .get("http://localhost:3000/api/customer?id=" + user1.id)
    //   .then((response) => {});
  },
};
</script>
<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>
