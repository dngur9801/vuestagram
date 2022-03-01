<template>
  <div class="search-info" :style="{ left: infoLeft }">
    <div class="mypage-wrap">
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
      console.log('press');
      const searchTxt = e.target.value;
      this.follower = this.followerCopy.filter(item => {
        return item.name.indexOf(searchTxt) != -1;
      });
    },
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
      console.log(a);
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
.search {
  margin-bottom: 10px;
  width: 200px;
  text-indent: 10px;
  height: 30px;
  border: 0;
  border-radius: 10px;
  background-color: #eee;
}
.post-header {
  display: flex;
  height: 30px;
  padding: 10px;
  justify-content: flex-start;
  align-items: center;
}
.profile {
  width: 30px;
  height: 30px;
  background-size: 100%;
  border-radius: 50%;
  flex: 1;
}
.profile-name {
  display: block;
  padding-left: 10px;
  padding-top: 7px;
  font-size: 14px;
  flex: 7;
}
.profile-follower-btn {
  flex: 2;
  font-size: 0.8rem;
  color: #0095f6;
  cursor: pointer;
}
</style>
