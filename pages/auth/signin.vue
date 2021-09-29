<template>
	<div class="w-screen h-screen flex justify-center items-center bg-gray-500">
		<div class="rounded-md bg-purple-100 w-96 h-96 flex justify-center items-center">
			<div class="flex-auto px-4 lg:px-10 py-10 pt-0">
				<div class="text-gray-500 text-center mb-3 font-bold"><small>Please sign in to continue</small></div>
				<form>
						<div class="relative w-full mb-3">
							<label class="block uppercase text-gray-700 text-xs font-bold mb-2" for="grid-password">Email</label>
							<input type="email" v-model="username" class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" placeholder="Email" style="transition: all 0.15s ease 0s;">
						</div>
						<div class="relative w-full mb-3">
							<label class="block uppercase text-gray-700 text-xs font-bold mb-2" for="grid-password">Password</label>
							<input type="password" v-model="password" class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" placeholder="Password" style="transition: all 0.15s ease 0s;">
						</div>
						<div>
							<label class="inline-flex items-center cursor-pointer">
								<input id="customCheckLogin" type="checkbox" class="form-checkbox text-gray-800 ml-1 w-5 h-5" style="transition: all 0.15s ease 0s;"><span class="ml-2 text-sm font-semibold text-gray-700">Remember me</span></label>
						</div>
						<div class="text-center mt-6">
							<button @click="Login" class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full" type="button" style="transition: all 0.15s ease 0s;">Sign In</button>
						</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	head() {
		return {
			title: "NuxtTest"
		}
	},
	data() {
		return {
			username: null,
			password: null
		}
	},
	methods: {
		Login() {
			this.$fire.auth.signInWithEmailAndPassword(this.username, this.password)
			.then((user) => {
				$nuxt.$router.push('/')
			})
			.catch(function (error){
				console.log(error.message)
			})
		}
	}
}
</script>