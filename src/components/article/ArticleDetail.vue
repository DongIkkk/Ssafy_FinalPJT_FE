<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title>게시글 상세보기</v-card-title>
          <v-img :src="getImagePath(article.imgName)" class="article-photo"></v-img>
          <v-card-text>{{ article.content }}</v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="moveUpdate">수정</v-btn>
            <v-btn color="error" @click="deleteArticle">삭제</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: 'ArticleDetail',
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
    getImagePath(fileName) {
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
        alert('게시글 삭제가 완료되었습니다!');
        this.moveList();
        
        // 삭제 후 필요한 동작 수행
      });
    },
      moveList() {
      this.$router.push("/article");
    },
  },
};
</script>

<style>
.article-photo {
  width: 100%;
  height: auto;
}</style>
