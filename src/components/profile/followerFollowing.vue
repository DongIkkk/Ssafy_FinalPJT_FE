<template>
  <div>
    <div class="user-list">
      <div v-for="user in users" :key="user.id" class="user-card">
        <div class="user-info">
          <div class="profile-image">
            <img :src="getProfileImagePath(user.profileImgName)" alt="Profile Image">
          </div>
          <div class="user-details">
            <span class="username">{{ user.username }}</span>
            <div class="user-stats">
              <span class="age">Age: {{ user.age }}</span>
              <span class="followers">Followers: {{ user.followers }}</span>
              <span class="following">Following: {{ user.following }}</span>
            </div>
            <div class="follow-button-container">
              <button v-if="isFollowing" class="unfollow-button" @click="unfollowUser">언팔로우</button>
              <button v-else class="follow-button" @click="followUser">팔로우</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Following',
  data() {
    return {
      users: [],
      isFollowing: false, // 팔로우 여부를 저장하는 변수
    };
  },
  created() {
    let mytoken = localStorage.getItem('access-token');

    axios({
      headers: { 'access-token': mytoken },
      method: 'get',
      url: `http://localhost:9999/api-user/users`,
      responseType: 'json',
    }).then((response) => {
      console.log(response.data);
      this.users = response.data;
    });
  },
  methods: {
    getProfileImagePath(fileName) {
      return require(`@/assets/profile_img/${fileName}`);
    },
    followUser() {
      // 팔로우 기능 구현
      // 서버로 팔로우 요청을 보내고, 성공하면 isFollowing 값을 true로 변경
      this.isFollowing = true;
    },
    unfollowUser() {
      // 언팔로우 기능 구현
      // 서버로 언팔로우 요청을 보내고, 성공하면 isFollowing 값을 false로 변경
      this.isFollowing = false;
    },
  },
};
</script>

<style>
.user-list {
  display: flex;
  flex-wrap: wrap;
}

.user-card {
  margin: 10px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 10px;
}

.profile-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-details {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.username {
  font-weight: bold;
  margin-bottom: 5px;
}

.user-stats {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}

.user-stats span {
  margin-bottom: 5px;
}

.follow-button-container {
  display: flex;
  justify-content: center;
}
</style>