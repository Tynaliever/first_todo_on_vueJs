<template>
  <div class="row">
    <div class="col s6 offset-s3">
      <h1>Создать задачу</h1>
      <!-- Форма создания -->
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
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  // При инициализации компонента
  name: "create",
  data: () => ({
    title: "",
    chips: [],
    date: null,
  }),
  mounted() {
    this.chips = M.Chips.init(this.$refs.chips, {
      placeholder: "Пункты списка",
    });
    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: "dd-mm-yyyy",
      showClearBtn: true,
      defaultDate: new Date(),
      setDefaultDate: true,
    });
  },
  // При отправке формы
  methods: {
    submitHandler() {
      const task = {
        title: this.title,
        chips: this.chips.chipsData,
        date: this.date.date,
        id: Date.now(),
        status: "Активна",
        tags: this.chips.chipsData.map((item) => item.tag),
      };

      // Добавляем задачу в массив задач

      this.$store.dispatch("createTask", task);
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

<style lang="scss" scoped></style>
