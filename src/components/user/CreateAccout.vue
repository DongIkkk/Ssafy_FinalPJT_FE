<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title>회원가입</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="signup">
              <v-text-field v-model="userId" label="아이디" ref="userId"></v-text-field>
              <v-btn color="primary" @click="checkDuplicate">중복 확인</v-btn>
              <v-text-field v-model="password" label="비밀번호" type="password"></v-text-field>
              <v-text-field v-model="userName" label="유저네임"></v-text-field>
              <v-text-field v-model="email" label="이메일"></v-text-field>
              <v-text-field v-model="gender" label="성별"></v-text-field>
              <v-text-field v-model="age" label="나이"></v-text-field>
              <v-file-input label="프로필 사진" v-model="profileImage" optional></v-file-input>
              <v-btn color="primary" :disabled="!isAvailable" type="submit">회원가입</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Signup",
  data() {
    return {
      userId: "",
      password: "",
      userName: "",
      email: "",
      gender: "",
      age: "",
      profileImage: null,
      isAvailable: false,
    };
  },
  methods: {
    checkDuplicate() {
      const formData = new FormData();  
      formData.append('tryId', this.userId);

      axios
        .post("http://localhost:9999/api-user/id-duplicate",formData)
        .then((response) => {
          if (response.status === 200) {
            if (response.data === "You Can Make It") {
              alert("사용 가능한 아이디입니다.");
              this.isAvailable = true;
            } else {
              alert("이미 사용 중인 아이디입니다. 다른 아이디를 입력해주세요.");
              this.isAvailable = false;
            }
          } else {
            alert("중복 확인 요청에 실패하였습니다. 다시 시도해주세요.");
            this.isAvailable = false;
          }
        })
        .catch((error) => {
          console.error(error);
          alert("중복 확인 요청에 실패하였습니다. 다시 시도해주세요.");
          this.isAvailable = false;
        });
    },

    signup() {
      const formData = new FormData();
      formData.append('userId', this.userId);
      formData.append('password', this.password);
      formData.append('userName', this.userName);
      formData.append('email', this.email);
      formData.append('gender', this.gender);
      formData.append('age', this.age);

      if (this.profileImage !== null) {
        formData.append("profileImg", this.profileImage);
      }
      

      axios
        .post("http://localhost:9999/api-user/signup", formData, 
          { headers: {
            "Content-Type": "multipart/form-data",
          },
          }).then((response) => {
          if (response.data === 1) {
            this.moveList();
          } else {
            alert(response.data);
          }
        });
    },
    moveList() {
      this.$router.push("/sign-in");
    },
  },
};
</script>

<style scoped>
.v-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
