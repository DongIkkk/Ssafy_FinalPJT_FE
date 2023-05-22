<template>
  <tr>
    <td>{{userNo}}</td>
    <td>{{userId}}</td>
    <td>{{ userName }}</td>
    <td>{{ gender }}</td>
    <td>{{ age }}</td>
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
    age: Number
  },
  methods: {
  }
};
</script>
<style scope>
td {
  text-align: center;
  border-bottom: 1px solid #ddd;
  height: 50px;
}
</style>
