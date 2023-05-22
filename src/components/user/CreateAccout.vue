<template>
    <div>
        <div>여기는 회원가입이에영</div>

        <div>
            <label for="userId">아이디:</label>
            <input type="text" id="userId" name="userId" v-model="userId" ref="vin" />
            <label for="password">비밀번호:</label>
            <input type="text" id="password" name="password" v-model="password" ref="password" /><br />
            <label for="userName">유저네임:</label>
            <input type="text" id="userName" name="userName" v-model="userName" ref="userName" /><br />
            <label for="email">이메일:</label>
            <input type="text" id="email" name="email" v-model="email" ref="email" /><br />
            <label for="gender">성별:M or W</label>
            <input type="text" id="gender" name="gender" v-model="gender" ref="gender" /><br />
            <label for="age">나이:</label>
            <input type="text" id="age" name="age" v-model="age" ref="age" /><br />
            
            <button @click="signup">회원가입 </button>
        </div>


    </div>
  
</template>

<script>
import axios from "axios";

export default {
    name: "signup",
    data() {
    return {
      userId: "",
      password: "",
      userName: "",
      email: "",
      gender: "",
      age: "",
    };
  },
  methods: {
    signup() {
        axios.post("http://localhost:9999/api-user/signup", {
          userId: this.userId,
          password: this.password,
          userName: this.userName,
          email: this.email,
          gender: this.gender,
          age: this.age,
        })
        .then(({ data }) => {
          console.log(data)
          
        });
    },
  }
}
</script>

<style>

</style>