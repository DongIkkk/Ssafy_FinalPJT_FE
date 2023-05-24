import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from "@/router";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    videos: [],
    video: null,

    articles: [],
    article: {},
  },
  getters: {
  },
  mutations: {
    SEARCH_YOUTUBE(state, videos){
      state.videos = videos
    },
    CLICK_VIDEO(state, video){
      state.video = video
    },
    GET_ARTICLES(state, payload) {
      state.articles = payload;
    },
    GET_ARTICLE(state, payload) {
      state.article = payload;
    },
    CREATE_ARTICLE(state, payload) {
      state.articles.push(payload);
    },
    UPDATE_ARTICLE(state, payload) {
      state.article = payload;
    },

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
    },

    //게시글 메서드
    //전체게시글 조회
    getAritlces({ commit }, payload) {
      let params = null;
      if (payload) params = payload;

      const API_URL = `http://localhost:9999/api-article/articles`;
      axios({
        url: API_URL,
        method: "GET",
        params,
      })
        .then((res) => {
          commit("GET_ARTICLES", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAritlce({ commit }, articleNo) {
      const API_URL = `http://localhost:9999/api-article/${articleNo}`;
      axios({
        url: API_URL,
        method: "GET",
      })
        .then((res) => {
          commit("GET_ARTICLE", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createAritlce({ commit }, article) {
      const API_URL = `http://localhost:9999/api-article/article`;
      axios({
        url: API_URL,
        method: "POST",
        params: article,
      })
        .then(() => {
          commit("CREATE_ARTICLE", article);
          router.push("/article");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateAritlce({ commit }, articleNo, article) {
      const API_URL = `http://localhost:9999/api-article/${articleNo}`;
      axios({
        url: API_URL,
        method: "PUT",
        params: article,
      }).then(() => {
        commit("UPDATE_ARTICLE", article);
        router.push({ name: "articleDetail", params: { id: article.id } });
      });
    },
    deleteAritlce({ commit }, articleNo) {
      const API_URL = `http://localhost:9999/api-article/${articleNo}`;
      axios({
        url: API_URL,
        method: "DELETE",
      })
        .then(() => {
          commit;
          router.push({ name: "aricleList" });
        })
        .catch((err) => {
          console.log(err);
        });
    },


  },
  modules: {
  }
})
