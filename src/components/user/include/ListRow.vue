<template>
  <tr>
    <td>{{userNo}}</td>
    <td>{{userId}}</td>
    <td>{{ userName }}</td>
    <td>{{ gender }}</td>
    <td>
      <img :src="getProfileImagePath(profileImgName)" alt="프로필 이미지">
    </td>
  </tr>
</template>

<script>
export default {
  name: "ListRow",
  props: {
    // 상위 component로 부터 넘어온 자동차정보
    userNo: String,
    userId: String,
    userName: String,
    gender: String,
    age: Number,
    profileImgName:String,
  },
  methods: {
    getProfileImagePath(fileName) {
      return require(`@/assets/profile_img/${fileName}`);
    },
  },
};
</script>
<style scope>
td {
  text-align: center;
  border-bottom: 1px solid #ddd;
  height: 50px;
}
</style>
