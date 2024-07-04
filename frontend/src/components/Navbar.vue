<template>
  <nav>
    <router-link to="/">Home Page</router-link>
    <div>
      <router-link v-if="!isAuthenticated" to="/signin">Login</router-link>
      <router-link v-if="!isAuthenticated" to="/signup">Sign Up</router-link>
      <router-link @click="handleLogout" v-if="isAuthenticated" to="/signin"
        >Logout</router-link
      >
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Navbar",
  computed: {
    ...mapGetters("auth", ["isAuthenticated"]),
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    handleLogout() {
      this.logout();
    },
  },
};
</script>

<style scoped>
/* Navigation bar styling */
nav {
  width: 80%;
  margin: 10px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  background-color: #aa7d43;
  color: #e7e6e0;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

a {
  text-decoration: none;
  color: #e4dfdf;
  margin-right: 20px;
  font-size: 16px;
}

a:hover {
  text-decoration: underline;
  color: rgb(8, 8, 8);
  transition: 0.1s ease-in;
}

[v-if="isAuthenticated"] {
  cursor: pointer;
  background-color: #d9534f;
  padding: 8px 15px;
  border: none;
  color: #fff;
  border-radius: 4px;
  font-size: 16px;
}

[v-if="isAuthenticated"]:hover {
  background-color: #c9302c;
}

div > a[v-if="isAuthenticated"] {
  display: none;
}
</style>
