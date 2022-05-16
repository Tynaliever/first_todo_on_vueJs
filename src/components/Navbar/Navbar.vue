<template>
  <nav class="orange lighten-1">
    <div class="nav-wrapper">
      <router-link to="/" class="brand-logo">TODO</router-link>
      <ul class="right hide-on-med-and-down">
        <router-link tag="li" to="/" exact active-class="active">
          <a href="#">Создать задачу</a>
        </router-link>
        <router-link tag="li" to="/list" active-class="active">
          <a href="#">Список задач</a>
        </router-link>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
nav {
  padding: 0 15rem;
  margin: 0 auto;

  @media (max-width: 600px) {
    padding: 0 5rem;
  }

  @media (max-width: 320px) {
    padding: 0 1rem;
  }
}

.nav-wrapper {
  /* display: flex;
  justify-content: space-between; */
  max-width: 87rem;
  margin: 0 auto;

  @media (max-width: 600px) {
    display: block;
  }

  @media (max-width: 320px) {
    display: block;
  }
}
</style>
