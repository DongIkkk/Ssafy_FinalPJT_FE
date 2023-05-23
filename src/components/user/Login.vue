<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <div class="text-center">이곳은 로그인 페이지입니다.</div>

        <v-form class="mt-4">
          <v-text-field v-model="userId" label="아이디" outlined></v-text-field>
          <v-text-field v-model="password" label="비밀번호" outlined type="password"></v-text-field>

          <v-row justify="center">
            <v-btn class="mr-2" color="primary" @click="login">로그인</v-btn>
            <router-link to="/sign-up">
              <span class="mr-2" style="color:red">회원가입</span>
              <v-icon>mdi-open-in-new</v-icon>
            </router-link>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
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
      axios
        .post("http://localhost:9999/api-user/tokenLogin", {
          userId: this.userId,
          password: this.password,
        })
        .then(({ data }) => {
          let restoken = data["access-token"];
          localStorage.setItem("access-token", restoken);
          console.log(data);
          this.moveList();
        })
        .catch((error) => {
          console.error(error);
          alert("로그인에 실패하였습니다. 다시 시도해주세요.");
        });
    },
    moveList() {
      this.$router.push("/user-info");
    },
  },
};
</script>

<style scoped>
.text-center {
  text-align: center;
}

.mt-4 {
  margin-top: 4rem;
}

.mr-2 {
  margin-right: 2rem;
}
</style>
