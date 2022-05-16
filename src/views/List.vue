<template>
  <div>
    <h1>Список задач</h1>

    <!-- Фильтр по статусу -->
    <div class="row">
      <div class="input-field s6 col">
        <i v-if="filter" class="material-icons right" @click="filter = ''"
          >clear</i
        >
        <select ref="select" class="select" v-model="filter">
          <option value="" selected>Все</option>
          <option value="Активна">Активные</option>
          <option value="Выполнена">Выполненые</option>
          <option value="Срок выполнения истек">Просроченные</option>
        </select>
        <label>Фильтр по статусу</label>
      </div>
    </div>

    <hr />

    <table v-if="tasks.length">
      <thead>
        <tr>
          <th>#</th>
          <th>Наименование</th>
          <th>Дата</th>
          <th>Пункты</th>
          <th>Статус</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <!-- отображаем данные -->
        <tr v-for="(task, index) of displayTasks" :key="task.id">
          <td>
            {{ index + 1 }}
          </td>
          <td>
            {{ task.title }}
          </td>
          <td>
            {{ new Date(task.date).toLocaleDateString() }}
          </td>
          <td class="td">
            <div class="text">
              {{ task.chips.map((item) => item.tag).join("/ ") }}
            </div>
          </td>
          <td>
            {{ task.status }}
          </td>
          <td>
            <router-link :to="{ name: 'task', params: { id: task.id } }">
              Открыть
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>Нет задач</p>
  </div>
</template>

<script>
export default {
  // получаем данные из глобального хранилища
  data: () => ({
    filter: null,
  }),
  computed: {
    tasks() {
      return this.$store.getters.tasks;
    },
    displayTasks() {
      // если нет фильтра
      return this.tasks.filter((task) => {
        if (!this.filter) {
          return true;
        }
        return task.status === this.filter;
      });
    },
  },
  mounted() {
    // при инициализации компонента
    M.FormSelect.init(this.$refs.select);
  },
};
</script>

<style lang="scss" scoped>
.td {
  padding: 0.5rem;
  max-width: 200px;
}
.text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.select {
  margin-bottom: 1rem;
  position: relative;

  @media (min-width: 600px) {
    margin-bottom: 0;
  }

  @media (max-width: 599px) {
    margin-bottom: 1rem;
  }

  @media (max-width: 400px) {
    margin-bottom: 0;
  }

  @media (max-width: 320px) {
    margin-bottom: 0;
  }
}

i {
  position: absolute;
  right: -20px;
  top: 15px;
  bottom: 0;
  margin: auto;
  font-size: 1.5rem;
  color: #999;
  cursor: pointer;
}
</style>
