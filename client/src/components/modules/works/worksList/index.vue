<template>
  <div class="works-card-list">
    <div class="works-box" v-for="(item, index) in computedWorksData" :key="index">
      <div class="card works-card">
        <imgFlow :imgs="item.imgs"></imgFlow>
      </div>
      <div class="info-box">
        <p class="row">
          <span class="icon-box row">
            <i class="iconfont icon-title">&#xe924;</i>
          </span>
          <span class="title">{{item.title}}</span>
        </p>
        <p class="row">
          <span class="icon-box row">
            <i class="iconfont icon-desc">&#xe7b2;</i>
          </span>
          <span class="desc">{{item.desc}}</span>
        </p>
      </div>
    </div>
    <div class="more-btn-panel row">
      <div class="loading-box row" v-if="loadingMore">
        <loadingCover :isLoading="loadingMore" />
      </div>
      <p
        class="row bg-line"
        v-if="!loadingMore && pageInfo.pageSize * pageInfo.pageNum <= worksData.length"
      >
        <button class="btn-more" @click="getMore()">显示更多</button>
      </p>
      <p
        class="row bg-line"
        v-if="!loadingMore && pageInfo.pageSize * pageInfo.pageNum > worksData.length"
      >
        <button class="btn-more no-more">没有更多啦</button>
      </p>
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
  data() {
    return {
      loadingMore: false,
      pageInfo: {
        pageSize: 3,
        pageNum: 1,
        totalElements: 5
      }
    }
  },
  watch: {
    worksData: {
      handler: () => {
        this.totalElements = this.worksData.length
      },
      deep: true
    }
  },
  computed: {
    computedWorksData() {
      return this.worksData.slice(
        this.pageInfo.pageNum - 1,
        this.pageInfo.pageSize * this.pageInfo.pageNum < this.worksData.length
          ? this.pageInfo.pageSize * this.pageInfo.pageNum - 1
          : this.worksData.length
      )
    }
  },
  methods: {
    getMore() {
      this.loadingMore = true
      setTimeout(() => {
        this.loadingMore = false
        this.pageInfo.pageSize += 3
      }, 400)
    }
  }
}
</script>

<style lang="scss" scoped>
.works-card-list {
  padding: 10px 0;
  .works-box {
    width: 100%;
    margin-bottom: 10px;
    transition: 0.3s;
    .works-card {
      position: relative;
      width: 100%;
      padding: 0;
      border: 10px solid #fff;
      border-radius: 4px;
      margin: 0;
    }
    &:hover {
      padding-bottom: 10px;
      .info-box {
        padding: 10px 0 5px;
        border-bottom: 1px solid #919191;
        > p {
          opacity: 1;
          height: 25px;
          display: flex;
          margin-bottom: 5px;
        }
      }
    }
    .info-box {
      padding: 0;
      transition: 0.3s;
      overflow: hidden;
      box-sizing: content-box;
      border-bottom: 1px solid transparent;
      > p {
        transition: 0.3s;
        opacity: 0;
        height: 0;
        line-height: 25px;
        align-items: stretch;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .icon-box {
          position: relative;
          padding: 0 10px;
          margin: 0 10px;
          &::after {
            content: '';
            position: absolute;
            width: 1px;
            height: 58%;
            right: 0;
            top: 4px;
            background: #9a9a9a;
          }
          .iconfont {
            font-weight: 300;
            font-size: 14px;
            display: inline-block;
            text-align: center;
          }
        }
      }
      .title {
        font-size: 1em;
        font-weight: 600;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
      .desc {
        font-size: 0.8em;
        opacity: 0.8;
      }
    }
  }
  .more-btn-panel {
    padding: 10px 0 20px;
    justify-content: center;
    .row {
      justify-content: center;
      &.bg-line {
        &::before,
        &::after {
          content: '';
          position: absolute;
          height: 1px;
          width: 50%;
          background: #bbb;
        }
        &::before {
          left: 0;
        }
        &::after {
          right: 0;
        }
      }
    }
    .loading-box {
      width: 70px;
      height: 70px;
      position: relative;
    }
    .btn-more {
      position: relative;
      z-index: 5;
    }
    .no-more {
      z-index: 5;
      font-size: 0.8em;
      color: #fff;
      padding: 5px 15px;
      border-radius: 20px;
      display: inline-block;
      background: #acabab;
    }
  }
}
</style>