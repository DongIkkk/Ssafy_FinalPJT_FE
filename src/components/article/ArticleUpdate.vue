<template>

  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title>게시글 수정</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="updateArticle">
              <v-file-input label="사진" v-model="image" optional></v-file-input>
              <v-text-field v-model="content" label="내용"></v-text-field>
              <v-btn color="primary" :disabled="!isAvailable" type="submit">게시글 수정</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- <div>
    <h2>게시글 수정</h2>
    <fieldset>
      <legend>수정</legend>
      <label for="title">제목 : </label>
      <input type="text" id="title" v-model="board.title" /><br />
      <label for="writer">쓴이 : </label>
      <input type="text" id="writer" readonly v-model="board.writer" /><br />
      <label for="content">내용 : </label>
      <textarea
        id="content"
        cols="30"
        rows="10"
        v-model="board.content"
      ></textarea>
      <button @click="updateBoard">수정</button>
    </fieldset>
  </div> -->
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ArticleUpdate',
  computed: {
    ...mapState(['board']),
  },
  methods: {
    updateArticle() {
      let updateArticle = {
        title: this.article.title,
        content: this.article.content,
      };
      this.$store.dispatch('updateArticle', updateArticle);
    },
  },
};
</script>

<style></style>