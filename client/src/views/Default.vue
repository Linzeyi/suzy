<!-- 基础容器 -->
<template>
  <div id="default">
    <mainNav />
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'default'
}
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  top: $main-nav-height;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  &::before {
    content: '';
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    min-height: 100vh;
    z-index: -1;
    background-color: #dadee2;
  }
}
</style>