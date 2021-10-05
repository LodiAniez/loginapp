export default {
  getUser(state) {
    console.log(`User from getter is ${state.user}`);
    return state.user;
  },

  getTaskList(state) {
    return state.taskList.filter(key => !key.finished);
  },

  getFinishedTasks(state) {
    return state.taskList.filter(key => key.finished);
  }
};
