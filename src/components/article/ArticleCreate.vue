
<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title>게시글 등록</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="createArticle">
              <div class="content-container">
                <label for="content" class="content-label">내용</label>
                <textarea id="content" v-model="content" class="content-input"></textarea>
              </div>
              <v-file-input label="사진" v-model="image" optional placeholder="사진은 필수 입력값 입니다."></v-file-input>
              <v-btn color="primary" :disabled="!isAvailable" type="submit">게시글 등록</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>



<script>
import axios from "axios";

export default {
  name: 'ArticleCreate',
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
    createArticle() {
      const formData = new FormData();
      let mytoken = localStorage.getItem("access-token")

      formData.append('content', this.content);
      formData.append("file", this.image);

      axios
        .post("http://localhost:9999/api-article/article", formData, 
          { headers: {
            "Content-Type": "multipart/form-data",
            "access-token":mytoken,
          },
          }).then((response) => {
            console.log(response);
            console.log(response.data);
          if (response.data === "Insert Complete!") {
            this.moveList();
            alert('게시글 등록이 완료되었습니다!');
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

<style scoped>
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
