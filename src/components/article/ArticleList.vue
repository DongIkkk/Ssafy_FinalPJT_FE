<template>
  <div class="article-list">
    <div v-for="article in articles" :key="article.id" class="article-card" @click="goToArticleDetail(article.articleNo)">
      <div class="article-photo-container">
        <img :src="getImagePath(article.imgName)" alt="Article Photo" class="article-photo" />
      </div>
      <div class="article-content-container">
        <div class="article-content">{{ article.content }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'ArticleList',
  data() {
    return {
      articles: [],
    };
  },
  created() {
    let mytoken = localStorage.getItem("access-token");

    axios({
      headers: {"access-token": mytoken},
      method: 'get',
      url: `http://localhost:9999/api-article/articles`,
      responseType: 'json'
    }).then((response) => {
      console.log(response.data);
      this.articles = response.data;
    });
  },
  methods:{
    getImagePath(fileName) {
      return require(`@/assets/${fileName}`);
    },
    goToArticleDetail(articleNo) {
      this.$router.push({ path: `/article/${articleNo}` });
    },
  }
};
</script>

<style scoped>
.article-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.article-card {
  width: calc(25% - 20px);
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
}

.article-photo-container {
  width: 100%;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
}

.article-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-content-container {
  flex: 1;
  display: flex;
  align-items: center;
}

.article-content {
  font-size: 16px;
  line-height: 1.5;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
