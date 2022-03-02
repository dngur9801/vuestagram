<template>
  <div class="section-view">
    <div class="post-wrap">
      <div class="post" v-for="(item, idx) in instaData" :key="item">
        <div class="post-header">
          <div
            class="profile"
            :style="{ backgroundImage: `url(${item.userImage})` }"
          ></div>
          <span class="profile-name">{{ item.name }}</span>
        </div>
        <div
          :class="`${item.filter} post-body`"
          :style="{ backgroundImage: `url(${item.postImage})` }"
          @click="likeAdd(idx)"
        ></div>
        <div class="post-content">
          <p>
            <i
              class="fa-solid fa-heart"
              @click="likeAdd(idx)"
              :style="{ color: instaData[idx].liked ? 'red' : '#eee' }"
            ></i
            >{{ instaData[idx].likes }} Likes
          </p>
          <p>
            <strong>{{ item.name }}</strong> {{ item.content }}
          </p>
          <p class="date">{{ item.date }}</p>
        </div>
        <div
          class="delete-btn"
          @click="deletePost(item.id)"
          v-if="item.name == myName"
        >
          삭제
        </div>
      </div>
      <button @click="getData()" class="more-btn" v-if="moreCount < 2">
        더보기 {{ moreCount }}/2 ▾
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
export default {
  name: 'PostView',
  props: {
    instaData: Array,
    step: Number,
  },

  methods: {
    ...mapActions(['getData']),
    ...mapMutations(['likeAdd', 'deleteMyPost']),
    deletePost(id) {
      if (confirm('해당 게시물을 삭제하시겠습니까?')) {
        this.deleteMyPost(id);
      }
    },
  },
  computed: {
    ...mapState(['instaData', 'moreCount', 'myName']),
  },
};
</script>

<style scoped>
.section-view {
  width: 975px;
  margin: 0 auto;
  position: relative;
}
.post-wrap {
  width: 614px;
}
.post {
  width: 100%;
  background-color: #fff;
  padding: 10px 0;
  border: 1px solid #ccc;
  position: relative;
}
.post:not(:first-child) {
  margin-top: 30px;
}

.profile {
  width: 30px;
  height: 30px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 50%;
  float: left;
}
.profile-name {
  display: block;
  float: left;
  padding-left: 10px;
  padding-top: 7px;
  font-size: 14px;
}
.post-header {
  height: 30px;
  padding: 10px;
}
.post-body {
  height: 450px;
  background-position: center;
  background-size: cover;
}
.post-content {
  padding-left: 15px;
  padding-right: 15px;
  font-size: 14px;
}
.date {
  font-size: 11px;
  color: grey;
  margin-top: -8px;
}
.delete-btn {
  width: 50px;
  height: 20px;
  color: white;
  border-radius: 5px;
  text-align: center;
  line-height: 20px;
  background-color: skyblue;
  font-size: 0.8rem;
  position: absolute;
  top: 23px;
  right: 14px;
  cursor: pointer;
}
.more-btn {
  display: block;
  margin: 0 auto;
  margin-top: 30px;
  width: 300px;
  height: 40px;
  border: 0;
  cursor: pointer;
}
.fa-heart {
  color: #eee;
  padding-right: 5px;
  font-size: 1.2rem;
  cursor: pointer;
}
</style>
