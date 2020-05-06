<template>
  <div class="metal-frame row line-row">
    <!-- <logoBadge 
      v-for="(item, index) in lineLogoBadgeOption.pos"
      :key="index"
      :z-index="lineLogoBadgeOption.zIndex" 
      :size="lineLogoBadgeOption.size" 
      :inner-pos="lineLogoBadgeOption.innerPos" 
      :border-radius="lineLogoBadgeOption.borderRadius" 
    :pos="item" />-->
  </div>
</template>

<script>
export default {
  name: 'metalFrame',
  props: {
    lineLogoBadgeOption: {
      type: Object,
      default: () => {
        return {
          zIndex: 8,
          size: 25,
          innerPos: 4,
          borderRadius: 3,
          pos: []
        }
      }
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.metal-frame {
  box-shadow: 0 1px 12px 1px rgb(14, 14, 14);
  background: rgba($color: #fff, $alpha: 0.8);
}
</style>