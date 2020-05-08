<template>
  <div
    class="dropdown"
    ref="dropdown-el"
    @mouseenter="showDropdownList"
    @mouseleave="hideDropdownList"
    @click="dropdownClick"
    :class="{'hover': isHover, 'on': isFocus, 'selected': checkSelected}"
  >
    <div class="dropdown-link-wrap" @click="linkWrapClick">
      <slot name="dropdown-link">
        <span class="dropdown-link">
          <i class="iconfont" v-html="propItem[dropdownOption.icon]"></i>
          {{propItem[dropdownOption.title]}}
        </span>
      </slot>
    </div>

    <div
      v-show="!$verify.CheckEmpty(propItem[dropdownOption.children])"
      class="dropdown-list-wrap"
      ref="dropdown-list-wrap-el"
    >
      <ul class="dropdown-list" ref="dropdown-list-el">
        <slot name="dropdown-list">
          <li
            class="dropdown-li"
            v-for="(item, index) in propItem[dropdownOption.children]"
            :key="index"
          >
            <div class="dropdown-divider" v-if="item[dropdownOption.type] === 'divider'"></div>
            <dropdown
              v-else
              placement="right"
              :propItem="item"
              :trigger="trigger"
              :currentItem.sync="currentItem"
              :option="option"
              @itemClick="itemClick"
            ></dropdown>
          </li>
        </slot>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dropdown',
  props: {
    propItem: {
      type: Object,
      default: () => {
        return {}
      }
    },
    trigger: {
      type: String,
      default: () => {
        return 'hover'
      }
    },
    placement: {
      type: String,
      default: () => {
        return 'bottom'
      }
    },
    currentItem: {
      type: Object,
      default: () => {
        return {}
      }
    },
    option: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      isHover: false,
      isFocus: false,
      dropdownOption: {
        value: 'value',
        title: 'title',
        icon: 'icon',
        type: 'type',
        children: 'children'
      }
    }
  },
  computed: {
    checkSelected() {
      return this.$verify.IsObjectEqual(this.propItem, this.currentItem)
    },
    screenWidth() {
      return this.$store.getters['window/screenWidth']
    },
    screenHeight() {
      return this.$store.getters['window/screenHeight']
    }
  },
  watch: {
    screenWidth() {
      this.adjustDropdownListPos()
    },
    screenHeight() {
      this.adjustDropdownListPos()
    },
    isHover(newVal, oldVal) {
      if (newVal) {
        this.setDropdownListPos()
      }
    },
    isFocus(newVal, oldVal) {
      if (newVal) {
        this.setDropdownListPos()
      }
    }
  },
  mounted() {
    this.initOption()
    document.addEventListener('click', e => {
      if (!this.$el.contains(e.target)) {
        this.isFocus = false
      }
    })
  },
  methods: {
    initOption() {
      this.dropdownOption = Object.assign(this.dropdownOption, this.option)
    },
    dropdownClick(e) {
      this.$emit('dropdownClick', e)
    },
    linkWrapClick(e) {
      if (this.trigger === 'click') {
        if (!this.$el.contains(e.target)) {
          this.isFocus = false
        } else {
          this.isFocus = true
        }
      }

      this.emitItemClick(this.propItem)
    },
    itemClick(item) {
      this.emitItemClick(item)
    },
    emitItemClick(item) {
      this.$emit('update:currentItem', item)
      this.$emit('itemClick', item)
    },
    showDropdownList() {
      if (this.trigger === 'hover') {
        this.isHover = true
      }
    },
    hideDropdownList() {
      if (this.trigger === 'hover') {
        this.isHover = false
      }
    },
    setDropdownListPos() {
      // 初次设置下拉弹窗的定位
      this.$nextTick(() => {
        if (!this.$verify.CheckEmpty(this.$refs['dropdown-list-wrap-el'])) {
          let pos = this.$refs['dropdown-list-wrap-el'].getBoundingClientRect()
          // console.log(this.$refs['dropdown-list-wrap-el'], h, w, listH, listW, this.screenHeight, this.screenWidth, 'top:', pos.top, 'right:', pos.right, 'bottom:', pos.bottom, 'left:', pos.left)
          if (this.placement === 'bottom') {
            this.setBottomPopPos()
          } else if (this.placement === 'top') {
            this.setTopPopPos()
          } else if (this.placement === 'right') {
            this.setRightPopPos()
          } else if (this.placement === 'left') {
            this.setLeftPopPos()
          }
          this.adjustDropdownListPos()
        }
      })
    },
    adjustDropdownListPos() {
      // 根据视窗大小的变化调整下拉弹窗的定位
      this.$nextTick(() => {
        if (!this.$verify.CheckEmpty(this.$refs['dropdown-el']) && !this.$verify.CheckEmpty(this.$refs['dropdown-list-wrap-el'])) {
          let dropdownPos = this.$refs['dropdown-el'].getBoundingClientRect()
          let listPos = this.$refs['dropdown-list-wrap-el'].getBoundingClientRect()

          /**
           * 根据弹出方位进行调整
           */
          if (this.placement === 'bottom') {
            if (dropdownPos.bottom + listPos.height >= this.screenHeight) {
              // 下拉窗超过视窗底部，改为上浮
              this.setTopPopPos()
            } else {
              this.setBottomPopPos()
            }
          }
          if (this.placement === 'top') {
            if (dropdownPos.top - listPos.height <= 0) {
              // 下拉窗超过视窗顶部，改为下浮
              this.setBottomPopPos()
            } else {
              this.setTopPopPos()
            }
          }
          if (this.placement === 'right') {
            if (dropdownPos.right + listPos.width >= this.screenWidth) {
              // 右悬浮下拉框超过视窗最右端，改为左悬浮
              this.setLeftPopPos()
            } else {
              this.setRightPopPos()
            }
          }
          if (this.placement === 'left') {
            if (dropdownPos.left <= listPos.width) {
              // 左悬浮下拉框超过视窗最左端，改为右悬浮
              this.setRightPopPos()
            } else {
              this.setLeftPopPos()
            }
          }
        }
      })
    },
    setBottomPopPos() {
      // 设置下悬浮弹窗定位
      this.$nextTick(() => {
        this.$refs['dropdown-list-wrap-el'].style.top = this.$refs['dropdown-el'].offsetHeight + 'px'
        this.$refs['dropdown-list-wrap-el'].style.left = '0px'
        this.$refs['dropdown-list-wrap-el'].style['padding'] = '5px 0 0 0'
        this.setOverTopOrBottomPos()
      })
    },
    setTopPopPos() {
      // 设置上悬浮弹窗定位
      this.$nextTick(() => {
        this.$refs['dropdown-list-wrap-el'].style.top = -this.$refs['dropdown-list-wrap-el'].offsetHeight + 'px'
        this.$refs['dropdown-list-wrap-el'].style.left = '0px'
        this.$refs['dropdown-list-wrap-el'].style['padding'] = '0 0 5px 0'
        this.setOverTopOrBottomPos()
      })
    },
    setLeftPopPos() {
      // 设置左悬浮弹窗定位
      this.$nextTick(() => {
        this.$refs['dropdown-list-wrap-el'].style.top = '0px'
        this.$refs['dropdown-list-wrap-el'].style.left = -this.$refs['dropdown-list-wrap-el'].offsetWidth + 'px'
        this.$refs['dropdown-list-wrap-el'].style['padding'] = '0 5px 0 0'
        this.setOverTopOrBottomPos()
      })
    },
    setRightPopPos() {
      // 设置右悬浮弹窗定位
      this.$nextTick(() => {
        this.$refs['dropdown-list-wrap-el'].style.top = '0px'
        this.$refs['dropdown-list-wrap-el'].style.left = this.$refs['dropdown-el'].offsetWidth + 'px'
        this.$refs['dropdown-list-wrap-el'].style['padding'] = '0 0 0 5px'
        this.setOverTopOrBottomPos()
      })
    },
    setOverTopOrBottomPos() {
      // 避免弹窗触顶or触底超出
      this.$nextTick(() => {
        let dropdownPos = this.$refs['dropdown-el'].getBoundingClientRect()
        let listPos = this.$refs['dropdown-list-wrap-el'].getBoundingClientRect()
        if (dropdownPos.bottom + listPos.height + 5 >= this.screenHeight) {
          this.$refs['dropdown-list-wrap-el'].style.top = -(dropdownPos.top + listPos.height + 5 - this.screenHeight) + 'px'
        }
      })
    },
    initDropdownStyle() {
      this.$nextTick(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown {
  position: relative;
  transition: 0.3s all;
  .dropdown-link {
    display: inline-block;
    height: 100%;
    width: 100%;
    padding: 0 20px;
    opacity: 0.7;
    > .iconfont {
      opacity: 0.7;
      font-weight: 300;
    }
  }
  .dropdown-list-wrap {
    position: absolute;
    opacity: 0;
    display: none;
    top: 0;
    white-space: nowrap;
    .dropdown-list {
      padding: 10px 0px;
      background-color: $primary-color;
      border-radius: 4px;
      border: 1px solid #fff;
      box-sizing: border-box;
      color: #fff;
      .dropdown {
        line-height: 30px;
      }
    }

    .dropdown-divider {
      height: 0;
      width: 80%;
      margin: 4px auto 6px auto;
      border: none;
      border-top: 1px solid #fff;
      opacity: 0.5;
    }
  }
  &:hover,
  &.on,
  &.selected {
    > .dropdown-link-wrap > .dropdown-link {
      opacity: 1;
      font-weight: 600;
      > .iconfont {
        opacity: 1;
        font-weight: 300;
      }
    }
  }
  &.hover,
  &.on {
    > .dropdown-list-wrap {
      opacity: 1;
      z-index: 10;
      display: block;
    }
  }
}
</style>