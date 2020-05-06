<!-- 作品展览组件 -->
<template>
  <div class="works-gallery-wrap">
    <div class="wrap-header">
      <div class="row">
        <h1 class="title">作品展</h1>
        <div class="option-item">
          <i 
          class="iconfont change-icon" 
          v-for="(item, index) in showTypes" 
          :key="index" 
          :class="{'on': selectedShowType == item.name}" 
          @click="selectShowType(item)" v-html="item.icon"></i>
        </div>
      </div>
    </div>
    <div class="works-gallery-content">
      <loadingCover :isLoading="isLoading" />
      <worksList v-if="!isLoading && selectedShowType == 'list'" :worksData="worksData" />
      <worksGrid v-if="!isLoading && selectedShowType == 'grids'" :worksData="worksData" />
      <worksCarousel v-if="!isLoading && selectedShowType == 'carousel'" :worksData="worksData" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    worksData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      isLoading: false,
      selectedShowType: 'list',
      showTypes: [
        {
          name: 'list',
          icon: '&#xe646;'
        },
        {
          name: 'grids',
          icon: '&#xe6e5;'
        },
        {
          name: 'carousel',
          icon: '&#xe627;'
        }
      ]
    }
  },
  mounted () {
    this.getWorks()
  },
  methods: {
    getWorks () {
      this.setLoading(true)
      setTimeout(() => {
        this.setLoading(false)
      }, 1200)
    },
    selectShowType (item) {
      if (!this.isLoading) {
        this.selectedShowType = item.name
        this.getWorks()
      }
    },
    setLoading (flag) {
      this.isLoading = flag
    }
  }
}
</script>

<style lang="scss" scoped>
.works-gallery-wrap {
  padding: 0 20px;
  .works-gallery-content {
    width: 100%;
    min-height: 180px;
    position: relative;
  }
}
</style>