<template>
  <div class="col-sm-6 col-lg-4 mb-4" data-aos="fade-up">
    <div class="block-4">
      <figure class="block-4-image">
        <a v-bind:href="redirect(id)">
          <img v-bind:src="image" alt="Image placeholder" class="img-fluid" />
        </a>
      </figure>
      <div>
        <p class="mb-0 item-card-category-text">{{ category }}</p>
        <p class="item-card-header">
          <a v-bind:href="redirect(id)">{{ name }}</a>
        </p>
        <p class="item-card-rating-wrapper">
          <span
            v-for="index in 5"
            :key="index"
            class="fa fa-star"
            v-bind:class="[index <= rating ? 'rating-star-checked' : '']"
          ></span>
        </p>
        <p class="font-weight-bold item-card-price">${{ price }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemCard",
  props: ["id", "name", "category", "price", "rating", "image"],
  data() {
    return {
      item: this.itemprop,
    };
  },
  computed: {},
  methods: {
    redirect(id) {
      return "/shop/" + id;
    },
    getImage() {
      return this.props.image;
    },
  },
  created() {},
};
</script>
