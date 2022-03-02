<template>
  <div class="section">
    <PostView :instaData="instaData" :step="step" />
    <MyInfo />
  </div>
</template>

<script>
import PostView from './PostView.vue';
import FilterBox from './FilterBox.vue';
import MyInfo from './MyInfo.vue';
export default {
  name: 'ContainerView',
  props: {
    instaData: Array,
    step: Number,
    url: String,
    filter: String,
  },

  components: {
    PostView,
    FilterBox,
    MyInfo,
  },
};
</script>

<style>
.section {
  background-color: #fafafa;
  padding: 50px 0;
}
</style>
