<template>
  <div class="article-list">
    <div v-for="article in articles" :key="article.id" class="article-card">
      <div class="article-info">
        <div class="article-time">{{ formatDate(article.created_at) }}</div>
      </div>
      <br/>

      <div class="article-user">
        <img :src="getUserProfileImage(article.userNo)" alt="User Profile" class="user-profile-img" />
        <div class="user-info">
          <div class="user-name">{{ getUserInfo(article.userNo, 'userName') }}&nbsp;</div>
        </div> 
        <div class="user-info">
          <div class="user-id">{{ getUserInfo(article.userNo, 'userId') }}</div>
        </div>
      </div>
      <div class="article-photo-container" @click="goToArticleDetail(article.articleNo)">
        <img :src="getImagePath(article.imgName)" alt="Article Photo" class="article-photo" />
      </div>
      <div class="article-content-container">
        <div class="article-content">{{ article.content }}</div>
      </div>
        <div class="article-views">
        <span class="view-icon"></span>
          조회수 : {{ article.viewCnt }}
      </div>
    </div>
    
  </div>
</template>



<script>
import axios from "axios";

export default {
  name: "ArticleList",
  data() {
    return {
      articles: [],
      users: [],
      liketable: [],
    };
  },
  created() {
    let mytoken = localStorage.getItem("access-token");

    axios({
      headers: { "access-token": mytoken },
      method: "get",
      url: `http://localhost:9999/api-article/articles`,
      responseType: "json",
    })
      .then((response) => {
        console.log(response.data);
        this.articles = response.data;
      })
      .catch((error) => {
        console.error(error);
      });

    axios({
      headers: { "access-token": mytoken },
      method: "get",
      url: `http://localhost:9999/api-user/users`,
      responseType: "json",
    })
      .then((response) => {
        console.log(response.data);
        this.users = response.data;
      })
      .catch((error) => {
        console.error(error);
      });

    axios({
      headers: { "access-token": mytoken },
      method: "get",
      url: `http://localhost:9999/api-article/like/articles`,
      responseType: "json",
    })
      .then((response) => {
        console.log(response.data);
        this.liketable = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    getImagePath(fileName) {
      return require(`@/assets/${fileName}`);
    },
    getUserProfileImage(userNo) {
      const user = this.users.find((user) => user.userNo === userNo);
      return require(`@/assets/profile_img/${user.profileImgName}`);
    },
    getUserInfo(userNo, field) {
      const user = this.users.find((user) => user.userNo === userNo);
      return user ? user[field] : "";
    },
    goToArticleDetail(articleNo) {
      this.$router.push({ path: `/article/${articleNo}` });
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleString();
    },
  },
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
  /* align-items: center; */
  text-align: center;
  cursor: pointer;
}

.article-photo-container {
  width: 100%;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
}

.article-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin-left: auto;
  margin-right: auto;
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

.article-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: -10px;
  margin-left: auto;
  margin-right: auto;
}

.article-views{
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  color: #777777;
}
.article-time {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #777777;
}

.view-icon {
  width: 16px;
  height: 16px;
  /* 아이콘 스타일링 */
}

.article-user {
  display: flex;
  align-items: center;
  font-size: 14px;
  justify-content: flex-start;
  margin-bottom: 5px;
  margin-top:-10px;
}

.user-profile-img {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 8px;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start !important;
}

.user-name {
  font-weight: bold;
}

.user-id {
  color: #777777;
}
.article-bottom{
display: flex;
align-items: center;

}
</style>
