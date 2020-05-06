<template>
  <div id="works_grid" class="works-grid-wrap">
    <div class="row">
      <div class="col" v-for="colIndex in getCol ? getCol : 1" :key="colIndex" :style="{'width': (100 / getCol) + '%'}">
        <div class="grid-item card full-card" v-for="(item, index) in worksData" :key="index" :class="{'hidden': (index % getCol) != (colIndex - 1)}">
          <div class="img-box">
            <img :src="item.imgs[0].src" alt="">
          </div>
          <div class="info-mask">
            <p class="title">{{item.title}}</p>
            <p class="num">{{item.imgs.length}}</p>
          </div>
        </div>
      </div>
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
      gridWidth: 300
    }
  },
  mounted () {
    this.setGridWidth()
  },
  watch: {
    screenWidth () {
      this.setGridWidth()
    }
  },
  computed: {
    screenWidth () {
      return this.$store.getters['window/screenWidth']
    },
    getCol () {
      return Math.floor(this.gridWidth / 125)
    }
  },
  methods: {
    setGridWidth () {
      this.$nextTick(() => {
        this.gridWidth = document.getElementById('works_grid').offsetWidth
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.works-grid-wrap {
  > .row {
    align-items: flex-start;
    > .col {
      padding-top: 5px;
    }
    .grid-item {
      border: 5px solid #fff;
      margin: 5px;
      position: relative;
      &:hover {
        .info-mask {
          opacity: 1;
        }
      }
      .img-box {
        width: 100%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 100%;
        }
      }
      .info-mask {
        transition: .3s;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        opacity: 0;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: rgba(54, 54, 54, 0.8);
        p {
          font-size: .8em;
          color: #fff;
        }
        .num {
          position: absolute;
          bottom: 10px;
          right: 10px;
          font-size: 1em;
          font-weight: 600;
        }
      }
    }
  }
}
</style>