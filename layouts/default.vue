<template>
  <div class="w-screen h-screen bg-gray-500 fixed overflow-x-auto box-border">
    <div class="grid grid-cols-1">
      <div class="w-screen">
        <nav
          class="flex items-center justify-between flex-wrap bg-gray-800 p-6 fixed w-full z-10 top-0"
        >
          <div class="flex items-center flex-shrink-0 text-white mr-6">
            <a
              class="text-white no-underline hover:text-white hover:no-underline"
              href="#"
            >
              <span class="text-2xl pl-2">Welcome {{ email }}</span>
            </a>
          </div>

          <div class="block lg:hidden">
            <button
              @click="toggleMenu"
              class="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white"
            >
              <svg
                class="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>

          <div
            class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden pt-6 lg:pt-0"
            id="nav-content"
          >
            <ul class="list-reset lg:flex justify-end flex-1 items-center">
              <li class="mr-3">
                <a
                  class="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4 cursor-pointer"
                  @click.prevent="addImage"
                  >Add image</a
                >
              </li>
              <li class="mr-3">
                <a
                  class="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4 cursor-pointer"
                  @click.prevent="viewGallery"
                  >View gallery</a
                >
              </li>
              <li class="mr-3">
                <a
                  class="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4 cursor-pointer"
                  @click.prevent="addtask"
                  >Add task</a
                >
              </li>
              <li class="mr-3">
                <a
                  class="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4 cursor-pointer"
                  @click.prevent="finishedtasks"
                  >View finished tasks</a
                >
              </li>
              <li class="mr-3">
                <a
                  class="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4 cursor-pointer"
                  @click.prevent="logout"
                  >Sign out</a
                >
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>

    <div>
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: (this.$store.state.user && this.$store.state.user.email) || null
    };
  },
  methods: {
    toggleMenu() {
      document.getElementById("nav-content").classList.toggle("hidden");
    },
    async logout() {
      try {
        await this.$fire.auth.signOut();

        this.$store.dispatch("clearState");
        this.$router.push("/auth/signin");
      } catch (err) {
        console.error(err);
      }
    },
    addtask() {
      this.toggleMenu();
      this.$router.push("/");
    },
    finishedtasks() {
      this.toggleMenu();
      this.$router.push("/finished-tasks");
    },
    addImage() {
      this.toggleMenu();
      this.$router.push("/add-image");
    },
    viewGallery() {
      this.toggleMenu();
      this.$router.push("/gallery");
    }
  }
};
</script>

<style></style>
