<template>
  <div class="app-container">
    <!-- 标题栏 -->
    <!-- 返回按钮 ：js跳转路由历史 -->
    <mt-header fixed title="智涵.移动商城">
      <a href="#" slot="left" @click='$router.back()' v-show='isBack'>
        <mt-button icon="back">返回</mt-button>
      </a>
    </mt-header>
    <!-- 针对定位，修改padding -->

    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item-11b" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item-11b" to="/contact">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item-11b" to="/cart">
        <!-- 保留基类 -->
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id='badge'>{{$store.getters.allCount}}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item-11b" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

export default {
  data() {
    return {
      isBack: false
    };
  },
  methods: {

  },
  created(){
    this.isBack = this.$route.path === '/home'?false:true;
  },
  // 监视当前route.path，只要变化，就判断是否为home
  watch:{
    // 注意：刷新页面时，不论任意页面：由于路由不变，所以不触发watch，导致返回按钮不显示了，只能在钩子里面处理了
    '$route.path': function(newVal, oldVal){
      this.isBack = newVal==='/home'?false:true;
    }
  }
};
</script>


<style lang="scss" scoped>
.app-container {
  padding-top: 40px;
  padding-bottom: 50px;
	// 横向太大，有滚动条
  overflow-x: hidden;
}
.mint-header{
  z-index: 99;
}
// 如果没有动画：旧页面立即消失，新页面立即出现
// enter指的是新页面
.v-enter {
	// 新的页面从模糊到清晰可见（透明度）
  opacity: 0;
	// 从右（translatex里面的数值决定了新页面距离最左侧的间距：即能够移动的间距）向左
  transform: translateX(100%);
}
.v-enter-active {
  transition: all 1s ease;
}

// 旧页面：从左向右
// v-leave指的是旧页面，注意需要完全离开时的状态
.v-leave-to{
	opacity: 0;
	// 需要修改为从右向左，因此取负值
	transform: translateX(-100%);
	// 避免旧页面占位
	position: absolute;
}
.v-leave-active{
	transition: all 1s ease;
}
// mui-tab-item 这个类 ：mui和vue冲突，需要修改类名（复制原类名的样式）
.mui-bar-tab .mui-tab-item-11b.mui-active {
    color: #007aff;
}
.mui-bar-tab .mui-tab-item-11b {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-11b .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-11b .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>

