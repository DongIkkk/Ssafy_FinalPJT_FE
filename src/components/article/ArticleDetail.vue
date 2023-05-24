<template>
  <div>
    여기는 게시글 상세 띄워주는 곳입니다!
    <h3>게시글 상세보기</h3>
     <img :src="getProfileImagePath(article.imgName)" alt="Article Photo" class="article-photo" />
    <div>{{ article.content }}</div>

    <button @click="moveUpdate">수정</button>
    <button @click="deleteArticle">삭제</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'articleDetail',
  data() {
    return {
      article: {},
    };
  },
  created() {
    const articleNo = this.$route.params.articleNo;
    let mytoken = localStorage.getItem("access-token");

    axios({
      headers: {"access-token": mytoken},
      method: 'get',
      url: `http://localhost:9999/api-article/article/${articleNo}`,
      responseType: 'json'
    }).then((response) => {
      console.log(response.data);
      this.article = response.data;
    });
  },
  methods: {
    moveUpdate() {
      this.$router.push({ name: 'articleUpdate', params: { articleNo: this.article.articleNo } });
    },
    getProfileImagePath(fileName) {
      return require(`@/assets/${fileName}`);
    },
    deleteArticle() {
      let mytoken = localStorage.getItem("access-token");

      axios({
        headers: {"access-token": mytoken},
        method: 'delete',
        url: `http://localhost:9999/api-article/article/${this.article.articleNo}`,
        responseType: 'json'
      }).then((response) => {
        console.log(response.data);
        // 삭제 후 필요한 동작 수행
      });
    },
  },
};
</script>

<style></style>
