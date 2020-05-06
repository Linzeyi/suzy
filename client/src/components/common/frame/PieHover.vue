<template>
  <div
    id="pie_hover"
    :class="{ hover: hoverSlicesIndex != -1 }"
    :style="{
      height: diameter + 'px',
      width: diameter + 'px',
      'margin-left': '-' + radius + 'px',
      'margin-top': '-' + radius + 'px',
      opacity: showPieHover ? 1 : 0,
      transition: showPieHover ? '.3s' : '.5s'
    }"
  >
    <!-- 扇形碎片 -->
    <div
      class="pie-mask"
      v-for="(item, index) in slicesArr"
      :key="index"
      :class="{ on: index == hoverSlicesIndex }"
      :style="{
        height: getMaskDiameter(index) + 'px',
        width: getMaskDiameter(index) + 'px',
        'margin-left': '-' + getMaskRadius(index) + 'px',
        'margin-top': '-' + getMaskRadius(index) + 'px',
        opacity: showPieHover ? 1 : 0,
        'transition-delay': showPieHover ? '0s' : '.4s'
      }"
    >
      <div
        class="slices"
        :style="{
          height: getMaskDiameter(index) + 'px',
          width: getMaskDiameter(index) + 'px',
          transform: getSlicesTransformStyle(index),
          transition: index == hoverSlicesIndex ? '.4s 0s' : '.4s .1s'
        }"
      >
        <!-- <span class="line"></span> -->
      </div>
    </div>
    <!-- 鼠标浮动遮罩 -->
    <div
      class="hover-mask"
      :style="{
        height: diameter + 'px',
        width: diameter + 'px',
        'margin-left': '-' + radius + 'px',
        'margin-top': '-' + radius + 'px'
      }"
    >
      <div
        class="hover-slices"
        v-for="(item, index) in slicesArr"
        :key="index"
        :class="{ on: index == hoverSlicesIndex }"
        :style="{
          height: getMaskDiameter(index) + 'px',
          width: getMaskDiameter(index) + 'px',
          transform: getHoverSlicesTransformStyle(index),
          opacity: showPieHover ? 1 : 0
        }"
        @mouseenter="hoverSlices(index)"
        @mouseleave="leaveSlices()"
      >
        <!-- <p 
        class="slice-info"
        :style="{
          'font-size': getTitleSize,
          'top': (pieMaskRadiusArr[index] / (4 + (slicesArr.length - 6))) +'px',
          'left': (pieMaskRadiusArr[index] / (10 + (slicesArr.length - 6))) +'px',
          'transform': getSlicesTitleTransformStyle(index),
          'opacity': showPieHover ? 1 : 0,
          'transition': showPieHover ? (index == hoverSlicesIndex ? '.1s' : '.3s .2s') : '0s'
        }">
          <span class="desc" :style="{'font-size': '0.7em'}">{{item.desc}}</span>
          <span class="title">{{item.title}}</span>
        </p>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pieHover',
  props: {
    showPieHover: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    radius: {
      type: Number,
      default: () => {
        return 170
      }
    },
    slicesArr: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      hoverSlicesIndex: -1,
      pieMaskRadiusArr: [],
      randomSkewArr: []
    }
  },
  mounted() {
    this.setMaskRadius()
  },
  watch: {
    showPieHover(val) {
      if (val) {
        this.setMaskRadius()
      }
    }
  },
  computed: {
    getTitleSize() {
      let scale = 15
      return Math.floor(this.radius / scale) + 1 + 'px'
    },
    diameter() {
      return this.radius * 2
    },
    getMaskRadius() {
      return function(index) {
        return this.pieMaskRadiusArr.length
          ? this.pieMaskRadiusArr[index]
          : this.radius
      }
    },
    getMaskDiameter() {
      return function(index) {
        return this.getMaskRadius(index) * 2
      }
    },
    getSlicesTransformStyle() {
      return function(index) {
        let transformStyle =
          'rotate(' +
          this.getSlicesRotate(index) +
          'deg) skewY(' +
          this.randomSkewArr[index] +
          'deg)'
        return transformStyle
      }
    },
    getHoverSlicesTransformStyle() {
      return function(index) {
        let transformStyle =
          'rotate(' +
          this.getSlicesRotate(index) +
          'deg) skewY(' +
          this.randomSkewArr[index] +
          'deg)'
        return transformStyle
      }
    },
    getSlicesTitleTransformStyle() {
      return function(index) {
        let transformStyle =
          'skewY(' +
          -this.randomSkewArr[index] +
          'deg)rotate(' +
          (360 - this.getSlicesRotate(index)) +
          'deg)'
        return transformStyle
      }
    },
    getSlicesRotate() {
      return function(index) {
        let count = this.pieMaskRadiusArr.length
        let perAngle = 360 / count
        return this.showPieHover ? perAngle * index + 180 : 180
      }
    },
    getSlicesSkew() {
      let count = this.slicesArr.length
      return 90 - 360 / count
    }
  },
  methods: {
    hoverSlices(index) {
      this.hoverSlicesIndex = index
    },
    leaveSlices() {
      this.hoverSlicesIndex = -1
    },
    setMaskRadius() {
      this.$nextTick(() => {
        this.pieMaskRadiusArr = []
        this.randomSkewArr = []
        for (let i = 0; i < this.slicesArr.length; i++) {
          let offset = this.MathUtils.GetRandom(9, 16)
          this.pieMaskRadiusArr.push(this.radius - offset)
          // let skew = this.getSlicesSkew + this.MathUtils.GetRandom(4, 7)
          let skew = this.getSlicesSkew
          this.randomSkewArr.push(skew)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#pie_hover {
  opacity: 0;
  width: 0;
  height: 0;
  left: 50%;
  top: 50%;
  position: absolute;
  &::before {
    content: '';
    z-index: 3;
    width: 0;
    height: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    box-shadow: 0 0 60px 35px #ffffff;
    transition: 0.3s 0.2s;
  }
  // &::after {
  //   content: '';
  //   background-color: transparent;
  //   z-index: 0;
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  //   box-shadow: 0 0 50px 40px #1d1d1d;
  //   transition: .3s;
  // }
  // &.hover::after {
  //   transition: .3s;
  //   box-shadow: 0 0 90px 140px #1f1f1f;
  // }
  .pie-mask,
  .hover-mask {
    z-index: 1;
    border-radius: 50%;
    left: 50%;
    top: 50%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  .pie-mask {
    opacity: 0;
    &.on {
      .slices {
        background-color: #fff;
        box-shadow: 0 0 15px 2px rgb(20, 20, 20);
        border-color: #fff;
        .line {
          background-color: rgba(255, 255, 255, 0.6);
          box-shadow: 0 1px 5px 0 rgb(48, 48, 48);
        }
      }
    }
    .slices {
      box-sizing: content-box;
      z-index: 3;
      position: relative;
      left: 50%;
      top: 50%;
      transform-origin: left top;
      display: flex;
      justify-content: center;
      transform: rotate(0);
      box-shadow: 0 0 4px 5px rgba(70, 70, 70, 0.3);
      background-color: rgba(204, 204, 204, 0.5);
      .line {
        display: inline-block;
        position: absolute;
        top: 0;
        left: 0;
        height: 2px;
        width: 100%;
        transform: rotate(-3deg);
        transition: 0.3s;
        background-color: rgba(255, 255, 255, 0.3);
        box-shadow: 0 1px 3px 0 rgba(66, 66, 66, 0.5);
      }
    }
  }
  .hover-mask {
    border-radius: 50%;
    left: 50%;
    top: 50%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    .hover-slices {
      cursor: pointer;
      z-index: 4;
      position: absolute;
      left: 50%;
      top: 50%;
      transform-origin: left top;
      .slice-info {
        opacity: 0;
        display: block;
        position: absolute;
        border-radius: 50%;
        color: #fff;
        text-align: left;
        user-select: none;
        .desc {
          transition: 0.3s 0.4s;
          display: block;
          opacity: 0;
          color: #fff;
        }
        .title {
          transition: 0.3s 0.4s;
          position: relative;
          top: -15px;
          color: #fff;
          text-shadow: 0 1px 3px #000000;
          font-weight: 600;
        }
      }
      &.on {
        .slice-info {
          .desc {
            color: rgb(59, 59, 59);
            opacity: 1;
            transition: 0.3s;
            font-weight: 600;
            text-shadow: 0 0 2px #ffffff;
          }
          .title {
            color: rgb(59, 59, 59);
            transition: 0.3s;
            top: 0;
            text-shadow: none;
          }
        }
      }
    }
  }
}
</style>
