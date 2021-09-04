<template>
  <div id="login">
    <div v-if="isLoading" class="loading-container column center">
      <img src="/loading.gif" alt="Loading animation" />
      <h2>Loading...</h2>
    </div>
    <div v-else-if="isCreating" class="form-container">
      <h1>Create an Account</h1>
      <p>
        Creating an account allows you to leave Comments on Blog Articles that
        you like!
      </p>
      <div class="form-inputs">
        <p>First Name:</p>
        <input
          v-model="firstName"
          placeholder="Enter First Name"
          type="text"
          class="form-text"
        />
        <br />
        <p>Last Name:</p>
        <input
          v-model="lastName"
          placeholder="Enter Last Name"
          type="text"
          class="form-text"
        />
        <br />
        <p>Username:</p>
        <input
          v-model="username"
          placeholder="Enter Username"
          type="text"
          class="form-text"
        />
        <br />
        <p>Password:</p>
        <input
          v-model="password"
          placeholder="Enter Password"
          type="password"
          class="form-text"
        />
      </div>
      <div class="form-buttons">
        <button class="cancel-button" @click="cancel">
          <i class="fa fa-ban"></i> Cancel
        </button>
        <button @click="createUser">
          <i class="fa fa-plus"></i> Create Account
        </button>
      </div>
      <p class="error-text" v-if="error">{{ error }}</p>
      <p>
        Already have an Account?
        <span class="clickable-text" @click="toggleIsCreating">Sign in</span>
      </p>
    </div>
    <div v-else class="form-container">
      <h1>Login to your Account</h1>
      <p>
        Logging into your account allows you to leave Comments on Blog Articles
        that you like!
      </p>
      <div class="form-inputs">
        <p>Username:</p>
        <input
          v-model="username"
          placeholder="Enter Username"
          type="text"
          class="form-text"
        />
        <br />
        <p>Password:</p>
        <input
          v-model="password"
          placeholder="Enter Password"
          type="password"
          class="form-text"
        />
      </div>
      <div class="form-buttons">
        <button class="cancel-button" @click="cancel">
          <i class="fa fa-ban"></i> Cancel
        </button>
        <button @click="login"><i class="fa fa-sign-in"></i> Login</button>
      </div>
      <p class="error-text" v-if="error">{{ error }}</p>
      <p>
        Need an Account?
        <span class="clickable-text" @click="toggleIsCreating"
          >Create Account</span
        >
      </p>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      isLoading: false,
      isCreating: false,
      firstName: undefined,
      lastName: undefined,
      username: undefined,
      password: undefined,
      error: null,
    };
  },
  methods: {
    toggleIsCreating() {
      this.error = null;
      this.isCreating = !this.isCreating;
    },
    async createUser() {
      try {
        this.isLoading = true;
        this.error = null;
        const response = await axios.post("/api/users", {
          username: this.username,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName,
        });
        if (!response.data.success) {
          this.error = "Error: " + response.data.data.message;
        } else {
          this.$root.$data.user = response.data.data.user;
          this.cancel();
        }
      } catch (err) {
        console.error(err);
        this.error = err.response.data.data.message;
      } finally {
        this.isLoading = false;
      }
    },
    async login() {
      try {
        this.isLoading = true;
        this.error = null;
        const response = await axios.post("/api/users/login", {
          username: this.username,
          password: this.password,
        });
        if (!response.data.success) {
          this.error = "Error: " + response.data.data.message;
        } else {
          this.$root.$data.user = response.data.data.user;
          this.cancel();
        }
      } catch (err) {
        console.error(err);
        this.error = err.response.data.data.message;
      } finally {
        this.isLoading = false;
      }
    },
    cancel() {
      this.$router.push("/");
    },
  },
  created() {
    if (this.$root.$data.user) {
      this.cancel();
    }
  },
};
</script>
<style scoped>
button {
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

button:hover {
  background-color: var(--beaublue);
  cursor: pointer;
}

.clickable-text {
  color: var(--bluebell);
}

.clickable-text:hover {
  color: var(--beaublue);
  cursor: pointer;
}

#login {
  margin: 75px 0 75px 0;
}

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

.form-inputs {
  margin: 25px 0 25px 0;
}

.error-text {
  color: lightsalmon;
}
</style>