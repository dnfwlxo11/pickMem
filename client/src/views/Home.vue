<template>
  <div class="home h-100">
    <div class="container h-100">
      <main-page class="h-100"></main-page>
    </div>
  </div>
</template>

<script>
import mainPage from './vues/mainPage.vue'

export default {
  name: 'Home',
  components: {
    mainPage
  },
}
</script>

<style lang="scss">
</style>
