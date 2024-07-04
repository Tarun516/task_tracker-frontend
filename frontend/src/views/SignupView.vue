<template>
  <div>
    <h3>Sign Up</h3>
    <form @submit.prevent="submit">
      <input v-model="data.name" type="text" placeholder="username" required />
      <input v-model="data.email" type="email" placeholder="email" required />
      <input
        v-model="data.password"
        type="password"
        placeholder="password"
        required
      />
      <button type="submit">Submit</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <p v-if="successMessage">{{ successMessage }}</p>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "Signup",
  setup() {
    const store = useStore();
    const data = ref({
      name: "",
      email: "",
      password: "",
    });
    const router = useRouter();
    const error = ref(""); // Use ref for error message
    const successMessage = ref(""); // Use ref for success message
    const submit = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/auth/signup",
          data.value // Access the value of ref
        );
        // Display success message
        successMessage.value = "Sign up successful! Please login.";
        // Optionally clear form fields
        data.value.name = "";
        data.value.email = "";
        data.value.password = "";
      } catch (err) {
        if (err.response.status === 409) {
          error.value = "Email already exists. Please use a different email.";
        } else {
          console.error("Error while signing up:", err.message);
          error.value = "Failed to sign up. Please try again later.";
        }
      }
    };
    return {
      data,
      submit,
      error,
      successMessage,
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
}
button {
  padding: 10px;
  font-size: 16px;
  background-color: #4caf50;
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
