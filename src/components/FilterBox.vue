<template>
  <div
    :class="item + ' filter-item'"
    :style="{ backgroundImage: `url(${url})` }"
  >
    <slot></slot>
    <button @click="fire">버튼</button>
  </div>
</template>

<script>
export default {
  name: 'FilterBox',
  props: {
    url: String,
    item: String,
  },
};
</script>

<style>
.filter-item {
  width: 100px;
  height: 100px;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
  background-position: center;
}
</style>
