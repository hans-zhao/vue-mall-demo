<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
        <router-link :to="'/home/newsList/'+item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
            <h1>{{item.title}}</h1>
            <p class="mui-ellipsis">
              <span>发表时间：{{item.add_time | dateFormat}}</span>
              <span>点击：{{item.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import VueResource from "vue-resource";
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      newsList: []
    };
  },
  methods: {
    getNewsList() {
      this.$http.get("api/getnewslist").then(
        result => {
          if (result.body.status == 0) {
            //Toast("成功");
            this.newsList = result.body.message;
          }
        },
        () => {
          Toast("失败！");
        }
      );
    }
  },
  created() {
    this.getNewsList();
  }
};
</script>

<style lang="scss" scoped>
.mui-table-view {
  li {
    h1 {
      font-size: 16px;
    }
    .mui-ellipsis {
      color: green;
      font-size: 12px;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>

