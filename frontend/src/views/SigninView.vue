<template>
  <div>
    <h3>Sign In</h3>
    <form @submit.prevent="submit">
      <input v-model="data.email" type="email" placeholder="Email" required />
      <input
        v-model="data.password"
        type="password"
        placeholder="Password"
        required
      />
      <button type="submit">Submit</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import { reactive } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "Signin",
  setup() {
    const store = useStore();
    const data = reactive({
      email: "",
      password: "",
    });
    const router = useRouter();
    const error = reactive("");

    const submit = async () => {
      try {
        const response = await axios.post(
          "https://tasktrackerbackend-production-01f5.up.railway.app/auth/login",
          data
        );

        const token = response.data.token;
        localStorage.setItem("user", token);
        await store.dispatch("auth/login");

        // Redirect to appropriate route after successful login
        router.push("/");
      } catch (err) {
        console.error("Error while signing in:", err);
        if (err.response) {
          error.value = `Failed to sign in: ${err.response.data.message}`;
        } else {
          error.value = "Failed to sign in. Please try again later.";
        }
      }
    };

    return {
      data,
      submit,
      error,
    };
  },
};
</script>

<style scoped>
div {
  max-width: 400px;
  margin: 130px auto;
  padding: 20px;
  background-color: #98b48d;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h3 {
  font-size: 24px;
  color: #ebf924;
  margin-bottom: 20px;
}

input {
  padding: 10px;
  font-size: 16px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  border-top-style: none;
}

button {
  padding: 10px;
  font-size: 16px;
  background-color: #4caf50;
  transition: 0.3s ease-in-out;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #165a19;
}

p {
  color: red;
  margin-top: 10px;
}
</style>
