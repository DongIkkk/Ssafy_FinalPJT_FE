<template>
  <div class="profile-container">
    <div class="profile-picture">
      <img :src="getProfileImagePath(user.profileImgName)" alt="Profile Picture" class="profile-image">
    </div>
    <div class="user-info">
      <div class="user-name">{{ user.userName }}</div>
      <div class="follow-info">
        <div class="follow-count" @click="goToFollow()">
          <div class="count">{{ follow[0].length }}</div>
          <div class="label">팔로워</div>
        </div>
        <div class="follow-count" @click="goToFollow()">
          <div class="count">{{ follow[1].length }}</div>
          <div class="label">팔로잉</div>
        </div>
      </div>
      <div class="user-email">{{ user.email }}</div>
      <div class="user-age">{{ user.age }}</div>
      <div class="user-gender">{{ user.gender }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MyProfile',
  data() {
    return {
      user: {},
      follow: [],
    };
  },
  created() {
    let mytoken = localStorage.getItem('access-token');

    axios({
      headers: { 'access-token': mytoken },
      method: 'get',
      url: `http://localhost:9999/api-user/user`,
      responseType: 'json',
    }).then((response) => {
      console.log(response.data);
      this.user = response.data;
    });

    axios({
        headers: { 'access-token': mytoken },
      method: 'get',
      url: `http://localhost:9999/api-user/follow`,
      responseType: 'json',
    }).then((response) => {
      console.log(response.data);
      this.follow = response.data;
    });
  },
  methods: {
    getProfileImagePath(fileName) {
      return require(`@/assets/profile_img/${fileName}`);
    },
    goToFollow() {
      this.$router.push(`/follow`);
    },
  },
};
</script>

<style scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.profile-picture {
  width: 250px;
  height: 250px;
  margin-bottom: 20px;
  border-radius: 50%;
  overflow: hidden;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-info {
  font-size: 18px;
  text-align: center;
}

.user-name {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.user-email {
  font-size: 18px;
  margin-bottom: 10px;
}

.follow-info {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.follow-count {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;
  cursor: pointer;
}

.count {
  font-size: 24px;
  font-weight: bold;
}

.label {
  font-size: 14px;
  color: gray;
}

.user-age,
.user-gender {
  margin-bottom: 5px;
}
</style>
