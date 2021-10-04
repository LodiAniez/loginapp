<template>
  <div class="w-screen h-screen flex justify-center items-center bg-gray-500">
		<nav class="flex items-center justify-between flex-wrap bg-gray-800 p-6 fixed w-full z-10 top-0">
			<div class="flex items-center flex-shrink-0 text-white mr-6">
				<a class="text-white no-underline hover:text-white hover:no-underline" href="#">
					<span class="text-2xl pl-2">Welcome {{ $nuxt.$fire.auth.currentUser.email }}</span>
				</a>
			</div>

			<div class="block lg:hidden">
				<button @click="toggleMenu" class="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white">
					<svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
				</button>
			</div>

			<div class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block pt-6 lg:pt-0" id="nav-content">
				<ul class="list-reset lg:flex justify-end flex-1 items-center">
					<li class="mr-3">
						<a id="linkAnchor" class="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4" href="#" @click="$router.push('/'); toggleMenu()">Add task</a>
					</li>
					<li class="mr-3">
						<a id="linkAnchor" class="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4" href="#" @click="$router.push('/finished-tasks'); toggleMenu()">View finished tasks</a>
					</li>
					<li class="mr-3">
						<a class="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4" href="#" @click="$router.push('/auth/signout')">Sign out</a>
					</li>
				</ul>
			</div>
		</nav>

		<div class="h-100 w-full flex items-center justify-center font-sans">
			<div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
				<Nuxt />
			</div>
		</div>
  </div>
</template>

<script>
export default {
	methods: {
		toggleMenu() {
			document.getElementById("nav-content").classList.toggle("hidden");
		}
	}
}
</script>

<style>

</style>