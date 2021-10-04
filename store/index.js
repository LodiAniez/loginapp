const actions = {
	onAuthStateChangedAction(state, { authUser, claims }) {
		if (!authUser) {
			state.commit("SET_USER", null)

			this.$router.push({
				path: "/auth/signin"
			})
		} else {
			console.log("User is logged in.")
			const { uid, email } = authUser
			state.commit("SET_USER", { uid, email })
		}
	},

	addTask(state, payload) {
		const { taskName } = payload
		const docRef = this.$fire.firestore.collection("tasks").doc()

		try {
			docRef.set({
				taskName: taskName,
				finished: false
			})

			state.commit("ADD_TASK", { id: docRef.id, ...payload })
		} catch (err) {
			state.commit("CATCH_ERROR", err)
		}
	},

	async toggleTask(state, payload) {
		const { isFinished, id } = payload
		const finished = !isFinished
			
		try {
			await this.$fire.firestore.collection("tasks").doc(id).update({ finished })

			state.commit("TOGGLE_TASK", { id, finished })
		} catch (err) {
			state.commit("CATCH_ERROR", err)
		}
	},

	async removeTask(state, payload) {
		const { id } = payload
		
		try {
			await this.$fire.firestore.collection("tasks").doc(id).delete()

			state.commit("REMOVE_TASK", payload)
		} catch (err) {
			state.commit("CATCH_ERROR", err)
		}
	},

	async fetchTasks(state) {
		try {
			const documents = await this.$fire.firestore.collection("tasks").get()
				
			const tasks = documents.docs.map(doc => ({ id: doc.id, ...doc.data() }))
			
			state.commit("RETRIEVE_TASKS", tasks)
		} catch (err) {
			state.commit("CATCH_ERROR", err)
		}
	}
}

const mutations = {
	SET_USER(state, user) {
		state.user = user
	},

	ADD_TASK(state, payload) {
		state.taskList.push(payload)
	},

	RETRIEVE_TASKS(state, payload) {
		state.taskList = payload
	},

	REMOVE_TASK(state, { id }) {
		state.taskList.splice(state.taskList.findIndex(key => key.id === id), 1)
	},

	TOGGLE_TASK(state, { id, finished }) {
		state.taskList.find(key => key.id === id).finished = finished
	},

	CATCH_ERROR(state, payload) {
		state.errors.push(payload)
	}
}

const state = () => ({
	user: null,
	taskList: [],
	errors: []
})

const getters = {
	getUser(state) {
		return state.user
	},

	getTaskList(state) {
		return state.taskList.filter(key => !key.finished)
	},

	getFinishedTasks(state) {
		return state.taskList.filter(key => key.finished)
	}
}

export default {
	state,
	actions,
	mutations,
	getters
}