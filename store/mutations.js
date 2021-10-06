export default {
  SET_USER(state, user) {
    state.user = user
      ? {
          uid: user.authUser.uid,
          email: user.authUser.email
        }
      : null;
  },

  ADD_TO_GALLERY(state, payload) {
    state.gallery.push(payload);
  },

  RETRIEVE_GALLERY(state, payload) {
    state.gallery = payload;
  },

  ADD_TASK(state, payload) {
    state.taskList.push(payload);
  },

  RETRIEVE_TASKS(state, payload) {
    state.taskList = payload;
  },

  REMOVE_TASK(state, { id }) {
    state.taskList.splice(
      state.taskList.findIndex(key => key.id === id),
      1
    );
  },

  TOGGLE_TASK(state, { id, finished }) {
    state.taskList.find(key => key.id === id).finished = finished;
  },

  CATCH_ERROR(state, payload) {
    state.errors.push(payload);
  },

  CLEAR_STATE(state) {
    state.user = null;
    state.taskList = [];
    state.errors = [];
    state.gallery = [];
  }
};
