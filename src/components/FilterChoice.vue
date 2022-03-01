<template>
  <div class="filter-wrap">
    <div
      :class="`${filter} upload-image`"
      :style="{ background: `url(${url}) no-repeat center/cover` }"
    ></div>
    <FilterBox :url="url" :filters="filters" :filter="filter" />

    <div class="footer-next">
      <span class="next-btn" @click="$router.push('/upload')">Next</span>
      <!-- <span class="next-btn" @click="publish">발행</span> -->
    </div>
  </div>
</template>

<script>
import filters from '../assets/filters.js';
import FilterBox from './FilterBox.vue';
export default {
  name: 'FilterChoice',
  props: {
    filter: String,
    url: String,
  },
  data() {
    return {
      filters: filters,
    };
  },
  components: {
    FilterBox,
  },
};
</script>

<style>
.filter-wrap {
  width: 935px;
  margin: 0 auto;
}
.upload-image {
  width: 100%;
  height: 450px;
  background: cornflowerblue;
  background-size: cover;
}
.footer-next {
  width: 935px;
  margin: 0 auto;
  text-align: right;
}
.next-btn {
  display: inline-block;
  padding: 20px;
  color: skyblue;
  cursor: pointer;
}
</style>
