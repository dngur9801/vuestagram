<template>
  <div class="login-wrap">
    <h3>프로필 선택</h3>
    <div class="my-profile">
      <div
        class="profile-header"
        :style="{ backgroundImage: `url(${myHeader})` }"
      ></div>
      <input
        type="text"
        class="profile-name"
        placeholder="사용자 이름을 입력해주세요"
        v-model="inputName"
      />
    </div>
    <div class="choice-header">
      <div
        class="headers"
        v-for="item in profileImg"
        :key="item"
        :style="{ backgroundImage: `url(${item})` }"
        @click="myHeaderChange(item)"
      ></div>
    </div>
    <button type="button" class="start-btn" @click="startInsta">
      시작하기
    </button>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
  name: 'LoginView',
  data() {
    return {
      inputName: '',
    };
  },
  methods: {
    ...mapMutations(['myHeaderChange', 'myNameDataChange', 'dataChange']),
    startInsta() {
      if (this.inputName == '') {
        alert('사용자 이름을 입력해주세요');
      } else {
        this.myNameDataChange(this.inputName);
        this.$router.push('/');
      }
    },
  },
  computed: {
    ...mapState(['profileImg', 'myHeader', 'myName']),
  },
};
</script>

<style scoped>
.login-wrap {
  width: 613px;
  margin: 0 auto;
  text-align: center;
  padding: 10px;
  margin-top: 20px;
}
.my-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.profile-header {
  width: 120px;
  height: 120px;
  background-color: skyblue;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.profile-name {
  width: 300px;
  background: transparent;
  border: 0;
  border-bottom: 1px solid #aaa;
  text-align: center;
  outline: none;
}
.choice-header {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 80px;
  padding: 30px;
  margin-bottom: 20px;
}

.headers {
  width: 100px;
  height: 100px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 50%;
  background-color: skyblue;
  cursor: pointer;
}
.start-btn {
  width: 100px;
  height: 30px;
  border: 0;
  background-color: #0095f6;
  color: white;
  cursor: pointer;
}
</style>
