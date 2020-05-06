<template>
  <div id="blog_list" class="blog-list-wrap">
    <ul class="blog-list">
      <li class="blog-item" v-for="(item, index) in blogsData" :key="index">
        <div class="row">
          <div class="timeline" v-if="showTimeline">
            <div class="line-box top-line-box">
              <div class="line"></div>
              <div class="dot"></div>
            </div>
            <p class="create-time">
              <i class="iconfont icon-time">&#xf3ce;</i>
              {{TimeUtils.DateFormat(item.createTime)}}
            </p>
            <div class="line-box bottom-line-box">
              <div class="dot"></div>
              <div class="line"></div>
            </div>
          </div>
          <div class="blog card full-card">
            <div class="row">
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
                  <div class="row reverse-row">
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
      </li>
    </ul>
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
    },
    showTimeline: {
      type: Boolean,
      default: () => {
        return false
      }
    }
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
      this.setImgSize()
    }
  },
  computed: {
    screenWidth() {
      return this.$store.getters['window/screenWidth']
    }
  },
  mounted() {
    this.setImgSize()
  },
  methods: {
    setImgSize() {
      setTimeout(() => {
        let blogListDom = document.getElementById('blog_list')
        if (blogListDom) {
          let imgDomArr = blogListDom.getElementsByClassName('cover-img')
          let infoDomArr = blogListDom.getElementsByClassName('info-box')
          imgDomArr.forEach((item, index) => {
            let img = new Image()
            img.src = item.src
            img.onload = () => {
              let w = img.naturalWidth
              let h = img.naturalHeight
              let ratio = h / w
              let minH = infoDomArr[index].offsetHeight
              if (200 * ratio < minH) {
                item.style.height = minH + 'px'
                item.style.width = minH / ratio + 'px'
              } else {
                item.style.height = 200 * ratio + 'px'
                item.style.width = 200 + 'px'
              }
              if (item.offsetHeight > minH) {
                infoDomArr[index].style.height = item.style.height
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
$font-height: 60px;
$line-color: #6f7c8a;
.blog-list-wrap {
  .blog-list {
    .blog-item {
      $timeline-width: 100px;
      transition: 0.3s;
      > .row {
        align-items: stretch;
      }
      &:first-child {
        .timeline {
          .line-box.top-line-box {
            .dot,
            .line {
              background: transparent;
            }
          }
        }
      }
      &:last-child {
        .timeline {
          .line-box.bottom-line-box {
            .line {
              background: transparent;
              background-image: linear-gradient(
                to bottom,
                $line-color,
                transparent
              );
            }
          }
        }
      }
      &:hover {
        .timeline {
          .create-time {
            color: #2d3946;
            font-weight: 600;
          }
          .line-box {
            .dot {
              background: #2d3946;
            }
          }
          .bottom-line-box {
            .dot {
              border-radius: 0;
              width: 20px;
              height: 5px;
            }
            .line {
              background-image: linear-gradient(
                to bottom,
                #2d3946,
                $line-color
              );
            }
          }
        }
      }
      .timeline {
        width: $timeline-width;
        position: relative;
        .create-time {
          color: $line-color;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          height: $font-height;
          padding-left: 20px;
          font-size: 0.8em;
          user-select: none;
          .icon-time {
            font-size: 1em;
            display: inline-block;
            height: 20px;
            width: 20px;
            position: absolute;
            top: 50%;
            left: 0;
            margin-top: -10px;
          }
        }
        .line-box {
          $dot-size: 5px;
          position: relative;
          &.top-line-box {
            height: 20px;
          }
          &.bottom-line-box {
            height: calc(100% - 20px - #{$font-height});
          }
          .line {
            width: 1px;
            height: calc(100% - #{$dot-size});
            background: $line-color;
            margin: 0 auto;
            position: relative;
          }
          .dot {
            margin: 0 auto;
            width: $dot-size;
            height: $dot-size;
            border-radius: 50%;
            background: $line-color;
            transition: 0.3s;
          }
        }
      }
      .blog {
        width: calc(100% - #{$timeline-width});
        > .row {
          align-items: flex-start;
        }
        .img-box {
          width: 200px;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 100%;
          }
        }
        .info-box {
          width: calc(100% - 200px);
          min-height: 140px;
          padding: 15px 20px 10px;
          display: flex;
          overflow: hidden;
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
          .option {
            font-size: 12px;
            margin-bottom: 10px;
            text-align: right;
          }
        }
      }
    }
  }
}
</style>