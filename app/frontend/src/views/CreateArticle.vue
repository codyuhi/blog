<template>
  <div id="create-article">
    <div id="create-form-container">
      <div class="form-title">
        <h2>Create Blog Article</h2>
        <p>Fill out the information below to create a new Blog Article</p>
      </div>
      <div class="form-inputs">
        <p>Article Title:</p>
        <input
          v-model="articleTitle"
          placeholder="Enter Title"
          type="text"
          class="form-text"
        />
        <br />
        <p>Article Description:</p>
        <textarea
          v-model="articleDescription"
          placeholder="Enter Description"
          type="text"
        ></textarea>
        <br />
        <p>Title Image:</p>
        <div v-if="titleImage">
          <div class="row end clickable-x-container">
            <p @click="removeTitleImage" class="clickable-x">X</p>
          </div>
          <img :src="titleImageUrl" class="title-image" />
          <p>Image Name:</p>
          <input
            v-model="titleImageName"
            placeholder="Enter Image Name"
            class="form-text"
            type="text"
          />
          <p>Image Description:</p>
          <textarea
            v-model="titleImageDescription"
            placeholder="Enter Image Description"
          ></textarea>
        </div>
        <div class="upload-button-container">
          <label for="title-upload" class="upload-button">
            {{ titleImage ? "Change File" : "Choose File" }}
          </label>
        </div>
        <input
          id="title-upload"
          type="file"
          name="photo"
          @change="titleImageChanged"
        />
        <p class="small-text">
          You can upload additional pictures after you have published this Blog
          Article
        </p>
        <p>Content:</p>
        <div v-for="(paragraph, index) in paragraphs" :key="index">
          <div class="row end clickable-x-container">
            <p @click="removeParagraph(index)" class="clickable-x">X</p>
          </div>
          <textarea
            v-model="paragraphs[index]"
            class="paragraph-textarea"
            placeholder="Enter paragraph content here"
          ></textarea>
        </div>
        <div v-if="paragraphs.length === 0">
          <h2>No Content Added Yet</h2>
          <p>Click "New Paragraph" below to add content to this article</p>
        </div>
        <div id="create-buttons">
          <button id="new-paragraph-button" @click="addParagraph">
            <i class="fa fa-pencil-square-o"></i> New Paragraph
          </button>
          <button @click="createArticle">
            <i class="fa fa-cloud-upload"></i> Save Article
          </button>
        </div>
        <div v-if="error" class="error-text-container row center">
          <p class="error-text">{{ error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      error: undefined,
      articleTitle: undefined,
      titleImage: undefined,
      titleImageUrl: undefined,
      titleImageName: undefined,
      titleImageDescription: undefined,
      titleImageError: undefined,
      articleDescription: undefined,
      paragraphs: [],
    };
  },
  methods: {
    async createArticle() {
      if (
        !this.articleTitle ||
        !this.articleDescription ||
        !this.titleImage ||
        !this.titleImageName ||
        !this.titleImageDescription
      ) {
        this.error =
          "Please fill out information for all fields before submitting";
        return;
      }
      try {
        this.error = null;
        const formData = new FormData();
        formData.append("photo", this.titleImage, this.titleImage.name);
        formData.append("title", this.titleImageName);
        formData.append("description", this.titleImageDescription);
        formData.append(
          "paragraphs",
          this.paragraphs ? JSON.stringify(this.paragraphs) : null
        );
        formData.append("images", []);
        formData.append("comments", []);
        const response = await axios.post("/api/articles", formData);
        if (response.status === 413) {
          alert("Image file size too large! Please try a smaller image file.");
          return;
        }
        if (!response.data.success) {
          this.error = "Error: " + response.data.data.message;
        } else {
          this.$router.push("/");
        }
      } catch (err) {
        console.error(err);
        this.error = err.response.data.message;
      } finally {
        this.isLoading = false;
      }
    },
    titleImageChanged(event) {
      this.titleImage = event.target.files[0];
      this.titleImageUrl = URL.createObjectURL(this.titleImage);
    },
    removeTitleImage() {
      this.titleImageUrl = null;
      this.titleImage = null;
      this.titleImageDescription = null;
    },
    addParagraph() {
      this.paragraphs.push("");
    },
    removeParagraph(index) {
      this.paragraphs.slice(index, 1);
    },
  },
};
</script>
<style scoped>
.form-text {
  border: none;
  border-bottom: 1px solid var(--richblack);
  outline: none;
  width: 300px;
  max-width: 90vw;
}

input[type="text"]:focus {
  border-bottom: 1px solid var(--bluebell);
}

input[type="file"] {
  display: none;
}

textarea {
  border: 1px solid var(--richblack);
  width: 500px;
  max-width: 90vw;
  height: 90px;
  outline: none;
  resize: none;
}

textarea:focus {
  border: 1px solid var(--bluebell);
}

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
  margin: 25px;
}

button:hover,
.upload-button:hover {
  background-color: var(--beaublue);
  cursor: pointer;
}

.title-image {
  width: 50vw;
  height: auto;
  max-width: 800px;
}

.clickable-x-container {
  width: 80vw;
}

.clickable-x {
  color: var(--richblack);
}

.clickable-x:hover {
  color: var(--bluebell);
  cursor: pointer;
}

.small-text {
  font-size: 7px;
  text-align: center;
}

.error-text {
  color: tomato;
  text-align: center;
  width: 90vw;
  max-width: 500px;
}
</style>