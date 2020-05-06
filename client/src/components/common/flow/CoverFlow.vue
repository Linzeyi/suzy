<!-- 封面轮播组件 -->
<template>
  <div id="cover_flow" @mouseenter="stopTimer" @mouseleave="setTimer">
    <div v-if="colorMaskShow" class="color-mask" :style="{'backgroundImage': gradientArr[colorIndex]}"></div>
    <div v-if="imgMaskShow" class="img-mask" :style="{'backgroundImage': 'url(' + cardArr[current].src + ')'}"></div>
    <bubbleBg v-if="bubbleBgShow" :bubbles='bubbleOption'></bubbleBg>
    <div class="cover-container">
      <div class="prev-btn" @click="prevCard()">
        <i class="iconfont icon-prev">&#xf3b5;</i>
      </div>
      <div class="row" :class="{'reverse-row': isReverse}">
        <div class="left-box">
          <div class="gallery">
            <div
              class="card-box"
              v-for="(item, index) in flowCardArr"
              :key="index"
              :class="item.class"
              :style="{'backgroundImage': 'url(' + item.src + ')'}"
              @click="selectCard(index)"
            >
            </div>
          </div>
        </div>
        <div class="right-box">
          <div
            class="info"
            v-for="(item, index) in flowCardArr"
            :key="index"
            :class="item.class"
          >
            <p class="type"><span>{{item.type}}</span></p>
            <p class="title">{{item.title}}</p>
            <button class="btn-line btn-white">查看详情</button>
          </div>
        </div>
      </div>
      <div class="next-btn" @click="nextCard()">
        <i class="iconfont icon-next">&#xf3b4;</i>
      </div>
    </div>
    <div class="bottom-bar">
      <div class="bar-item" 
        v-for="(item, index) in flowCardArr" 
        :key="index"
        :class="item.class" 
        @click="selectCard(index)"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'coverFlow',
  props: {
    colorMaskShow: { // 颜色滤镜
      type: Boolean,
      default: () => {
        return false
      }
    },
    imgMaskShow: { // 图片背景滤镜
      type: Boolean,
      default: () => {
        return false
      }
    },
    bubbleBgShow: { // 气泡滤镜
      type: Boolean,
      default: () => {
        return false
      }
    },
    isReverse: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    startColorIndex: {
      type: Number,
      default: () => {
       return 0 
      }
    },
    cardArr: {
      type: Array,
      default: () => {
        return []
      }
    },
    bubbleOption: {
      type: Array,
      default: () => {
        return [
          {
            size: 4,
            num: 20,
            time: 8
          }, {
            size: 12,
            num: 10,
            time: 14
          }, {
            size: 30,
            num: 5,
            time: 25
          }, {
            size: 50,
            num: 4,
            time: 30
          }
        ]
      }
    }
  },
  data () {
    return {
      current: 0,
      canClick: true,
      colorIndex: 0,
      timer: 0,
      gradientArr: [
        'linear-gradient(120deg, rgb(91, 111, 177) 20%, rgb(111, 167, 220) 80%)',
        'linear-gradient(120deg, rgb(89, 184, 216) 20%, rgb(117, 218, 230) 80%)',
        'linear-gradient(120deg, rgb(89, 216, 160) 20%, rgb(193, 245, 195) 80%)',
        'linear-gradient(120deg, rgb(255, 201, 133) 20%, rgb(255, 152, 84) 80%)',
        'linear-gradient(120deg, rgb(253, 186, 186) 20%, rgb(234, 124, 124) 80%)',
        'linear-gradient(120deg, rgb(200, 174, 255) 20%, rgb(189, 115, 204) 80%)'
      ]
    }
  },
  mounted () {
    this.setTimer()
    this.colorIndex = this.startColorIndex
  },
  watch: {
    current () {
      this.colorIndex = (this.colorIndex + 1) % this.gradientArr.length
    }
  },
  computed: {
    flowCardArr () {
      let arr = this.cardArr
      let length = arr.length
      let cur = this.current
      // console.log('长度：' + length)
      let past2 = length > 3 ? (length + (cur - 2)) % length : -1
      let past1 = length > 1 ? (length + (cur - 1)) % length : -1
      let future1 = length > 1 ? (cur + 1) % length : -1
      let future2 = length > 3 ? (cur + 2) % length : -1
      // console.log('past2: ' + past2 + '; past1: ' + past1 + '; current: ' + cur + '; future1: ' + future1 + '; future2: ' + future2)
      for (let i = 0; i < arr.length; i++) {
        switch(i) {
          case past2:
            arr[i].class = "past2";
            break;
          case past1:
            arr[i].class = "past1";
            break;
          case cur:
            arr[i].class = "current";
            break;
          case future1:
            arr[i].class = "future1";
            break;
          case future2:
            arr[i].class = "future2";
            break;
          default:
            arr[i].class = "";
        }
      }
      return arr
    }
  },
  methods: {
    stopTimer () {
      clearInterval(this.timer)
    },
    setTimer () {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.current = (this.current + 1) % this.cardArr.length
      }, 4000)
    },
    selectCard (index) {
      if(this.canClick) {
        this.current = index
        this.canClick = false
        setTimeout(() => {
          this.canClick = true
        },600)
      }
    },
    prevCard () {
      if(this.canClick) {
        this.current = (this.cardArr.length + (this.current - 1)) % this.cardArr.length
        this.canClick = false
         setTimeout(() => {
          this.canClick = true
        },600)
      }
    },
    nextCard () {
      if(this.canClick) {
        this.current = (this.current + 1) % this.cardArr.length
        this.canClick = false
         setTimeout(() => {
          this.canClick = true
        },600)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$gallery-height: 300px;
#cover_flow {
  position: relative;
  overflow: hidden;
  &:hover {
    .prev-btn, .next-btn {
      display: inline-block;
    }
    .prev-btn {
      left: -54px;
    }
    .next-btn {
      right: -54px;
    }
  }
  .color-mask {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: .8;
    position: absolute;
    transition: .6s ease;
  }
  .img-mask {
    top: -10px;
    bottom: -10px;
    left: -20px;
    right: -20px;
    z-index: 0;
    opacity: .5;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    filter: grayscale(20%) brightness(30%) blur(6px);
    transition: .6s ease;
    position: absolute;
  }
}
.cover-container {
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  z-index: 1;
  .prev-btn, .next-btn {
    z-index: 5;
    position: absolute;
    height: 80px;
    width: 80px;
    line-height: 80px;
    text-align: center;
    transform: rotate(45deg);
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 14px;
    overflow: hidden;
    transition: .3s ease;
    cursor: pointer;
    user-select: none;
    &:hover {
      background-color: rgba(0, 0, 0, 0.5);
      .iconfont {
        color: rgba(255, 255, 255, 1);
      }
    }
    .iconfont {
      position: relative;
      font-size: 1.8em;
      line-height: 1em;
      transform-origin: center;
      color: rgba(255, 255, 255, .6);
      display: inline-block;
      transition: .6s ease;
    }
  }
  .prev-btn {
    left: -120px;
    .icon-prev {
      left: 21px;
      top: -16px;
      transform: rotate(-45deg)
    }
  }
  .next-btn {
    right: -120px;
    .icon-next {
      left: -21px;
      top: 26px;
      transform: rotate(-45deg)
    }
  }
  .row {
    width: 100%;
    padding: 30px 60px;
    .left-box {
      text-align: center;
    }
    .right-box {
      display: flex;
      align-items: center;
      height: $gallery-height;
      width: calc(100% - 740px);
      overflow: hidden;
      position: relative;
    }
    .gallery {
      position: relative;
      width: 740px;
      height: $gallery-height;
      display: flex;
      align-items: center;
      justify-content: center;
      perspective: 450;
      .card-box {
        width: 300px;
        height: 220px;
        border-radius: 15px;
        overflow: hidden;
        opacity: 0;
        transition: .7s ease;
        position: absolute;
        background-repeat: no-repeat;
        background-size: 100% auto;
        background-position: center;
        background-color: #fff;
        cursor: pointer;
        &.past1, &.current, &.future1 {
          display: inline-block;
          opacity: 1;
        }
        &.past1 {
          z-index: 2;
          transform: translateX(-50%) scaleX(.54) rotateY(35deg) translateZ(60px) scaleY(.57);
          box-shadow: 0 5px 15px rgba(0,0,0,.4);
          opacity: 1;
          &:hover {
            transform: translateX(-50%) scaleX(.62) rotateY(35deg) translateZ(60px) scaleY(.57);
            opacity: 1;
            box-shadow: 0 5px 20px rgba(0,0,0,.6);
          }
        }
        &.past2 {
          z-index: 1;
          transform: translateX(-80%) scaleX(.24) rotateY(20deg) translateZ(60px) scaleY(.37);
          box-shadow: 0 5px 15px rgba(0,0,0,.4);
          opacity: 0.4;
          &:hover {
            transform: translateX(-80%) scaleX(.30) rotateY(20deg) translateZ(60px) scaleY(.37);
            opacity: 0.6;
            box-shadow: 0 5px 20px rgba(0,0,0,.6);
          }
        }
        &.future1 {
          z-index: 2;
          transform: translateX(50%) scaleX(.54) rotateY(-35deg) translateZ(60px) scaleY(.57);
          box-shadow: 0 5px 15px rgba(0,0,0,.4);
          opacity: 1;
          &:hover {
            transform: translateX(50%) scaleX(.62) rotateY(-35deg) translateZ(60px) scaleY(.57);
            opacity: 1;
            box-shadow: 0 5px 20px rgba(0,0,0,.6);
          }
        }
        &.future2 {
          z-index: 1;
          transform: translateX(80%) scaleX(.24) rotateY(-20deg) translateZ(60px) scaleY(.37);
          box-shadow: 0 5px 15px rgba(0,0,0,.4);
          opacity: 0.4;
          &:hover {
            transform: translateX(80%) scaleX(.30) rotateY(-20deg) translateZ(60px) scaleY(.37);
            opacity: 0.6;
            box-shadow: 0 5px 20px rgba(0,0,0,.6);
          }
        }
        &.current {
          z-index: 4;
          transform: translateX(0) scaleX(1) rotateY(0) translateZ(0) scaleY(1);
          box-shadow: 0 8px 15px rgba(0,0,0,.4), 60px 0 20px -30px rgba(0,0,0,.4), -60px 0 20px -30px rgba(0,0,0,.4);
          &:hover {
            opacity: 1;
            transform: translateX(0) scaleX(1.02) rotateY(0) translateZ(0) scaleY(1);
            box-shadow: 0 8px 20px rgba(0,0,0,.6), 60px 0 24px -30px rgba(0,0,0,.6), -60px 0 24px -30px rgba(0,0,0,.6);
          }
        }
      }
    }
    .info {
      overflow: hidden;
      opacity: 0;
      left: 30px;
      right: 0;
      z-index: -1;
      transition: .7s ease;
      position: absolute;
      &.past1 {
        transform: translateX(-5%);
      }
      &.current {
        z-index: 2;
        opacity: 1;
        transform: translateX(0);
      }
      &.future1 {
        transform: translateX(5%);
      }
      .type {
        font-size: 1.1em;
        color: rgba(255, 255, 255, .7);
        margin-bottom: 10px;
        text-shadow: 0 3px 5px rgba(0,0,0,.3);
        span {
          display: inline-block;
          padding-bottom: 5px;
          border-bottom: 1px solid rgba(255, 255, 255, .2);
        }
      }
      .title {
        text-shadow: 0 3px 5px rgba(0,0,0,.3);
        font-size: 2.2em;
        color: #fff;
        margin-bottom: 15px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
  }
}

.bottom-bar {
  height: 30px;
  text-align: center;
  display: block;
  width: 100%;
  position: relative;
  z-index: 1;
  .bar-item {
    display: inline-block;
    height: 2px;
    width: 13px;
    border-radius: 1px;
    margin: 0 1px;
    background-color: rgba(255, 255, 255, 0.3);
    transition: .6s ease;
    cursor: pointer;
    &.current {
      height: 2px;
      width: 20px;
      background-color: rgba(255, 255, 255, 1);
    }
  }
}
</style>