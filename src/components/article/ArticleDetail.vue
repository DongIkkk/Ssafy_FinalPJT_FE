<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title>게시글 상세보기</v-card-title>
          <div class="article-photo-container">
            <v-img :src="getImagePath(article.imgName)" class="article-photo"></v-img>
          </div>
          <v-card-text class="article-content">
            <div class="article-details">
              <div class="article-date">{{ formatDate(article.created_at) }}</div>
              <div class="article-like-views">
                <span class="like-count">좋아요: {{ article.likeCnt }}</span>
                <span class="view-count">조회수: {{ article.viewCnt }}</span>
                <span class="comment-count">댓글수: {{ comments.length }}</span>
              </div>
            </div>
            <div class="article-content-text">{{ article.content }}</div>
          </v-card-text>
          <v-card-actions class="article-actions">
            <v-btn color="primary" @click="moveList">목록으로 돌아가기</v-btn>
            <v-spacer></v-spacer>
            <v-btn v-if="isAuthor" icon color="primary" @click="moveUpdate">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn v-if="isAuthor" icon color="error" @click="deleteArticle">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
        <div class="comments-section">
          <ul class="comments-list">
            <li v-for="comment in comments" :key="comment.commentNo" class="comment-item">
              <div class="comment-content">{{ comment.content }}</div>
              <div class="comment-header">
                <span class="comment-date">{{ formatDate(comment.created_at) }}</span>
                <div class="comment-buttons">
                  <v-btn
                    v-if="comment.userNo === loggedInUser.userNo"
                    icon
                    small
                    color="primary"
                    v-on="on"
                    @click="editComment(comment)"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn
                    v-if="comment.userNo === loggedInUser.userNo"
                    icon
                    small
                    color="error"
                    @click="deleteComment(comment)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </v-col>
    </v-row>
    <v-dialog v-model="editCommentDialog" max-width="500px">
    <template v-slot:activator="{ on }">
      <v-btn
        v-if="editingComment.userNo === loggedInUser.userNo"
        icon
        small
        color="primary"
        v-on="on"
        @click="editComment(editingComment)"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        댓글 수정
        <v-textarea v-model="editedComment"></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="saveEditedComment()">수정</v-btn>
        <v-btn color="error" @click="cancelEdit">취소</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  </v-container>
  
</template>

<script>
import axios from "axios";
import { mapState } from 'vuex';

export default {
  name: 'ArticleDetail',
  data() {
    return {
      article: {},
      comments:[],
      editCommentText: '',
      editCommentDialog: false,
      editedComment: '',
      editingComment: null,
    };
  },
  computed: {
    ...mapState({
      loggedInUser: state => state.loginUser,
    }),
    isAuthor() {
      return this.article.userNo === this.loggedInUser.userNo;
    },
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

    axios({
      headers: {"access-token": mytoken},
      method: 'get',
      url: `http://localhost:9999/api-comment/${articleNo}/comment`,
      responseType: 'json'
    }).then((response) => {
      console.log(response.data);
      this.comments = response.data;
    });
  },
  methods: {
    moveUpdate() {
      this.$router.push({ name: 'articleUpdate', params: { articleNo: this.article.articleNo } });
    },
    getImagePath(fileName) {
      return require(`@/assets/${fileName}`);
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}:${seconds}`;
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
      });
    },
    moveList() {
      this.$router.push("/article");
    },
    editComment(comment) {
      this.editingComment = comment;
      this.editedComment = comment.content;
      this.editCommentDialog = true;
    },
    saveEditedComment() {
      if (this.editingComment) {
        const commentNo = this.editingComment.commentNo;
        const updatedComment = this.editedComment;

        let mytoken = localStorage.getItem("access-token");

        axios({
          headers: { "access-token": mytoken },
          method: "put",
          url: `http://localhost:9999/api-comment/comment/${commentNo}`,
          data : { content : updatedComment},
          responseType: "json",
        })
          .then((response) => {
            console.log(response.data);
            alert("수정완료!")
            this.editedComment = "";
            this.editCommentDialog = false;
            this.$router.push('/article');
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    cancelEdit() {
      // Clear the edited comment and close the dialog
      this.editedComment = '';
      this.editCommentDialog = false;
    },
    deleteComment(comment) {
      const commentNo = comment.commentNo;

      let mytoken = localStorage.getItem("access-token");

      axios({
        headers: {"access-token": mytoken},
        method: 'delete',
        url: `http://localhost:9999/api-comment/comment/${commentNo}`,
        responseType: 'json'
      }).then((response) => {
        console.log(response.data)
        this.$router.push(`/article`);

      });
    },
  },
};
</script>

<style>
.article-photo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.article-photo {
  max-width: 80%;
  max-height: 400px;
  object-fit: contain;
}

.article-content-text {
  font-size: 22px;
}

.article-details {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.article-date {
  font-size: 14px;
  color: #888;
}

.article-like-views {
  display: flex;
}

.like-count {
  margin-right: 10px;
}

.view-count {
  margin-right: 10px;
}
.comment-count {
  margin-right: 10px;
}

.comments-section {
  margin-top: 20px;
}

.comments-list {
  list-style-type: none;
  padding: 0;
}

.comment-item {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.comment-content {
  font-weight: bold;
}

.comment-date {
  color: #888;
  font-size: 12px;
}

.comment-author {
  font-size: 14px;
}
.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.comment-buttons {
  display: flex;
}

.comment-buttons > * {
  margin-left: 5px;
}

</style>