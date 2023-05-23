<template>
  <div>
    <h3>검색 컴포넌트</h3>
    <input type="text" v-model="keyword" class="search-input"/>
    <button @click="search">검색</button>
    
<v-container>
    <v-row class="flex">
      <v-col cols="12" class="mt-2">
        <h3>오늘의 루틴 영상</h3>
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
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'YoutubeComponent',
  computed: {
    ...mapState(['videos', 'selectedVideo']),
    videoURL() {
      const videoId = this.selectedVideo.id.videoId;
      return `https://www.youtube.com/embed/${videoId}`;
    },
  },
  data() {
    return {
      keyword: '',
    };
  },
  methods: {
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
  .search-input {
    color: white;
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
