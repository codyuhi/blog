<template>
  <div id="article" class="column center">
    <div v-if="isLoading" class="loading-container column center">
      <img src="/loading.gif" alt="Loading animation" />
      <h2>Loading...</h2>
    </div>
    <div v-else>
      <div class="row start">
        <div class="buttons-container" v-if="isAdmin">
          <button @click="toggleEdit" v-if="!editing">
            <i class="fa fa-pencil-square-o"></i> Edit Article
          </button>
          <button @click="editArticle" v-else>
            <i class="fa fa-paper-plane"></i> Submit Changes
          </button>
          <button @click="deleteArticle" class="delete-button">
            <i class="fa fa-trash-o"></i> Delete Article
          </button>
        </div>
      </div>
      <div id="header-container" class="row center">
        <div id="title-container" class="column center">
          <h1>{{ article.title }}</h1>
          <p>{{ formatDate(article.created) }}</p>
          <p>{{ article.description }}</p>
        </div>
        <div id="title-img-container" class="column center">
          <img
            :src="article.headerImgUrl"
            alt="Title image"
            class="title-img"
          />
        </div>
      </div>
      <div
        v-if="article.paragraphs.length === 0"
        class="no-content-container column center"
      >
        <h2>No Written Content</h2>
        <p>This Blog Article has no written content</p>
      </div>
      <div v-if="!editing" class="paragraph-container column center">
        <div
          v-for="paragraph in article.paragraphs"
          :key="paragraph._id"
          class="column center paragraph"
        >
          <p>{{ paragraph.content }}</p>
        </div>
      </div>
      <div v-else class="paragraph-container column center">
        <div
          v-for="paragraph in article.paragraphs"
          :key="paragraph._id"
          class="column center paragraph"
        >
          <textarea
            v-model="paragraph.content"
            placeholder="Enter Paragraph"
          ></textarea>
        </div>
        <button @click="editArticle" v-if="isAdmin">
          <i class="fa fa-paper-plane"></i> Submit Changes
        </button>
        <button @click="cancelEdit" v-if="isAdmin">Cancel</button>
      </div>
      <div
        v-if="article.images && article.images.length > 0"
        class="image-container row center"
      >
        <img
          v-for="image in article.images"
          :key="image._id"
          :src="image.url"
          class="images"
        />
      </div>
      <div v-else class="no-image-container column center">
        <h2>No Images Uploaded for this Blog Article</h2>
        <p v-if="isAdmin">
          Click the Upload button below to add an Image to this Blog Article
        </p>
      </div>
      <div class="upload-button-container" v-if="isAdmin">
        <label for="title-upload" class="upload-button"
          ><i class="fa fa-picture-o"></i> Add Image</label
        >
      </div>
      <input
        id="title-upload"
        type="file"
        name="photo"
        @change="upload"
        v-if="isAdmin"
      />
      <div class="comment-container column center">
        <h2>Comments:</h2>
        <div
          v-for="comment in article.comments"
          :key="comment._id"
          class="comments column center"
        >
          <div to="/" class="row end clickable-x-container">
            <p
              @click="deleteComment(comment._id)"
              class="clickable-x"
              v-if="isCommenter(comment.user)"
            >
              X
            </p>
          </div>
          <p>{{ comment.name }}</p>
          <p>
            <em>"{{ comment.content }}"</em>
          </p>
          <p>{{ formatDate(comment.created) }}</p>
        </div>
        <div v-if="article.comments.length === 0" class="no-comments">
          <h2>There are no Comments on this Blog Article</h2>
          <p v-if="isLoggedIn">Please leave a Comment below</p>
        </div>
        <div class="new-comment column center" v-if="isLoggedIn">
          <p>Leave a comment as {{ user.firstName }} {{ user.lastName }}</p>
          <textarea v-model="newComment" placeholder="Enter Comment"></textarea>
          <button @click="createComment">
            <i class="fa fa-comment"></i> Comment
          </button>
        </div>
        <p v-else>
          Please <router-link to="/login">log in</router-link> to leave a
          comment
        </p>
      </div>
    </div>
    <div v-if="error" class="error-text-container column center">
      <p class="error-text">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  data() {
    return {
      article: undefined,
      error: null,
      isLoading: false,
      editing: false,
      newImage: undefined,
      newComment: undefined,
    };
  },
  methods: {
    async getArticle() {
      try {
        this.isLoading = true;
        this.error = null;
        const response = await axios.get(
          "/api/articles/" + this.$route.params.id
        );
        if (!response.data.success) {
          this.error = "Error: " + response.data.data.message;
        } else {
          this.article = response.data.data.article;
        }
      } catch (err) {
        console.error(err);
        this.error = err.response.data.data.message;
      } finally {
        this.isLoading = false;
      }
    },
    formatDate(date) {
      if (moment(date).diff(Date.now(), "days") < 15) {
        return moment(date).fromNow();
      } else {
        return moment(date).format("d MMMM YYYY");
      }
    },
    toggleEdit() {
      this.editing = !this.editing;
    },
    async deleteArticle() {
      try {
        this.isLoading = true;
        this.error = null;
        const response = await axios.delete(
          "/api/articles/" + this.$route.params.id
        );
        if (response.status !== 204) {
          this.error = response.data.data.message;
        } else {
          this.$router.push("/");
        }
      } catch (err) {
        console.error(err);
        this.error = err.response.data.data.message;
      } finally {
        this.isLoading = false;
      }
    },
    async upload(event) {
      try {
        this.isLoading = true;
        this.error = null;
        this.newImage = event.target.files[0];
        const formData = new FormData();
        formData.append("photo", this.newImage, this.newImage.name);
        formData.append("title", this.article.title);
        formData.append("description", this.article.description);
        const response = await axios.post(
          "/api/images/" + this.article._id,
          formData
        );
        if (response.status === 413) {
          alert("Image file size too large! Please try a smaller image file.");
          return;
        }
        if (!response.data.success) {
          this.error = "Error: " + response.data.data.message;
        } else {
          this.getArticle();
        }
      } catch (err) {
        console.error(err);
        this.error = err.response.data.data.message;
      } finally {
        this.isLoading = false;
      }
    },
    async createComment() {
      if (!this.newComment) {
        this.error = "Please fill out a comment before submitting";
        return;
      }
      try {
        this.isLoading = true;
        this.error = false;
        const response = await axios.post(
          "/api/comments/" + this.$route.params.id,
          {
            name: `${this.$root.$data.user.firstName} ${this.$root.$data.user.lastName}`,
            email: "guest",
            content: this.newComment,
            articleId: this.$router.id,
          }
        );
        if (!response.data.success) {
          this.error = response.data.data.message;
        } else {
          this.newComment = null;
          this.getArticle();
        }
      } catch (err) {
        console.error(err);
        this.error = err.response.data.data.message;
      } finally {
        this.isLoading = false;
      }
    },
    async deleteComment(commentId) {
      try {
        this.isLoading = true;
        this.error = null;
        const response = await axios.delete("/api/comments/" + commentId);
        if (response.status !== 204) {
          this.error = response.data.message;
        } else {
          this.getArticle();
        }
      } catch (err) {
        console.error(err);
        this.error = err.response.data.data.message;
      } finally {
        this.isLoading = false;
      }
    },
    async editArticle() {
      try {
        this.isLoading = true;
        this.error = null;
        const response = await axios.put(
          "/api/articles/" + this.$route.params.id,
          this.article
        );
        if (!response.data.success) {
          this.error = response.data.data.message;
        } else {
          this.getArticle();
          this.editing = false;
        }
      } catch (err) {
        console.error(err);
        this.error = err.response.data.data.message;
      } finally {
        this.isLoading = false;
      }
    },
    cancelEdit() {
      this.editing = false;
      this.getArticle();
    },
    isCommenter(commentOwnerId) {
      if (!this.$root.$data.user) {
        return false;
      }
      if (
        this.$root.$data.user._id === commentOwnerId ||
        this.$root.$data.user.role === "admin"
      ) {
        return true;
      }
      return false;
    },
  },
  computed: {
    isAdmin() {
      if (this.$root.$data.user && this.$root.$data.user.role === "admin") {
        return true;
      }
      return false;
    },
    isLoggedIn() {
      if (this.$root.$data.user) {
        return true;
      }
      return false;
    },
    user() {
      return this.$root.$data.user;
    },
  },
  created() {
    this.getArticle();
  },
};
</script>

