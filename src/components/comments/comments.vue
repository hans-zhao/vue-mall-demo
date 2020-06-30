<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr>
    <!-- 数据提交的 一定要双向绑定 v-model -->
    <textarea placeholder="请输入要BB的内容（最多吐槽120个字！）" v-model="commentsContent"></textarea>
    <mt-button type="primary" size="large" @click="postComments">发表评论</mt-button>
    <div class="cmt-list">
      <!-- div也可以v-for -->
      <div class="cmt-item" v-for="(item ,i) in comments" :key="i">
        <div
          class="cmt-header"
        >第{{i+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time | dateFormat}}</div>
        <div class="cmt-body">{{item.content === 'undefined' ? '此用户没有发表评论':item.content }}</div>
      </div>
    </div>
    <mt-button type="danger" size="large" plain @click="getMoreComments">加载更多</mt-button>
  </div>
</template>

<script>
import VueResource from "vue-resource";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      comments: [],
      pageindex: 1,
      commentsContent: ""
    };
  },
  props: ["id"],
  methods: {
    //  获取
    getComments(pageindex) {
      this.$http
        //   默认：第一页数据（存在一个 加载更多 按钮）
        .get("api/getcomments/" + this.id + "?pageindex=" + this.pageindex)
        .then(result => {
          if (result.body.status == 0) {
            //   每次获取的数据都加入到数组(注意是数组拼接而不是元素push)，注意处理返回值
            this.comments = this.comments.concat(result.body.message);
            //console.log(this.comments);
          } else {
            Toast("获取评论失败！");
          }
        });
    },
    // 加载更多：原数据+新数据（原数据要保留，可以随时查看）
    getMoreComments() {
      // 直接发送请求，index+1
      this.pageindex++;
      this.getComments();
    },
    //提交
    postComments() {
      if (this.commentsContent.trim().length === 0) return Toast("请输入评论内容");
      this.$http
        .post("api/postcomment/" + this.id, { content: this.commentsContent })
        .then(result => {
          if(result.body.status == 0) {
            //   此时已经存入到服务器了，需要刷新下列表
            //但是当前显示的pageIndex可能不是首页，因此不能通过发送 获取数据的请求（这会导致新添加的评论数据位置不正确）
            // 根据MVVM的概念可知：只需要修改model（而不是发送请求），view就会自动变化
            // 即采用UNshift即可

            // 比较获取区的格式，建立一个完整的评论对象
            var cmt = {user_name: '匿名用户', add_time: Date.now(), content: this.commentsContent};
            this.comments.unshift(cmt);
            this.commentsContent = '';
          }
          else{
              Toast('失败！');
          }
        });
    }
  },
  created() {
    this.getComments();
  }
};
</script>

<style lang="scss" scoped>
.cmt-container {
  padding: 0 3px;
  h3 {
    font-size: 16px;
  }
  textarea {
    font-size: 12px;
    margin: 0 0;
  }
  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      .cmt-header {
        background-color: #ccc;
        font-size: 14px;
        line-height: 30px;
      }
      .cmt-body {
        font-size: 12px;
        text-indent: 2em;
        margin: 2px 0;
      }
    }
  }
}
</style>

