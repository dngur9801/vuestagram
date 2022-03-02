<template>
  <div class="modal-background" @click="abc">
    <transition name="modalAni">
      <div class="modal" v-if="clickableModal == true">
        <div class="modal-title">계정 전환</div>
        <div class="profile-wrap">
          <div class="post-header my-header">
            <div
              class="my-profile"
              :style="{ backgroundImage: `url(${myHeader})` }"
            ></div>
            <span class="profile-name my-name">{{ myName }}</span>
            <div class="profile-follower-btn">
              <span class="checked"><i class="fa-solid fa-check"></i></span>
            </div>
          </div>
        </div>
        <div class="login-btn">기존계정으로 로그인</div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'ChangeModal',
  props: {
    clickableModal: Boolean,
  },
  methods: {
    abc(e) {
      if (e.target.className == 'modal-background') {
        this.$emit('closeModal');
      }
    },
  },
  computed: {
    ...mapState(['myHeader', 'myName']),
  },
};
</script>

<style scoped>
.modalAni-enter-from {
  transform: scale(1.2);
}
.modalAni-enter-active {
  transition: all 0.1s;
}
.modalAni-enter-to {
  transform: scale(1);
}
.modal-background {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
}

.modal {
  width: 400px;
  height: 232px;
  background-color: white;
  border-radius: 20px;
  position: fixed;
  z-index: 1000;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.modal-title {
  text-align: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
.profile-wrap {
  height: 152px;
}
.post-header {
  display: flex;
  padding: 15px !important;
  align-items: center;
}

.my-profile {
  width: 60px !important;
  height: 60px !important;
  background-color: red;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
}
.my-name {
  font-size: 1rem !important;
}
.profile-name {
  align-self: center;
  display: block;
  padding-left: 10px;
  padding-top: 7px;
  font-size: 14px;
  flex: 7;
  color: rgb(80, 80, 80);
}
.profile-follower-btn {
  display: flex;
  justify-content: flex-end;
  align-self: center;
  flex: 2;
  font-size: 0.8rem;
  color: #0095f6;
  cursor: pointer;
  text-align: center;
}
.checked {
  display: table-cell;
  width: 25px;
  height: 25px;
  background-color: #0095f6;
  border-radius: 50%;
  vertical-align: middle;
}
.fa-check {
  color: white;
  font-size: 1rem;
  line-height: 25px;
}
.login-btn {
  text-align: center;
  border-top: 1px solid #ccc;
  color: #0095f6;
  cursor: pointer;
  padding-top: 12px;
}
</style>
