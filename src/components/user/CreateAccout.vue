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
              <v-text-field v-model="password" label="비밀번호" type="password" @input="checkPasswordMatch"></v-text-field>
              <v-text-field v-model="confirmPassword" label="비밀번호 확인" type="password" @input="checkPasswordMatch"></v-text-field>
              <v-card-actions>
                <span v-if="password !== '' && confirmPassword !== '' && password !== confirmPassword" class="error-text">비밀번호가 일치하지 않습니다.</span>
                <span v-else-if="password !== '' && confirmPassword !== '' && password === confirmPassword" class="success-text">비밀번호가 일치합니다.</span>
              </v-card-actions>
              <v-text-field v-model="userName" label="유저네임"></v-text-field>
              <v-text-field
                v-model="email"
                label="이메일"
                :rules="[emailValidationRule]"
                :error-messages="getEmailErrors"
              ></v-text-field>
              <v-select v-model="gender" :items="['M', 'W']" label="성별"></v-select>
              <v-text-field v-model.number="age" label="나이" type="number"></v-text-field>
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
  computed: {
    getEmailErrors() {
        if (this.email && !/.+@.+\..+/.test(this.email)) {
        return ['올바른 이메일 형식이 아닙니다.'];
      }
      return [];
    },
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
      if (this.password !== this.confirmPassword) {
        // 비밀번호가 일치하지 않으면 처리 로직 추가
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }
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
            alert("나의 루틴 등록을 진행해주세요")
            localStorage.setItem("myId", this.userId);
            this.moveList();
          } else {
            alert(response.data);
          }
        });
    },
    moveList() {
      this.$router.push("/sign-up/routine");
    },
    checkPasswordMatch() {
      if (this.password !== '' && this.confirmPassword !== '' && this.password !== this.confirmPassword) {
        this.isAvailable = false;
      } else {
        this.isAvailable = true;
      }
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
.password-match-text {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.error-text {
  color: red;
}

.success-text {
  color: green;
}
</style>
