<template>
  <div class="carousel-container">
    <!-- 抽离代码，仔细分析 （不同的值）需要一个参数来代替：轮播图不一样，从MVVM角度思考，是data不一样
    不要想 新手 一样认为URL不一样！！！看本质！！-->

    <!-- 子组件 -->
    <!-- 由于存在公用的轮播图，所以抽取出来 -->
    <!-- 先不抽取，把第二个录播图做出来，再和第一个作比较 -->
    <mt-swipe :auto="1500">
      <mt-swipe-item v-for="(item ,i) in carouselList" :key="i">
        <!-- 字符串要想变成vue的属性=>1.插值；2.冒号 -->
        <img :src="item.img" :class="{full: isFull}">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>


<script>
export default {
  props: ["carouselList", 'isFull']
};
</script>
<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
}
.mint-swipe-item {
  text-align: center;
  img {
    // width: 100%;
    // 不设置宽度，保留原宽
    height: 100%;
  }
}
.full{
    width: 100%;
}
</style>
