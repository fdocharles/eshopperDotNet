<template>
  <fragment>
    <div class="col-md-9 order-2">
      <div class="row mb-5">
        <ItemCard
          v-for="product in filterProducts"
          v-bind:key="product.id"
          v-bind:id="product.id"
          v-bind:name="product.name"
          v-bind:image="product.image"
          v-bind:category="product.category"
          v-bind:rating="product.rating"
          v-bind:description="product.description"
          v-bind:price="product.price"
        />
      </div>
    </div>
    <div class="col-md-3 order-1 mb-5 mb-md-0">
      <div class="border p-4 rounded mb-4">
        <div class="mb-4">
          <h3 class="mb-3 h6 text-uppercase text-black d-block">Category</h3>
          <label for="s_dr" class="d-flex">
            <input
              type="checkbox"
              id="s_dr"
              class="mr-2 mt-1"
              value="Dresses"
              v-model="filterCategory"
              @click="filterProducts"
            />
            <span class="text-black">Dresses</span>
          </label>
          <label for="s_de" class="d-flex">
            <input
              type="checkbox"
              id="s_de"
              class="mr-2 mt-1"
              value="Denims"
              v-model="filterCategory"
              @click="filterProducts"
            />
            <span class="text-black">Denims</span>
          </label>
          <label for="s_to" class="d-flex">
            <input
              type="checkbox"
              id="s_to"
              class="mr-2 mt-1"
              value="Tops"
              v-model="filterCategory"
              @click="filterProducts"
            />
            <span class="text-black">Tops</span>
          </label>
        </div>

        <div class="mb-4">
          <h3 class="mb-3 h6 text-uppercase text-black d-block">Size</h3>
          <label for="s_sm" class="d-flex">
            <input
              type="checkbox"
              id="s_sm"
              class="mr-2 mt-1"
              value="Small"
              v-model="filterSize"
            />
            <span class="text-black">Small</span>
          </label>
          <label for="s_md" class="d-flex">
            <input
              type="checkbox"
              id="s_md"
              class="mr-2 mt-1"
              value="Medium"
              v-model="filterSize"
            />
            <span class="text-black">Medium</span>
          </label>
          <label for="s_lg" class="d-flex">
            <input
              type="checkbox"
              id="s_lg"
              class="mr-2 mt-1"
              value="Large"
              v-model="filterSize"
            />
            <span class="text-black">Large</span>
          </label>
          <label for="s_xl" class="d-flex">
            <input
              type="checkbox"
              id="s_xl"
              class="mr-2 mt-1"
              value="Extra Large"
              v-model="filterSize"
            />
            <span class="text-black">Extra Large</span>
          </label>
        </div>
      </div>
    </div>
  </fragment>
</template>

<script>
import ItemCard from "./ItemCard.vue";
import axios from "axios";

export default {
  name: "Items",
  components: { ItemCard },
  props: ["items"],
  data() {
    return {
      products: [],
      filterCategory: [],
      filterSize: [],
    };
  },
  methods: {
    loadProducts() {
      axios.get("http://localhost:3655/api/Product").then((response) => {
        if (response && response.status == 200) {
          this.products = [...response.data];
          localStorage.setItem("products", JSON.stringify(response.data));
        }
      });
    },
  },
  computed: {
    filterProducts() {
      var prod = this.products;

      if (this.filterCategory && this.filterCategory.length > 0) {
        prod = prod.filter((x) => this.filterCategory.includes(x.category));
      }

      if (this.filterSize && this.filterSize.length > 0) {
        var tempProd = [];

        for (var p of prod) {
          if (p && p.size && p.size.some((i) => this.filterSize.includes(i))) {
            tempProd.push(p);
          }
        }
      }

      if (tempProd && tempProd.length > 0) {
        prod = tempProd;
      }

      return prod;
    },
  },
  mounted() {
    this.loadProducts();
  },
};
</script>
