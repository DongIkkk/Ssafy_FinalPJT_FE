<template>
  <v-card class="special-component">
    <v-card-text>
      <div class="title">제목입니다!@!@!</div>
      <div class="subtitle">로그인 후 사용해보세요!</div>
      <div class="text">나만의 운동 루틴을 만들고 매일 인증해보세요!!</div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'SpecialComponent',
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
  color: white;
  font-size: 20px;
  font-weight: bold;
  user-select: text;
}

.subtitle {
  color: #B2B2B2;
  font-size: 20px;
  margin-top: 10px;
  user-select: text;
}

.text {
  color: #8C8C8C;
  margin-top: 10px;
  font-size: 18px;
  user-select: text;
}
</style>
