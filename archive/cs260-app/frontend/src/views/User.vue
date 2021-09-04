<template>
  <div id="user">
    <div v-if="isLoading" class="loading-container column center">
      <img src="/loading.gif" alt="Loading animation" />
      <h2>Loading...</h2>
    </div>
    <div v-else-if="isEditing" class="form-container">
      <h1>Edit User Info</h1>
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
      <p class="error-text" v-if="error">{{ error }}</p>
      <div class="form-buttons">
        <button class="delete-button" @click="toggleEdit">
          <i class="fa fa-ban"></i> Cancel
        </button>
        <button @click="editUser">
          <i class="fa fa-floppy-o"></i> Save Changes
        </button>
        <button class="delete-button" @click="deleteUser" v-if="!isAdmin">
          <i class="fa fa-trash"></i> Delete User
        </button>
      </div>
    </div>
    <div v-else class="column center">
      <h1>User Info</h1>
      <h2>First Name:</h2>
      <p>{{ firstName }}</p>
      <h2>Last Name:</h2>
      <p>{{ lastName }}</p>
      <h2>Username:</h2>
      <p>{{ username }}</p>
      <h2>Password:</h2>
      <p>********</p>
      <div class="form-buttons">
        <button class="delete-button" @click="deleteUser" v-if="!isAdmin">
          <i class="fa fa-trash"></i> Delete User
        </button>
        <button @click="toggleEdit">
          <i class="fa fa-pencil-square-o"></i> Edit User
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      isLoading: false,
      error: null,
      isEditing: false,
      firstName: undefined,
      lastName: undefined,
      username: undefined,
      password: undefined,
    };
  },
  methods: {
    async getUser() {
      try {
        this.isLoading = true;
        this.error = null;
        const response = await axios.get("/api/users");
        if (!response.data.success) {
          this.error = "Error: " + response.data.data.message;
        } else {
          this.firstName = response.data.data.user.firstName;
          this.lastName = response.data.data.user.lastName;
          this.username = response.data.data.user.username;
        }
      } catch (err) {
        console.error(err);
        this.error = err.response.data.data.message;
      } finally {
        this.isLoading = false;
      }
    },
    async editUser() {
      try {
        this.isLoading = true;
        this.error = null;
        let body;
        if (this.password) {
          body = {
            firstName: this.firstName,
            lastName: this.lastName,
            username: this.username,
            password: this.password,
          };
        } else {
          body = {
            firstName: this.firstName,
            lastName: this.lastName,
            username: this.username,
          };
        }
        const response = await axios.put("/api/users", body);
        if (!response.data.success) {
          this.error = "Error: " + response.data.data.message;
        } else {
          this.isEditing = false;
        }
      } catch (err) {
        console.error(err);
        this.error = err.response.data.data.message;
      } finally {
        this.isLoading = false;
      }
    },
    async deleteUser() {
      try {
        this.isLoading = true;
        this.error = null;
        const response = await axios.delete("/api/users");
        if (response.status !== 204) {
          this.error = response.data.data.message;
        } else {
          this.$root.$data.user = null;
          this.$router.push("/");
        }
      } catch (err) {
        console.error(err);
        this.error = err.response.data.data.message;
      } finally {
        this.isLoading = false;
      }
    },
    async toggleEdit() {
      this.error = null;
      if (this.isEditing) {
        await this.getUser();
      }
      this.isEditing = !this.isEditing;
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
    if (!this.$root.$data.user) {
      this.$router.push("/");
    } else {
      this.getUser();
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

.delete-button {
  border: 1px solid tomato;
}

.delete-button:hover {
  background-color: lightsalmon;
}
</style>