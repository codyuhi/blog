<template>
  <div id="app">
    <div id="nav-container" class="row">
      <div id="branding" class="center">
        <router-link to="/"
          ><i class="fa fa-code-fork"></i><span> UhiCode</span></router-link
        >
      </div>
      <div id="nav" class="center">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <p class="fake-router-link" v-if="user" @click="logout">
          <i class="fa fa-sign-out"></i> Logout
        </p>
        <router-link v-else to="/login"
          ><i class="fa fa-sign-in"></i> Login</router-link
        >
      </div>
      <div id="small-nav" class="center">
        <router-link to="/"><i class="fa fa-home"></i></router-link> |
        <router-link to="/about"><i class="fa fa-user"></i></router-link>
      </div>
    </div>
    <p v-if="error">{{ error }}</p>
    <div v-if="isLoading" class="loading-container column center">
      <img src="/loading.gif" alt="Loading animation" />
      <h2>Loading...</h2>
    </div>
    <router-view v-else />
    <div id="footer" class="center column">
      <p>
        <a href="https://github.com/codyuhi/blog">Click Here</a> to view this
        website's code on GitHub
      </p>
      <icon-list color="bluebell"></icon-list>
      <p>&copy; Cody Uhi 2021</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import IconList from "@/components/IconList.vue";
export default {
  name: "App",
  components: {
    IconList,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  async created() {
    try {
      const response = await axios.get("/api/users");
      this.$root.$data.user = response.data.data.user;
    } catch (err) {
      console.error(err);
      this.$root.$data.user = null;
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
  methods: {
    async logout() {
      try {
        this.isLoading = true;
        this.error = null;
        const response = await axios.delete("/api/users/logout");
        if (response.status !== 204) {
          this.error = "Error: " + response.data.data.message;
        } else {
          this.$root.$data.user = null;
        }
      } catch (err) {
        console.error(err);
        this.error = err.response.data.data.message;
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style>
:root {
  --middlebluegreen: #84dcc6;
  --beaublue: #84dccf;
  --uranianblue: #1c3738;
  --bluebell: #06d6a0;
  --viridian: #478978;
  --richblack: #080708;
}

.bluebell {
  color: var(--bluebell) !important;
}

.middlebluegreen {
  color: var(--middlebluegreen) !important;
}

.viridian {
  color: var(--viridian) !important;
}

body {
  margin: 0;
}

#app,
input {
  font-family: "Quattrocento", serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--richblack);
}

i,
textarea {
  font-family: "Quattrocento", serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav-container {
  justify-content: space-between;
  align-content: center;
  height: 60px;
  width: 100vw;
  font-size: 25px;
}

.row {
  display: flex;
  flex-direction: row;
}

.column {
  display: flex;
  flex-direction: column;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.space-evenly {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.start {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.end {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

#branding,
#nav,
#small-nav {
  padding: 30px;
}

a {
  color: var(--bluebell);
  text-decoration: none;
}

a:hover {
  color: var(--beaublue);
}

#nav,
#small-nav {
  color: var(--middlebluegreen);
}

#nav {
  display: none;
}

#small-nav {
  display: flex;
}

#nav > a {
  padding: 15px;
}

#small-nav > a {
  padding: 15px;
}

#nav a.router-link-exact-active,
#small-nav a.router-link-exact-active {
  color: var(--viridian);
}

#branding a {
  color: var(--viridian);
}

#branding a:hover,
#nav a.router-link-exact-active:hover,
#small-nav a.router-link-exact-active:hover {
  color: var(--beaublue);
  cursor: pointer;
}

#footer {
  padding: 15px 0 15px 0;
  width: 100vw;
  border-top: 1px solid var(--viridian);
  text-align: center;
}

.loading-img {
  width: 250px;
  height: auto;
  margin: 15px;
}

.fake-router-link {
  color: var(--bluebell);
  padding: 15px;
}

.fake-router-link:hover {
  color: var(--beaublue);
  cursor: pointer;
}

@media only screen and (max-width: 344px) {
  #branding > a > span {
    display: none;
  }
}

@media only screen and (min-width: 444px) and (max-width: 1019px) {
  #small-nav {
    display: none;
  }

  #nav {
    display: flex;
  }
}

@media only screen and (min-width: 1020px) {
  #nav-container {
    height: 100px;
  }

  #small-nav {
    display: none;
  }

  #nav {
    display: flex;
  }
}
</style>