<style scoped>
button,
.upload-button {
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

.upload-button-container {
  margin: 50px;
}

.delete-button {
  border: 1px solid tomato;
}

.delete-button:hover {
  background-color: lightsalmon;
}

button:hover,
.upload-button:hover {
  background-color: var(--beaublue);
  cursor: pointer;
}

.buttons-container {
  flex-wrap: wrap;
}

input[type="file"] {
  display: none;
}

.paragraph > textarea {
  margin: 30px;
}

.error-text {
  color: tomato;
  text-align: center;
  width: 90vw;
  max-width: 500px;
}

#header-container {
  flex-wrap: wrap;
  border-bottom: 1px solid var(--viridian);
}

#title-container,
#title-img-container {
  flex: 1;
  padding: 25px;
}

.title-img {
  width: 500px;
  max-width: 80vw;
  height: auto;
}

.no-content-container,
.no-image-container {
  margin: 50px;
  text-align: center;
}

.paragraph-container {
  margin: 50px;
}

.paragraph {
  width: 800px;
  max-width: 90vw;
}

.image-container {
  flex-wrap: wrap;
}

.images {
  width: 150px;
  height: auto;
  margin: 15px;
}

.no-comments {
  margin: 35px;
}

.new-comment,
.comments {
  align-items: flex-start;
  text-align: left;
}

.comments {
  border-top: 1px solid var(--viridian);
  border-bottom: 1px solid var(--viridian);
}

.comments > p {
  width: 500px;
  max-width: 90vw;
}

textarea {
  border: 1px solid var(--richblack);
  width: 500px;
  max-width: 90vw;
  height: 90px;
  outline: none;
  resize: none;
}

.comments > p,
.new-comment > p,
.new-comment > textarea,
.new-comment > button {
  margin-left: 50px;
}

textarea:focus {
  border: 1px solid var(--bluebell);
}

.clickable-x-container {
  width: 500px;
  max-width: 90vw;
}

.clickable-x {
  color: var(--richblack);
  margin-bottom: 0;
}

.clickable-x:hover {
  color: var(--bluebell);
  cursor: pointer;
}
</style>