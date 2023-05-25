<template>
  <div class="profile-page">
      <div class="profile-section">
      <my-profile />
    </div>
    <div class="content-section">
      <div class="grass-section">
        <h2>운동완료 조상님 묘 잔디깎기</h2>
        <grass-field />
      </div>
      <div class="article-section">
        <div class="article">
          <h2>나의 게시글</h2>
          <my-articles />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyProfile from '../components/profile/myProfile.vue'
import GrassField from '../components/profile/grassField.vue'
import MyArticles from '../components/profile/myArticles.vue'

export default {
    name: 'Profile',

    components: {
      MyProfile,
      GrassField,
      MyArticles,
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
  width: 50%;
  flex-direction: column;
}

.grass-section {
  flex: 1;
  margin-bottom: 100px;
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

</style>