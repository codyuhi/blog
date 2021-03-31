<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div class="form">
      <input v-model="title" placeholder="Title" /><br />
      <textarea v-model="description" placeholder="Description" /><br />
      <input type="file" name="photo" @change="fileChanged" />
      <button @click="upload">Upload</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  data() {
    return {
      title: "",
      description: "",
    };
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0];
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append("photo", this.file, this.file.name);
        formData.append("title", this.title);
        formData.append("description", this.description);
        await axios.post(
          "/api/images/605e97bcf0e53a07f424fbbc",
          formData
        );
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>
