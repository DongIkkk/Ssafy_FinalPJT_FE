import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    videos: [],
    video: null
  },
  getters: {
  },
  mutations: {
    SEARCH_YOUTUBE(state, videos){
      state.videos = videos
    },
    CLICK_VIDEO(state, video){
      state.video = video
    }
  },
  actions: {
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
    }


  },
  modules: {
  }
})
