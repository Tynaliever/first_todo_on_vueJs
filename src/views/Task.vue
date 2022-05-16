<template>
  <div class="row">
    <div v-if="task" class="col s6 offset-s3">
      <h1>{{ task.title }}</h1>

      <!-- Форма задачи -->
      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
            id="title"
            v-model="title"
            type="text"
            class="validate"
            required
          />
          <label for="title">Наименование списка</label>
        </div>

        <div class="chips" ref="chips"></div>

        <input type="text" ref="datepicker" />

        <button
          class="btn waves-effect waves-light"
          type="submit"
          name="action"
        >
          Обновить
          <i class="material-icons right">send</i>
        </button>

        <div v-if="task.status !== 'Выполнена'">
          <button
            class="btn waves-effect waves-light"
            type="button"
            @click="completeTask"
          >
            Задача выполнена
            <i class="material-icons right">done</i>
          </button>
        </div>

        <button
          class="btn waves-effect waves-light"
          type="button"
          name="action"
          @click="deleteHandler"
        >
          Удалить
          <i class="material-icons right">delete</i>
        </button>
        <button
          class="btn waves-effect waves-light"
          type="button"
          name="action"
          @click="cancelHandler"
        >
          Отмена
          <i class="material-icons right">cancel</i>
        </button>
      </form>
    </div>
    <p v-else>Задача не найдена</p>
  </div>
</template>

<script>
export default {
  computed: {
    // Получаем задачу по id
    task() {
      return this.$store.getters.taskById(+this.$route.params.id);
    },
  },
  data: () => ({
    title: "",
    chips: [],
    date: null,
  }),
  mounted() {
    // Инициализируем компоненты
    M.Modal.init(this.$refs.modal1, {});
    this.title = this.task.title;
    this.chips = M.Chips.init(this.$refs.chips, {
      placeholder: "Пункты списка",
      data: this.task.chips,
    });
    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: "dd-mm-yyyy",
      showClearBtn: true,
      defaultDate: new Date(),
      setDefaultDate: true,
    });
    setTimeout(() => {
      M.updateTextFields();
    }, 0);
  },
  // При отправке формы
  methods: {
    submitHandler() {
      // Добавляем задачу в массив задач
      this.$store.dispatch("updateTask", {
        id: +this.$route.params.id,
        title: this.title,
        chips: this.chips.chipsData,
        date: this.date.date,
        tags: this.chips.chipsData.map((item) => item.tag),
      });
      this.$router.push("/list");
    },
    deleteHandler() {
      this.$store.dispatch("deleteTask", this.task.id);
      this.$router.push("/list");
    },
    completeTask() {
      this.$store.dispatch("completeTask", this.task.id);
      this.$router.push("/list");
    },
    cancelHandler() {
      this.$router.push("/list");
    },
  },

  // При открытии компонента
  destroyed() {
    if (this.date && this.date.destroy) {
      this.date.destroy();
    }

    if (this.chips && this.chips.destroy) {
      this.chips.destroy();
    }

    this.title = "";
  },
};
</script>

<style lang="scss" scoped>
button {
  margin: 0.2rem;
}
</style>
