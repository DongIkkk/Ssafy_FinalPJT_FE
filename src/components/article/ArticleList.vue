<template>
  <div class="container">
    <h3>게시글 목록</h3>
    <hr />
    <div>
      <b-table-simple
        hover
        :items="articles"
      >
      <b-thead class="text-center">
        <b-tr>
          <b-th>번호</b-th>
          <b-th>제목</b-th>
          <b-th>쓰니</b-th>
          <b-th>조회수</b-th>
          <b-th>등록일</b-th>
        </b-tr>
      </b-thead>
      <b-tbody class="text-center">
        <b-tr v-for="article in pageBoardList" :key="article.id">
          <b-td>{{ article.id }}</b-td>
          <b-td>
            <b-link :to="`/article/${article.no}`">{{
              article.title
            }}</b-link>
          </b-td>
          <b-td>{{ article.writer }}</b-td>
          <b-td>{{ article.viewCnt }}</b-td>
          <b-td>{{ article.regDate }}</b-td>
        </b-tr>
      </b-tbody>
      </b-table-simple>
    </div>
    <b-pagination
      v-model="currentPage"
      :total-rows="boardCount"
      :per-page="perPage"
      align="center"
    ></b-pagination>


    <div>
      <b-form inline>
        <b-form-select v-model="mode">
          <b-form-select-option value="1">제목</b-form-select-option>
          <b-form-select-option value="2">내용</b-form-select-option>
          <b-form-select-option value="3">제목+내용</b-form-select-option>
        </b-form-select>
        <b-form-input type="text" v-model="keyword" />
        <b-button variant="danger" @click="search">검색</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ArticleList',
  data() {
    return {
      currentPage:1,
      perPage: 3,
      mode: 1,
      keyword: '',
    };
  },
  computed: {
    ...mapState(['articles']),
    articleCount() {
      return this.articles.length
    },
    pageArticleList(){
      return this.articles.slice(
        (this.currentPage-1) * this.perPage,
        this.currentPage*this.perPage
      )
    }
  },
  created() {
    this.$store.dispatch('getArticles');
  },
  methods: {
    search() {
      const payload = {
        mode: this.mode,
        keyword: this.keyword,
      };
      this.$store.dispatch('getArticles', payload);
    },
  },
};
</script>

<style></style>
