<template>
  <div class="header">
    <div class="header-middle">
      <img
        src="./assets/insta_logo.png"
        class="header-button-left"
        @click="$router.push('/')"
      />
      <img src="./assets/logo.png" class="logo" />
      <ul class="header-button-right">
        <li>Next</li>
        <li>발행</li>
      </ul>
    </div>
  </div>
  <!-- <ContainerView
    :instaData="instaData"
    :step="step"
    :url="url"
    @writeText="write = $event"
    @writeName="writeName = $event"
    :filter="filter"
  /> -->
  <router-view
    :filter="filter"
    :url="url"
    :instaData="instaData"
    @writeText="write = $event"
    @writeName="writeName = $event"
    @publish="publish()"
  ></router-view>
  <div class="footer">
    <div class="footer-button-plus">
      <input type="file" id="file" class="inputfile" @change="upload" />
      <label for="file" class="input-plus">+</label>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapMutations, mapState } from 'vuex';
import ContainerView from './components/ContainerView.vue';

export default {
  name: 'App',
  data() {
    return {
      url: '',
      write: '',
      filter: '',
      writeName: '',
    };
  },
  methods: {
    ...mapMutations(['dataPush']),
    upload(e) {
      let file = e.target.files;
      const imageCheck = file[0].type.split('/')[0];
      if (imageCheck != 'image') {
        alert('이미지파일을 선택해주세요');
        return;
      }
      let url = URL.createObjectURL(file[0]);
      this.url = url;
      this.$router.push('/filter');
    },
    publish() {
      let myBorad = {
        name: this.writeName,
        userImage: 'https://placeimg.com/100/100/arch',
        postImage: this.url,
        likes: 0,
        date: 'May 15',
        liked: false,
        content: this.write,
        filter: this.filter,
      };
      if (this.write == '') {
        alert('내용을 입력하세요');
      } else if (this.writeName == '') {
        alert('이름을 입력하세요');
      } else {
        this.dataPush(myBorad);
        this.$router.push('/');
      }
    },
  },
  computed: {
    ...mapState(['instaData']),
  },

  mounted() {
    this.emitter.on('filter', data => {
      this.filter = data;
    });
  },
  components: {
    ContainerView,
  },
};
</script>

<style>
body {
  margin: 0;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.logo {
  width: 22px;
  object-fit: contain;
}
.header {
  width: 100%;
  background-color: white;
  border: 1px solid #aaa;
}
.header-middle {
  width: 935px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}
.header-button-left {
  cursor: pointer;
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
