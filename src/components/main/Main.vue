<template>
  <v-card>
    <v-container class="main" ref="mainPage" fluid>
      <v-row>
        <v-col>
          <v-main style="min-height: 700px; color:white;">
            <special-component />
          </v-main>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-main style="min-height: 700px; color:white;">
            <youtube-component/>
          </v-main>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-main style="min-height: 700px; color:white;">
            <h1>오늘의 운동 인증글</h1>
            <article-component/>
          </v-main>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import specialComponent from "./include/SpecialSection.vue";
import YoutubeComponent from './include/YoutubeSection.vue';
import ArticleComponent from './include/ArticleSection.vue';

export default {
  name: "Main",
  components:{
    specialComponent,
    YoutubeComponent,
    ArticleComponent,
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const mainPage = this.$refs.mainPage;
      const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      mainPage.style.backgroundPosition = `${scrollX}px ${scrollY}px`;
    }
  }
};
</script>

<style>
.main{
  background-color: black;
  background-image: url('@/assets/universe.jpg');
  background-size: cover;
  background-position: center;
  transition: background-position 0.3s ease;
}
@media (min-width: 768px) {
  .main {
    background-position: center 30%;
  }
}

@media (min-width: 1024px) {
  .main {
    background-position: center 50%;
  }
}
</style>