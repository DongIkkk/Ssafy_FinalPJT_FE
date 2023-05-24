<template>
  <div>
    <h2>팔로우뷰</h2>
    <following-page />
  </div>
</template>

<script>
import FollowingPage from '../components/profile/followerFollowing.vue'
export default {
    name: 'FollowView',
    components: {
      FollowingPage,
    },
}
</script>

<style>

</style>