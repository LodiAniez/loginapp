<template>
  <div
    class="h-screen flex justify-center items-center container my-12 mx-auto px-4 md:px-12"
  >
    <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 m-auto">
      <GalleryDisplay
        v-for="list of gallery"
        :key="list.id"
        :name="list.name"
        :description="list.description"
        :image="list.image"
      />
    </div>
  </div>
</template>

<script>
import GalleryDisplay from "./../components/gallery-display.vue";

export default {
  computed: {
    gallery() {
      return this.$store.getters.getGallery;
    }
  },
  mounted() {
    this.$store.dispatch("fetchGallery");
  }
};
</script>

<style></style>
