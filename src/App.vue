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
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://www.notion.so/0e4d1ce9b4304c07a3a28b55ba13f39f"
        target="_blank"
        text
      >
        <span class="mr-2" style="font-size: 20px;">노션으로 이동</span>
        <v-icon dark right>mdi-check-circle</v-icon>
      </v-btn>
      <v-btn
        href="https://github.com/DongIkkk/Ssafy_FinalPJT_FE"
        target="_blank"
        text
      >
        <span class="mr-2" style="font-size: 20px;">깃허브로 이동</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            text
          >
            <v-icon class="mr-2" size="40">mdi-account-circle</v-icon>
            <span class="text--primary" style="font-size: 20px;"></span>
          </v-btn>
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

export default {
  name: 'App',

  data() {
    return {
      userMenuItems: [
        { title: '회원가입', route: '/sign-up' },
        { title: '로그인', route: '/sign-in' },
      ],
    };
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
  },
};
</script>
