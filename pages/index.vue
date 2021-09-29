<template>
  <div class="w-screen h-screen flex justify-center items-center bg-gray-500">
    <h1>Welcome to your dashboard</h1>
    <p>You are now logged in {{ $nuxt.$fire.auth.currentUser.email }}</p>
    <button @click="$router.push('/auth/signout')">Logout</button>
  </div>
</template>

<script>
export default {
	head() {
		return {
			title: "NuxtTest"
		}
	}
};
</script>