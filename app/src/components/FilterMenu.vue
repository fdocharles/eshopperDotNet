<template>
  <div class="site-section">
    <div class="container">
      <div class="row mb-5">
        <Items :items="items" />
      </div>
    </div>
  </div>
</template>

<script>
import Items from "./Items.vue";

export default {
  components: { Items },
  name: "FilterMenu",
  data() {
    return {
      items: [],
      filterCategory: [],
      filterSize: [],
    };
  },
  methods: {
    filterProducts() {},
  },
};
</script>
