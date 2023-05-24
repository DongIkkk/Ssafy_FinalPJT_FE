<template>
  <div class="profile-page">
    <div class="profile-section">
      <my-profile />
    </div>
    <div class="grass-section">
      <grass-field />
    </div>
    <div class="article-section">
      <div class="article">
        여기는 게시글 목록입니다.
      </div>
    </div>
  </div>
</template>

<script>
import MyProfile from '../components/profile/myProfile.vue'
import GrassField from '../components/profile/grassField.vue'

export default {
    name: 'Profile',

    components: {
      MyProfile,
      GrassField,
    },
}
</script>

<style scoped>
.profile-page {
  display: flex;
  height: 100%;
}

.profile-section {
  flex: 1;
  width: 40%;
}

.grass-section {
  flex: 1;
  width: calc(60% - 600px);
  margin-right: 20px;
}

.article-section {
  flex: 1;
  width: 600px;
}

.article {
  background-color: #EDEDED;
  height: calc(100% - 20px);
  padding: 10px;
}
</style>