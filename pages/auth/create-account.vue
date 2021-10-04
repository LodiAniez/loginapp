<template>
	<div class="w-screen h-screen flex justify-center items-center bg-gray-500">
		<div class="rounded-md bg-purple-100 w-96 h-96 flex justify-center items-center">
			<div class="flex-auto px-4 lg:px-10 py-10 pt-0">
				<div class="text-gray-500 text-center mb-3 font-bold">Create account</div>
				<form @submit.prevent="createAccount">
						<div class="relative w-full mb-3">
							<label class="block uppercase text-gray-700 text-xs font-bold mb-2" for="grid-password">Email</label>
							<input type="email" v-model="username" required class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" placeholder="Email" style="transition: all 0.15s ease 0s;">
						</div>
						<div class="relative w-full mb-3">
							<label class="block uppercase text-gray-700 text-xs font-bold mb-2" for="grid-password">Password</label>
							<input type="password" v-model="password" required class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" placeholder="Password" style="transition: all 0.15s ease 0s;">
						</div>
						<div class="relative w-full mb-3">
							<label class="block uppercase text-gray-700 text-xs font-bold mb-2" for="grid-password">Password</label>
							<input type="password" v-model="confirmPassword" required class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" placeholder="Password" style="transition: all 0.15s ease 0s;">
						</div>
						<div class="text-center mt-6">
							<button class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full" type="submit" style="transition: all 0.15s ease 0s;">Create account</button>
						</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			username: "",
			password: "",
			confirmPassword: ""
		}
	},

	methods: {
		async createAccount() {
			if (this.password !== this.confirmPassword) return alert("Password do not match.")

			try {
				await this.$fire.auth.createUserWithEmailAndPassword(this.username, this.password)

				alert("Your account has been created, click ok to continue.")
				this.$router.push("/")
			} catch (err) {
				alert(err.message)
			}
		}
	}
}
</script>

<style>

</style>