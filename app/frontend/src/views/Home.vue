<template>
  <div id="home">
    <div id="intro-container">
      <h1><i class="fa fa-code-fork"></i> UhiCode</h1>
      <p>- A blog for humans -</p>
      <icon-list color="bluebell"></icon-list>
    </div>
    <div v-if="error" class="error column center">
      <h2>Unable to load Blog Articles</h2>
      <p class="error-text">Error: {{ error }}</p>
    </div>
    <div v-else-if="isLoading" class="loading column center">
      <img src="/loading.gif" class="loading-img" alt="Loading animation" />
      <h2>Loading...</h2>
    </div>
    <div v-else id="articles-list-container" class="row center">
      <router-link
        :to="'/article/' + article._id"
        v-for="article in articles"
        :key="article._id"
        class="column center"
      >
        <div class="article">
          <router-link to="/" class="row end clickable-x-container" v-if="isAdmin">
            <p @click="deleteArticle(article._id)" class="clickable-x">X</p>
          </router-link>
          <img
            :src="article.headerImgUrl"
            class="article-header-img"
            :alt="article.title + ' preview image'"
          />
          <h2>{{ article.title }}</h2>
          <p>- {{ formatDate(article.created) }} -</p>
          <p>{{ getShortDescription(article.description) }}</p>
          <p>{{ getTimeEstimate(article) }}</p>
        </div>
      </router-link>
      <div v-if="articles.length === 0" class="column center">
        <div id="no-articles" class="column center">
          <h2>No Blog Articles Available</h2>
          <p v-if="isAdmin">
            Please click the "Create New Article" button below to create an
            article
          </p>
        </div>
      </div>
    </div>
    <div id="create-button-area-container" class="row center" v-if="isAdmin">
      <button id="create-button" @click="createProject">
        <i class="fa fa-pencil-square-o"></i> Create New Article
      </button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";
import IconList from "@/components/IconList.vue";
export default {
  name: "Home",
  components: {
    IconList,
  },
  data() {
    return {
      articles: [],
      error: null,
      isLoading: false,
      showModal: false,
    };
  },
  methods: {
    async getArticles() {
      try {
        this.isLoading = true;
        this.error = null;
        const response = await axios.get("/api/articles");
        if (response.data.success) {
          this.articles = response.data.data.articles;
        } else {
          this.articles = [];
          this.error = response.data.data.message;
        }
      } catch (err) {
        console.error(err);
        this.error = err.response.data.data.message;
      } finally {
        this.isLoading = false;
      }
    },
    async deleteArticle(articleId) {
      try {
        const response = await axios.delete("/api/articles/" + articleId);
        if (response.status !== 204) {
          this.error = response.data.data.message;
        } else {
          this.getArticles();
        }
      } catch (err) {
        console.error(err);
        this.error = err.response.data.data.message;
      }
    },
    getShortDescription(description) {
      if (description.length > 50) {
        return description.slice(0, 49) + "...";
      }
      return description;
    },
    getTimeEstimate(article) {
      return article.paragraphs.length * 2.5 + " minutes to read";
    },
    createProject() {
      this.$router.push("/create");
    },
    formatDate(date) {
      if (moment(date).diff(Date.now(), "days") < 15) {
        return moment(date).fromNow();
      } else {
        return moment(date).format("d MMMM YYYY");
      }
    },
  },
  computed: {
    isAdmin() {
      if (this.$root.$data.user && this.$root.$data.user.role === "admin") {
        return true;
      }
      return false;
    },
  },
  created() {
    this.getArticles();
  },
};
</script>
<style scoped>
a {
  color: var(--richblack);
}

#create-button-area-container {
  width: inherit;
}

#create-button {
  margin: 25px;
  padding: 15px;
  background-color: transparent;
  color: var(--richblack);
  border: 1px solid var(--bluebell);
  font-size: 20px;
  font-family: "Quattrocento", serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#create-button:hover {
  background-color: var(--beaublue);
  cursor: pointer;
}

#no-articles,
.loading {
  text-align: center;
}

#articles-list-container {
  flex-wrap: wrap;
}

.article {
  border: 1px solid var(--richblack);
  padding: 35px;
  margin: 15px;
  text-align: center;
  transition: all 0.1s ease-in-out;
}

.article:hover {
  border: 1px solid var(--bluebell);
  transform: scale(1.025);
  cursor: pointer;
}
a:hover > div > h2 {
  color: var(--bluebell);
}

.article-header-img {
  width: 175px;
  height: auto;
  margin: 15px;
}

.clickable-x-container {
  z-index: 999999;
}

.clickable-x {
  color: var(--richblack);
}

.clickable-x:hover {
  color: var(--bluebell);
  cursor: pointer;
}

.error-text {
  color: lightsalmon;
}
</style>