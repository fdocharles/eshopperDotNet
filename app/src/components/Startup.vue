<template></template>

<script>
import HeaderBar from "./HeaderBar.vue";
export default {
  name: "Startup",
  components: {
    HeaderBar,
  },
  data() {
    return {
      isHeaderbarVisible: true,
    };
  },
  created() {
    if (this.$route.path.includes("/login")) {
      this.isHeaderbarVisible = false;
    } else {
      this.isHeaderbarVisible = true;
    }
  },
};
</script>
