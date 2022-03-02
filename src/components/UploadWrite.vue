<template>
  <div class="write-page">
    <div
      :class="`${filter} upload-image`"
      :style="{ background: `url(${url}) no-repeat center/cover` }"
    ></div>
    <div class="write">
      <textarea
        @input="$emit('writeText', $event.target.value)"
        class="write-box-text"
        placeholder="내용을 입력하세요"
      ></textarea>
    </div>
    <div class="footer-next">
      <span class="next-btn" @click="$emit('publish')">발행</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UploadWrite',
  props: {
    filter: String,
    url: String,
  },
};
</script>

<style>
.write-page {
  width: 975px;
  margin: 0 auto;
}

.write-box-text {
  border: none;
  width: 100%;
  height: 100px;
  padding: 15px;
  box-sizing: border-box;
  margin: auto;
  display: block;
  outline: none;
  resize: none;
  background-color: #fafafa;
}
.write-box-name {
  height: 30px;
  border: 1px solid #aaa;
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
