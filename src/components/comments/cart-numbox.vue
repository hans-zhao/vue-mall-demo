<template>
  <div>
    <div class="mui-numbox" data-numbox-min="1" style="height:23px">
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <!-- HTML属性 button的disabled，input的readonly/required ,radio的checked -->
      <input
        id="test"
        class="mui-input-numbox"
        readonly
        type="number"
        :value="selectedCount"
        @change="countChanged"
        ref="numBox"
      >
      <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min";

export default {
  mounted() {
    mui(".mui-numbox").numbox();
  },
  methods: {
    countChanged() {
      this.$store.commit("updateNumber", {
        id: this.goodsId,
        count: parseInt(this.$refs.numBox.value)
      });
    }
  },
  // 灵活使用父传子、子传父：这里采用父传子，将id传给numbox（事实上只要有了id，就不拍找不到匹配的数据）
  props: ["selectedCount", "goodsId"]
};
</script>
<style lang="scss" scoped>
.mui-numbox {
  height: 25px;
}
</style>

