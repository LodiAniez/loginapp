<template>
	<div class="w-screen h-screen flex justify-center items-center bg-gray-500">
		<div class="h-100 w-full flex items-center justify-center font-sans">
			<div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
				<div class="mb-4">
					<h1 class="text-grey-darkest">Welcome {{ $nuxt.$fire.auth.currentUser.email }}<button class="px-1 float-right border rounded shadow bg-gray-200 active:bg-gray-100 hover:bg-gray-100" @click="$router.push('/auth/signout')">Sign out</button></h1>
					<form @submit.prevent="addTask">
						<div class="flex mt-4">
							<input v-model="taskName" class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Todo"/>
							<button type="submit" class="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:bg-gray-300">Add</button>
						</div>
					</form>
				</div>

				<div>
					<li class="flex row items-center justify-between w-full py-1 px-4 my-1 rounded border bg-gray-100 text-gray-600" :class="{'bg-gray-500': task.finished === true}" v-for="task of tasks" :key="task.id">
						<div class="items-center column">
							<input class="mx-1" type="checkbox" @change="toggleTask(task.id, task.finished)" :checked="task.finished">
							<span :class="{'line-through': task.finished === true}">{{ task.taskName }}</span>
						</div>

						<div class="items-center row-reverse">
							<button class="px-4 py-2 float-right" @click="removeTask(task.id)">Remove</button>
						</div>
					</li>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			taskName: "",
			tasks: [],
			taskCollection: this.$fire.firestore.collection("tasks")
		}
	},

	head() {
		return {
			title: "NuxtTest",
		};
	},

	created() {
		this.retrieveTasks()
	},

	methods: {
		async addTask() {
			const docRef = this.taskCollection.doc()

			try {
				await docRef.set({
					taskName: this.taskName,
					finished: false
				})

				this.taskName = ""
				return this.retrieveTasks()
			} catch (err) {
				console.error(err)
			}
		},
		async retrieveTasks() {
			try {
				const documents = await this.taskCollection.get()
				
				this.tasks = documents.docs.map(doc => {
					return { id: doc.id, ...doc.data() }
				})
			} catch (err) {
				console.error(err)
			}
		},
		async toggleTask(id, isFinished) {
			const finished = !isFinished
			
			try {
				await this.taskCollection.doc(id).update({ finished })
				return this.retrieveTasks()
			} catch (err) {
				console.error(err)
			}
		},
		async removeTask(id) {
			try {
				await this.taskCollection.doc(id).delete()
				return this.retrieveTasks()
			} catch (err) {
				console.error(err)
			}
		}
	}
};
</script>