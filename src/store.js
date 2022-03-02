import axios from 'axios';
import { createStore } from 'vuex';
import instaData from './assets/instadata.js';
import profileImg from './assets/profileimg.js';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
  state() {
    return {
      instaData: instaData,
      more: {},
      moreCount: 0,
      profileImg: profileImg,
      myHeader: profileImg[0],
      beforeName: '',
      myName: '',
      myPost: 0,
      postId: 0,
    };
  },
  mutations: {
    moreAdd(state) {
      state.moreCount++;
    },
    setMore(state, payload) {
      state.more = payload;
      state.instaData.push(state.more);
    },
    likeAdd(state, payload) {
      if (!state.instaData[payload].liked) {
        state.instaData[payload].likes++;
        state.instaData[payload].liked = true;
      } else {
        state.instaData[payload].liked = false;
        state.instaData[payload].likes--;
      }
    },
    dataPush(state, payload) {
      state.instaData.unshift(payload);
      state.myPost++;
      state.postId++;
    },

    myHeaderChange(state, payload) {
      state.myHeader = payload;
    },
    myNameDataChange(state, payload) {
      state.beforeName = state.myName;
      state.myName = payload;
      state.instaData.forEach(item => {
        if (item.name == state.beforeName) {
          item.name = state.myName;
          item.userImage = state.myHeader;
        }
      });
    },
    deleteMyPost(state, payload) {
      state.instaData.forEach((item, idx) => {
        item.id == payload && state.instaData.splice(idx, 1);
      });
      state.myPost--;
    },

    resetData(state) {
      state.moreCount = 0;
      state.myHeader = state.profileImg[0];
      state.beforeName = 0;
      state.myName = '';
      state.myPost = 0;
      state.instaData = instaData;
    },
  },
  actions: {
    getData(context) {
      axios
        .get('./moredata' + context.state.moreCount + '.json')
        .then(result => {
          context.commit('setMore', result.data);
          context.commit('moreAdd');
        });
    },
  },
  plugins: [
    createPersistedState({
      paths: ['myHeader', 'myName', 'instaData', 'moreCount', 'myPost'],
    }),
  ],
});

export default store;
