<template>
  <div>
    <!-- 图片宽度特殊要求为100%，因此需要传递一个参数（其他没有这个要求的则不传递） -->

    <!-- 自定义一个属性并传递 -->
    <carousel :carouselList='carouselList' :isFull='true'></carousel>
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newsList">
          <img src="../../images/menu1.png" alt>
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photosList">
          <img src="../../images/menu2.png" alt>
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodsList">
          <img src="../../images/menu3.png" alt>
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newsList">
          <img src="../../images/menu4.png" alt>
          <div class="mui-media-body">留言反馈</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newsList">
          <img src="../../images/menu5.png" alt>
          <div class="mui-media-body">视频专区</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newsList">
          <img src="../../images/menu6.png" alt>
          <div class="mui-media-body">留言我们</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import carousel from "../comments/carousel.vue";
import { Toast } from "mint-ui";
export default {
  // 尽快发送请求
  data() {
    return {
      carouselList: []
    };
  },
  methods: {
    getCarousel() {
      this.$http
        .get("api/getlunbo")
        .then(result => {
          if (result.body.status === 0) {
            this.carouselList = result.body.message;
          } else {
            Toast("网络请求失败！");
          }
        });
    }
  },
  created() {
    this.getCarousel();
  },
  components: {
    carousel
  }
};
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
}

.mint-swipe-item {
  &:nth-child(1) {
    background-color: red;
  }
  &:nth-child(2) {
    background-color: blue;
  }
  &:nth-child(3) {
    background-color: cyan;
  }
  &:nth-child(4) {
    background-color: yellow;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: 0;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: none;
  img {
    width: 60px;
  }
  .mui-media-body {
    font-size: 12px;
  }
}
</style>

