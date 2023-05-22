<template>
  <div>
    <users-info />
  </div>
</template>

<script>
import usersInfo from '../components/user/GetMyInfo.vue'

export default {
    name: 'UsersView',

    components: {
      usersInfo,
    },
}
</script>

<style>

</style>