<!-- 图片轮播组件 -->
<template>
  <div class="img-flow-wrap">
    <ul class="img-list">
      <li
        class="img-box"
        v-for="(item, index) in imgs"
        :key="index"
        :class="{'on': currentIndex == index}"
      >
        <img :src="item.src" :alt="item.name" />
      </li>
    </ul>
    <div class="top-box row">
      <span class="name">{{imgs[currentIndex].name}}</span>
    </div>
    <div class="left-box" @click="prevImg()">
      <i class="iconfont icon-left">&#xf3b5;</i>
    </div>
    <div class="right-box" @click="nextImg()">
      <i class="iconfont icon-right">&#xf3b4;</i>
    </div>
    <div class="bottom-box row">
      <div
        class="dot"
        v-for="(item, index) in imgs"
        :key="index"
        :class="{'on': currentIndex == index}"
        @click="selectImg(index)"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'imgFlow',
  props: {
    imgs: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    prevImg() {
      this.currentIndex =
        this.currentIndex - 1 < 0
          ? this.imgs.length - this.currentIndex - 1
          : (this.currentIndex - 1) % this.imgs.length
    },
    nextImg() {
      this.currentIndex = (this.currentIndex + 1) % this.imgs.length
    },
    selectImg(index) {
      this.currentIndex = index
    }
  }
}
</script>

<style lang="scss" scoped>
$img-mask-bg-color: rgba(54, 54, 54, 0.8);
.img-flow-wrap {
  position: relative;
  width: 100%;
  .img-list {
    width: 100%;
    .img-box {
      opacity: 0;
      width: 100%;
      display: none;
      justify-content: center;
      align-items: center;
      &.on {
        opacity: 1;
        display: flex;
      }
      img {
        width: 100%;
      }
    }
  }
  .left-box,
  .right-box,
  .bottom-box,
  .top-box {
    transition: 0.4s;
    position: absolute;
    user-select: none;
    background: $img-mask-bg-color;
  }
  .left-box {
    left: -60px;
    .icon-left {
      padding-left: 20px;
    }
  }
  .right-box {
    right: -60px;
    .icon-right {
      padding-right: 20px;
    }
  }
  .left-box,
  .right-box {
    opacity: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    transform: rotate(45deg);
    top: 50%;
    margin-top: -20px;
    cursor: pointer;
    &:hover {
      .iconfont {
        opacity: 1;
      }
    }
    .iconfont {
      font-size: 1em;
      color: #fff;
      opacity: 0.7;
      transform: rotate(-45deg);
      transition: 0.3s;
    }
  }
  .top-box,
  .bottom-box {
    padding: 10px 0;
    left: 0;
    right: 0;
    justify-content: center;
  }
  .top-box {
    top: -60px;
    color: #fff;
    span {
      font-size: 0.8em;
    }
  }
  .bottom-box {
    bottom: -60px;
    .dot {
      width: 4px;
      height: 4px;
      background: #fff;
      border-radius: 50%;
      margin: 0 2px;
      opacity: 0.6;
      cursor: pointer;
      &.on {
        opacity: 1;
      }
    }
    .index {
      font-size: 0.8em;
      margin-left: 5px;
      color: #fff;
    }
  }
  &:hover {
    .left-box {
      left: -20px;
      opacity: 1;
    }
    .right-box {
      right: -20px;
      opacity: 1;
    }
    .top-box {
      top: 0;
    }
    .bottom-box {
      bottom: 0;
    }
  }
}
</style>