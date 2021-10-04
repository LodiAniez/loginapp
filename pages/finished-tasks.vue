<template>
  <div>
	  <h1 class="text-grey-darkest">Finished tasks</h1>
	  <TaskList :tasks="tasks" @toggle="toggleTask" @removeTask="removeTask" />
  </div>
</template>

<script>
import TaskList from './../components/task-list.vue'

export default {
	components: {
		TaskList
	},
	computed: {
		tasks() {
			return this.$store.getters.getFinishedTasks
		}
	},

	methods: {
		toggleTask(payload) {
			this.$store.dispatch("toggleTask", payload)
		},
		removeTask(id) {
			this.$store.dispatch("removeTask", { id })
		}
	}
}
</script>

<style>

</style>