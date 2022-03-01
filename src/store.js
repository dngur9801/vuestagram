import axios from 'axios';
import { createStore } from 'vuex';
import instaData from './assets/instadata.js';

const store = createStore({
  state() {
    return {
      instaData: instaData,
      more: {},
      moreCount: 0,
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
});

export default store;
