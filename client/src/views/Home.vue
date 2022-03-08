<template>
  <div class="home">
    <div class="container mt-5 mb-5">
      <div class="text-center mb-3">
        <span>1 2 3 4 5</span>
      </div>
      <three></three>
    </div>
  </div>
</template>

<script>
import three from './steps/stepThree.vue'

export default {
  name: 'Home',
  components: {
    three,
  }
}
</script>
