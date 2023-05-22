<template>
  <div>
    <div>이곳은 로그인 페이지 입니다.</div>

    <div>
      <label for="userId">아이디:</label>
      <input type="text" id="userId" name="userId" v-model="userId" ref="vin" />
      <label for="password">비밀번호:</label>
      <input type="text" id="password" name="password" v-model="password" ref="password" /><br />
      <button @click="login">로그인</button>
    </div>

    <router-link to="/sign-up" >
        <span class="mr-2" style="color:red">회원가입</span>
        <v-icon>mdi-open-in-new</v-icon>
      </router-link>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      userId: "",
      password: "",
    };
  },
  methods: {
    login() {
        axios.post("http://localhost:9999/api-user/tokenLogin", {
          userId: this.userId,
          password: this.password,
        })
        .then(({ data }) => {
            let restoken = data["access-token"]
          localStorage.setItem("access-token",restoken )
          console.log(data)
          this.moveList();
        });
    },
    moveList() {
      this.$router.push("/user-info");
    }
  }
};
</script>

<style>

</style>