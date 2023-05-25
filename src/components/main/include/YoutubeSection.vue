<template>
  <div class="content-container">
    
    
<v-container>
    <v-row class="flex">
      <v-col cols="12" class="mt-2">
        <h1>오늘의 루틴 영상 "{{ todayroutine }}"</h1>
      </v-col>

      <div class="youtube-list">
        <v-row class="justify-center">
          <v-col v-for="video in videos" :key="video.id.videoId" cols="6" md="3">
            <div @click="clickVideo(video)" class="video-item">
              <img :src="getThumbnailUrl(video)" class="video-image" />
              <br/>
              {{ video.snippet.title }}
            </div>
          </v-col>
        </v-row>
      </div>
    </v-row>
  </v-container>


    <div v-if="selectedVideo">
      <h2>영상 보기!</h2>
      <iframe
        width="560"
        height="315"
        :src="videoURL"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </div>
    <div class="search-container">
      <h3>원하는 운동 영상이 아닌가요?</h3>
      <input type="text" v-model="keyword" class="search-input" />
      <button @click="search">검색</button>
    </div>
  </div>

  
</template>

<script>
import { mapState } from 'vuex';
import axios from "axios";
export default {
  name: 'YoutubeComponent',
  computed: {
    ...mapState(['videos', 'selectedVideo', 'loggedIn']),
    videoURL() {
      const videoId = this.selectedVideo.id.videoId;
      return `https://www.youtube.com/embed/${videoId}`;
    },
  },
  data() {
    return {
      keyword: '오늘의 운동',
      todayroutine: '',
    };
  },
  created(){
    if (this.loggedIn) {
      this.getTodayRoutine();
  } else {
    this.search();
  }
  },
  methods: {
    getTodayRoutine(){
      let mytoken = localStorage.getItem("access-token");

      axios({
          headers: {"access-token":mytoken},
          method:'get',
          url:`http://localhost:9999/api-routine/today-routine`,
          responseType:'json'
        }).then((response) => {
            console.log(response.data);
            this.todayroutine = response.data;
            this.keyword = response.data + " 운동";
            this.search();
        });
      },
    search() {
      this.$store.dispatch('searchYoutube', this.keyword);
      console.log("SERACH !! ")
    },
    // clickVideo(video) {
    //   this.$store.dispatch('clickVideo', video);
    // },
    getThumbnailUrl(video) {   /// 유튜브 고화질 체크 메서드
      // Check if 'maxres' thumbnail is available
      if (video.snippet.thumbnails.maxres) {
        return video.snippet.thumbnails.maxres.url;
      }

      // Fallback to 'standard' thumbnail if 'maxres' is not available
      if (video.snippet.thumbnails.standard) {
        return video.snippet.thumbnails.standard.url;
      }

      // Fallback to default 'medium' thumbnail if neither 'maxres' nor 'standard' is available
      return video.snippet.thumbnails.medium.url;
    },
    clickVideo(video) {
      const videoId = video.id.videoId;
      const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
      window.location.href = youtubeUrl;
    }
  },
};
</script>

<style scoped>
.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px;
  border: 2px solid #73BC6F;
  border-radius: 5px;
  background-color: transparent;
}

.search-container h3 {
  margin-right: 10px;
}

.search-input {
  color: white;
  padding: 5px;
  border: 1px solid #3b3a3a;
  background-color: transparent;
}

.search-button {
  color: white;
  padding: 5px 10px;
  background-color: transparent;
  border: 2px solid #73BC6F;
  border-radius: 5px;
  cursor: pointer;
}
.youtube-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; 
  margin: 0-10px;
}

.video-item {
  text-align: center;
  width: 100%; /* 원하는 그룹 수에 따라 조정 (예: 33.33% -> 3개 그룹, 25% -> 4개 그룹) */
  cursor: pointer;
}

.video-image {
  width: 100%;
  height: auto;
}
</style>
