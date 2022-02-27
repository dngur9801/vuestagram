<template>
  <div class="header">
    <ul class="header-button-left">
      <li>Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li @click="step++" v-if="step == 1">Next</li>
      <li @click="publish" v-if="step == 2">발행</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>

  <ContainerView
    :instaData="instaData"
    :step="step"
    :url="url"
    @write="write = $event"
  />
  <button @click="more" v-if="step == 0">더보기</button>

  <div class="footer">
    <ul class="footer-button-plus">
      <input type="file" id="file" class="inputfile" @change="upload" />
      <label for="file" class="input-plus">+</label>
    </ul>
  </div>
</template>

<script>
import instaData from './assets/instadata.js';
import axios from 'axios';
import ContainerView from './components/ContainerView.vue';

export default {
  name: 'App',
  data() {
    return {
      step: 0,
      instaData: instaData,
      moreCount: 0,
      url: '',
      write: '',
    };
  },
  methods: {
    more() {
      axios
        .get(
          'https://codingapple1.github.io/vue/more' + this.moreCount + '.json'
        )
        .then(result => {
          console.log(result.data);
          this.instaData.push(result.data);
          this.moreCount++;
        });
    },
    upload(e) {
      let file = e.target.files;
      const imageCheck = file[0].type.split('/')[0];
      if (imageCheck != 'image') {
        alert('이미지파일을 선택해주세요');
        return;
      }
      let url = URL.createObjectURL(file[0]);
      this.url = url;
      this.step++;
    },
    publish() {
      var myBorad = {
        name: 'Kim Hyun',
        userImage: 'https://placeimg.com/100/100/arch',
        postImage: this.url,
        likes: 36,
        date: 'May 15',
        liked: false,
        content: this.write,
        filter: 'perpetua',
      };
      this.instaData.unshift(myBorad);
      this.step = 0;
    },
  },
  components: {
    ContainerView,
  },
};
</script>

<style>
@import 'style.css';
body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
</style>
