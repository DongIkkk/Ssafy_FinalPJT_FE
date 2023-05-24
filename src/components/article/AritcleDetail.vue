<template>
  <div>
    <h3>게시글 상세보기</h3>
    <div>{{ article.image }}</div>
    <div>{{ article.content }}</div>

    <button @click="moveUpdate">수정</button>
    <button @click="deleteArticle">삭제</button>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'articleDetail',
  computed: {
    ...mapState(['article']),
  },
  created() {

    const pathName = new URL(document.location).pathname.split('/');
    console.log(pathName);
    const articleNo = pathName[pathName.length - 1];
    this.$store.dispatch('getArticle', articleNo);
  },
  methods: {
    moveUpdate() {
      this.$router.push({ name: 'articleUpdate' });
    },
    deleteBoard() {
      this.$store.dispatch('deleteArticle', this.article.articleNo);
    },
  },
};
</script>

<style></style>
