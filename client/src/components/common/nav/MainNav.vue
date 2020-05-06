<!-- 首页导航栏组件 -->
<template>
  <div id="main_nav" class="nav-container">
    <div class="top-row">
      <starBg></starBg>
      <div class="row">
        <div class="left-box">
          <ul class="menu-list left-list">
            <li 
            class="menu-item" 
            v-for="(item, index) in navBarArr" 
            :key="index" 
            :class="{'on': item.title == currentPage.title}"
            @click="selectedPage(item)">
              <span class="menu-title">{{item.title}}</span>
            </li>
          </ul>
        </div>
        <div class="title-box">
          <span class="title">SUZY WEBSITE</span>
        </div>
        <div class="right-box">
          <ul class="menu-list right-list">
            <li class="menu-item search-item circle-item">
              <input :class="{'on': searchVal}" type="text" placeholder="输入关键词搜索" v-model="searchVal">
              <i class="iconfont icon-search">&#xf3cb;</i>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <metalFrame :lineLogoBadgeOption="lineLogoBadgeOption" />
  </div>
</template>

<script>
export default {
  name: 'mainNav',
  data () {
    return {
      searchVal: '',
      showPieHover: false,
      lineLogoBadgeOption: {
        zIndex: 8,
        size: 24,
        innerPos: 4,
        borderRadius: 3,
        pos: [0, 25, 50, 75, 100]
      },
      navBarArr: [
        {
          title: '首页',
          desc: 'main',
          path: '/main'
        },
        {
          title: '博客',
          desc: 'blog',
          path: '/blog'
        },
        {
          title: '作品',
          desc: 'works',
          path: '/works'
        },
        {
          title: '项目',
          desc: 'my project',
          path: '/project'
        },
        {
          title: '笔记',
          desc: 'note',
          path: '/note'
        },
        {
          title: '文件',
          desc: 'file',
          path: '/file'
        }
      ],
      currentPage: ''
    }
  },
  mounted () {
    this.navBarArr.forEach(element => {
      if (element.path == this.$route.path) {
        this.currentPage = element
      }
    })
  },
  computed: {
    getColumnItemNum () {
      return parseInt(this.screenWidth / 8)
    },
    screenWidth () {
      return this.$store.getters['window/screenWidth']
    }
  },
  watch: {
    currentPage: {
      handler () {
        let newPos = []
        // this.lineLogoBadgeOption.pos
      },
      deep: true
    }
  },
  methods: {
    selectedPage (page) {
      this.currentPage = page
      this.$router.push({
        path: this.currentPage.path
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: $main-nav-height;
  background-color: $nav-bg-color;
  box-shadow: 0 0 35px 8px rgba(17, 22, 32, 0.9);
  z-index: 20;
  .top-row {
    position: relative;
    height: $main-nav-height;
    padding: 0 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    &::before {
      content: '';
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      position: absolute;
      background-image: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%);
      background-size: cover;
      background-position: center;
    }
    .menu-list {
      $menu-color: rgba(255, 255, 255, .8);
      $menu-hover-color: rgba(255, 255, 255, 1);
      display: flex;
      align-items: center;
      &.left-list {
        justify-content: flex-start;
        .menu-item {
          margin-right: 15px;
        }
      }
      &.right-list {
        justify-content: flex-end;
        .menu-item {
          margin-left: 15px;
        }
      }
      .menu-item {
        $menu-height: 35px;
        display: inline-block;
        padding: 0 15px;
        font-size: 1em;
        position: relative;
        cursor: pointer;
        .menu-title {
          color: $menu-color;
          transition: .4s;
          padding-bottom: 10px;
          user-select: none;
        }
        &.circle-item {
          padding: 0;
          border: 1px solid $menu-color;
          border-radius: $menu-height;
        }
        input {
          color: $menu-color;
          color: $menu-color;
          height: $menu-height;
          line-height: $menu-height;
          padding-left: 0;
          width: 0;
          transition: .4s;
          opacity: 0;
          &:focus,
          &.on {
            padding-left: 20px;
            width: 120px;
            opacity: 1;
          }
        }
        > .iconfont {
          color: $menu-color;
          vertical-align: top;
          display: inline-block;
          height: $menu-height;
          width: $menu-height;
          line-height: $menu-height;
          text-align: center;
          font-size: 1.3em;
          cursor: pointer;
          user-select: none;
          transition: .4s;
        }
        &:hover, &.on {
          border-color: $menu-hover-color;
          input {
            color: $menu-hover-color;
            padding-left: 20px;
            width: 120px;
            opacity: 1;
          }
          .menu-title {
            border-bottom: 2px solid $menu-hover-color;
            color: $menu-hover-color;
            font-weight: 600;
          }
          .iconfont {
            color: $menu-hover-color;
          }
        }
      }
    }
    .row {
      position: relative;
      z-index: 4;
      width: 100%;
      height: $main-nav-height;
      .left-box, .right-box{
        width: 35%;
        flex-grow: 1;
      }
      .title-box {
        width: 30%;
        text-align: center;
        .title {
          font-size: 2.7em;
          color: #FFF;
          text-align: center;
          font-family: 'lato',sans-serif;
          font-weight: 300;
          letter-spacing: 10px;
          user-select: none;
          background: -webkit-linear-gradient(white, #38495a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }
  }
}
</style>