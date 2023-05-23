<template>
  <div class="special-component">
    <div class="border"></div>
    <div class="content">
      <div class="title">제목입니다!@!@!</div>
      <div class="subtitle">로그인 후 사용해보세요!</div>
      <div class="text">나만의 운동 루틴을 만들고 매일 인증해보세요!!</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpecialComponent',
  props: {
    title: String,
    subtitle: String,
    content: String,
  },
};
</script>

<style scoped>
.special-component {
  position: relative;
}
.border {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 10px;
  border: 2px solid #B2E1C5;
  background-color: transparent;
}

.content {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 20px;
}
.title {
  color: white;
  font-size: 50px;
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
