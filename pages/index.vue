<template>
  <div class="h-screen w-full flex items-center justify-center font-sans">
    <div class="bg-white rounded shadow p-6 m-auto w-full lg:w-3/4 lg:max-w-lg">
      <div class="mb-4">
        <h1 class="text-grey-darkest">Todo list</h1>
        <form @submit.prevent="addTask">
          <div class="flex mt-4">
            <input
              v-model="taskName"
              class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
              placeholder="Add Todo"
            />
            <button
              type="submit"
              class="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:bg-gray-300"
            >
              Add
            </button>
          </div>
        </form>
      </div>

      <div>
        <TaskList
          :tasks="tasks"
          @toggle="toggleTask"
          @removeTask="removeTask"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TaskList from "./../components/task-list.vue";

export default {
  components: { TaskList },
  data() {
    return {
      taskName: "",
      taskCollection: this.$fire.firestore.collection("tasks")
    };
  },

  head() {
    return {
      title: "NuxtTest"
    };
  },

  computed: {
    tasks() {
      return this.$store.getters.getTaskList;
    }
  },

  mounted() {
    this.$store.dispatch("fetchTasks");
  },

  methods: {
    addTask() {
      this.$store.dispatch("addTask", {
        taskName: this.taskName,
        finished: false
      });
      this.taskName = "";
    },
    toggleTask(payload) {
      this.$store.dispatch("toggleTask", payload);
    },
    removeTask(id) {
      this.$store.dispatch("removeTask", { id });
    }
  }
};
</script>
