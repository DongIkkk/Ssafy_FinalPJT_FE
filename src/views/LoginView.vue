<template>
  <div>
    <login-page/>
  </div>
</template>

<script>
  import LoginPage from '../components/user/Login.vue'

  export default {
    name: 'LoginView',

    components: {
      LoginPage,
    },
  }
</script>
