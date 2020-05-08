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
        <span class="dropdown-link">{{propItem[dropdownOption.title]}}</span>
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
            <dropdown
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
        return {
          value: 'value',
          title: 'title',
          children: 'children'
        }
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
        children: 'children'
      }
    }
  },
  computed: {
    checkSelected() {
      return this.propItem[this.dropdownOption.value] === this.currentItem[this.dropdownOption.value]
    }
  },
  mounted() {
    this.initOption()

    document.addEventListener('click', e => {
      if (!this.$el.contains(e.target)) {
        this.isFocus = false
      }
    })
    this.setDropdownPos()
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

        this.setDropdownPos()
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
        this.setDropdownPos()
      }
    },
    hideDropdownList() {
      if (this.trigger === 'hover') {
        this.isHover = false
      }
    },
    setDropdownPos() {
      this.$nextTick(() => {
        let h = this.$refs['dropdown-el'].offsetHeight
        let w = this.$refs['dropdown-el'].offsetWidth
        if (this.placement === 'bottom') {
          this.$refs['dropdown-list-wrap-el'].style.top = h + 'px'
          this.$refs['dropdown-list-wrap-el'].style.left = '0px'
          this.$refs['dropdown-list-wrap-el'].style['padding-top'] = '5px'
        } else if (this.placement === 'right') {
          this.$refs['dropdown-list-wrap-el'].style.top = '0px'
          this.$refs['dropdown-list-wrap-el'].style.left = w + 'px'
          this.$refs['dropdown-list-wrap-el'].style['padding-left'] = '5px'
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
      color: #fff;
      .dropdown-li {
        height: 30px;
        line-height: 30px;
      }
    }
  }
  &:hover,
  &.selected {
    > .dropdown-link-wrap > .dropdown-link {
      // background-color: #fff;
      // color: $primary-color;
      opacity: 1;
      font-weight: 600;
    }
  }
  &.hover,
  &.on {
    > .dropdown-link-wrap > .dropdown-link {
      // background-color: #fff;
      // color: $primary-color;
      opacity: 1;
      font-weight: 600;
    }
    > .dropdown-list-wrap {
      opacity: 1;
      z-index: 10;
      display: block;
    }
  }
}
</style>