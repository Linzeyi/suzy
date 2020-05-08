<!-- 首页导航栏组件 -->
<template>
  <div id="main_nav" class="nav-container">
    <div class="nav-row row">
      <p class="title row">
        <span class="suzy">suzy</span>
        <span class="line">|</span>
        <span class="website">website</span>
      </p>
      <div class="menu-panel">
        <ul class="menu-list" :class="{'menu-list_fold': checkMenuFold}">
          <div
            class="menu-item"
            v-for="(item, index) in navBarArr"
            :key="index"
            :class="{'selected': checkHasChild(item)}"
          >
            <dropdown
              :currentItem.sync="currentPage"
              :propItem="item"
              :option="navItemOption"
              @itemClick="handlePageChange"
            >
              <span class="menu-title dropdown-link" slot="dropdown-link">{{item.title}}</span>
            </dropdown>
          </div>
        </ul>
      </div>
      <div class="setting-panel">
        <div class="row justify-end">
          <div class="setting-item" v-for="(item, index) in settingItems" :key="index">
            <dropdown
              trigger="click"
              :propItem="item"
              :option="settingOption"
              @itemClick="handlePageChange"
            ></dropdown>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mainNav',
  data() {
    return {
      navItemOption: {
        value: 'path'
      },
      currentPage: {},
      navBarArr: [
        {
          title: '首页',
          desc: 'index',
          path: '/'
        },
        {
          title: '博客',
          desc: 'blog',
          path: '',
          children: [
            {
              title: '我收藏的',
              desc: 'collected',
              path: ''
            },
            {
              title: '集',
              desc: 'collected',
              path: '',
              children: [
                {
                  title: '春',
                  path: ''
                },
                {
                  title: '夏',
                  path: ''
                }
              ]
            }
          ]
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
      settingItems: [
        {
          title: '',
          icon: '&#xe60d;',
          path: '',
          children: [
            {
              icon: '&#xe924;',
              path: ''
            },
            {
              type: 'divider'
            },
            {
              icon: '&#xe602;',
              path: '',
              children: [
                {
                  title: '编辑资料',
                  icon: '',
                  path: ''
                },
                {
                  title: '编辑资料',
                  icon: '',
                  path: ''
                },
                {
                  title: '编辑资料',
                  icon: '',
                  path: ''
                },
                {
                  title: '编辑资料',
                  icon: '',
                  path: ''
                },
                {
                  title: '编辑资料',
                  icon: '',
                  path: ''
                }
              ]
            }
          ]
        },
        {
          title: '',
          icon: '&#xe72b;'
        }
      ],
      settingOption: {}
    }
  },
  mounted() {
    this.initCurentPage()
  },
  computed: {
    checkHasChild() {
      return function(item) {
        return this.$verify.CheckChildByValue(item, this.$route.path, { value: 'path' })
      }
    },
    checkMenuFold() {
      return this.screenWidth < 600
    },
    getColumnItemNum() {
      return parseInt(this.screenWidth / 8)
    },
    screenWidth() {
      return this.$store.getters['window/screenWidth']
    }
  },
  methods: {
    initCurentPage() {
      this.currentPage = this.$verify.GetChildByValue(this.navBarArr, this.$route.path, { value: 'path' })
    },
    handlePageChange(item) {
      if (!this.$verify.CheckEmpty(item.path)) {
        this.$router.push({
          path: item.path
        })
      }
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
  height: $mainNav-height;
  background-color: $mainNav-color_bg;
  z-index: 20;
  .nav-row {
    position: relative;
    z-index: 4;
    padding: 0 30px;
    width: 100%;
    height: $mainNav-height;
    background-color: #2a4b6b;
    .title {
      min-width: 80px;
      justify-content: center;
      overflow: hidden;
      padding: 0 20px;
      display: flex;
      font-size: 1.1rem;
      font-family: fantasy;
      text-align: center;
      color: #fff;
      span {
        letter-spacing: 2px;
        user-select: none;
        font-weight: 300;
        transition: 0.6s all;
        display: inline-block;
        &.suzy {
          padding: 2px 7px;
          border-radius: 4px;
          background-color: $mainNav-color_logo_reverse;
          color: $mainNav-color_logo;
          font-weight: 600;
          margin-right: 10px;
        }
        &.website,
        &.line {
          padding-top: 4px;
        }
        &.line {
          width: 3px;
          transition: 0.6s all;
        }
        &.website {
          margin-left: 6px;
          width: 69px;
        }
        @media screen and (max-width: 900px) {
          &.suzy {
            background-color: $mainNav-color_logo;
            color: $mainNav-color_logo_reverse;
            margin-right: 0;
          }
          &.line {
            display: none;
          }
          &.website {
            width: 0;
            opacity: 0;
          }
        }
      }
    }
    .menu-panel {
      height: $mainNav-height;
      padding-left: 20px;
      flex-grow: 1;
      .menu-list {
        display: flex;
        align-items: center;
        height: 100%;
        .menu-item {
          height: 100%;
          line-height: $mainNav-height;
          display: inline-block;
          font-size: 1rem;
          position: relative;
          color: $mainNav-color_font;
          cursor: pointer;
          /deep/ .menu-title {
            padding: 0 15px;
          }
          &.selected {
            background-color: $mainNav-color_bg_on;
            &/deep/ .menu-title {
              color: $mainNav-color_font_on;
              font-weight: 600;
              opacity: 1;
            }
          }
        }
      }
    }
    .setting-panel {
      min-width: 140px;
      .setting-item {
        font-size: 1rem;
        height: 100%;
        line-height: $mainNav-height;
        display: inline-block;
        position: relative;
        color: $mainNav-color_font;
        cursor: pointer;
        ::v-deep > .dropdown > .dropdown-link-wrap .dropdown-link {
          padding: 0 10px;
        }
        /deep/ .dropdown-link .iconfont {
          font-size: 1.2rem;
        }
      }
    }
  }
}
</style>