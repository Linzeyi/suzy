<!-- 404界面 -->
<template>
  <div class="container">
    <div class="top-content">
      <div class="row">
        <h1>404</h1>
        <div class="right-box">
          <p class="row top-font">NOT FOUND</p>
          <p class="row bottom-font">
            <i class="iconfont icon-airplane">&#xe7d5;</i>
            糟糕，页面不翼而飞了。
          </p>
        </div>
      </div>
    </div>
    <div class="bottom-content">
      <div class="row">
        <button class="back-btn btn-line" @click="() => $router.go(-1)">
          <i class="iconfont icon-back">&#xe817;</i> 后退
        </button>
        <button class="back-btn btn-line" @click="() => $router.go(0)">
          <i class="iconfont icon-refresh">&#xe60a;</i> 刷新
        </button>
        <button class="toHome-btn btn-line" @click="() => $router.push({name: 'index'})">
          <i class="iconfont icon-toHome">&#xe6bb;</i> 返回首页
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .top-content {
    height: 70%;
    background: $primary-color;
    .row {
      color: #fff;
      justify-content: center;
      height: 100%;
      h1 {
        font-size: 46vh;
        font-family: 'Courier New', Courier, monospace;
        font-weight: 500;
      }
      .right-box {
        margin-left: 24px;
        .row {
          align-items: center;
        }
        .top-font {
          font-size: 6vh;
          padding-bottom: 1.2vh;
          margin-bottom: 2vh;
          border-bottom: 1px solid #fff;
        }
        .bottom-font {
          font-size: 4vh;
          .icon-airplane {
            font-size: 5vh;
            margin-right: 12px;
          }
        }
      }
    }
  }
  .bottom-content {
    height: 30%;
    .row {
      justify-content: center;
      align-items: center;
      height: 100%;
      button {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1vh 4vh;
        margin-right: 6vh;
        border-radius: 4px;
        font-size: 2.6vh;
        .iconfont {
          font-size: 3vh;
          margin-right: 1vh;
        }
        &:last-child {
          margin: 0;
        }
      }
    }
  }
}
</style>