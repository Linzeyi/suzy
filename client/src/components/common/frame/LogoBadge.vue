<template>
  <div class="badge-logo-box" :style="{'z-index': zIndex}">
    <div 
    class="center-box"
    :style="{
      'height': size + 'px',
      'width': size + 'px',
      'left': pos + '%',
      'margin-left': (-size / 2) + 'px',
      'border-radius': borderRadius + 'px'
    }">
      <div
      class="inner-box"
      :style="{
        'height': (size - innerPos * 2) + 'px',
        'width': (size - innerPos * 2) + 'px',
        'top': innerPos + 'px',
        'left': innerPos + 'px',
        'border-radius': borderRadius + 'px'
      }"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'logoBadge',
  props: {
    zIndex: {
      type: Number,
      default: () => {
        return 5
      }
    },
    pos: {
      type: Number,
      default: () => {
        return 50
      }
    },
    size: {
      type: Number,
      default: () => {
        return 56
      }
    },
    innerPos: {
      type: Number,
      default: () => {
        return 7
      }
    },
    borderRadius: {
      type: Number,
      default: () => {
        return 10
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.badge-logo-box {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  .center-box {
    z-index: 10;
    cursor: pointer;
    transform: rotate(45deg);
    position: absolute;
    box-shadow: 0 0 7px 2px rgba(0, 0, 0, 0.5);
    background-color: #fff;
    transition: 1.4s;
    background-image: linear-gradient(to bottom right, #fff, #fff ,#fff, #fff ,#f1f1f1 ,#dbdbdb, #bdbdbd, #adadad, #8a8a8a, #4b4b4b);
    // background-image: linear-gradient(to bottom right, #fff, #fff ,#fff, #fff ,#fff ,#fff, #e0e0e0, #cfcfcf, #a0a0a0, #868686);
    &:hover {
      box-shadow: 0 0 20px 2px rgba(0, 0, 0, .6);
      
    }
    .inner-box {
      position: relative;
      border: 1px solid #ddd;
    }
  }
}
</style>