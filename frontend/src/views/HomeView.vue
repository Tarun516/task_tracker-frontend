<template>
  <div class="parent-container">
    <h3>Task Tracker</h3>
    <TaskCreate v-if="isAuthenticated" />
    <div id="tasks" v-if="isAuthenticated">
      <h4>Incomplete Tasks ({{ countIncompleteTasks }})</h4>
      <TaskItem :tasks="incompleteTasks" type="not-completed" />
      <h4>Completed Tasks ({{ countCompletedTasks }})</h4>
      <TaskItem :tasks="completedTasks" type="completed" />
    </div>
    <div v-else>You are not logged in</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TaskItem from "../components/TaskItem.vue";
import VueJwtDecode from "vue-jwt-decode";
import TaskCreate from "../components/TaskCreate.vue";

export default {
  name: "TaskTracker",
  computed: {
    ...mapGetters(["allTasks"]),
    ...mapGetters("auth", ["isAuthenticated"]),
 
    incompleteTasks() {
      return this.allTasks.filter((task) => !task.status);
    },
    completedTasks() {
      return this.allTasks.filter((task) => task.status);
    },
    
    countIncompleteTasks() {
      return this.incompleteTasks.length;
    },
    countCompletedTasks() {
      return this.completedTasks.length;
    },
  },
  methods: {
    ...mapActions("auth", ["login"]),
    ...mapActions(["fetchTasks"]),
    async initialize() {
      await this.login();
      const token = localStorage.getItem("user");
      if (token) {
        try {
          const decoded = VueJwtDecode.decode(token);
          this.user = decoded;
          this.fetchTasks(token);
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
    },
  },
  mounted() {
    this.initialize();
  },
  components: {
    TaskCreate,
    TaskItem,
  },
};
</script>

<style scoped>
.parent-container {
  max-width: 800px;
  margin: 25px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  text-align: center;
}

h3 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  font-style: italic;
}

#tasks {
  margin-top: 20px;
}

h4 {
  font-size: 18px;
  margin-top: 20px;
  font-weight: bold;
}

#add-task-form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

#task-input {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

#add-button {
  padding: 10px;
  font-size: 16px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

#add-button:hover {
  background-color: #45a049;
}
</style>
