export default {
  async nuxtServerInit({ dispatch }, ctx) {
    if (ctx.res && ctx.res.locals && ctx.res.locals.user) {
      const { allClaims: claims, ...authUser } = ctx.res.locals.user;

      await dispatch("onAuthStateChanged", {
        authUser,
        claims
      });
    }
  },

  async onAuthStateChanged(state, { authUser, claims }) {
    if (!authUser) {
      state.commit("SET_USER", null);

      return;
    }

    // if (authUser && authUser.getIdToken) {
    //   try {
    //     const idToken = await authUser.getIdToken(true);
    //   } catch (err) {
    //     console.error(err);
    //   }
    // }

    state.commit("SET_USER", { authUser });
  },

  async addToGallery(state, payload) {
    const { name, description, image, baseImage } = payload;
    let documentId = null;

    const docRef = this.$fire.firestore
      .collection("user-gallery")
      .doc(this.$fire.auth.currentUser.uid)
      .collection("gallery")
      .doc();

    try {
      // Saving data to firestore
      docRef.set({
        name,
        description,
        image: null
      });

      documentId = docRef.id;
      const ext = image.name.slice(image.name.lastIndexOf("."));

      // Using the document ID as a filename of the image when saved to firebase storage so we can reference it in firestore
      const storageRef = this.$fire.storage
        .ref()
        .child(`gallery/${documentId}${ext}`);

      const blobType = await fetch(baseImage);
      const receivedBlob = await blobType.blob();

      // Saving the file to firebase storage and retrieving its download url
      await storageRef.put(receivedBlob);
      const imageUrl = await storageRef.getDownloadURL();

      // Updating the document by using the ID as the reference, then updating the image from this document's field
      const galleryRef = this.$fire.firestore
        .collection("user-gallery")
        .doc(this.$fire.auth.currentUser.uid)
        .collection("gallery")
        .doc(documentId);

      await galleryRef.update({ image: imageUrl });
      state.commit("ADD_TO_GALLERY", {
        name,
        description,
        image: imageUrl
      });
    } catch (err) {
      // If something is wrong, probably the image is not uploaded to firebase storage, remove the document from firestore
      if (!documentId) {
        await this.$fire.firestore
          .collection("user-gallery")
          .doc(this.$fire.auth.currentUser.uid)
          .collection("gallery")
          .doc(documentId)
          .delete();
      }

      state.commit("CATCH_ERROR", err);
    }
  },

  addTask(state, payload) {
    const { taskName } = payload;
    const docRef = this.$fire.firestore
      .collection("tasks")
      .doc(this.$fire.auth.currentUser.uid)
      .collection("todos")
      .doc();

    try {
      docRef.set({
        taskName,
        finished: false
      });

      state.commit("ADD_TASK", { id: docRef.id, ...payload });
    } catch (err) {
      state.commit("CATCH_ERROR", err);
    }
  },

  async toggleTask(state, payload) {
    const { isFinished, id } = payload;
    const finished = !isFinished;

    try {
      await this.$fire.firestore
        .collection("tasks")
        .doc(this.$fire.auth.currentUser.uid)
        .collection("todos")
        .doc(id)
        .update({ finished });

      state.commit("TOGGLE_TASK", { id, finished });
    } catch (err) {
      state.commit("CATCH_ERROR", err);
    }
  },

  async removeTask(state, payload) {
    const { id } = payload;

    try {
      await this.$fire.firestore
        .collection("tasks")
        .doc(this.$fire.auth.currentUser.uid)
        .collection("todos")
        .doc(id)
        .delete();

      state.commit("REMOVE_TASK", payload);
    } catch (err) {
      state.commit("CATCH_ERROR", err);
    }
  },

  async fetchGallery(state) {
    try {
      const galleryDocs = await this.$fire.firestore
        .collection("user-gallery")
        .doc(this.$fire.auth.currentUser.uid)
        .collection("gallery")
        .get();

      const gallery = galleryDocs.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      state.commit("RETRIEVE_GALLERY", gallery);
    } catch (err) {
      state.commit("CATCH_ERROR", err);
    }
  },

  async fetchTasks(state) {
    try {
      const documents = await this.$fire.firestore
        .collection("tasks")
        .doc(this.$fire.auth.currentUser.uid)
        .collection("todos")
        .get();

      const tasks = documents.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      state.commit("RETRIEVE_TASKS", tasks);
    } catch (err) {
      state.commit("CATCH_ERROR", err);
    }
  },

  clearState(state) {
    console.log("Clearing state");
    state.commit("CLEAR_STATE");
  }
};
