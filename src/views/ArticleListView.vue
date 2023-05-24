<template>
  <div>
    <article-list-page/>
  </div>
</template>

<script>
  import ArticleListPage from '../components/article/ArticleList.vue';

  export default {
    name: 'ArticleListView',

    components: {
      ArticleListPage,
    },
  }
</script>
