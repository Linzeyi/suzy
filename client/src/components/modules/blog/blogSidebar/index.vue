<template>
  <div id="blog-sidebar">
    <div class="line"></div>
    <div class="sidebar-wrap">
      <ul class="option-list">
        <li class="option-li" v-for="(item, index) in options" :key="index">
          <p>
            <i class="iconfont" v-html="item.icon"></i>
            <span>{{item.title}}</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          title: '新的博客',
          icon: '&#xe813;'
        },
        {
          title: '我收藏的',
          icon: '&#xe643;'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
#blog-sidebar {
  position: sticky;
  top: 30px;
  padding-left: 20px;
  .sidebar-wrap {
    .option-list {
      display: inline-block;
      .option-li {
        transition: 0.2s;
        border-radius: 4px;
        color: #fff;
        width: 44px;
        padding: 10px 12px;
        background: #4e6780;
        border-bottom: 1px solid #fff;
        cursor: pointer;
        &:hover {
          width: 116px;
          background: $primary-color;
          p {
            width: 86px;
            .iconfont {
              margin-right: 10px;
            }
            span {
              opacity: 1;
            }
          }
        }
        p {
          overflow: hidden;
          display: flex;
          align-items: center;
          width: 20px;
          .iconfont {
            font-size: 20px;
          }
          span {
            transition: 0.3s;
            opacity: 0;
            font-size: 14px;
            line-height: 23px;
            height: 23px;
          }
        }
      }
    }
  }
}
</style>