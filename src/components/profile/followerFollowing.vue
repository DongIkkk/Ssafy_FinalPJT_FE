<template>
  <div class ="list-box">
    <div class="user-list">
      <v-card v-for="user in filteredUsers" :key="user.id" class="user-card">
        <div class="user-info">
          <v-img class="profile-image" :src="getProfileImagePath(user.profileImgName)" alt="Profile Image"></v-img>
          <div class="user-details">
            <div class="user-header">
              <span class="username">{{ user.userName }}</span>
            </div>
            <span class="follow-status" v-if="isFollower(user.userNo) && !isFollowing(user.userNo)">팔로워</span>
            <span class="follow-status follow-back" v-if="isFollowing(user.userNo) && isFollower(user.userNo)">맞팔</span>
            <div class="follow-button-container">
              <v-btn v-if="isFollowing(user.userNo)" class="unfollow-button" color="grey" dark @click="unfollowUser(user.userNo)">언팔로우</v-btn>
              <v-btn v-else class="follow-button" color="primary" dark @click="followUser(user.userNo)">팔로우</v-btn>
            </div>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex';

export default {
  name: 'Following',
  computed: {
    ...mapState(['users', 'follower', 'following', 'loginUser']),
    filteredUsers() {
    const currentUserNo = this.loginUser.userNo; // 현재 사용자의 userNo를 얻는 방법에 따라 구현해야 합니다.
    return this.users.filter(user => user.userNo !== currentUserNo);
  },
  },
  created() {
    this.fetchUsers();

    this.fetchFollowInfo();
  },
  methods: {
    ...mapActions(['fetchUsers', 'fetchFollowInfo', 'followUser', 'unfollowUser']),
    getProfileImagePath(fileName) {
      return require(`@/assets/profile_img/${fileName}`);
    },
    isFollower(userNo) {
      return this.follower.includes(userNo);
    },
    isFollowing(userNo) {
      return this.following.includes(userNo);
    },
  },
};
</script>

<style>
.list-box{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.user-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width:700px;
}

.user-card {
  width: 200px;
  border-radius: 5px;
  margin: 10px;
  padding: 10px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  flex: 0 0 calc(33.33% - 20px); /* 33.33% 너비 (세 개의 카드를 한 줄에 나타내기 위해) */
}
.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.profile-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.user-details {
  text-align: center;
}

.user-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
}

.username {
  font-weight: bold;
  margin-right: 5px;
}

.follow-status {
  position: absolute;
  top: 0;
  right: 0;
  color: #888888;
  font-size: 12px;
  padding: 3px 6px;
  border: 1px solid #888888;
  border-radius: 5px;
}

.follow-back {
  background-color: gold;
  color: #ffffff;
  border-color: gold;
  color: black;
}

.age {
  margin-bottom: 5px;
}

.follow-button-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.follow-button,
.unfollow-button {
  width: 100px;
}
</style>
