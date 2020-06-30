<template>
  <div class="cart-container">
    <div class="mui-card" v-for="(item, i) in goodsList" :key="item.id">
      <div class="mui-card-content">
        <!-- <mt-cell :title='"切换"+openValue'>
          <mt-switch v-model="openValue" @change="changeStatus"></mt-switch>
        </mt-cell>-->
        <!-- <mt-switch v-model="openValue" @change="changeStatus">{{openValue}}</mt-switch> -->
        <!-- mt-switch的v-model是双向的，$store.getters.getIsSelected因此会变化（当然最终在仓库里面是没有变化的） -->
        <mt-switch
          v-model="$store.getters.getIsSelected[item.id]"
          @change="changeStatus(item.id, $store.getters.getIsSelected[item.id])"
        ></mt-switch>
        <img :src="item.thumb_path" alt>
        <div class="describe">
          <h4>{{item.title}}</h4>
          <div class="content">
            <strong style="color:red;margin-right:2px">￥{{item.sell_price}}</strong>
            <!-- 允许多次v-bind（只要元素属性不同），类似v-on的不同属性click、change -->
            <numbox :selectedCount="$store.getters.cartIdCount[item.id]" :goodsId="item.id"></numbox>
            <a href="#" @click.prevent="deleteGoods(item.id, i)" style="margin-left:2px">删除</a>
          </div>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="left">
          <p>总计（不含运费）</p>
          <p>
            已勾选商品
            <strong class="red">{{$store.getters.getTotal.count}}</strong>件，总价：
            <strong class="red">￥{{$store.getters.getTotal.price}}</strong>
          </p>
        </div>
        <mt-button type="danger">去结算</mt-button>
      </div>
    </div>
    <p>这是商品选择状态{{$store.getters.getIsSelected}}</p>
  </div>
</template>

<script>
import numbox from "../comments/cart-numbox.vue";
export default {
  data() {
    return {
      goodsList: []
    };
  },
  methods: {
    changeStatus(id, selected) {
      console.log("selected有没有变化？" + selected);
      this.$store.commit("isSelected", { id, selected });
    },
    getGoodsList() {
      // 从store获取
      var goodsId = [];
      this.$store.state.cart.forEach(item => {
        goodsId.push(item.id);
      });
      if (goodsId.length <= 0) return;
      this.$http
        // 缺陷：无法获知服务器的购物车上到底有啥，另外：只有本地有存储，才会发请求，如果请求到数据，将数量匹配给它
        //事实上，这个api本身设计缺陷：要自己发产品id，而不是根据用户返回数据
        .get("api/goods/getshopcarlist/" + goodsId.join(","))
        .then(result => {
          if (result.body.status == 0) {
            this.goodsList = result.body.message;
          }
        });
    },
    deleteGoods(id, index) {
      // 删除按钮
      this.goodsList.splice(index, 1);
      this.$store.commit("removeGoods", id);
    }
  },
  components: {
    numbox
  },
  created() {
    this.getGoodsList();
  }
  // 对model的数据操作，尽量考虑1.最终的数据2.不要发请求，直接操作data（再次打开页面才发请求）
  // updated(){
  //   this.getGoodsList();
  // }
};
</script>

<style lang="scss" scoped>
.cart-container {
  background-color: #eee;
  overflow: hidden;
  .mui-card-content {
    padding: 10px 0;
    display: flex;
    justify-content: space-around;
    // 纵向居中
    align-items: center;
    img {
      width: 60px;
      height: 60px;
    }
    h4 {
      font-size: 14px;
    }
    .describe {
      .content {
        display: flex;
        justify-content: space-around;
      }
    }
  }
}
.red {
  color: red;
}
</style>

