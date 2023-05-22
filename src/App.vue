<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="./assets/bong.gif"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://www.notion.so/0e4d1ce9b4304c07a3a28b55ba13f39f"
        target="_blank"
        text
      >
        <span class="mr-2">노션으로 이동</span>
        <v-icon dark right>mdi-check-circle</v-icon>
      </v-btn>
      <v-btn
        href="https://github.com/DongIkkk/Ssafy_FinalPJT_FE"
        target="_blank"
        text
      >
        <span class="mr-2">깃허브로 이동</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
      <router-link to="/sign-in" >
        <span class="mr-2" style="color:red">로그인</span>
        <v-icon>mdi-open-in-new</v-icon>
      </router-link>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
