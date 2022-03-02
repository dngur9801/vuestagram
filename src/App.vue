<template>
  <div class="header-wrap">
    <div class="header">
      <div class="header-middle">
        <img
          src="./assets/insta_logo.png"
          class="header-button-left"
          @click="mainPageMove"
        />
        <img src="./assets/logo.png" class="logo" />
        <ul class="header-button-right" v-if="myName != ''">
          <li>
            <router-link to="/"><i class="fa-solid fa-house"></i></router-link>
          </li>
          <li>
            <label for="file" class="input-plus">
              <input type="file" id="file" class="inputfile" @change="upload" />
              <i class="fa-solid fa-circle-plus"></i>
            </label>
          </li>
          <li
            class="myPage-btn"
            :style="{ backgroundImage: `url(${myHeader})` }"
            @click="$router.push('/mypage')"
          ></li>
        </ul>
      </div>
    </div>
  </div>
  <ChangeModal
    v-show="clickableModal == true"
    @closeModal="clickableModal = false"
    :clickableModal="clickableModal"
  />
  <router-view
    :filter="filter"
    :url="url"
    :instaData="instaData"
    @writeText="write = $event"
    @publish="publish()"
  ></router-view>
  <div class="footer" v-if="myName != ''">
    <div class="footer-button-plus">
      <input type="file" id="file" class="inputfile" @change="upload" />
      <label for="file" class="input-plus">+</label>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapMutations, mapState } from 'vuex';
import ChangeModal from './components/ChangeModal.vue';

let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1;
let yyyy = today.getFullYear();
if (dd < 10) {
  dd = '0' + dd;
}
if (mm < 10) {
  mm = '0' + mm;
}
today = yyyy + '/' + mm + '/' + dd;
export default {
  name: 'App',
  data() {
    return {
      url: '',
      write: '',
      filter: '',
      clickableModal: false,
    };
  },

  methods: {
    ...mapMutations(['dataPush']),
    mainPageMove() {
      if (this.myName == '') {
        alert('프로필을 입력해주세요');
        this.$router.push('/login');
      } else {
        this.$router.push('/');
      }
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
      this.$router.push('/filter');
    },
    publish() {
      let myBorad = {
        name: this.myName,
        userImage: this.myHeader,
        postImage: this.url,
        likes: 0,
        date: today,
        liked: false,
        content: this.write,
        filter: this.filter,
        id: this.postId,
      };
      if (this.write == '') {
        alert('내용을 입력하세요');
      } else {
        this.dataPush(myBorad);
        this.$router.push('/');
      }
    },
  },
  computed: {
    ...mapState(['instaData', 'myName', 'myHeader', 'postId']),
  },
  beforeCreate() {
    if (localStorage.getItem('vuex') == null) {
      this.$router.push('/login');
    }
  },

  mounted() {
    this.emitter.on('filter', data => {
      this.filter = data;
    });
    this.emitter.on('clickModal', () => {
      this.clickableModal = true;
    });
  },

  components: {
    ChangeModal,
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
a {
  color: black;
}
.logo {
  width: 22px;
  object-fit: contain;
}
.header-wrap {
  height: 60px;
}
.header {
  position: fixed;
  width: 100%;
  background-color: white;
  border: 1px solid #aaa;
  z-index: 5;
}
.header-middle {
  width: 935px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
}
.header-button-left {
  cursor: pointer;
}
.header-button-right {
  display: flex;
  gap: 30px;
}
.header-button-right li {
  cursor: pointer;
}
.fa-house {
  font-size: 25px;
}
.fa-circle-plus {
  font-size: 25px;
}
.myPage-btn {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: skyblue;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
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
