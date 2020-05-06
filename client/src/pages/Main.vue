<!-- 首页 -->
<template>
  <div id="main_page">
    <div class="coverFlow-wrap">
      <!-- <coverFlow colorMaskShow imgMaskShow bubbleBgShow :cardArr="cardArr" /> -->
    </div>
    <div class="main-container">
      <div class="row">
        <div class="col-9">
          <!-- <mainBlogBoard :listType.sync="blogListType"></mainBlogBoard> -->
        </div>
        <div class="col-3">
          <!-- <mainWorksBoard :worksData="worksData"></mainWorksBoard> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      blogListType: 'list',
      cardArr: this.FakeUtils.cardArr,
      worksData: this.FakeUtils.worksData
    }
  }
}
</script>

<style lang="scss" scoped>
.main-container {
  padding: 20px 40px;
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  .coverFlow-wrap {
    // padding: 30px;
    #cover_flow {
      // border-radius: 15px;
    }
  }
  > .row {
   align-items: flex-start;
   > [class^="col-"] {
    //  padding-left: 40px;
   }
  }
}
</style>