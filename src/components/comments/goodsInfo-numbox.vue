<template>
  <div>
    <!-- 注意两个numbox业务逻辑不同，其中一个与tab上的购物车有关联，因此要分开 -->
    <!-- <div class="mui-numbox" data-numbox-min="1" :data-numbox-max="maxcount"> -->
      <!-- data-numbox-max不能直接绑定，，采用watch -->
    <div class="mui-numbox" data-numbox-min="1">
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input id="test" class="mui-input-numbox" type="number" value="1" @change='countChanged' ref='numBox'>
      <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
  </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min';

export default {
    mounted(){
        mui('.mui-numbox').numbox();
        this.countChanged();
    },
    methods:{
      countChanged(){
        // selectedNumber是父级传来的函数
          this.$emit('selectedNumber', parseInt(this.$refs.numBox.value));
      }
    },
    // 由于maxcount跟异步请求有关，需watch，当数据变化时，
    props: ['maxcount'],
    watch:{
      maxcount: function(newVal, oldVal){
          mui('.mui-numbox').numbox().setOption('max', newVal);
      }
    }
};
</script>
<style lang="scss" scoped>
    .mui-numbox{
        height:25px;
    }
</style>

