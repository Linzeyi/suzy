<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('window/initWindowInfo')
  }
}
</script>

<style lang="scss">
</style>
