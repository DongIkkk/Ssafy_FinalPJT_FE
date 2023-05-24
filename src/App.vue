<template>
  <v-app>
    <v-app-bar
      app
      color=""
      height="110"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down ml-2"
          contain
          min-width="200"
          src="./assets/blacklogo.gif"
          width="200"
          @click="navigateToMainPage"
          style="cursor: pointer"
        />
      </div>

      <v-spacer></v-spacer>

      <span class="mr-2" style="font-size: 30px;">{{user.userName}}님 환영합니다.</span>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-avatar v-on="on" size="40" :class="{ 'profile-glow': isHover }"
            @mouseenter="isHover = true"
            @mouseleave="isHover = false" >
            <template v-if="user.profileImgName">
              <img :src="getProfileImagePath(user.profileImgName)" alt="" style="cursor: pointer">
            </template>
          </v-avatar>
        </template>
        <v-list>
          <v-list-item
            v-for="item in userMenuItems"
            :key="item.title"
            link
            @click="navigateTo(item.route)"
          >
            <v-list-item-title class="text-lg">{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  name: 'App',

  data() {
    return {
      user:{
        userName:'손',
        profileImgName: 'profile_default_test.png',
      },
      userMenuItems: [
        { title: '회원가입', route: '/sign-up' },
        { title: '로그인', route: '/sign-in' },
        { title: '로그아웃', route: '/logout' },
      ],
      isHover: false,
    };
  },
  methods: {
    navigateToMainPage() {
      this.$router.replace('/'); // 메인 페이지의 경로로 수정해주세요
    },
    getProfileImagePath(fileName) {
      return require(`./assets/profile_img/${fileName}`);
    },
    navigateTo(route) {
      if (route === '/logout') {
        localStorage.removeItem('access-token');
        this.user.userName = '손';
        this.$router.push('sign-in');
      } else {
        this.$router.push(route);
      }
    },
  },
  created(){  
    let mytoken = localStorage.getItem("access-token")

    axios({
      headers: {"access-token":mytoken},
      method:'get',
      url:`http://localhost:9999/api-user/user`,
      responseType:'json'
    }).then((response) => {
        console.log(response.data);
        this.user = response.data;
      })
  },
};
</script>

<style scoped>
.profile-glow {
  box-shadow: 0 0 10px yellow;
  transition: box-shadow 0.3s ease;
  
}
</style>
