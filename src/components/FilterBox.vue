<template>
  <div class="filters">
    <div
      :class="item + ' filter-item'"
      :style="{ backgroundImage: `url(${url})` }"
      @click="fire(item)"
      v-for="item in filters"
      :key="item"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterBox',
  props: {
    url: String,
    filters: Array,
    filter: String,
  },

  methods: {
    fire(item) {
      this.emitter.emit('filter', item);
    },
  },
};
</script>

<style>
.filters {
  overflow-x: scroll;
  white-space: nowrap;
}
.filter-item {
  width: 100px;
  height: 100px;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
  background-position: center;
  cursor: pointer;
}
.filter-1 {
  width: 100px;
  height: 100px;
  background-color: cornflowerblue;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
}
.filters::-webkit-scrollbar {
  height: 5px;
}
.filters::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.filters::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}
.filters::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
