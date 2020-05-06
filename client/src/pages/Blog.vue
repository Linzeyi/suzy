<!-- 博客界面 -->
<template>
  <div id="blog-page">
    <div class="main-container">
      <div class="row align-start space-between">
        <blogSidebar />
        <div class="col-10">
          <blogList :blogsData="blogsData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      blogListType: 'list',
      blogsData: this.FakeUtils.blogsData
    }
  }
}
</script>

<style lang="scss" scoped>
.main-container {
  padding: 40px 80px;
  .sidebar {
    padding: 10px 0 20px;
  }
}
</style>