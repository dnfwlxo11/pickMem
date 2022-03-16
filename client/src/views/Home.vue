<template>
  <div class="home">
    <div class="container mt-5 mb-5">
      <div class="layout m-auto">
        <div>
          <main-page></main-page>
        </div>
      </div>
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

<style>
.layout {
  padding: 30px;
}
</style>
