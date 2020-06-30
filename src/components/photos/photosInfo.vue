<template>
  <div class="info-container">
    <h3>{{photosInfo.title}}</h3>
    <div class="info-body">
      <div>发表时间：{{photosInfo.add_time | dateFormat}}</div>
      <div>点击：{{photosInfo.click}}次</div>
    </div>
    <hr>
    <!-- 图片 -->
    <vue-preview
      :list="list"
      :thumbImageStyle="{width: '80px', height: '80px', margin: '6px', boxShadow: '0 0 7px #888'}"
      :tapToClose="true"/>
    <!-- 内容区 -->
    <div class="info-content" v-html="photosInfo.content">
    </div>
    <!-- 评论组件 -->
    <comments :id='id'></comments>
  </div>
</template>
<script>
import comments from '../comments/comments.vue'
export default {
  data() {
    return {
      photosInfo: {},
      id: this.$route.params.id,
      list: [
        {
          src: 'https://placekitten.com/600/400',
          w: 600,
          h: 600
        },
        {
          src: 'https://placekitten.com/1200/900',
          w: 1200,
          h: 900
        }
      ]
    };
  },
  created() {
    this.getPhotosInfo();
    this.getThumbs();
  },
  methods: {
    getPhotosInfo() {
      this.$http.get("api/getimageInfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.photosInfo = result.body.message[0];
        }
      });
    },
    getThumbs(){
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
         // console.log(result.body.message);
        //  需要手动加上w h 否则没有宽度和高度
         result.body.message.forEach((v, k)=>{
           v.w = 1200;
           v.h = 900;
         })
         this.list = result.body.message;
        }
      });
    }
  },
  components:{
      comments
  }
};
</script>
<style lang="scss" scoped>
.info-container {
  padding: 5px;
  h3 {
    text-align: center;
    font-size: 16px;
    color: blueviolet;
  }
  .info-body {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
  }
  .info-content{
      font-size: 13px;
      text-indent: 2em;
  }
}
</style>
