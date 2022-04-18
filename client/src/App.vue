<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { defaultMeta } from '@/utils/meta'

export default {
  metaInfo: {
    title: 'Pick The Moment',
    meta: defaultMeta,
  }
}
</script>

<style lang="scss">
html, body, #app {
  height: 100%;
}

</style>
