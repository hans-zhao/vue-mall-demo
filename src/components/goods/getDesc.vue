<template>
  <div class="desc-container">
    <h3 class="title">{{desc.title}}</h3>
    <hr>
    <div class="content" v-html='desc.content'></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      desc: {}
    };
  },
  created() {
    this.$http
      .get("api/goods/getdesc/" + this.$route.params.id)
      .then(result => {
        if (result.body.status === 0) {
          this.desc = result.body.message[0];
        }
      });
  }
};
</script>
<style lang="scss">
// 图片设置了100%没效果？把scoped去掉
.desc-container {
  .title {
    text-align: center;
    font-size: 14px;
    color: green;
    padding: 5px;
  }
  .content {
    padding: 5px;
    font-size: 12px;
    img{
        width: 100%;
    }
  }
}
</style>
