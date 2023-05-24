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
              <v-btn color="primary" type="submit">게시글 수정</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ArticleUpdate',
  data() {
    return {
      image: null,
      content: '',
    };
  },
  computed: {
    isAvailable() {
    return this.image !== null && this.content.trim() !== '';
    }
  },
  methods: {
    updateArticle() {
      const formData = new FormData();
      const articleNo = this.$route.params.articleNo;
      
      let mytoken = localStorage.getItem("access-token");
     
      formData.append('content', this.content);
      formData.append("file", this.image);

      axios({
        headers: {
            "Content-Type": "multipart/form-data",
            "access-token":mytoken,
          },
          method: 'put',
          url: `http://localhost:9999/api-article/article/${articleNo}`,
          data: formData
      }).then((response) => {
          if (response.data === "Update Complete!") {
            this.moveList();
            alert('게시글 수정이 완료되었습니다!');
          } else {
            alert(response.data);
          }
        });
    },
    moveList() {
      this.$router.push("/article-detail");
    },
  },
};
</script>

<style>
.v-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content-container {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
}

.content-label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.content-input {
  width: 100%;
  height: 200px;
  border: none;
  outline: none;
  resize: none;
  background-color: transparent;
  padding: 8px;
  margin: 0;
  line-height: 1.5;
}
/* .content-field{
  height: 200px;
} */
</style>
