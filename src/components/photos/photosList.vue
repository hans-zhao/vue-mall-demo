<template>
  <div>
    <div id="slider" class="mui-slider">
      <div id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
            <!-- 使用行内 :class=["css"](可以不要数组) css是实例的属性（或者引入的属性(属性值为{css1:true,css2:true})如mui-active） -->
            <!-- 绑定时语法可以写js代码 -->
            <!-- 点击后高亮则是滑动模块自带的 因此只需要给第一个选项卡设置mui-active-->
            <!-- mui专用=> @tap是移动端点击（目前没有兼容问题，用谁都可以） -->
          <a :class='["mui-control-item", item.id===0?"mui-active":""]' v-for='item in photosClass' :key="item.id" @tap='getPhotosList(item.id)'>{{item.title}}</a>
        </div>
      </div>
    </div>
    <ul class="img-list">
        <!-- 路由不会使用网络链接！！！只有发送请求才会使用网络链接 -->
        <!-- 至于用户看到的网络路由，当然是我们部署服务器之后了，开发阶段就是本地  -->
        <!-- 总之 to的路径 和 router的路径一致 -->
      <router-link tag='li' v-for='item in list' :key="item.id" :to="'/home/photosInfo/'+ item.id">
        <img v-lazy='item.img_url'>
        <div class="info">
          <h3 class="info-head">{{item.title}}</h3>
          <div class="info-body">{{item.zhaiyao}}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min";
import VueResource from 'vue-resource';
import {Toast} from 'mint-ui';
export default {
  data() {
    return {
      photosClass: [],
      list: [],
    };
  },
  created(){
      this.getPhotosClass();
      this.getPhotosList(0);
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //阻尼系数,系数越小滑动越灵敏
    });
  },
  methods: {
      getPhotosClass(){
        //   获取图片分类列表
        this.$http.get('api/getimgcategory').then(result => {
            if(result.body.status === 0){
                result.body.message.unshift({ title: "全部", id:0 });
                this.photosClass = result.body.message;
            }
        })
      },
      getPhotosList(cateid){
        this.$http.get('api/getimages/'+cateid).then(result=>{
          if(result.body.status === 0){
            this.list = result.body.message;
          }
          else{
            Toast('错误！');
          }
        })
      }
  }
};
</script>
<style lang="scss" scoped>
* {
  touch-action: pan-y;
}
.img-list{
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  list-style: none;
  li{
    background: #ccc;
    text-align: center;
    margin-bottom: 10px;
    position: relative;
    .info{
      max-height: 80px;
      position: absolute;
      bottom: 0;
      color: #fff;
      font-weight:400;
      text-align: left;
      // 背景色透明
      background-color: rgba($color: #000000, $alpha: 0.4);
      .info-head{
        font-size: 16px;
      }
      .info-body{
        font-size: 14px;
      }
    }
    img{
      width: 100%;
      vertical-align: middle;
      box-shadow: 0 0 9px #999;
    }
    img[lazy='loading']{
      width: 40px;
      height: 300px;
      // 上下左右都居中
      margin: auto;
    }
  }
}
</style>

