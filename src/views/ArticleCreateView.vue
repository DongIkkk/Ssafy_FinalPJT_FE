<template>
  <div>
    <article-create-page/>
  </div>
</template>

<script>
  import ArticleCreatePage from '../components/article/ArticleCreate.vue';

  export default {
    name: 'ArticleCreateView',

    components: {
      ArticleCreatePage,
    },
  }
</script>
