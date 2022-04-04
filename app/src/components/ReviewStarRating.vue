<template>
  <div class="rating">
    <ul class="list">
      <li
        @click="rate(star)"
        v-for="star in maxStars"
        :class="{ active: star <= stars }"
        :key="star.stars"
        class="star"
      >
        <i :class="star <= stars ? 'fas fa-star' : 'far fa-star'"></i>
      </li>
    </ul>
    <div v-if="hasCounter" class="info counter">
      <span class="score-rating">{{ stars }}</span>
      <span class="divider">/</span>
      <span class="score-max">{{ maxStars }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "ReviewStarRating",
  props: ["grade", "maxStars", "hasCounter"],
  data() {
    return {
      stars: this.grade,
    };
  },
  methods: {
    rate(star) {
      if (typeof star === "number" && star <= this.maxStars && star >= 0) {
        this.stars = this.stars === star ? star - 1 : star;
      }
    },
  },
};
</script>

<style scoped>
.rating {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  color: #b7b7b7;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 6px 33px rgba(19, 18, 18, 0.09);
}
.rating .list {
  padding: 0;
  margin: 0 20px 0 0;
}
.rating .list:hover .star {
  color: #ffe100;
}
.rating .list .star {
  display: inline-block;
  font-size: 42px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}
.rating .list .star:hover ~ .star:not(.active) {
  color: inherit;
}
.rating .list .star:first-child {
  margin-left: 0;
}
.rating .list .star.active {
  color: #ffe100;
}
.rating .info {
  margin-top: 15px;
  font-size: 40px;
  text-align: center;
  display: table;
}
.rating .info .divider {
  margin: 0 5px;
  font-size: 30px;
}
.rating .info .score-max {
  font-size: 30px;
  vertical-align: sub;
}
</style>
