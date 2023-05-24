<template>
  <v-app>
    <v-app-bar app color="" height="115" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Name" class="shrink mt-1 hidden-sm-and-down ml-2" contain min-width="200"
          src="./assets/blacklogo.gif" width="200" style="cursor: pointer"
          @click="navigateToMainPage"          
        />
      </div>

      <v-spacer></v-spacer>

      <span class="mr-2" style="font-size: 30px;">{{ loggedInUser.userName }}님 환영합니다.</span>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-avatar v-on="on" size="40" :class="{ 'profile-glow': isHover }"
            @mouseenter="isHover = true"
            @mouseleave="isHover = false" >
            <template v-if="loggedInUser.profileImgName">
              <img :src="getProfileImagePath(loggedInUser.profileImgName)" alt="" style="cursor: pointer">
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

import { mapState, mapActions } from 'vuex';

export default {
  name: 'App',

  data() {
    return {
      // 메뉴 드롭다운을 위한 라우트값과 아이템
      userMenuItems: [
        { title: '회원가입', route: '/sign-up' },
        { title: '로그인', route: '/sign-in' },
        { title: '로그아웃', route: '/logout' },
      ],
      isHover: false,
    };
  },
  computed: {
      ...mapState({
      loggedInUser: state => state.loginUser,
    }),
  },
  methods: {
    ...mapActions(['logout']),
    navigateToMainPage() {
      this.$router.push('/'); // 메인 페이지의 경로로 수정해주세요
    },
    getProfileImagePath(fileName) {
      return require(`./assets/profile_img/${fileName}`);
    },
    navigateTo(route) {
      if (route === '/logout') {
        localStorage.removeItem('access-token');
        let logoutdefault={
            userName:'손',
            profileImgName: 'profile_default_test.png',
          };
        this.logout(logoutdefault);
        this.$router.push('/sign-in');
      } else {
        this.$router.push(route);
      }
    },
  },
  
};
</script>

<style scoped>
.profile-glow {
  box-shadow: 0 0 10px yellow;
  transition: box-shadow 0.3s ease;
  
}
</style>
