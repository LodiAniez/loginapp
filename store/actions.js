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

    if (authUser && authUser.getIdToken) {
      try {
        const idToken = await authUser.getIdToken(true);
      } catch (err) {
        console.error(err);
      }
    }

    state.commit("SET_USER", { authUser });
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
        taskName: taskName,
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
