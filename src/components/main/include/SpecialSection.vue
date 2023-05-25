<template>
  <div class="special-component">
    <div v-if="loggedIn" class="title">로그인O:누구누구님 오늘도 힘찬 하루 되세요 페이드인이 아래에서 위로 천천히</div>
    <div v-else class="title">로그인X:Let's Start from here</div>
    <div v-if="loggedIn" class="subtitle">로그인O:오늘의 루틴은 --- 입니다</div>
    <div v-else class="subtitle">로그인X:로그인 후 사용해보세요!</div>
    <div v-if="loggedIn" class="text">로그인O:다른 내용입니다!</div>
    <div v-else class="text">로그인X:나만의 운동 루틴을 만들고 매일 인증해보세요!!</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'SpecialComponent',
   computed: {
    ...mapState(['loggedIn']),
  },
  // data() {
  //   return {
  //     isLoggedIn: false, // 로그인 상태에 따라 변경될 데이터
  //   };
  // },
};
</script>

<style scoped>
.special-component {
  border-radius: 10px;
  border: 2px solid #B2E1C5;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 20px;
}

.title {
  margin-top: 30px;
  color: white;
  font-size: 60px !important; /* 폰트 크기에 !important 추가 */
  font-weight: bold;
  user-select: text;
}

.subtitle {
  color: #B2B2B2;
  font-size: 80px !important; /* 폰트 크기에 !important 추가 */
  margin-top: 30px;
  user-select: text;
}

.text {
  color: #8C8C8C;
  margin-top: 450px;
  font-size: 18px;
  user-select: text;
}
</style>
