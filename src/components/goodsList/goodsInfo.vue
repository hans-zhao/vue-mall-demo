<template>
  <div class="goods-info">
    <!-- 加入购物车这个动画所需要的小球 -->
    <!-- 点击加入购物车：必须使用钩子（常规css动画是全场循环的，而这里要半场=>每次点击必须从头开始） -->
    <transition v-on:before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref='ball'></div>
    </transition>

    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <carousel :carouselList="carouselList"></carousel>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-header">{{goodsDetail.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <div class="price">
            市场价：
            <del>￥{{goodsDetail.market_price}}</del>&nbsp;&nbsp;销售价：
            <span class="sell-price">￥{{goodsDetail.sell_price}}</span>
          </div>

          <!-- 子组件 添加器 -->
          <div class="quantity">
            购买数量：
            <!-- 库存量决定了numberBox的最大允许值 -->
            <numbox @selectedNumber='getSelectedNumber' :maxcount='goodsDetail.stock_quantity'></numbox>
          </div>
          <p>
            <mt-button type="danger" size="small">立即购买</mt-button>&nbsp;&nbsp;
            <mt-button type="primary" size="small" @click="addToCart">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{goodsDetail.goods_no}}</p>
          <p>库存情况：{{goodsDetail.stock_quantity}}</p>
          <p>上架时间：{{goodsDetail.add_time | dateFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" plain size="large" @click="getDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" plain size="large" @click="getComments(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import carousel from "../comments/carousel.vue";
import numbox from "../comments/goodsInfo-numbox.vue";
export default {
  // 尽快发送请求api/getthumimages/:imgid
  data() {
    return {
      carouselList: [],
      id: this.$route.params.id,
      goodsDetail: {},
      ballFlag: false,
      // 当前页面需要numberBOx的数据
      // 注意 需要传递给 tab上购物车的不仅是数量，还有id,price,selected，因此不能直接从numbox上传递
      selectedCount: 1
    };
  },
  methods: {
    getCarousel() {
      this.$http
        .get("api/getthumimages/" + this.$route.params.id)
        .then(result => {
          if (result.body.status === 0) {
            // 处理轮播图返回数据的兼容问题
            result.body.message.forEach(v => {
              //console.log(result.body.message);
              v.img = v.src;
            });
            this.carouselList = result.body.message;
          }
        });
    },
    getGoodsDetail() {
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.goodsDetail = result.body.message[0];
        }
      });
    },
    getDesc(id) {
      this.$router.push({ name: "getdesc", params: { id } });
    },
    getComments(id) {
      this.$router.push({ name: "getComments", params: { id } });
    },
    addToCart() {
      this.ballFlag = !this.ballFlag;
      // 商品信息
      var goods = {id:this.id, count:this.selectedCount, price:this.goodsDetail.sell_price,selected:false};
      // 商品加入购物车
      this.$store.commit('addCart', goods);
      console.log('加入购物车的数量'+this.selectedCount);
    },
    beforeEnter(el) {
      el.style.transform = "translate(0, 0)";
    },
    enter(el, done) {
      el.offsetWidth;
      // 求距离  用dom 小球dom和badge的dom  getBoundingClientRect 获取元素距离视窗的四个距离（返回值为对象）
      // 小球：用this.$refs.name  badge不在同一个组件上可以用原生dom
      var ballPosition = this.$refs.ball.getBoundingClientRect();
      var badgePosition = document.getElementById('badge').getBoundingClientRect();
      var xDistance = badgePosition.left - ballPosition.left;
      var yDistance = badgePosition.top - ballPosition.top;

      el.style.transform = `translate(${xDistance}px, ${yDistance}px)`;
      el.style.transition = "all 1s cubic-bezier(.64,-0.4,.93,.62)";
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
      // 事实上下半场动画系统自动完成了
    },
    // 获取numberBOx子组件的数据
    getSelectedNumber(count){
      this.selectedCount = count;
    }
  },
  created() {
    this.getCarousel();
    this.getGoodsDetail();
  },
  components: {
    carousel,
    numbox
  }
};
</script>
<style lang="scss" scoped>
.goods-info {
  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    left: 145px;
    top: 405px;
    // transform: translate(100px, 100px)
  }
  background-color: #eee;
  // 超出的空白部分（注意不是margin等造成）
  overflow: hidden;
  .price {
    .sell-price {
      color: red;
      font-weight: bold;
    }
  }
  .quantity {
    display: flex;
    .cart-container {
      height: 5px;
    }
    margin: 15px 0;
  }
  .mui-card-footer {
    display: block;
    button {
      margin-top: 10px;
    }
  }
}
</style>
