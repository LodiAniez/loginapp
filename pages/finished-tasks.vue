<template>
  <div class="h-screen w-full flex items-center justify-center font-sans">
    <div class="bg-white rounded shadow p-6 m-auto w-full lg:w-3/4 lg:max-w-lg">
      <h1 class="text-grey-darkest">Finished tasks</h1>
      <TaskList :tasks="tasks" @toggle="toggleTask" @removeTask="removeTask" />
    </div>
  </div>
</template>

<script>
import TaskList from "./../components/task-list.vue";

export default {
  components: {
    TaskList
  },
  computed: {
    tasks() {
      return this.$store.getters.getFinishedTasks;
    }
  },

  mounted() {
    this.$store.dispatch("fetchTasks");
  },

  methods: {
    toggleTask(payload) {
      this.$store.dispatch("toggleTask", payload);
    },
    removeTask(id) {
      this.$store.dispatch("removeTask", { id });
    }
  }
};
</script>

<style></style>
