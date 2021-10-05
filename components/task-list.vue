<template>
  <div v-if="tasks.length">
    <li
      class="flex row items-center justify-between w-full py-1 px-4 my-1 rounded border bg-gray-100 text-gray-600"
      v-for="task of tasks"
      :key="task.id"
    >
      <div class="items-center column">
        <input
          class="mx-1"
          type="checkbox"
          @change="toggleTask(task.id, task.finished)"
          :checked="task.finished"
        />
        <span>{{ task.taskName }}</span>
      </div>

      <div class="items-center row-reverse">
        <button class="px-4 py-2 float-right" @click="removeTask(task.id)">
          Remove
        </button>
      </div>
    </li>
  </div>
  <div v-else>
    <li
      class="flex row items-center justify-between w-full py-1 px-4 my-1 rounded border bg-gray-100 text-gray-600"
    >
      <div class="items-center column">
        <span>No tasks for now</span>
      </div>
    </li>
  </div>
</template>

<script>
export default {
  name: "TaskList",
  props: ["tasks"],
  methods: {
    toggleTask(id, isFinished) {
      this.$emit("toggle", { id, isFinished });
    },
    removeTask(id) {
      this.$emit("removeTask", id);
    }
  }
};
</script>

<style></style>
