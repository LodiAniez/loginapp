<template>
  <div class="h-screen w-full flex items-center justify-center font-sans">
    <div class="bg-white rounded shadow p-6 m-auto w-full lg:w-3/4 lg:max-w-lg">
      <form @submit.prevent="addToGallery">
        <div class="relative w-full mb-3">
          <label class="block uppercase text-gray-700 text-xs font-bold mb-2"
            >Image name</label
          >
          <input
            v-model="name"
            type="text"
            required
            class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
            placeholder="Image name.."
            style="transition: all 0.15s ease 0s;"
          />
        </div>
        <div class="relative w-full mb-3">
          <label class="block uppercase text-gray-700 text-xs font-bold mb-2"
            >Image Description</label
          >
          <textarea
            v-model="description"
            required
            class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
            placeholder="Image description"
            style="transition: all 0.15s ease 0s;"
            cols="30"
            rows="5"
          ></textarea>
        </div>
        <div class="relative w-full mb-3">
          <div class="flex rounded overflow-hidden items-center justify-left">
            <div class="bg-gray-300 shadow-border p-3">
              <div class="w-4 h-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <button
              type="button"
              class="bg-gray-300 px-2 py-2 hover:bg-gray-400 active:bg-gray-300 shadow-lg shadow-border items-center"
              @click="pickFile"
            >
              Upload image
            </button>
            <input
              type="file"
              ref="inputFile"
              style="display: none"
              accept="image/*"
              @change="onFileChange"
            />
            <span v-if="imageName" class="px-1 truncate max-w-xs">
              {{ imageName }}
            </span>
            <button v-if="imageName" @click="resetImage">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
          <img
            v-if="imageUrl"
            :src="imageUrl"
            class="object-scale-down h-48 w-full p-2"
          />
          <p v-if="formHasError" class="text-xs text-red-500">
            Image is required.
          </p>
        </div>
        <div class="text-center mt-6">
          <button
            class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
            type="submit"
            style="transition: all 0.15s ease 0s;"
          >
            Add to gallery
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      description: "",
      imageUrl: "",
      image: null,
      imageName: null,
      formHasError: null
    };
  },
  methods: {
    pickFile() {
      this.$refs.inputFile.click();
    },
    onFileChange(event) {
      const file = event.target.files;
      const filename = file[0] && file[0].name ? file[0].name : null;

      if (!filename) return;

      if (filename.lastIndexOf(".") <= 0)
        return console.error("Not a valid file.");

      this.imageName = filename;
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });

      fileReader.readAsDataURL(file[0]);
      this.image = file[0];
      this.formHasError = false;
    },
    resetImage() {
      this.image = null;
      this.imageName = null;
      this.imageUrl = null;
    },
    addToGallery() {
      if (!this.image && !this.imageName) return (this.formHasError = true);

      this.$store.dispatch("addToGallery", {
        name: this.name,
        description: this.description,
        image: this.image,
        baseImage: this.imageUrl
      });

      this.imageUrl = null;
      this.image = null;
      this.name = null;
      this.description = null;
      this.imageName = null;
    }
  }
};
</script>

<style></style>
