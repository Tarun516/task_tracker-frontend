<template>
  <div class="task-container">
    <div v-for="task in tasks" :key="task.id" :class="{ 'hide-task': shouldHideTask(task) }">
      <div
        @click="updateTask(task._id)"
        :class="['task-item', { 'completed-task': task.status, 'not-completed-task': !task.status }]"
      >
        {{ task.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    tasks: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapActions(["updateTasks"]),
    updateTask(taskId) {
      let token = localStorage.getItem("user");
      this.updateTasks({ taskId, token });
    },
    shouldHideTask(task) {
      if (this.type === "completed" && task.status) {
        return false; // Don't hide if it's a completed task
      } else if (this.type === "not-completed" && !task.status) {
        return false; // Don't hide if it's a not completed task
      } else {
        return true; // Hide the task if conditions are not satisfied
      }
    },
  },
};
</script>

<style scoped>
.task-container {
  padding: 20px;
}

.task-item {
  padding: 20px;
  border: 1px solid black;
  margin: 10px;
  border-radius: 10px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}

.task-item:hover {
  box-shadow: 0 0 8px 5px rgba(0, 0, 0, 0.2);
}

.completed-task {
  opacity: 0.8;
  text-decoration: line-through;
}

.completed-task:hover {
  background-color: rgb(15, 121, 47);
  color: #fff;
}

.not-completed-task:hover {
  background-color: rgb(186, 41, 65);
  color: #fff;
}

.hide-task {
  display: none;
}
</style>
