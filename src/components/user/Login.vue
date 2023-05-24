<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <div class="login-container">
          <h2 class="login-header">로그인</h2>

          <v-form class="login-form mt-4">
            <v-text-field v-model="userId" label="아이디" outlined dense></v-text-field>
            <v-text-field v-model="password" label="비밀번호" outlined dense type="password"></v-text-field>

            <v-row justify="center">
              <v-btn class="login-button mr-2" color="primary" @click="signin">로그인</v-btn>
              <v-btn class="signup-button" color="primary" text @click="moveSignup">회원가입</v-btn>
            </v-row>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapActions } from 'vuex';

export default {
  name: "Login",
  data() {
    return {
      userId: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(['login']),
    signin() {
      axios
        .post("http://localhost:9999/api-user/tokenLogin", {
          userId: this.userId,
          password: this.password,
        })
        .then(({ data }) => {
          let restoken = data["access-token"];
          localStorage.setItem("access-token", restoken);

          // 토큰을 받은 후 유저 정보 요청
          this.fetchUserInfo(restoken);
        })
        .catch((error) => {
          console.error(error);
          alert("로그인에 실패하였습니다. 아이디와 비밀번호를 확인해주세요");
        });
    },
    fetchUserInfo(token) {
      axios({
        headers: { 'access-token': token },
        method: 'get',
        url: 'http://localhost:9999/api-user/user',
        responseType: 'json',
      }).then((response) => {
        const user = response.data;
        // Vuex의 login 액션을 호출하여 유저 정보를 저장
        this.login(user);
        // 로그인 후 페이지 이동
        this.moveList();
      }).catch((error) => {
        console.error(error);
        alert("유저 정보를 가져오는데 실패했습니다.");
      });
    },
    moveList() {
      this.$router.push("/");
    },
    moveSignup() {
      this.$router.push("/sign-up");
    },
  },
};
</script>

<style scoped>
.login-container {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 5px;
}

.login-header {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-button {
  margin-right: 10px;
}

.signup-button {
  text-transform: none;
}
</style>
