<template>
  <div class="profile-page">
      <div class="profile-section">
      <my-profile />
    </div>
    <div class="content-section">
      <div class="grass-section">
          <img src="../assets/yourggggparents.png" alt="묘" class="grass-image" />
        <grass-field />
      </div>
      <div class="article-section">
        <div class="article">
          여기는 게시글 목록입니다.
        </div>
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

.content-section {
  display: flex;
  width: 60%;
  flex-direction: column;
}

.grass-section {
  flex: 1;
  margin-bottom: 200px;
  margin-left: 10%;
  margin-top: 5%;
}

.article-section {
  flex: 1;
  margin-right: 10px;
}

.profile-section {
  width: 40%;
}

.article {
  background-color: #EDEDED;
  height: 100%;
  padding: 10px;
}
.grass-image {
  width: 80%;
  height: auto;
}
</style>