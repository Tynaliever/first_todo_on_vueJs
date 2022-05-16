import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // текущая задача
    tasks: JSON.parse(localStorage.getItem("tasks") || []).map((task) => {
      if (new Date(task.date) < new Date()) {
        task.status = "Срок выполнения истек";
      }
      return task;
    }),
  },
  getters: {},
  // мутации применяются к объекту state
  mutations: {
    // добавление задачи
    createTask(state, task) {
      state.tasks.push(task);

      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    // изменение задачи
    updateTask(state, { id, title, date }) {
      const task = state.tasks.find((task) => task.id === id);
      const status =
        new Date(date) > new Date() ? "Активна" : "Срок выполнения истек";

      task.title = title;
      task.date = date;
      task.status = status;

      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    // удаление задачи
    deleteTask(state, id) {
      const index = state.tasks.findIndex((t) => t.id === id);

      state.tasks.splice(index, 1);

      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    // изменение статуса задачи
    completeTask(state, id) {
      const task = state.tasks.find((t) => t.id === id);

      task.status = "Выполнена";

      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
  },
  // действия применяются к объекту state
  actions: {
    createTask({ commit }, task) {
      commit("createTask", task);
    },
    updateTask({ commit }, task) {
      commit("updateTask", task);
    },
    deleteTask({ commit }, task) {
      commit("deleteTask", task);
    },
    completeTask({ commit }, id) {
      commit("completeTask", id);
    },
  },
  modules: {},
  getters: {
    // возвращает задачи по статусу
    tasks: (state) => state.tasks,
    taskById: (state) => (id) => state.tasks.find((task) => task.id === id),
  },
});
