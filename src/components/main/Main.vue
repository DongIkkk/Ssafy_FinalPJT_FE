<template>
  <v-card>
    <v-layout class="mainmain" ref="mainPage">
      <!-- <v-navigation-drawer color="surface">
        <v-list>
          <v-list-item title="Drawer left">이곳은 왼쪽부분</v-list-item>
        </v-list>
      </v-navigation-drawer> -->

      <v-main style="min-height: 1000px; color:white">
        여기가 메인입니다여기가 메인입니다여기가 메인입니다

      </v-main>

      <!-- <v-navigation-drawer color="surface" location="right">
        <v-list>
          <v-list-item title="Drawer right">이곳은 오른쪽 부분</v-list-item>
        </v-list>
      </v-navigation-drawer> -->

    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: "Main",
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const mainPage = this.$refs.mainPage;
      const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      mainPage.style.backgroundPosition = `${scrollX}px ${scrollY}px`;
    }
  }
};
</script>

<style>
.mainmain{
    background-image: url('@/assets/universe.jpg');
  background-size: cover;
  background-position: center;
  transition: background-position 0.3s ease;
}
@media (min-width: 768px) {
  .mainmain {
    background-position: center 30%;
  }
}

@media (min-width: 1024px) {
  .mainmain {
    background-position: center 50%;
  }
}
</style>