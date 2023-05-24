import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
    loginUser: {
      userName:'손',
      profileImgName: 'profile_default_test.png',
    },
    videos: [],
    video: null,
  },
  getters: {
  },
  mutations: {
    // 로그인 정보 관리
    setLoggedIn(state, value) {
      state.loggedIn = value;
    },
    setLoginUser(state, user) {
      state.loginUser = user;
    },
    // 유튜브 api
    SEARCH_YOUTUBE(state, videos){
      state.videos = videos
    },
    CLICK_VIDEO(state, video){
      state.video = video
    },
    
  },
  actions: {
    login({ commit }, user) {
      // 로그인 액션
      commit('setLoggedIn', true);
      commit('setLoginUser', user);
    },
    logout({ commit }, user) {
      // 로그아웃 액션
      commit('setLoggedIn', false);
      commit('setLoginUser', user);
    },
    //비동기 통신은 요기서 진행시켜~~
    searchYoutube({commit}, payload){
      const URL = "https://www.googleapis.com/youtube/v3/search";
      // const API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY;
      const API_KEY = "AIzaSyDaV9rXVzDSEuT0iaGGzOqnlaDAisg94rg";
      axios({
        url: URL,
        method: "GET",
        params: {
          key: API_KEY,
          part: "snippet",
          q: payload,
          type: "video",
          maxResults: 8,
        },
      })
        .then((res) => {
          commit("SEARCH_YOUTUBE", res.data.items)
        })
        .catch((err) => console.log(err));
    },
    //payload : 비디오 객체가 들어온다.
    clickVideo({commit}, payload){
      commit("CLICK_VIDEO", payload)
    },
  },
  modules: {
  }
})
