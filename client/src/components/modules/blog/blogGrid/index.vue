<template>
  <div id="blog_grid" class="blog-grid-wrap">
    <div class="row">
      <div
        class="col"
        v-for="colIndex in getCol ? getCol : 1"
        :key="colIndex"
        :style="{'width': (100 / getCol) + '%'}"
      >
        <div
          class="blog-item"
          v-for="(item, index) in blogsData"
          :key="index"
          :class="{'hidden': (index % getCol) != (colIndex - 1)}"
        >
          <div class="blog card full-card">
            <div class="img-box">
              <img class="cover-img" :src="item.coverImg" alt="博客封面" />
            </div>
            <div class="info-box">
              <p class="title">{{item.title}}</p>
              <p class="author">
                <span class="name">{{item.author.name}}</span>
              </p>
              <p class="desc">{{item.desc}}</p>
              <div class="bottom-font">
                <div class="row">
                  <span class="create-time">{{$time.DateSimpleFormat(item.createTime)}}</span>
                  <span class="icon-item">
                    <i class="iconfont icon-collect">&#xe643;</i>
                    122
                  </span>
                  <span class="icon-item">
                    <i class="iconfont icon-comment">&#xe656;</i>
                    63
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    blogsData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      gridWidth: 1024
    }
  },
  mounted() {
    this.setGridWidth()
    this.setImgSize()
  },
  watch: {
    blogsData: {
      handler: function() {
        this.$nextTick(() => {
          this.setImgSize()
        })
      },
      deep: true
    },
    screenWidth() {
      this.setGridWidth()
      this.setImgSize()
    }
  },
  computed: {
    screenWidth() {
      return this.$store.getters['window/screenWidth']
    },
    getCol() {
      return Math.floor(this.gridWidth / 240)
    }
  },
  methods: {
    setGridWidth() {
      this.$nextTick(() => {
        this.gridWidth = document.getElementById('blog_grid') ? document.getElementById('blog_grid').offsetWidth : 0
      })
    },
    setImgSize() {
      setTimeout(() => {
        let blogCardGroupDom = document.getElementById('blog_grid')
        if (blogCardGroupDom) {
          let imgDomArr = blogCardGroupDom.getElementsByClassName('cover-img')
          imgDomArr.forEach((item, index) => {
            let img = new Image()
            img.src = item.src
            img.onload = () => {
              let w = img.naturalWidth
              let h = img.naturalHeight
              let ratio = h / w
              let cardDomArr = blogCardGroupDom.getElementsByClassName('blog')
              let minW = cardDomArr[index].offsetWidth
              if (w < minW) {
                item.style.width = w + 'px'
                item.style.height = h + 'px'
              } else {
                item.style.width = minW + 'px'
                item.style.height = minW * ratio + 'px'
              }
            }
          })
        }
      }, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.blog-grid-wrap {
  > .row {
    align-items: flex-start;
  }
  .blog-item {
    $timeline-width: 100px;
    transition: 0.3s;
    .row {
      align-items: stretch;
    }
    .blog {
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
      .info-box {
        width: 100%;
        padding: 15px 20px 10px;
        display: flex;
        flex-direction: column;
        .title {
          font-size: 1.2em;
          font-weight: 600;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
        .author {
          font-size: 0.8em;
          margin-bottom: 5px;
        }
        .desc {
          flex-grow: 1;
          margin-bottom: 10px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 5;
          overflow: hidden;
        }
        .bottom-font {
          padding-top: 10px;
          border-top: 1px solid rgb(232, 234, 238);
          .create-time {
            flex-grow: 1;
            font-size: 0.8em;
            opacity: 0.8;
          }
          .icon-item {
            padding-left: 10px;
            font-size: 0.8em;
            opacity: 0.8;
            .iconfont {
              font-size: 1em;
            }
          }
        }
      }
    }
  }
}
</style>