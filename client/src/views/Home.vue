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
.btn-custom {
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border: 1px solid black;
  background-color: white;
  color: black;
}

.btn-custom:hover {
  background-color: black;
  color: white;
}
</style>
