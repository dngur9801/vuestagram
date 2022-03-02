<template>
  <div class="mypage-wrap">
    <div class="my-header">
      <div
        class="header-view"
        :style="{ backgroundImage: `url(${myHeader})` }"
      ></div>
    </div>
    <div class="my-info">
      <div class="my-profile-wrap">
        <div class="my-name">{{ myName }}</div>
        <div class="profile-edit" @click="$router.push('/login')">
          프로필편집
        </div>
        <div class="profile-logout" @click="logOut">로그아웃</div>
      </div>
      <div class="info-view">
        <span class="post-num">게시물 {{ myPost }}</span>
        <span class="follower">팔로워 0</span>
        <span class="follow">팔로우 0</span>
      </div>
    </div>
  </div>
  <div class="postview-wrap">
    <div class="post-titme-wrap">
      <span class="post-title">내 게시물</span>
    </div>
    <div class="empty" v-if="myPost == 0">비어 있음</div>
    <div class="post-wrap">
      <div class="post" v-for="(item, idx) in myPostData" :key="item">
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
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
  name: 'MyPage',
  data() {
    return {
      myPostData: '',
    };
  },
  methods: {
    ...mapMutations(['resetData', 'deleteMyPost']),
    logOut() {
      if (confirm('로그아웃시 모든데이터를 초기화합니다.')) {
        localStorage.removeItem('vuex');
        this.$router.push('./login');
        this.resetData();
      }
    },
    deletePost(id) {
      if (confirm('해당 게시물을 삭제하시겠습니까?')) {
        this.myPostData.forEach((item, idx) => {
          item.id == id && this.myPostData.splice(idx, 1);
        });
        this.deleteMyPost(id);
      }
    },
  },
  computed: {
    ...mapState(['myHeader', 'myName', 'myPost', 'instaData']),
  },
  mounted() {
    this.myPostData = this.instaData.filter(item => {
      return item.name == this.myName;
    });
  },
};
</script>

<style scoped>
.mypage-wrap {
  display: flex;
  width: 935px;
  margin: auto;
  padding: 30px;
  border-bottom: 1px solid #ccc;
}
.my-header {
  width: 300px;
  height: 150px;
  margin-right: 30px;
}
.header-view {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 0 auto;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.my-info {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.my-profile-wrap {
  display: flex;
  gap: 30px;
  align-items: center;
}
.my-name {
  font-size: 1.6rem;
}
.profile-edit {
  width: 90px;
  height: 30px;
  border: 1px solid #ccc;
  text-align: center;
  line-height: 30px;
  border-radius: 5px;
  cursor: pointer;
}
.profile-logout {
  width: 90px;
  height: 30px;
  border: 1px solid #ccc;
  text-align: center;
  line-height: 30px;
  border-radius: 5px;
  cursor: pointer;
}
.info-view {
  display: flex;
  justify-content: space-between;
}
.post-titme-wrap {
  text-align: center;
}
.post-title {
  display: inline-block;
  padding: 20px;
  margin: 0 auto;
}
.postview-wrap {
  width: 973px;
  margin: 0 auto;
  padding: 20px;
}
.post-wrap {
  width: 614px;
  margin: 0 auto;
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
.empty {
  text-align: center;
  color: #aaa;
}
</style>
