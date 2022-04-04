<template>
  <div class="item">
    <div class="block-4 text-center">
      <figure class="block-4-image">
        <img :src="Image" alt="Image placeholder" class="img-fluid" />
      </figure>
      <div class="block-4-text p-4">
        <h3>
          <a href="#">{{ category }}</a>
        </h3>
        <p class="mb-0">{{ Image }}</p>
        <p class="text-primary font-weight-bold">{{ Price }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "FeaturedItemCard",
  props: ["category", "title", "price", "rating", "image"],
  data() {
    return {
      Category: this.props.Category,
      Title: this.props.Title,
      Price: this.props.Price,
      Rating: this.props.Rating,
      Image: this.props.Image,
    };
  },
};
</script>
