<template>
  <div class="search-info" :style="{ left: infoLeft }">
    <div class="mypage-wrap">
      <div class="post-header my-header">
        <div
          class="my-profile"
          :style="{ backgroundImage: `url(${myHeader})` }"
          @click="$router.push('/mypage')"
        ></div>
        <div class="my-profile-name">
          <span class="user">user</span>
          <span class="user-name" @click="$router.push('/mypage')">{{
            myName
          }}</span>
        </div>
        <span class="profile-follower-btn" @click="emitter.emit('clickModal')"
          >전환</span
        >
      </div>
      <input placeholder="🔍" @input="doThis" class="search" />
      <div class="post-header" v-for="item in follower" :key="item">
        <div
          class="profile"
          :style="{ backgroundImage: `url(${item.image})` }"
        ></div>
        <span class="profile-name">{{ item.name }}</span>
        <span class="profile-follower-btn">팔로우</span>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import { mapState } from 'vuex';
export default {
  name: 'MyInfo',
  data() {
    return {
      infoLeft: '',
      follower: '',
      followerCopy: '',
    };
  },
  methods: {
    doThis(e) {
      const searchTxt = e.target.value;
      this.follower = this.followerCopy.filter(item => {
        return item.name.indexOf(searchTxt) != -1;
      });
    },
  },
  computed: {
    ...mapState(['myName', 'myHeader']),
  },
  created() {
    this.infoLeft = (window.innerWidth - 975) / 2 + 614 + 40 + 'px';
  },
  mounted() {
    axios.get('./follower.json').then(result => {
      this.follower = result.data;
      this.followerCopy = [...result.data];
    });

    window.addEventListener('resize', () => {
      let a = window.innerWidth;
      this.infoLeft = (a - 975) / 2 + 614 + 40 + 'px';
    });
  },
};
</script>

<style scoped>
.mypage-wrap {
  width: 100%;
  margin: 0 auto;
}
.search-info {
  width: 293px;
  position: fixed;
  top: 120px;
}
.post-header {
  display: flex;
  padding: 10px;
  justify-content: flex-start;
  align-items: center;
}

.my-profile {
  width: 70px !important;
  height: 70px !important;
  background-color: red;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  cursor: pointer;
}

.my-profile-name {
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 7;
  padding-left: 10px;
}
.user {
  font-size: 15px;
  color: #aaa;
}
.user-name {
  font-size: 1.1rem !important;
  color: rgb(80, 80, 80);
  cursor: pointer;
}
.user-name:hover {
  text-decoration: underline;
}
.search {
  margin-bottom: 10px;
  width: 200px;
  text-indent: 10px;
  height: 30px;
  border: 0;
  border-radius: 10px;
  background-color: #eee;
}
.profile {
  width: 30px;
  height: 30px;
  background-size: cover;
  border-radius: 50%;
}
.profile-name {
  display: block;
  padding-left: 10px;
  padding-top: 7px;
  font-size: 14px;
  flex: 7;
  color: rgb(80, 80, 80);
}
.profile-follower-btn {
  flex: 2;
  font-size: 0.8rem;
  color: #0095f6;
  cursor: pointer;
}
</style>
