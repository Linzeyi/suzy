<!-- 博客组件 -->
<template>
  <div class="blogList-wrap">
    <div class="blogList-wrap-header wrap-header">
      <div class="row">
        <h1 class="title">近期博客</h1>
        <div class="option-item search-item">
          <input :class="{'on': searchVal}" placeholder="搜索博客" type="text" v-model="searchVal" />
          <i class="iconfont icon-search" @click="handlerSearch()">&#xf3cb;</i>
        </div>
        <div
          v-if="showListTypeBtn"
          class="option-item"
          :class="{'disabled': isLoading}"
          @click="toggleListType()"
        >
          <i class="iconfont icon-list" v-if="listType == 'list'">&#xe742;</i>
          <i class="iconfont icon-card inverted" v-if="listType == 'grids'">&#xe73f;</i>
        </div>
        <div class="option-item" :class="{'disabled': isLoading}" @click="toggleSort()">
          <i class="iconfont icon-sort" v-if="sortType">&#xf3cf;</i>
          <i class="iconfont icon-sort inverted" v-else>&#xf3d0;</i>
        </div>
      </div>
    </div>
    <div class="blogList-wrap-content">
      <loadingCover :isLoading="isLoading" />
      <blogList
        :blogsData="sortBlogsData"
        :showTimeline="true"
        v-if="!isLoading && listType == 'list'"
      />
      <blogGrid :blogsData="sortBlogsData" v-if="!isLoading && listType == 'grids'" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'mainBlogBoard',
  props: {
    listType: {
      type: String,
      default: 'grids'
    },
    showListTypeBtn: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isLoading: false,
      sortType: false,
      searchVal: '',
      blogsData: this.FakeUtils.blogsData
    }
  },
  mounted() {},
  computed: {
    sortBlogsData() {
      let arr = []
      if (this.sortType) {
        for (let i = this.blogsData.length - 1; i >= 0; i--) {
          arr.push(this.blogsData[i])
        }
      } else {
        arr = this.blogsData
      }
      this.getBlogs()
      return arr
    }
  },
  methods: {
    getBlogs() {
      this.setLoading(true)
      setTimeout(() => {
        this.setLoading(false)
      }, 1200)
    },
    handlerSearch() {},
    toggleListType() {
      if (!this.isLoading) {
        this.$emit(
          'update:listType',
          this.listType == 'list' ? 'grids' : 'list'
        )
        this.getBlogs()
      }
    },
    toggleSort() {
      if (!this.isLoading) {
        this.sortType = !this.sortType
      }
    },
    setLoading(flag) {
      this.isLoading = flag
    }
  }
}
</script>

<style lang="scss" scoped>
.blogList-wrap {
  padding: 0 20px;
  position: relative;
  .blogList-wrap-header {
    padding-right: 10px;
  }
  .blogList-wrap-content {
    position: relative;
    min-height: 180px;
  }
}
</style>