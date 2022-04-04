<template>
  <div class="bg-light py-3">
    <div class="container">
      <div class="row">
        <div class="col-md-12 mb-0">
          <a v-bind:href="redirectPage(previousPage)">{{ previousPage }}</a>
          <span class="mx-2 mb-0">/</span>
          <strong class="text-black">{{ currentPage }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BreadCrumb",
  props: ["previousPage", "currentPage"],
  methods: {
    redirectPage(page) {
      return "/" + page;
    },
  },
};
</script>
