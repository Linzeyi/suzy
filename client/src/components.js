export default {
  /* ------------------[通用组件]------------------ */
  //背景组件
  BubbleBg: () => import('./components/common/bg/BubbleBg'),
  StarBg: () => import('./components/common/bg/StarBg'),
  //轮播组件
  CoverFlow: () => import('./components/common/flow/CoverFlow'),
  ImgFlow: () => import('./components/common/flow/ImgFlow'),
  //框架组件
  LogoBadge: () => import('./components/common/frame/LogoBadge'),
  MetalFrame: () => import('./components/common/frame/MetalFrame'),
  //加载组件
  LoadingCover: () => import('./components/common/loading/LoadingCover'),
  //下拉框组件
  Dropdown: () => import('./components/common/nav/Dropdown'),
  /* --------------------[END]-------------------- */

  /* ------------------[模块组件]------------------ */
  //导航栏模块
  MainNav: () => import('./components/modules/nav/MainNav'),
  //首页模块
  MainBlogBoard: () => import('./components/modules/main/mainBlogBoard'),
  MainWorksBoard: () => import('./components/modules/main/mainWorksBoard'),
  //博客模块
  BlogGrid: () => import('./components/modules/blog/blogGrid'),
  BlogList: () => import('./components/modules/blog/blogList'),
  BlogSidebar: () => import('./components/modules/blog/blogSidebar'),
  //作品模块
  WorksCarousel: () => import('./components/modules/works/worksCarousel'),
  WorksGrid: () => import('./components/modules/works/worksGrid'),
  WorksList: () => import('./components/modules/works/worksList')
  /* --------------------[END]-------------------- */
}
