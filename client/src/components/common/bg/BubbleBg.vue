<!-- 气泡动态背景组件 -->
<template>
  <div id="bubble_bg" :style="{'z-index': zIndex}">
    <div class="bubble-type" v-for="(item, index) in bubbles" :key="index">
      <div
        class="bubble"
        v-for="bubbleIndex in item.num"
        :key="index + '-' + bubbleIndex"
        :style="{
        'bottom': getRandomBottom(bubbleIndex),
        'left': getRandomLeft(bubbleIndex),
        'width': item.size + 'px',
        'height': item.size + 'px',
        'animation': item.time + $math.GetRandom(-5, 5) + 's animBubble' + index + '-' + bubbleIndex + ' linear infinite',
        'background-color': bgColor
      }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bubbleBg',
  props: {
    zIndex: {
      type: Number,
      default: () => {
        return 0
      }
    },
    bgColor: {
      type: String,
      default: () => {
        return 'rgba(255, 255, 255, 0.15)'
      }
    },
    bubbles: {
      type: Array,
      default: () => {
        return [
          {
            size: 10,
            num: 15,
            time: 20
          },
          {
            size: 30,
            num: 20,
            time: 30
          },
          {
            size: 50,
            num: 10,
            time: 40
          }
        ]
      }
    }
  },
  computed: {
    getRandomBottom() {
      return function(index) {
        return this.$math.GetRandom(-120, -10) + Math.floor(index / 10) + '%'
      }
    },
    getRandomLeft() {
      return function(index) {
        return this.$math.GetRandom(0, this.screenWidth) + index + 'px'
      }
    },
    screenWidth() {
      return this.$store.getters['window/screenWidth']
    }
  },
  mounted() {
    this.setBubblekeyframes()
  },
  methods: {
    setBubblekeyframes() {
      var ss = document.styleSheets
      let bubbleCssRule
      for (let i = 0; i < ss.length; i++) {
        let rules = ss[i].cssRules ? ss[i].cssRules : ss[i].rules
        for (let j = 0; j < rules.length; j++) {
          let name = rules[j].selectorText
          if (!this.JudgeUtils.IsUndefined(name) && name.search('bubble') != -1) {
            bubbleCssRule = ss[i]
            break
          }
        }
      }
      for (let i = 0; i < this.bubbles.length; i++) {
        for (let j = 0; j < this.bubbles[i].num; j++) {
          let cssRule =
            `@keyframes animBubble` +
            i +
            `-` +
            j +
            `{
            0% {

            }
            100% {
              left: ` +
            this.$math.GetRandom(0, this.screenWidth) +
            `px;
              bottom: ` +
            this.$math.GetRandom(30, 100) +
            `%
            }
          }`
          if (bubbleCssRule.insertRule) {
            bubbleCssRule.insertRule(cssRule, bubbleCssRule.length)
          } else {
            bubbleCssRule.addRule(cssRule, bubbleCssRule.length)
          }
        }
      }
    }
  }
}
</script>

<style title="bubbleStyle" lang="scss">
#bubble_bg {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .bubble-type {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    .bubble {
      position: absolute;
      border-radius: 50%;
      animation: animBubble linear infinite;
    }
  }
}
</style>