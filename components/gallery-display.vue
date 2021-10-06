<template>
  <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
    <!-- Article -->
    <article class="overflow-hidden rounded-lg shadow-lg">
      <a href="#">
        <img
          :alt="name"
          class="block h-auto w-full"
          :src="image"
          height="100"
          width="100"
        />
      </a>

      <header
        class="flex items-center justify-between leading-tight p-2 md:p-4"
      >
        <h1 class="text-lg">
          <a class="no-underline hover:underline text-black" href="#">
            {{ name }}
          </a>
        </h1>
      </header>

      <footer class="flex items-center justify-between leading-none p-2 md:p-4">
        <a
          class="flex items-center no-underline hover:underline text-black"
          href="#"
        >
          <p class="ml-2 text-sm">
            {{ description }}
          </p>
        </a>
      </footer>
    </article>
    <!-- END Article -->
  </div>
</template>

<script>
export default {
  name: "GalleryDisplay",
  props: ["name", "description", "image"]
};
</script>

<style></style>
