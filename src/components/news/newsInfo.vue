<template>
  <div>
    <div class="newsInfo-container">
      <h3 class="title">{{newsInfo.title}}</h3>
      <p class="subtitle">
        <span>发表时间：{{newsInfo.add_time | dateFormat}}</span>
        <span>点击：{{newsInfo.click}}次</span>
      </p>
      <hr>
      <div class="content" v-html='newsInfo.content'></div>
    </div>
    <!-- 评论区 -->
    <!-- 父子组件传值 -->
  <comments :id='id'></comments>
  </div>
</template>

<script>
import VueResource from "vue-resource";
import comments from '../comments/comments.vue';
export default {
  data() {
    return {
      id: this.$route.params.id,
      newsInfo: {}
    };
  },
  // 引入组件
  components:{
    comments: comments
  },
  methods: {
    getNewsInfo() {
      // 获取id
      this.$http.get("api/getnew/" + this.id).then(result => {
        this.newsInfo = result.body.message[0];
      });
    }
  },
  created() {
    this.getNewsInfo();
  }
};
</script>

<style lang="scss" scoped>
.newsInfo-container {
  padding: 0 8px;
  .title {
    margin: 5px 0;
    text-align: center;
    font-size: 16px;
    color: red;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    color: green;
    font-size: 12px;
  }
}
</style>

