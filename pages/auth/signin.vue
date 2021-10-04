<template>
	<div>
		<div class="text-gray-500 text-center mb-3 font-bold"><small>Please sign in to continue</small></div>
		<form @submit.prevent="Login">
				<div class="relative w-full mb-3">
					<label class="block uppercase text-gray-700 text-xs font-bold mb-2" for="grid-password">Email</label>
					<input type="email" v-model="username" required class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" placeholder="Email" style="transition: all 0.15s ease 0s;">
				</div>
				<div class="relative w-full mb-3">
					<label class="block uppercase text-gray-700 text-xs font-bold mb-2" for="grid-password">Password</label>
					<input type="password" v-model="password" required class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" placeholder="Password" style="transition: all 0.15s ease 0s;">
				</div>
				<!-- <div>
					<label class="inline-flex items-center cursor-pointer">
					<input id="customCheckLogin" type="checkbox" class="form-checkbox text-gray-800 ml-1 w-5 h-5" style="transition: all 0.15s ease 0s;"><span class="ml-2 text-sm font-semibold text-gray-700">Remember me</span></label>
				</div> -->
				<div class="text-center mt-6">
					<button class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full" type="submit" style="transition: all 0.15s ease 0s;">Sign In</button>
				</div>
				<div>
					<nuxt-link to="/auth/create-account" class="text-xs hover:underline">Don't have an account yet? Click here to create!</nuxt-link>
				</div>
		</form>
	</div>
</template>

<script>
export default {
	layout: 'auth-form',
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
		async Login() {
			try {
				await this.$fire.auth.signInWithEmailAndPassword(this.username, this.password)
				$nuxt.$router.push('/')
			} catch (err) {
				alert(err.message)
			}
		}
	}
}
</script>