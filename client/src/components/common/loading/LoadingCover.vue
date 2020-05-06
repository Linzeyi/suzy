<template>
  <div class="loading-cover" v-if="isLoading">
    <img class="loading-svg" src="../../../../public/svg/loading3.svg" alt="">
  </div>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.loading-cover {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background-color: transparent;
  align-items: center;
  justify-content: center;
  cursor: wait;
  .loading-svg {
    max-height: 80px;
    user-select: none;
  }
}
</style>